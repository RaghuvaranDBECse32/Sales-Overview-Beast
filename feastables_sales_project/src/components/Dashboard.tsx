'use client';
import { useState } from 'react';
import { salesData, globalTotals, RegionData, CountryData } from '../lib/salesData';

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(0)}K`
    : `$${n}`;

const fmtUsers = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : `${(n / 1_000).toFixed(0)}K`;

const maxRevenue = Math.max(...salesData.map((r) => r.totalRevenue));

export default function Dashboard() {
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  const [activeCountry, setActiveCountry] = useState<CountryData | null>(null);
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'profit' | 'users'>('revenue');

  const handleRegionClick = (r: RegionData) => {
    setActiveRegion(r);
    setActiveCountry(null);
  };

  return (
    <div className="db-root">
      {/* ── NAV ── */}
      <header className="db-header">
        <a href="/" className="db-logo">
          <span className="db-logo-mark">◆</span> FEASTABLES
        </a>
        <nav className="db-nav">
          <a href="/" className="db-nav-link">Scrollytelling</a>
          <span className="db-nav-link active">Dashboard</span>
        </nav>
        <div className="db-badge">Live Analytics</div>
      </header>

      <main className="db-main">

        {/* ── PAGE TITLE ── */}
        <div className="db-page-title">
          <h1 className="db-h1">Global Sales Overview</h1>
          <p className="db-subtitle">
            Feastables worldwide performance · All regions · FY 2024–2025
          </p>
        </div>

        {/* ── KPI CARDS ── */}
        <section className="db-kpis">
          <KpiCard label="Total Revenue"   value={fmt(globalTotals.revenue)}   delta="+107%" color="var(--db-blue)"   icon="💰" />
          <KpiCard label="Net Profit"      value={fmt(globalTotals.profit)}     delta="+84%"  color="var(--db-green)"  icon="📈" />
          <KpiCard label="Total Loss"      value={fmt(globalTotals.loss)}       delta="-12%"  color="var(--db-red)"    icon="📉" isLoss />
          <KpiCard label="Net Gained"      value={fmt(globalTotals.gained)}     delta="+91%"  color="var(--db-yellow)" icon="🚀" />
          <KpiCard label="Global Users"    value={fmtUsers(globalTotals.users)} delta="+63%"  color="var(--db-purple)" icon="👥" />
          <KpiCard label="Donations Made"  value={fmt(globalTotals.donations)}  delta="+42%"  color="var(--db-teal)"   icon="🤝" />
        </section>

        {/* ── REGION BREAKDOWN ── */}
        <div className="db-panels">

          {/* LEFT: Region list + bar chart */}
          <section className="db-panel db-regions-panel">
            <div className="db-panel-header">
              <h2 className="db-panel-title">Regions</h2>
              <div className="db-metric-tabs">
                {(['revenue', 'profit', 'users'] as const).map((m) => (
                  <button
                    key={m}
                    className={`db-metric-tab ${activeMetric === m ? 'active' : ''}`}
                    onClick={() => setActiveMetric(m)}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="db-region-list">
              {salesData.map((r) => {
                const val =
                  activeMetric === 'revenue' ? r.totalRevenue :
                  activeMetric === 'profit'  ? r.totalProfit  : r.totalUsers;
                const maxVal =
                  activeMetric === 'revenue' ? maxRevenue :
                  activeMetric === 'profit'  ? 38_200_000     : 4_820_000;
                const pct = Math.round((val / maxVal) * 100);
                const isActive = activeRegion?.region === r.region;

                return (
                  <button
                    key={r.region}
                    className={`db-region-row ${isActive ? 'active' : ''}`}
                    style={{ '--rc': r.color } as React.CSSProperties}
                    onClick={() => handleRegionClick(r)}
                  >
                    <div className="db-region-meta">
                      <span className="db-region-name">{r.region}</span>
                      <span className="db-region-val">
                        {activeMetric === 'users' ? fmtUsers(val) : fmt(val)}
                      </span>
                    </div>
                    <div className="db-bar-track">
                      <div className="db-bar-fill" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                    <div className="db-region-submeta">
                      <span>P: {fmt(r.totalProfit)}</span>
                      <span className="loss-text">L: {fmt(r.totalLoss)}</span>
                      <span>{fmtUsers(r.totalUsers)} users</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT: Region detail / Country drill-down */}
          <section className="db-panel db-detail-panel">
            {!activeRegion ? (
              <div className="db-empty-state">
                <div className="db-empty-icon">🌍</div>
                <p className="db-empty-text">Select a region to explore country-level data</p>
              </div>
            ) : (
              <>
                <div className="db-panel-header">
                  <div>
                    <h2 className="db-panel-title" style={{ color: activeRegion.color }}>
                      {activeRegion.region}
                    </h2>
                    <p className="db-panel-sub">{activeRegion.countries.length} markets</p>
                  </div>
                  <button className="db-back-btn" onClick={() => { setActiveRegion(null); setActiveCountry(null); }}>
                    ✕ Close
                  </button>
                </div>

                {/* Region KPI strip */}
                <div className="db-region-kpis">
                  <MiniKpi label="Revenue"   value={fmt(activeRegion.totalRevenue)}   color="var(--db-blue)" />
                  <MiniKpi label="Profit"    value={fmt(activeRegion.totalProfit)}    color="var(--db-green)" />
                  <MiniKpi label="Loss"      value={fmt(activeRegion.totalLoss)}      color="var(--db-red)" />
                  <MiniKpi label="Gained"    value={fmt(activeRegion.totalGained)}    color="var(--db-yellow)" />
                  <MiniKpi label="Users"     value={fmtUsers(activeRegion.totalUsers)} color="var(--db-purple)" />
                  <MiniKpi label="Donations" value={fmt(activeRegion.totalDonations)} color="var(--db-teal)" />
                </div>

                {/* Country table */}
                <div className="db-country-list">
                  <div className="db-country-header-row">
                    <span>Country</span>
                    <span>Revenue</span>
                    <span>Profit</span>
                    <span className="loss-text">Loss</span>
                    <span>Gained</span>
                    <span>Users</span>
                    <span>Donations</span>
                  </div>
                  {activeRegion.countries.map((c) => (
                    <button
                      key={c.country}
                      className={`db-country-row ${activeCountry?.country === c.country ? 'active' : ''}`}
                      onClick={() => setActiveCountry(activeCountry?.country === c.country ? null : c)}
                    >
                      <span className="db-country-name">
                        <span className="db-flag">{c.flag}</span> {c.country}
                      </span>
                      <span>{fmt(c.revenue)}</span>
                      <span className="profit-text">{fmt(c.profit)}</span>
                      <span className="loss-text">{fmt(c.loss)}</span>
                      <span className={c.gained >= 0 ? 'gained-text' : 'loss-text'}>{fmt(c.gained)}</span>
                      <span>{fmtUsers(c.users)}</span>
                      <span>{fmt(c.donations)}</span>
                    </button>
                  ))}
                </div>

                {/* Country detail card */}
                {activeCountry && (
                  <div className="db-country-detail">
                    <h3 className="db-country-detail-title">
                      {activeCountry.flag} {activeCountry.country} — Deep Dive
                    </h3>
                    <div className="db-country-detail-bars">
                      <MetricBar label="Revenue"   value={activeCountry.revenue}   max={89_000_000} color="var(--db-blue)"   fmt={fmt} />
                      <MetricBar label="Profit"    value={activeCountry.profit}    max={31_000_000} color="var(--db-green)"  fmt={fmt} />
                      <MetricBar label="Loss"      value={activeCountry.loss}      max={2_900_000}  color="var(--db-red)"    fmt={fmt} />
                      <MetricBar label="Gained"    value={Math.max(0,activeCountry.gained)} max={28_100_000} color="var(--db-yellow)" fmt={fmt} />
                      <MetricBar label="Users"     value={activeCountry.users}     max={3_800_000}  color="var(--db-purple)" fmt={fmtUsers} />
                      <MetricBar label="Donations" value={activeCountry.donations} max={1_900_000}  color="var(--db-teal)"   fmt={fmt} />
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* ── GLOBAL COMPARISON CHART ── */}
        <section className="db-panel db-chart-panel">
          <div className="db-panel-header">
            <h2 className="db-panel-title">Revenue vs Profit by Region</h2>
            <span className="db-panel-sub">Comparative bar chart</span>
          </div>
          <div className="db-chart">
            {salesData.map((r) => (
              <div key={r.region} className="db-chart-group">
                <div className="db-chart-bars">
                  <div className="db-chart-bar-wrap">
                    <div
                      className="db-chart-bar"
                      style={{
                        height: `${(r.totalRevenue / maxRevenue) * 200}px`,
                        background: r.color,
                      }}
                    />
                    <span className="db-chart-label-top">{fmt(r.totalRevenue)}</span>
                  </div>
                  <div className="db-chart-bar-wrap">
                    <div
                      className="db-chart-bar"
                      style={{
                        height: `${(r.totalProfit / maxRevenue) * 200}px`,
                        background: r.color,
                        opacity: 0.45,
                      }}
                    />
                    <span className="db-chart-label-top">{fmt(r.totalProfit)}</span>
                  </div>
                </div>
                <span className="db-chart-region-label">{r.region.split(' ')[0]}</span>
              </div>
            ))}
            <div className="db-chart-legend">
              <span className="db-legend-item"><span className="db-legend-box" style={{ opacity: 1, background: '#0057FF' }} /> Revenue</span>
              <span className="db-legend-item"><span className="db-legend-box" style={{ opacity: 0.45, background: '#0057FF' }} /> Profit</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function KpiCard({ label, value, delta, color, icon, isLoss = false }: {
  label: string; value: string; delta: string; color: string; icon: string; isLoss?: boolean;
}) {
  return (
    <div className="db-kpi-card">
      <div className="db-kpi-icon">{icon}</div>
      <div className="db-kpi-body">
        <span className="db-kpi-label">{label}</span>
        <span className="db-kpi-value" style={{ color }}>{value}</span>
        <span className={`db-kpi-delta ${isLoss ? 'negative' : 'positive'}`}>{delta} vs last year</span>
      </div>
    </div>
  );
}

function MiniKpi({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="db-mini-kpi">
      <span className="db-mini-label">{label}</span>
      <span className="db-mini-value" style={{ color }}>{value}</span>
    </div>
  );
}

function MetricBar({ label, value, max, color, fmt }: {
  label: string; value: number; max: number; color: string; fmt: (n: number) => string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="db-metric-bar">
      <div className="db-metric-bar-meta">
        <span className="db-metric-bar-label">{label}</span>
        <span className="db-metric-bar-val" style={{ color }}>{fmt(value)}</span>
      </div>
      <div className="db-metric-bar-track">
        <div className="db-metric-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
