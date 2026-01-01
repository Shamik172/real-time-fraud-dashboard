import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchLocationStats } from "../services/transactionApi";
import { darkChartOptions } from "../charts/darkChartOptions";

const LocationStatsChart = ({ timeWindow }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLocationStats(timeWindow).then((res) => setData(res.data));
  }, [timeWindow]);

  return (
    <div className="h-[280px]">
      <Bar
        data={{
          labels: data.map(d => d.location),
          datasets: [
            {
              label: "Fraud Transactions",
              data: data.map(d => d.fraudCount),
              backgroundColor: "rgba(239,68,68,0.75)",
              borderRadius: 6
            }
          ]
        }}
        options={{
          ...darkChartOptions,
          plugins: {
            ...darkChartOptions.plugins,
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const d = data[ctx.dataIndex];
                  return [
                    `Fraud: ${d.fraudCount}`,
                    `Total: ${d.totalCount}`,
                    `Fraud Rate: ${d.fraudPercentage}%`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: "#e5e7eb" }
            },
            y: {
              ticks: { color: "#e5e7eb" },
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default LocationStatsChart;
