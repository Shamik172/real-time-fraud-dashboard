import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Risk Trend Over Time (Line Chart)
// router.get("/risk-trend", async (req, res) => {
//   const data = await Transaction.aggregate([
//     {
//       $group: {
//         _id: {
//           $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
//         },
//         avgRisk: { $avg: "$riskScore" }
//       }
//     },
//     { $sort: { _id: 1 } }
//   ]);

//   res.json(data);
// });

router.get("/risk-trend", async (req, res) => {
  const data = await Transaction.aggregate([
    {
      // Convert timestamp to 5-minute bucket
      $addFields: {
        timeBucket: {
          $toDate: {
            $subtract: [
              { $toLong: "$timestamp" },
              {
                $mod: [
                  { $toLong: "$timestamp" },
                  1000 * 60 * 5 // 5 minutes
                ]
              }
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
    {
      $sort: { _id: 1 }
    }
  ]);

  res.json(data);
});


// Fraud Count by Risk Level (Pie Chart)
router.get("/risk-distribution", async (req, res) => {
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
router.get("/location-stats", async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$location",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.json(data);
});



export default router;
