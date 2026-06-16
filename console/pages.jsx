// STARS Admin Console — secondary pages + modals
const { useState: uS } = React;

// ---------------- CAMPAIGNS PAGE ----------------
function CampaignsPage({ campaigns, onOpenBudget, onCreate }) {
  const pendingCount = campaigns.filter(c => c.status === 'Pending Approval').length;
  const pendingNames = campaigns.filter(c => c.status === 'Pending Approval').map(c => c.name);
  return (
    <div className="content">
      <div className="page-head">
        <div className="grow"><h1 className="h1">Campaigns</h1><p className="page-sub">Manage MTB Neo STARS campaigns, missions and reward triggers.</p></div>
        {pendingCount > 0 && (
          <span className="badge pending" style={{ fontSize: 13, padding: '7px 12px' }}>
            <span className="dot"></span>{pendingCount} pending approval
          </span>
        )}
        <button className="btn btn-primary" onClick={onCreate}>{window.Ic('plus', { size: 16 })}Create Campaign</button>
      </div>

      {pendingCount > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', background:'#EAECFA', border:'1px solid #C5CBF0', borderRadius:'var(--r-md)', marginBottom:18, fontSize:13 }}>
          <span style={{ color:'#4451BF' }}>{window.Ic('info', { size: 16, sw: 1.7 })}</span>
          <span style={{ color:'#363d8a', flex:1 }}><b>{pendingNames.join(' and ')}</b> {pendingCount === 1 ? 'is' : 'are'} awaiting admin approval before going live.</span>
          <a className="link small" style={{ color:'#4451BF', fontWeight:600 }}>Review approvals →</a>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:14, marginBottom:18 }}>
        <div className="card kpi">
          <div className="kpi-top"><span className="kpi-label">Live Campaigns</span><span className="kpi-ic" style={{ background:'var(--green-bg)', color:'var(--green)' }}>{window.Ic('bolt', { size: 15 })}</span></div>
          <div className="kpi-val tnum" style={{ fontSize:26 }}>4</div>
          <div className="small muted-2">of 12 total</div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="kpi-label">Scheduled</span><span className="kpi-ic" style={{ background:'var(--blue-bg)', color:'var(--blue)' }}>{window.Ic('calendar', { size: 15 })}</span></div>
          <div className="kpi-val tnum" style={{ fontSize:26 }}>3</div>
          <div className="small muted-2">next starts Jun 14</div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="kpi-label">STARS Issued</span><span className="kpi-ic">{window.Ic('star', { size: 15 })}</span></div>
          <div className="kpi-val tnum" style={{ fontSize:26 }}>10.8M</div>
          <div><span className="kpi-delta up">{window.Ic('arrowUp', { size: 13, sw: 2.4 })}+8.2%</span> <span className="kpi-delta vs">vs last month</span></div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="kpi-label">Redemption Liability</span><span className="kpi-ic" style={{ background:'var(--amber-bg)', color:'var(--amber)' }}>{window.Ic('vault', { size: 15 })}</span></div>
          <div className="kpi-val tnum" style={{ fontSize:26 }}>৳18.5L</div>
          <div className="bar-track" style={{ marginTop:4 }}><div className="bar-fill" style={{ width:'39%' }}></div></div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="kpi-label">Redemption Rate</span><span className="kpi-ic" style={{ background:'var(--green-bg)', color:'var(--green)' }}>{window.Ic('target', { size: 15 })}</span></div>
          <div className="kpi-val tnum" style={{ fontSize:26 }}>31.4<span className="unit">%</span></div>
          <div><span className="kpi-delta up">{window.Ic('arrowUp', { size: 13, sw: 2.4 })}+2.1pp</span> <span className="kpi-delta vs">this period</span></div>
        </div>
      </div>

      <window.CampaignTable campaigns={campaigns} onOpenBudget={onOpenBudget} />
    </div>
  );
}

// ---------------- RULES ENGINE PAGE ----------------
function RuleRow({ tone, icon, title, sub, badge, badgeTone }) {
  return (
    <div className="rule-row">
      <div className="rule-ic" style={{ background: tone }}>{window.Ic(icon, { size: 15, sw: 2 })}</div>
      <div className="rule-main"><div className="rule-title">{title}</div><div className="rule-sub">{sub}</div></div>
      <span className={'badge ' + badgeTone}><span className="dot"></span>{badge}</span>
    </div>
  );
}
function RulesPage() {
  return (
    <div className="content">
      <div className="page-head">
        <div className="grow"><h1 className="h1">Rules Engine</h1><p className="page-sub">Automation and guardrails that govern how Stars are earned and spent.</p></div>
        <button className="btn btn-secondary">{window.Ic('list', { size: 16 })}Templates</button>
        <button className="btn btn-primary">{window.Ic('plus', { size: 16 })}New rule</button>
      </div>
      <div className="card card-pad">
        <div className="h3" style={{ marginBottom: 18 }}>Active rules</div>
        <div className="rule-group" style={{ marginBottom: 8 }}>
          <div className="rule-source"><div className="rs-name">Bill Payment Booster</div><div className="rs-bal">Trigger · Bill payment completed</div></div>
          <div className="rule-branch"><div className="rule-rail"></div><div className="rule-rows">
            <RuleRow tone="var(--accent)" icon="star" title="Award 2× Stars on transaction value" sub="Capped at 500 Stars / member / day" badge="Active" badgeTone="green" />
            <RuleRow tone="var(--amber)" icon="warn" title="Pause campaign if daily liability > ৳50,000" sub="Guardrail · notifies program admin" badge="Guardrail" badgeTone="amber" />
          </div></div>
        </div>
        <div className="rule-group" style={{ marginBottom: 8 }}>
          <div className="rule-source"><div className="rs-name">Tier · Gold members</div><div className="rs-bal">Segment · 12,400 members</div></div>
          <div className="rule-branch"><div className="rule-rail"></div><div className="rule-rows">
            <RuleRow tone="var(--accent-mid)" icon="arrow" title="Grant +50% bonus Stars multiplier" sub="Stacks with active campaigns" badge="Active" badgeTone="green" />
          </div></div>
        </div>
        <div className="rule-group">
          <div className="rule-source"><div className="rs-name">Reward redemption</div><div className="rs-bal">Trigger · Member redeems Stars</div></div>
          <div className="rule-branch"><div className="rule-rail"></div><div className="rule-rows">
            <RuleRow tone="var(--blue)" icon="target" title="Require KYC for redemptions over ৳5,000" sub="Compliance · blocks until verified" badge="Pending access" badgeTone="blue" />
          </div></div>
        </div>
      </div>
    </div>
  );
}

// ---------------- INTEGRATIONS PAGE ----------------
const intgTone = { accent: ['var(--accent-soft)', 'var(--accent)'], green: ['var(--green-bg)', 'var(--green)'], amber: ['var(--amber-bg)', 'var(--amber)'], blue: ['var(--blue-bg)', 'var(--blue)'], slate: ['var(--slate-bg)', 'var(--slate)'] };
function IntegrationsPage() {
  return (
    <div className="content">
      <div className="page-head"><div className="grow"><h1 className="h1">Integrations</h1><p className="page-sub">Connect MTB Neo systems and partners to power the loyalty layer.</p></div></div>
      <div className="callout warn" style={{ marginBottom: 18 }}>
        <span className="c-ic">{window.Ic('warn', { size: 18, sw: 1.7 })}</span>
        <div><div className="callout-title">Running in Demo Mode</div>Connections below are simulated. Promote to production integration before going live with real members.</div>
      </div>
      <div className="grid grid-3">
        {window.DATA.integrations.map((g, i) => {
          const [bg, fg] = intgTone[g.tone];
          return (
            <div className="card intg" key={i}>
              <div className="intg-top"><div className="intg-logo" style={{ background: bg, color: fg }}>{g.mark}</div><div className="grow"><div className="intg-name">{g.name}</div><div className="intg-cat">{g.cat}</div></div></div>
              <p className="intg-desc">{g.desc}</p>
              <div className="intg-foot"><span className={'badge ' + g.badge}><span className="dot"></span>{g.status}</span><a className="link small">{g.action}</a></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- COMING SOON / EMPTY ----------------
function ComingSoon({ title, desc }) {
  return (
    <div className="content">
      <div className="page-head"><div className="grow"><h1 className="h1">{title}</h1></div></div>
      <div className="card"><div className="state">
        <div className="state-ic neutral">{window.Ic('bolt', { size: 24, sw: 1.6 })}</div>
        <div className="state-title">{title} workspace</div>
        <div className="state-desc">{desc}</div>
        <div className="state-actions"><button className="btn btn-primary btn-sm">{window.Ic('plus', { size: 15 })}Get started</button><button className="btn btn-ghost btn-sm">Learn more</button></div>
      </div></div>
    </div>
  );
}

// ---------------- BUDGET MODAL ----------------
function BudgetModal({ campaign, onClose }) {
  const [autopause, setAutopause] = uS(true);
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-ic">{window.Ic('vault', { size: 17, sw: 2 })}</div>
          <div><div className="modal-title">Budget control</div><div className="modal-sub">{campaign.name} · {campaign.id}</div></div>
          <button className="icon-btn modal-x" style={{ width: 32, height: 32 }} onClick={onClose}>{window.Ic('x', { size: 18, sw: 1.8 })}</button>
        </div>
        <div className="modal-body">
          {campaign.live && <div className="callout warn" style={{ marginBottom: 18 }}><span className="c-ic">{window.Ic('warn', { size: 18, sw: 1.7 })}</span><div><div className="callout-title">This campaign is live</div>Lowering the cap below current liability ({campaign.liability}) will auto-pause it.</div></div>}
          <div className="grid grid-2" style={{ gap: 16 }}>
            <div className="field"><label className="label">Total budget cap</label><div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" defaultValue="5,00,000" /></div></div>
            <div className="field"><label className="label">Daily liability limit</label><div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" defaultValue="50,000" /></div></div>
          </div>
          <div className="row gap-12" style={{ marginTop: 18 }}>
            <label className="toggle"><input type="checkbox" checked={autopause} onChange={e => setAutopause(e.target.checked)} /><span className="track"><span className="thumb"></span></span></label>
            <div><div className="small cell-strong">Auto-pause when cap is reached</div><div className="xsmall muted-2">Recommended for production campaigns</div></div>
          </div>
        </div>
        <div className="modal-foot"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><div style={{ marginLeft: 'auto' }} className="row gap-10"><button className="btn btn-secondary" onClick={onClose}>Save draft</button><button className="btn btn-primary" onClick={onClose}>Apply control</button></div></div>
      </div>
    </div>
  );
}

window.CampaignsPage = CampaignsPage;
window.RulesPage = RulesPage;
window.IntegrationsPage = IntegrationsPage;
window.ComingSoon = ComingSoon;
window.BudgetModal = BudgetModal;
