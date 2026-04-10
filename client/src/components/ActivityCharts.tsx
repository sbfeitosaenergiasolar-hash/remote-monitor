import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dados mock para gráficos
const ACTIVITY_BY_HOUR = [
  { hora: "00:00", atividades: 12 },
  { hora: "04:00", atividades: 8 },
  { hora: "08:00", atividades: 45 },
  { hora: "12:00", atividades: 78 },
  { hora: "16:00", atividades: 92 },
  { hora: "20:00", atividades: 65 },
  { hora: "23:00", atividades: 28 },
];

const APPS_USAGE = [
  { name: "WhatsApp", value: 245, color: "#06b6d4" },
  { name: "Gmail", value: 189, color: "#0ea5e9" },
  { name: "Instagram", value: 156, color: "#ec4899" },
  { name: "Banco", value: 134, color: "#f59e0b" },
  { name: "Chrome", value: 98, color: "#8b5cf6" },
];

const DEVICES_STATUS = [
  { name: "Online", value: 8, color: "#10b981" },
  { name: "Offline", value: 4, color: "#ef4444" },
];

const KEYLOG_TREND = [
  { data: "Seg", keylogs: 234 },
  { data: "Ter", keylogs: 289 },
  { data: "Qua", keylogs: 267 },
  { data: "Qui", keylogs: 345 },
  { data: "Sex", keylogs: 412 },
  { data: "Sab", keylogs: 198 },
  { data: "Dom", keylogs: 145 },
];

export default function ActivityCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Atividades por Hora */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-cyan-400 font-bold mb-4">📊 Atividades por Hora</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ACTIVITY_BY_HOUR}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="hora" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#06b6d4" }}
            />
            <Bar dataKey="atividades" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Apps Mais Usados */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-cyan-400 font-bold mb-4">📱 Apps Mais Usados</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={APPS_USAGE}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {APPS_USAGE.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#06b6d4" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Status dos Dispositivos */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-cyan-400 font-bold mb-4">🖥️ Status dos Dispositivos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={DEVICES_STATUS}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {DEVICES_STATUS.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#06b6d4" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Tendência de Keylogs */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-cyan-400 font-bold mb-4">⌨️ Tendência de Keylogs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={KEYLOG_TREND}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="data" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#06b6d4" }}
            />
            <Line
              type="monotone"
              dataKey="keylogs"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ fill: "#06b6d4", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
