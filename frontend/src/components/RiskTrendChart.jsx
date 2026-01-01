import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRiskTrend } from "../services/api";
import { darkChartOptions } from "../charts/darkChartOptions";

const RiskTrendChart = ({timeWindow}) => {
  const [data, setData] = useState([]);
  const txCount = useSelector(
    (state) => state.transactions.list.length
  );

  useEffect(() => {
    fetchRiskTrend(timeWindow).then((res) => setData(res.data));
  }, [txCount]);

  return (
    <div className="h-[260px]">
      <Line
        data={{
          labels: data.map((d) =>
            new Date(d._id).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          ),
          datasets: [
            {
              label: "Average Risk Score",
              data: data.map((d) => d.avgRisk),
              borderColor: "#ef4444", // red-500
              backgroundColor: "rgba(239,68,68,0.15)",
              tension: 0.4,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: "#ef4444"
            }
          ]
        }}
        options={{
          ...darkChartOptions,
          scales: {
            ...darkChartOptions.scales,
            y: {
              ...darkChartOptions.scales.y,
              min: 0,
              max: 100
            }
          }
        }}
      />
    </div>
  );
};

export default RiskTrendChart;
