import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchLocationStats } from "../services/api";
import { darkChartOptions } from "../charts/darkChartOptions";

const LocationStatsChart = () => {
  const [data, setData] = useState([]);
  const txCount = useSelector(
    (state) => state.transactions.list.length
  );

  useEffect(() => {
    fetchLocationStats().then((res) => setData(res.data));
  }, [txCount]);

  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="h-[260px]">
      <Bar
        data={{
          labels: sorted.map((d) => d._id),
          datasets: [
            {
              label: "Fraud Count",
              data: sorted.map((d) => d.count),
              backgroundColor: "rgba(59,130,246,0.6)", // blue-500
              borderColor: "rgba(59,130,246,1)",
              borderWidth: 1
            }
          ]
        }}
        options={darkChartOptions}
      />
    </div>
  );
};

export default LocationStatsChart;
