// STARS Admin Console — Customer Segments page
const { useState: uCS } = React;

const SEG_TYPE_TONE = {
  'System':         { bg:'var(--slate-bg)',   fg:'var(--slate)'  },
  'Tier-based':     { bg:'var(--violet-bg)',  fg:'var(--violet)' },
  'Product-based':  { bg:'var(--blue-bg)',    fg:'var(--blue)'   },
  'Behavior-based': { bg:'var(--green-bg)',   fg:'var(--green)'  },
  'Lifecycle':      { bg:'var(--accent-soft)',fg:'var(--accent)' },
  'Risk segment':   { bg:'var(--red-bg)',     fg:'var(--red)'    },
};

const ACT_TONE = {
  'High':   { bg:'var(--green-bg)',  fg:'var(--green)'  },
  'Medium': { bg:'var(--blue-bg)',   fg:'var(--blue)'   },
  'Low':    { bg:'var(--amber-bg)',  fg:'var(--amber)'  },
};

function TypeTag({ type }) {
  const t = SEG_TYPE_TONE[type] || { bg:'var(--slate-bg)', fg:'var(--slate)' };
  return <span style={{ display:'inline-flex', alignItems:'center', fontSize:11, fontWeight:600, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px', whiteSpace:'nowrap' }}>{type}</span>;
}
function ActivityTag({ level }) {
  const t = ACT_TONE[level] || {};
  return <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}><span style={{ width:5, height:5, borderRadius:'50%', background:t.fg, flex:'none' }}></span>{level}</span>;
}

function CustomerSegmentsPage({ onCreate }) {

  const SEGMENTS = [
    {
      id:'SEG_001', mark:'A', markBg:'var(--accent)',   name:'All Active MTB Neo Users',
      type:'System',         members:'185,420', memberNum:185420,
      criteria:'Active in last 30 days',      activity:'High',   campaigns:6, status:'Active',
      refresh:'Daily',       source:'MTB Neo member ledger',  lastUpdated:'Today, 08:15',
      primaryCampaign:'Bill Pay Booster',
      rule:'IF member.lastActivity() <= 30 days\nAND member.accountStatus === "Active"\nTHEN include in All Active MTB Neo Users',
      composition:[{label:'Gold tier', pct:17},{label:'Silver tier', pct:38},{label:'Classic tier', pct:45},{label:'Monthly active', pct:68},{label:'Dormant', pct:12}],
    },
    {
      id:'SEG_002', mark:'G', markBg:'var(--amber)',    name:'Gold Tier Members',
      type:'Tier-based',     members:'24,800',  memberNum:24800,
      criteria:'Tier = Gold or above',         activity:'High',   campaigns:3, status:'Active',
      refresh:'Daily',       source:'MTB Core Banking',       lastUpdated:'Today, 08:15',
      primaryCampaign:'Gold Tier Upgrade Sprint',
      rule:'IF member.tier IN ["Gold", "Platinum", "Privilege"]\nAND member.accountStatus === "Active"\nTHEN include in Gold Tier Members',
      composition:[{label:'Platinum tier', pct:12},{label:'Gold tier', pct:88},{label:'Monthly active', pct:91},{label:'High spender', pct:74},{label:'Dormant', pct:2}],
    },
    {
      id:'SEG_003', mark:'S', markBg:'var(--blue)',     name:'Salary Account Holders',
      type:'Product-based',  members:'42,600',  memberNum:42600,
      criteria:'Salary account linked',        activity:'Medium', campaigns:2, status:'Active',
      refresh:'Weekly',      source:'MTB Salary Ledger',      lastUpdated:'Jun 05, 09:40',
      primaryCampaign:'Salary Account Activation',
      rule:'IF member.accountType === "Salary"\nAND member.receivedSalaryCredit(last_60_days)\nAND member.accountStatus === "Active"\nTHEN include in Salary Account Holders',
      composition:[{label:'Gold tier', pct:22},{label:'Silver tier', pct:44},{label:'Classic tier', pct:34},{label:'Monthly active', pct:63},{label:'Dormant', pct:14}],
    },
    {
      id:'SEG_004', mark:'Q', markBg:'var(--green)',    name:'High QR Pay Users',
      type:'Behavior-based', members:'18,900',  memberNum:18900,
      criteria:'5+ QR payments/month',         activity:'High',   campaigns:2, status:'Active',
      refresh:'Daily',       source:'MTB Neo transaction ledger', lastUpdated:'Today, 08:15',
      primaryCampaign:'QR Pay Cashback',
      rule:'IF member.qrPayments(last_30_days) >= 5\nAND member.accountStatus === "Active"\nAND member.channel === "MTB Neo app"\nTHEN include in High QR Pay Users',
      composition:[{label:'Gold tier', pct:31},{label:'Silver tier', pct:49},{label:'Classic tier', pct:20},{label:'Monthly active', pct:96},{label:'Dormant', pct:1}],
    },
    {
      id:'SEG_005', mark:'D', markBg:'var(--slate)',    name:'Dormant App Users',
      type:'Behavior-based', members:'31,600',  memberNum:31600,
      criteria:'No app activity in 30 days',   activity:'Low',    campaigns:1, status:'Active',
      refresh:'Daily',       source:'MTB Neo app activity log',  lastUpdated:'Today, 08:15',
      primaryCampaign:'Reactivation (Proposed)',
      rule:'IF member.lastAppLogin() > 30 days\nAND member.accountStatus === "Active"\nAND member NOT IN recentTransactions(30_days)\nTHEN include in Dormant App Users',
      composition:[{label:'Gold tier', pct:8},{label:'Silver tier', pct:29},{label:'Classic tier', pct:63},{label:'Monthly active', pct:0},{label:'Dormant', pct:100}],
    },
    {
      id:'SEG_006', mark:'N', markBg:'var(--violet)',   name:'New Users: Last 30 Days',
      type:'Lifecycle',      members:'12,400',  memberNum:12400,
      criteria:'Registered within 30 days',    activity:'Medium', campaigns:2, status:'Active',
      refresh:'Daily',       source:'MTB Neo onboarding API', lastUpdated:'Today, 08:15',
      primaryCampaign:'Welcome Mission',
      rule:'IF member.registrationDate >= (today - 30 days)\nAND member.accountStatus === "Active"\nAND member.kycStatus === "Verified"\nTHEN include in New Users: Last 30 Days',
      composition:[{label:'Gold tier', pct:2},{label:'Silver tier', pct:11},{label:'Classic tier', pct:87},{label:'Monthly active', pct:54},{label:'Dormant', pct:22}],
    },
    {
      id:'SEG_007', mark:'U', markBg:'var(--accent)',   name:'Utility Bill Payers',
      type:'Behavior-based', members:'38,900',  memberNum:38900,
      criteria:'1+ bill payment/month',         activity:'High',   campaigns:4, status:'Active',
      refresh:'Daily',       source:'MTB Neo transaction ledger', lastUpdated:'Today, 08:15',
      primaryCampaign:'Bill Pay Booster',
      rule:'IF member.completedBillPayments(last_30_days) >= 1\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN include in Utility Bill Payers',
      composition:[{label:'Gold tier', pct:18},{label:'Silver tier', pct:42},{label:'Classic tier', pct:40},{label:'Monthly active', pct:72},{label:'Dormant', pct:8}],
    },
    {
      id:'SEG_008', mark:'R', markBg:'var(--red)',      name:'At-Risk Churn Users',
      type:'Risk segment',   members:'9,700',   memberNum:9700,
      criteria:'Activity drop >50%',            activity:'Low',    campaigns:1, status:'Review',
      refresh:'Weekly',      source:'MTB Neo ML risk model', lastUpdated:'Jun 04, 14:20',
      primaryCampaign:'Churn Prevention (Draft)',
      rule:'IF member.activityDrop(last_30_vs_60_days) > 50%\nAND member.accountStatus === "Active"\nAND member.churnRiskScore >= 0.7\nTHEN include in At-Risk Churn Users',
      composition:[{label:'Gold tier', pct:5},{label:'Silver tier', pct:22},{label:'Classic tier', pct:73},{label:'Monthly active', pct:18},{label:'Dormant', pct:62}],
      note:'Activity drop >50% vs previous 30 days — members flagged by the MTB Neo ML churn risk model.',
    },
  ];

  const defaultSeg = SEGMENTS.find(s => s.name === 'Utility Bill Payers') || SEGMENTS[0];
  const [sel, setSel] = uCS(defaultSeg);
  const [showCreate, setShowCreate] = uCS(false);
  const [searchQ, setSearchQ] = uCS('');

  const filtered = SEGMENTS.filter(s =>
    !searchQ || s.name.toLowerCase().includes(searchQ.toLowerCase()) || s.type.toLowerCase().includes(searchQ.toLowerCase())
  );

  const kpis = [
    { label:'Total segments',          value:'18',      sub:'12 active',                           iconKey:'segments', iBg:'var(--accent-soft)',  iFg:'var(--accent)'  },
    { label:'Segmented members',       value:'185,420', sub:'100% of loyalty base',                iconKey:'users',    iBg:'var(--blue-bg)',      iFg:'var(--blue)'    },
    { label:'High-value members',      value:'24,800',  sub:'Gold+ and high activity',             iconKey:'star',     iBg:'var(--amber-bg)',     iFg:'var(--amber)'   },
    { label:'Dormant members',         value:'31,600',  sub:'No app activity in 30 days',          iconKey:'warn',     iBg:'var(--red-bg)',       iFg:'var(--red)'     },
    { label:'Campaign-linked segments',value:'9',       sub:'Used in active campaigns',            iconKey:'campaigns',iBg:'var(--green-bg)',     iFg:'var(--green)'   },
  ];

  const perfItems = [
    { role:'Largest segment',    name:'All Active MTB Neo Users',  val:'185,420 members', tone:'accent'  },
    { role:'Highest engagement', name:'Gold Tier Members',          val:'68% active weekly',tone:'amber'  },
    { role:'Fastest growing',    name:'New Users: Last 30 Days',   val:'+14.2% growth',   tone:'green'   },
    { role:'Needs attention',    name:'Dormant App Users',          val:'31,600 members',  tone:'red'     },
  ];

  const opportunities = [
    { seg:'Utility Bill Payers',     detail:'Eligible for Bill Pay Booster — 38,900 members ready' },
    { seg:'Dormant App Users',       detail:'Reactivation campaign recommended — 31,600 at risk'   },
    { seg:'Salary Account Holders',  detail:'Salary-day mission opportunity — 42,600 members'      },
    { seg:'High QR Pay Users',       detail:'QR Pay Cashback expansion — 18,900 high-frequency payers' },
  ];

  const healthItems = [
    { label:'Data freshness',               val:'Healthy',   tone:'green' },
    { label:'Ledger sync',                  val:'Connected', tone:'green' },
    { label:'CRM sync',                     val:'Connected', tone:'green' },
    { label:'Duplicate profiles',           val:'0.4%',      tone:'amber' },
    { label:'Excluded staff / test accounts',val:'1,120',    tone:'slate' },
  ];

  const compBarColors = ['var(--amber)', 'var(--accent-tint)', 'var(--slate-bg)', 'var(--green)', 'var(--red-bg)'];
  const compFgColors  = ['var(--amber)', 'var(--accent)',      'var(--slate)',    'var(--green)', 'var(--red)'   ];

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Customer Segments</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Create, monitor, and activate customer segments for targeted STARS campaigns.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} All segments {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('activity',{size:14})} All activity {window.Ic('chevDown',{size:13})}</button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <div className="search" style={{ width:200, height:34, fontSize:13 }}>
              {window.Ic('search',{size:14})}
              <input placeholder="Search segments…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowCreate(true)}>
              {window.Ic('plus',{size:14})} Create segment
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:'22px 28px 32px' }}>

        {/* ── KPI ROW ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14, marginBottom:22 }}>
          {kpis.map((k,i) => (
            <div key={i} className="card" style={{ padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text-2)', lineHeight:1.3 }}>{k.label}</span>
                <span style={{ width:28, height:28, borderRadius:'var(--r-sm)', background:k.iBg, color:k.iFg, display:'grid', placeItems:'center', flex:'none' }}>
                  {window.Ic(k.iconKey,{size:14})}
                </span>
              </div>
              <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-.02em', fontVariantNumeric:'tabular-nums', lineHeight:1.1, marginBottom:6 }}>{k.value}</div>
              <div style={{ fontSize:11.5, color:'var(--text-3)', lineHeight:1.4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>

            {/* SEGMENTS TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Customer segments</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>{filtered.length} segments{searchQ?' matching "'+searchQ+'"':' · click to view detail'}</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Segment</th>
                    <th>Type</th>
                    <th className="num">Members</th>
                    <th>Criteria</th>
                    <th>Activity</th>
                    <th className="num">Campaigns</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row,i) => {
                    const isSel = sel && sel.id === row.id;
                    return (
                      <tr key={i}
                        style={{ cursor:'pointer', background: isSel ? 'var(--accent-soft)' : undefined, transition:'background .12s' }}
                        onClick={()=>setSel(row)}
                      >
                        <td>
                          <div className="cell-flex">
                            <div className="row-ic" style={{ background: row.markBg, color:'#fff', fontSize:12, fontWeight:700, flex:'none' }}>
                              {row.mark}
                            </div>
                            <div>
                              <a className="link" style={{ fontWeight:600 }} onClick={e=>{e.stopPropagation(); setSel(row);}}>{row.name}</a>
                              <div className="cell-sub" style={{ fontFamily:'var(--mono)', fontSize:11 }}>{row.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><TypeTag type={row.type} /></td>
                        <td className="num tnum" style={{ fontWeight:600 }}>{row.members}</td>
                        <td className="small muted" style={{ maxWidth:200, fontSize:12.5 }}>{row.criteria}</td>
                        <td><ActivityTag level={row.activity} /></td>
                        <td className="num tnum">{row.campaigns}</td>
                        <td>
                          <span className={'badge '+(row.status==='Active'?'green':'amber')} style={{ fontSize:11 }}>
                            <span className="dot"></span>{row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Showing {filtered.length} of {SEGMENTS.length} segments</span>
                <div style={{ marginLeft:'auto' }} className="row gap-8">
                  <button className="btn btn-ghost btn-sm">Previous</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>

            {/* SEGMENT PERFORMANCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Segment performance</div>
                <span className="xsmall muted-2">Last 30 days</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
                {perfItems.map((p,i) => {
                  const toneMap = { accent:['var(--accent-soft)','var(--accent)'], amber:['var(--amber-bg)','var(--amber)'], green:['var(--green-bg)','var(--green)'], red:['var(--red-bg)','var(--red)'] };
                  const [bg,fg] = toneMap[p.tone] || toneMap.accent;
                  return (
                    <div key={i} style={{ padding:'16px 18px', borderRight: i<perfItems.length-1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>{p.role}</div>
                      <div style={{ fontSize:13.5, fontWeight:700, lineHeight:1.3, marginBottom:6 }}>{p.name}</div>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:fg, background:bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}>
                        {p.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEGMENT RULES PREVIEW */}
            {sel && (
              <div className="card">
                <div className="card-head">
                  <div style={{ flex:1 }}>
                    <div className="card-title">Segment rule preview</div>
                    <div className="xsmall muted-2" style={{ marginTop:2 }}>Evaluated daily against the MTB Neo ledger · <b>{sel.name}</b></div>
                  </div>
                  <TypeTag type={sel.type} />
                </div>
                <div style={{ padding:'0 22px' }}>
                  <div style={{ padding:'11px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)' }}></div>
                    <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>
                      Rules Engine · segment refresh: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.refresh.toLowerCase()}</span>
                    </span>
                  </div>
                  <div style={{ padding:'18px 0', fontFamily:'var(--mono)', fontSize:13, lineHeight:2.1, color:'var(--text)' }}>
                    {sel.rule.split('\n').map((line, i) => {
                      const isIF   = line.trim().startsWith('IF');
                      const isAND  = line.trim().startsWith('AND');
                      const isTHEN = line.trim().startsWith('THEN');
                      const keyword = isIF ? 'IF' : isAND ? 'AND' : isTHEN ? 'THEN' : null;
                      const rest = keyword ? line.trim().slice(keyword.length) : line;
                      return (
                        <div key={i} style={{ paddingLeft: isAND ? 24 : 0 }}>
                          {keyword && <span style={{ color:'var(--accent)', fontWeight:700 }}>{keyword}</span>}
                          <span style={{ color: isTHEN ? 'var(--green)' : 'var(--text)' }}>{rest}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* SELECTED SEGMENT DETAIL */}
            {sel && (
              <div className="card">
                <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'var(--r-md)', background: sel.markBg, color:'#fff', display:'grid', placeItems:'center', fontSize:15, fontWeight:700, flex:'none' }}>
                    {sel.mark}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.3 }}>{sel.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginTop:2 }}>{sel.id}</div>
                  </div>
                  <span className={'badge '+(sel.status==='Active'?'green':'amber')} style={{ fontSize:11 }}>
                    <span className="dot"></span>{sel.status}
                  </span>
                </div>
                <div style={{ padding:'12px 18px' }}>
                  <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                  {[
                    ['Type',              sel.type],
                    ['Members',           sel.members],
                    ['Refresh frequency', sel.refresh],
                    ['Source',            sel.source],
                    ['Last updated',      sel.lastUpdated],
                    ['Linked campaigns',  sel.campaigns + ' campaigns'],
                    ['Primary campaign',  sel.primaryCampaign],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, padding:'5px 0' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)', flex:'none' }}>{k}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right', lineHeight:1.4 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ height:1, background:'var(--border)', margin:'12px 0' }}></div>
                  {sel.note && (
                    <div style={{ marginBottom:12, padding:'10px 12px', background:'var(--amber-bg)', border:'1px solid var(--amber-bd)', borderRadius:'var(--r-sm)', fontSize:12, color:'#6f4d00', lineHeight:1.5 }}>
                      {sel.note}
                    </div>
                  )}
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('list',{size:14})} Edit segment</button>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('plus',{size:14})} Duplicate segment</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start', color:'var(--accent)' }}>{window.Ic('users',{size:14})} View members</button>
                    <button className="btn btn-primary btn-sm" style={{ justifyContent:'flex-start' }} onClick={onCreate}>{window.Ic('campaigns',{size:14})} Use in campaign</button>
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT COMPOSITION */}
            {sel && (
              <div className="card">
                <div className="card-head">
                  <div className="card-title">Composition</div>
                  <span className="xsmall muted-2">{sel.name.length > 20 ? sel.name.slice(0,20)+'…' : sel.name}</span>
                </div>
                <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                  {sel.composition.map((c,i) => (
                    <div key={i}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ fontSize:12.5, color:'var(--text-2)', fontWeight:500 }}>{c.label}</span>
                        <span style={{ fontSize:12.5, fontWeight:700, color: compFgColors[i%compFgColors.length] }}>{c.pct}%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: c.pct+'%', background: compBarColors[i%compBarColors.length] }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVATION OPPORTUNITIES */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Activation opportunities</div>
                <span className="badge green" style={{ fontSize:11 }}>4 ready</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {opportunities.map((o,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'12px 0', borderBottom: i<opportunities.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
                    <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', flex:'none', marginTop:1, display:'grid', placeItems:'center', background:'var(--accent-soft)', color:'var(--accent)' }}>
                      {window.Ic('bolt',{size:13,sw:2})}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, lineHeight:1.3 }}>{o.seg}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', marginTop:3, lineHeight:1.4 }}>{o.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DATA HEALTH */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Segment data health</div>
                <span className="badge green" style={{ fontSize:11 }}>Healthy</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {healthItems.map((h,i) => {
                  const dotColor = { green:'var(--green)', amber:'var(--amber)', slate:'var(--slate)' }[h.tone];
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'11px 0', borderBottom: i<healthItems.length-1?'1px solid var(--border)':'none' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{h.label}</span>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12.5, fontWeight:600 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:dotColor, flex:'none' }}></span>
                        {h.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── CREATE SEGMENT MODAL ── */}
      {showCreate && (
        <div className="scrim" onClick={()=>setShowCreate(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('segments',{size:17})}</div>
              <div>
                <div className="modal-title">Create segment</div>
                <div className="modal-sub">Define a new customer segment for STARS campaign targeting.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowCreate(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>
            <div className="modal-body">
              <div className="grid" style={{ gap:16 }}>
                <div className="field">
                  <label className="label">Segment name</label>
                  <input className="input" placeholder="e.g. High-frequency QR payers" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Segment type</label>
                    <select className="select">
                      <option>Behavior-based</option>
                      <option>Tier-based</option>
                      <option>Product-based</option>
                      <option>Lifecycle</option>
                      <option>Risk segment</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Refresh frequency</label>
                    <select className="select">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Real-time</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Criteria description</label>
                  <textarea className="textarea" rows="2" placeholder="e.g. Members who completed 3+ QR payments in last 30 days" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Data source</label>
                    <select className="select">
                      <option>MTB Neo transaction ledger</option>
                      <option>MTB Core Banking</option>
                      <option>MTB Neo member ledger</option>
                      <option>MTB Salary Ledger</option>
                      <option>MTB Neo app activity log</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Initial status</label>
                    <select className="select">
                      <option>Draft</option>
                      <option>Active</option>
                    </select>
                  </div>
                </div>
                <div className="callout info">
                  <span className="c-ic">{window.Ic('info',{size:18,sw:1.7})}</span>
                  <div><div className="callout-title">Segment preview</div>Estimated reach will be calculated after the first ledger sync. Allow up to 24 hours for the initial population.</div>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowCreate(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowCreate(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowCreate(false)}>Create segment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.CustomerSegmentsPage = CustomerSegmentsPage;
