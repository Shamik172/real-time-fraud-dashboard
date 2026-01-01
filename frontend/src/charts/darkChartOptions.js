export const darkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#e5e7eb", // gray-200
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.8)",
      titleColor: "#fff",
      bodyColor: "#e5e7eb",
      borderColor: "rgba(255,255,255,0.2)",
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#9ca3af" // gray-400
      },
      grid: {
        color: "rgba(255,255,255,0.05)"
      }
    },
    y: {
      ticks: {
        color: "#9ca3af",
        beginAtZero: true
      },
      grid: {
        color: "rgba(255,255,255,0.05)"
      }
    }
  }
};
