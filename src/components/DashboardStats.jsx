import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale);

export default function DashboardStats({ stats }) {
  // stats attendu depuis l’API Django : { sales: 120, revenue: 500000, positive_feedback: 75, monthlySales: [...] }

  const barData = {
    labels: stats.monthlySales?.map(m => m.month) || [],
    datasets: [
      {
        label: "Ventes mensuelles",
        data: stats.monthlySales?.map(m => m.sales) || [],
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
    ],
  };

  const lineData = {
    labels: stats.monthlySales?.map(m => m.month) || [],
    datasets: [
      {
        label: "Revenus mensuels (FCFA)",
        data: stats.monthlySales?.map(m => m.revenue) || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Positifs", "Négatifs"],
    datasets: [
      {
        data: [stats.positive_feedback || 0, 100 - (stats.positive_feedback || 0)],
        backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Carte ventes */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Ventes mensuelles</h2>
        <Bar data={barData} />
      </div>

      {/* Carte revenus */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Revenus mensuels</h2>
        <Line data={lineData} />
      </div>

      {/* Carte feedback */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Feedback clients</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
