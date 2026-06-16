// STARS Admin Console — shared UI bits + pages
const { useState } = React;
const Ic = (name, props) => window.I[name] ? window.I[name](props) : null;

function Badge({ status }) {
  const tone = window.DATA.statusMap[status] || 'slate';
  return <span className={'badge ' + tone + (status === 'Live' ? ' live' : '')}><span className="dot"></span>{status}</span>;
}

function Kpi({ k }) {
  return (
    <div className="card kpi">
      <div className="kpi-top">
        <span className="kpi-label">{k.label}</span>
        <span className="kpi-ic">{Ic(k.icon, { size: 16 })}</span>
      </div>
      <div className="kpi-val tnum">{k.value}</div>
      <div>
        {k.delta && <span className={'kpi-delta ' + k.dir}>{Ic('arrowUp', { size: 13, sw: 2.4 })}{k.delta}</span>}{' '}
        <span className="kpi-delta vs">{k.vs}</span>
      </div>
    </div>);

}

const feedTone = { success: ['var(--green-bg)', 'var(--green)'], accent: ['var(--accent-soft)', 'var(--accent)'], warn: ['var(--amber-bg)', 'var(--amber)'], slate: ['var(--slate-bg)', 'var(--slate)'] };
function FeedItem({ f }) {
  const [bg, fg] = feedTone[f.tone];
  return (
    <div className="feed-item">
      <div className="feed-ic" style={{ background: bg, color: fg }}>{Ic(f.icon, { size: 16 })}</div>
      <div className="feed-body">
        <div className="feed-text" dangerouslySetInnerHTML={{ __html: f.html }}></div>
        <div className="feed-time">{f.time}</div>
      </div>
    </div>);

}

// ---------------- DASHBOARD ----------------
function Dashboard({ campaigns, onOpenBudget, onCreate }) {
  return (
    <div className="content">
      <div className="page-head">
        <div className="grow">
          <h1 className="h1">Dashboard</h1>
          <p className="page-sub">Welcome back, Kaiser — here’s how MTB Neo STARS is performing today.</p>
        </div>
        <button className="btn btn-secondary">{Ic('calendar', { size: 16 })}Last 30 days{Ic('chevDown', { size: 15 })}</button>
        <button className="btn btn-primary" onClick={onCreate}>{Ic('plus', { size: 16 })}Create Campaign</button>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 18 }}>
        {window.DATA.kpis.map((k, i) => <Kpi key={i} k={k} />)}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', marginBottom: 18 }}>
        <div className="card">
          <div className="card-head">
            <div className="grow">
              <div className="card-title">STARS economy</div>
              <div className="xsmall muted-2" style={{ marginTop: 2 }}>Issued vs redeemed · last 30 days</div>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-swatch" style={{ background: '#4F5BD5' }}></span>Issued</span>
              <span className="legend-item"><span className="legend-swatch" style={{ background: '#C7CBF2' }}></span>Redeemed</span>
            </div>
          </div>
          <div className="card-pad">
            <div className="row gap-20" style={{ marginBottom: 18 }}>
              <div><div className="eyebrow">Issued</div><div className="h2 tnum" style={{ marginTop: 4 }}>18.4M</div></div>
              <div style={{ width: 1, height: 34, background: 'var(--border)' }}></div>
              <div><div className="eyebrow">Redeemed</div><div className="h2 tnum" style={{ marginTop: 4 }}>7.2M</div></div>
              <div style={{ width: 1, height: 34, background: 'var(--border)' }}></div>
              <div><div className="eyebrow">Net float</div><div className="h2 tnum" style={{ marginTop: 4, color: 'var(--accent)' }}>11.2M</div></div>
            </div>
            <svg viewBox="0 0 600 180" width="100%" height="180" preserveAspectRatio="none">
              <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F5BD5" stopOpacity="0.18" /><stop offset="1" stopColor="#4F5BD5" stopOpacity="0" /></linearGradient></defs>
              <g className="area-grid"><line x1="0" y1="45" x2="600" y2="45" /><line x1="0" y1="90" x2="600" y2="90" /><line x1="0" y1="135" x2="600" y2="135" /></g>
              <path d="M0,150 C80,140 120,120 180,118 C260,114 300,96 360,86 C430,74 480,56 600,40 L600,180 L0,180 Z" fill="url(#ag)" />
              <path d="M0,150 C80,140 120,120 180,118 C260,114 300,96 360,86 C430,74 480,56 600,40" fill="none" stroke="#4F5BD5" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M0,168 C90,165 140,158 200,156 C290,153 330,146 400,140 C470,134 520,126 600,118" fill="none" stroke="#C7CBF2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="chart-axis"><span>May 06</span><span>May 13</span><span>May 20</span><span>May 27</span><span>Jun 03</span></div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card kpi">
            <div className="kpi-top"><span className="kpi-label">Outstanding STARS Liability</span><span className="kpi-ic" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>{Ic('vault', { size: 16 })}</span></div>
            <div className="kpi-val tnum">৳18.5<span className="unit">lakh</span></div>
            <div className="bar-track" style={{ marginTop: 2 }}><div className="bar-fill" style={{ width: '39%' }}></div></div>
            <div className="xsmall muted-2">39% of ৳47.2L provisioned budget</div>
          </div>
          <div className="card card-pad" style={{ flex: 1 }}>
            <div className="ds-label" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14 }}>Top campaign</div>
            <div className="cell-flex">
              <div className="row-ic" style={{ background: 'var(--accent)', color: '#fff' }}>B</div>
              <div className="grow"><div className="cell-strong">Bill Pay Booster</div><div className="cell-sub">2× STARS on utility bills</div></div>
              <Badge status="Live" />
            </div>
            <div className="divider" style={{ margin: '14px 0' }}></div>
            <div className="spread"><span className="small muted">STARS issued</span><span className="small cell-strong tnum">3.1M</span></div>
            <div className="spread mt-8"><span className="small muted">Members reached</span><span className="small cell-strong tnum">38,900</span></div>
            <div className="spread mt-8"><span className="small muted">Liability used</span><span className="small cell-strong tnum">৳4.2L</span></div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <CampaignTable campaigns={campaigns.slice(0, 5)} onOpenBudget={onOpenBudget} compact title="Recent campaigns" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card card-pad">
            <div className="spread" style={{ marginBottom: 6 }}>
              <div className="card-title">Activity</div>
              <a className="link small">View all</a>
            </div>
            <div className="feed">{window.DATA.feed.map((f, i) => <FeedItem key={i} f={f} />)}</div>
          </div>
          <div className="card">
            <div className="card-head">
              <div className="card-title grow">Risk & alerts</div>
              <span className="badge amber" style={{ fontSize: 11 }}>3 active</span>
            </div>
            <div style={{ padding: '0 16px' }}>
              {[
              { label: 'Bill Pay Booster', detail: '69% budget utilization — approaching threshold', tone: 'amber' },
              { label: 'Salary Account Activation', detail: 'Redemption rate low at 18.4%', tone: 'amber' },
              { label: 'Fraud exceptions', detail: 'Within threshold at 0.7% of qualifying events', tone: 'green' },
              { label: 'Partner Voucher API', detail: 'Credentials pending — inventory sync blocked', tone: 'slate' }].
              map((a, i, arr) =>
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 'var(--r-xs)', flex: 'none', marginTop: 1, display: 'grid', placeItems: 'center',
                  background: a.tone === 'amber' ? 'var(--amber-bg)' : a.tone === 'green' ? 'var(--green-bg)' : 'var(--slate-bg)',
                  color: a.tone === 'amber' ? 'var(--amber)' : a.tone === 'green' ? 'var(--green)' : 'var(--slate)'
                }}>
                    {Ic(a.tone === 'green' ? 'check' : 'warn', { size: 12, sw: 2.2 })}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.4 }}>{a.detail}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// ---------------- CAMPAIGN TABLE ----------------
function CampaignTable({ campaigns, onOpenBudget, compact, title }) {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Live', 'Scheduled', 'Pending Approval', 'Paused', 'Draft'];
  const rows = filter === 'All' ? campaigns : campaigns.filter((c) => c.status === filter);
  return (
    <div className="card table-wrap">
      <div className="card-head">
        <div className="grow"><div className="card-title">{title || 'Campaigns'}</div></div>
        {!compact && <div className="segmented">{tabs.map((t) => <button key={t} className={filter === t ? 'on' : ''} onClick={() => setFilter(t)}>{t}</button>)}</div>}
        {!compact && <button className="btn btn-secondary btn-sm">{Ic('filter', { size: 15 })}Filter</button>}
        {compact && <a className="link small">View all</a>}
      </div>
      <table className="tbl">
        <thead><tr><th>Campaign</th><th>Status</th>{!compact && <th>Type</th>}{!compact && <th>Trigger</th>}{!compact && <th>Audience</th>}<th className="num">STARS Issued</th><th className="num">Liability</th>{!compact && <th></th>}</tr></thead>
        <tbody>
          {rows.map((c) =>
          <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => onOpenBudget(c)}>
              <td><div className="cell-flex"><div className="row-ic">{c.mark}</div><div><div className="cell-strong">{c.name}</div><div className="cell-sub mono">{c.id}</div></div></div></td>
              <td><Badge status={c.status} /></td>
              {!compact && <td><span style={{ display: 'inline-flex', fontSize: 11, fontWeight: 600, color: c.type === 'Always-on' ? 'var(--green)' : 'var(--blue)', background: c.type === 'Always-on' ? 'var(--green-bg)' : 'var(--blue-bg)', borderRadius: 'var(--r-pill)', padding: '3px 9px', whiteSpace: 'nowrap' }}>{c.type || 'Promotional'}</span></td>}
              {!compact && <td className="small muted" style={{ maxWidth: 200 }}>{c.trigger}</td>}
              {!compact && <td className="small">{c.audience}</td>}
              <td className="num">{c.issued}</td>
              <td className="num">{c.liability}</td>
              {!compact && <td className="num"><button className="icon-btn" style={{ width: 30, height: 30 }} onClick={(e) => {e.stopPropagation();onOpenBudget(c);}}>{Ic('dots', { size: 16 })}</button></td>}
            </tr>
          )}
        </tbody>
      </table>
      {!compact && <div className="card-foot"><span className="small muted-2">Showing {rows.length} of {campaigns.length} campaigns</span><div style={{ marginLeft: 'auto' }} className="row gap-8"><button className="btn btn-ghost btn-sm">Previous</button><button className="btn btn-secondary btn-sm">Next</button></div></div>}
    </div>);

}

window.Dashboard = Dashboard;
window.CampaignTable = CampaignTable;
window.Badge = Badge;
window.Ic = Ic;