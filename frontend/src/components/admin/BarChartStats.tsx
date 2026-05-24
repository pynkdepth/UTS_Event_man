import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  data: { 
    name: string; 
    total: number }[];
}

export const BarChartStats: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Jumlah Pendaftar per Kategori</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
