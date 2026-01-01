import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchRiskDistribution } from "../services/api";
import { darkChartOptions } from "../charts/darkChartOptions";

const RiskDistributionChart = ({ timeWindow }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRiskDistribution(timeWindow).then((res) =>
      setData(res.data)
    );
  }, [timeWindow]);

  const getCount = (level) =>
    data.find((d) => d._id === level)?.count || 0;

  return (
    <div className="h-[260px]">
      <Doughnut
        data={{
          labels: ["High", "Medium", "Low"],
          datasets: [
            {
              data: [
                getCount("HIGH"),
                getCount("MEDIUM"),
                getCount("LOW")
              ],
              backgroundColor: [
                "rgba(239,68,68,0.85)",
                "rgba(234,179,8,0.85)",
                "rgba(34,197,94,0.85)"
              ],
              borderColor: "rgba(255,255,255,0.25)",
              borderWidth: 1,
              hoverOffset: 6
            }
          ]
        }}
        options={{
          ...darkChartOptions,
          scales: {},
          plugins: {
            ...darkChartOptions.plugins,
            legend: {
              position: "bottom",
              labels: {
                color: "#e5e7eb",
                padding: 16
              }
            }
          },
          cutout: "65%"
        }}
      />
    </div>
  );
};

export default RiskDistributionChart;
