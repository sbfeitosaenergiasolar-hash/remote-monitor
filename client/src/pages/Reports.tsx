import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ReportsPage() {
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock data for charts
  const appsUsageData = [
    { name: "WhatsApp", value: 245, percentage: 35 },
    { name: "Instagram", value: 180, percentage: 26 },
    { name: "Gmail", value: 150, percentage: 21 },
    { name: "Chrome", value: 95, percentage: 14 },
    { name: "Outros", value: 30, percentage: 4 },
  ];

  const dailyActivityData = [
    { day: "Seg", atividade: 120 },
    { day: "Ter", atividade: 150 },
    { day: "Qua", atividade: 180 },
    { day: "Qui", atividade: 140 },
    { day: "Sex", atividade: 200 },
    { day: "Sab", atividade: 90 },
    { day: "Dom", atividade: 110 },
  ];

  const hourlyActivityData = [
    { hora: "00:00", atividade: 10 },
    { hora: "06:00", atividade: 20 },
    { hora: "12:00", atividade: 180 },
    { hora: "18:00", atividade: 220 },
    { hora: "23:00", atividade: 50 },
  ];

  const COLORS = ["#06b6d4", "#0ea5e9", "#3b82f6", "#8b5cf6", "#ec4899"];

  const stats = [
    { label: "Total de Atividades", value: "700", icon: "📊" },
    { label: "Tempo Total de Uso", value: "45h 30m", icon: "⏱️" },
    { label: "Apps Instalados", value: "28", icon: "📱" },
    { label: "Contatos Únicos", value: "156", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 mb-2">📈 Relatórios</h1>
          <p className="text-slate-400">Visualize relatórios e análises dos dispositivos</p>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Selecionar Dispositivo
            </label>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="1">Dispositivo 1</option>
              <option value="2">Dispositivo 2</option>
              <option value="3">Dispositivo 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Período
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="day">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="year">Este Ano</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6 text-center hover:border-cyan-400 transition-all"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-cyan-300">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Apps Usage Pie Chart */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">📱 Apps Mais Usados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appsUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appsUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} min`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {appsUsageData.map((app, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-slate-300">{app.name}</span>
                  </div>
                  <span className="text-cyan-300 font-semibold">{app.value} min</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Daily Activity Bar Chart */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">📊 Atividade por Dia</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }}
                  formatter={(value) => `${value} atividades`}
                />
                <Bar dataKey="atividade" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Hourly Activity Line Chart */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6 mb-6">
          <h2 className="text-xl font-bold text-cyan-300 mb-4">⏰ Atividade por Hora</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }}
                formatter={(value) => `${value} atividades`}
              />
              <Line
                type="monotone"
                dataKey="atividade"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Contacts */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6">
          <h2 className="text-xl font-bold text-cyan-300 mb-4">👥 Contatos Mais Contatados</h2>
          <div className="space-y-3">
            {[
              { name: "João Silva", calls: 45, sms: 23 },
              { name: "Maria Santos", calls: 38, sms: 19 },
              { name: "Pedro Costa", calls: 32, sms: 15 },
              { name: "Ana Oliveira", calls: 28, sms: 12 },
              { name: "Carlos Ferreira", calls: 22, sms: 8 },
            ].map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="text-xs text-slate-400">
                    {contact.calls} chamadas • {contact.sms} SMS
                  </p>
                </div>
                <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50">
                  {contact.calls + contact.sms} contatos
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
