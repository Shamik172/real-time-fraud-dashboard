import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { darkChartOptions } from "../charts/darkChartOptions";

const RiskDistributionChart = () => {
  const high = useSelector(
    (state) => state.transactions.highRisk.length
  );

  const medium = useSelector(
    (state) =>
      state.transactions.list.filter(
        (tx) => tx.riskLevel === "MEDIUM"
      ).length
  );

  const low = useSelector(
    (state) =>
      state.transactions.list.filter(
        (tx) => tx.riskLevel === "LOW"
      ).length
  );

  return (
    <div className="h-[260px]">
      <Doughnut
        data={{
          labels: ["High", "Medium", "Low"],
          datasets: [
            {
              data: [high, medium, low],
              backgroundColor: [
                "rgba(239,68,68,0.85)", // red
                "rgba(234,179,8,0.85)", // yellow
                "rgba(34,197,94,0.85)"  // green
              ],
              borderColor: "rgba(255,255,255,0.25)",
              borderWidth: 1,
              hoverOffset: 6
            }
          ]
        }}
        options={{
          ...darkChartOptions,
          scales: {}, // 🔥 THIS REMOVES X/Y AXES
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
          cutout: "65%" // 🔥 nice glassy doughnut
        }}
      />
    </div>
  );
};

export default RiskDistributionChart;
