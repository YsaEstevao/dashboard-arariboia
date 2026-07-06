import React from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";
import { Users, Wallet, Coins, ArrowRightLeft, Store, MapPin } from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const circulacaoData = [
  { mes: "Jan", valor: 1.1 },
  { mes: "Fev", valor: 1.4 },
  { mes: "Mar", valor: 1.6 },
  { mes: "Abr", valor: 1.5 },
  { mes: "Mai", valor: 1.9 },
  { mes: "Jun", valor: 2.2 },
];

const operacoesData = [
  { mes: "Jan", ops: 32000 },
  { mes: "Fev", ops: 41000 },
  { mes: "Mar", ops: 38000 },
  { mes: "Abr", ops: 47000 },
  { mes: "Mai", ops: 55000 },
  { mes: "Jun", ops: 62000 },
];

const bairroData = [
  { bairro: "Icaraí", transacoes: 9800, comercios: 148 },
  { bairro: "Centro", transacoes: 8200, comercios: 132 },
  { bairro: "Fonseca", transacoes: 5100, comercios: 84 },
  { bairro: "Pend.", transacoes: 4300, comercios: 67 },
  { bairro: "Reg. Oceânica", transacoes: 3600, comercios: 55 },
  { bairro: "São Lourenço", transacoes: 2900, comercios: 41 },
  { bairro: "Ingá", transacoes: 2400, comercios: 33 },
];

const setorData = [
  { name: "Alimentação", value: 42 },
  { name: "Serviços", value: 24 },
  { name: "Vestuário", value: 14 },
  { name: "Saúde", value: 12 },
  { name: "Outros", value: 8 },
];

const generoData = [
  { name: "Feminino", value: 62 },
  { name: "Masculino", value: 35 },
  { name: "Não-binário", value: 3 },
];

const idadeData = [
  { faixa: "18–24", pct: 14 },
  { faixa: "25–34", pct: 34 },
  { faixa: "35–44", pct: 26 },
  { faixa: "45–54", pct: 16 },
  { faixa: "55+", pct: 10 },
];

const CORES = ["#ea580c", "#eab308", "#22c55e", "#f97316", "#84cc16"];

// ── Helpers ────────────────────────────────────────────────────────────────────

function SectionLabel({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${dot} flex-shrink-0`} />
      {children}
    </h3>
  );
}

function KpiCard({
  title, value, sub, icon: Icon, accent = "orange",
}: {
  title: string; value: string; sub?: string;
  icon: React.ElementType; accent?: "orange" | "yellow" | "green";
}) {
  const map = {
    orange: { ring: "bg-orange-50 text-orange-500", bar: "bg-orange-500" },
    yellow: { ring: "bg-yellow-50 text-yellow-600", bar: "bg-yellow-400" },
    green:  { ring: "bg-green-50 text-green-600",   bar: "bg-green-500" },
  };
  return (
    <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500 leading-snug max-w-[70%]">{title}</p>
        <span className={`p-2 rounded-lg ${map[accent].ring}`}>
          <Icon className="w-5 h-5" />
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-400 tracking-tight">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

// ── Mapa estilizado ────────────────────────────────────────────────────────────

const heatPoints = [
  { label: "Icaraí",        top: "52%", left: "22%", r: 56, intensity: 5 },
  { label: "Centro",        top: "33%", left: "28%", r: 48, intensity: 4 },
  { label: "Fonseca",       top: "18%", left: "46%", r: 36, intensity: 3 },
  { label: "Pendotiba",     top: "44%", left: "56%", r: 28, intensity: 2 },
  { label: "Reg. Oceânica", top: "74%", left: "64%", r: 40, intensity: 3 },
  { label: "São Lourenço",  top: "38%", left: "14%", r: 22, intensity: 2 },
  { label: "Ingá",          top: "64%", left: "30%", r: 20, intensity: 1 },
];

const intensityColor: Record<number, string> = {
  5: "bg-orange-600",
  4: "bg-orange-500",
  3: "bg-amber-400",
  2: "bg-yellow-300",
  1: "bg-green-400",
};

function MapaCalor() {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M60,10 C110,40 170,60 200,120 C230,180 210,260 280,290 L400,300 L0,300 Z" fill="#cbd5e1" />
        <path d="M200,120 L330,140" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M200,120 L160,200" stroke="#94a3b8" strokeWidth="2" fill="none" />
      </svg>

      <div className="absolute top-2 left-2 text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-1 rounded">
        Niterói · Mapa de calor
      </div>

      {heatPoints.map((pt) => (
        <div
          key={pt.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ top: pt.top, left: pt.left }}
        >
          <div
            className={`rounded-full blur-2xl opacity-50 absolute ${intensityColor[pt.intensity]}`}
            style={{ width: pt.r * 2, height: pt.r * 2 }}
          />
          <MapPin className="w-3.5 h-3.5 text-slate-700 relative z-10 drop-shadow" />
          <span className="text-[9px] font-bold text-slate-700 relative z-10 mt-0.5 whitespace-nowrap bg-white/70 px-1 rounded">
            {pt.label}
          </span>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 bg-white/80 p-2 rounded text-[9px] font-medium text-slate-600">
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" />Alta</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Média</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />Baixa</div>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Header */}
      <header className="bg-orange-600 text-white sticky top-0 z-20 border-b-4 border-yellow-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Painel Arariboia</h1>
          <p className="text-orange-200 text-sm hidden sm:block">Banco Comunitário · Niterói/RJ</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Sub-header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Visão Geral</h2>
            <p className="text-slate-500 text-sm mt-0.5">Indicadores operacionais · período atual</p>
          </div>
          <select className="self-start sm:self-auto bg-white border border-slate-200 border-l-4 border-l-yellow-400 text-sm rounded-lg px-3 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option>Últimos 30 dias</option>
            <option>Este ano</option>
            <option>Todo o período</option>
          </select>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <KpiCard title="Contas Ativas" value="15.420" sub="+12% este mês" icon={Users} accent="orange" />
          <KpiCard title="Total Emitido" value="A$ 5,2M" sub="Acumulado histórico" icon={Wallet} accent="orange" />
          <KpiCard title="Valor em Circulação" value="A$ 2,1M" sub="Moeda ativa na rede" icon={Coins} accent="yellow" />
          <KpiCard title="Nº de Operações" value="342.150" sub="Total no período" icon={ArrowRightLeft} accent="yellow" />
          <KpiCard title="Comércios Credenciados Ativos" value="845" sub="+32 novos registros" icon={Store} accent="green" />
        </div>

        {/* ── Gráficos de série temporal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5">
            <SectionLabel dot="bg-orange-500">Valor em Circulação (A$M)</SectionLabel>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={circulacaoData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradCirc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid #ffedd5", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number) => [`A$ ${v}M`, "Circulação"]}
                  />
                  <Area type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#gradCirc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5">
            <SectionLabel dot="bg-yellow-400">Nº de Operações por Mês</SectionLabel>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={operacoesData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number) => [v.toLocaleString("pt-BR"), "Operações"]}
                  />
                  <Bar dataKey="ops" fill="#eab308" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Bairros + Mapa ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-orange-100 shadow-sm p-5">
            <SectionLabel dot="bg-orange-500">Dados por Bairro</SectionLabel>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bairroData} margin={{ top: 6, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bairro" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number, name: string) => [
                      v.toLocaleString("pt-BR"),
                      name === "transacoes" ? "Transações" : "Comércios",
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} formatter={(v) => v === "transacoes" ? "Transações" : "Comércios"} />
                  <Bar dataKey="transacoes" fill="#ea580c" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="comercios" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col">
            <SectionLabel dot="bg-amber-400">Geolocalização</SectionLabel>
            <div className="flex-1 min-h-[220px]">
              <MapaCalor />
            </div>
          </div>
        </div>

        {/* ── Setor + Gênero + Idade ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Setor */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col items-center">
            <SectionLabel dot="bg-orange-500">Setor / Tipo do Comércio</SectionLabel>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={setorData} innerRadius={48} outerRadius={78} paddingAngle={2} dataKey="value">
                    {setorData.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number, name: string) => [`${v}%`, name]}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gênero */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col items-center">
            <SectionLabel dot="bg-yellow-400">Gênero dos Usuários</SectionLabel>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={generoData} innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                    {generoData.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number, name: string) => [`${v}%`, name]}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Idade */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5">
            <SectionLabel dot="bg-green-500">Faixa Etária dos Usuários</SectionLabel>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={idadeData} margin={{ top: 6, right: 8, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="faixa" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/.1)" }}
                    formatter={(v: number) => [`${v}%`, "Usuários"]}
                  />
                  <Bar dataKey="pct" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
