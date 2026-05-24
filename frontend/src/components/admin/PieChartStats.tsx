import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { 
    name: string; 
    total: number }[];
}

const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f43f5e", "#6366f1", "#14b8a6"];

export const PieChartStats: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Komposisi Pendaftar</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
