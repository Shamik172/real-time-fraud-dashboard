import express from "express";
import Transaction from "../models/Transaction.js";
import { getTimeFilter } from "../utils/timeWindow.js";
import { protect, adminOnly } from "../middlewares/auth.js";
import User from "../models/User.js";
import { generateUserTransaction } from "../services/transactionGenerator.js";
import { processTransaction } from "../services/transactionService.js";

const router = express.Router();

// user generates new transaction
router.post("/generate", protect, async (req, res) => {
  const user = await User.findById(req.user.userId);

  const tx = generateUserTransaction(user);
  const saved = await processTransaction(tx);

  res.json(saved);
});

router.get("/my", protect, async (req, res) => {
  const data = await Transaction.find({
    userId: req.user.userId
  }).sort({ timestamp: -1 });

  res.json(data);
});


// Risk Trend Over Time (Line Chart)
router.get("/risk-trend", protect, adminOnly, async (req, res) => {
  const { window } = req.query;
  const fromDate = getTimeFilter(window);

  const pipeline = [];

  if (fromDate) {
    pipeline.push({
      $match: { timestamp: { $gte: fromDate } }
    });
  }

  pipeline.push(
    {
      $addFields: {
        timeBucket: {
          $toDate: {
            $subtract: [
              { $toLong: "$timestamp" },
              { $mod: [{ $toLong: "$timestamp" }, 1000 * 60 * 5] }
            ]
          }
        }
      }
    },
    {
      $group: {
        _id: "$timeBucket",
        avgRisk: { $avg: "$riskScore" }
      }
    },
    { $sort: { _id: 1 } }
  );

  res.json(await Transaction.aggregate(pipeline));
});

// Fraud Count by Risk Level (Pie Chart)
router.get("/risk-distribution", protect, adminOnly, async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$riskLevel",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
});


// Fraud by Location (Bar Chart)
router.get("/location-stats", protect, adminOnly, async (req, res) => {
  const { window } = req.query;
  const fromDate = getTimeFilter(window);

  const pipeline = [];

  if (fromDate) {
    pipeline.push({
      $match: { timestamp: { $gte: fromDate } }
    });
  }

  pipeline.push({
    $group: {
      _id: "$location",
      totalCount: { $sum: 1 },
      fraudCount: {
        $sum: {
          $cond: [{ $eq: ["$riskLevel", "HIGH"] }, 1, 0]
        }
      }
    }
  });

  pipeline.push({
    $project: {
      location: "$_id",
      totalCount: 1,
      fraudCount: 1,
      fraudPercentage: {
        $cond: [
          { $eq: ["$totalCount", 0] },
          0,
          {
            $round: [
              {
                $multiply: [
                  { $divide: ["$fraudCount", "$totalCount"] },
                  100
                ]
              },
              2
            ]
          }
        ]
      }
    }
  });

  pipeline.push({ $sort: { fraudCount: -1 } });

  res.json(await Transaction.aggregate(pipeline));
});


export default router;
