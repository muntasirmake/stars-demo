// STARS Admin Console — Rules Engine (full-page v2)
const { useState: uRE } = React;

const RULE_TYPE_TONE = {
  'Campaign earning':   { bg:'var(--green-bg)',   fg:'var(--green)'  },
  'Spend multiplier':   { bg:'var(--accent-soft)', fg:'var(--accent)' },
  'Referral':           { bg:'var(--violet-bg)',  fg:'var(--violet)' },
  'Tier movement':      { bg:'var(--amber-bg)',   fg:'var(--amber)'  },
  'Expiry':             { bg:'var(--slate-bg)',   fg:'var(--slate)'  },
  'Fraud control':      { bg:'var(--red-bg)',     fg:'var(--red)'    },
  'Eligibility control':{ bg:'var(--blue-bg)',    fg:'var(--blue)'   },
};
const PRIO_TONE = {
  P1:{ bg:'var(--red-bg)',   fg:'var(--red)'   },
  P2:{ bg:'var(--amber-bg)', fg:'var(--amber)' },
  P3:{ bg:'var(--slate-bg)', fg:'var(--slate)' },
};

function RuleTypeTag({ type }) {
  const t = RULE_TYPE_TONE[type] || { bg:'var(--slate-bg)', fg:'var(--slate)' };
  return <span style={{ display:'inline-flex', fontSize:11, fontWeight:600, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px', whiteSpace:'nowrap' }}>{type}</span>;
}
function PrioTag({ p }) {
  const t = PRIO_TONE[p] || PRIO_TONE.P3;
  return <span style={{ display:'inline-flex', fontSize:11, fontWeight:700, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px', fontFamily:'var(--mono)' }}>{p}</span>;
}

function RulesEnginePage({ onCreate }) {

  const RULES = [
    {
      id:'RUL_001', mark:'B', markBg:'var(--accent)',
      name:'Bill Pay Booster Qualification',
      type:'Campaign earning',   source:'MTB Neo ledger',
      condition:'3 bill payments / 30d',   action:'Issue 500 STARS',
      priority:'P1', lastTriggered:'12 min ago', status:'Active',
      linkedCampaign:'Bill Pay Booster',   linkedSegment:'Utility Bill Payers',
      triggerCount:'480K evaluations',     qualifications:'38,900',
      starsIssued:'3.1M',                  failureRate:'0.7%',
      lastUpdated:'Today, 08:45',
      logic:'IF member.completedBillPayments(\n  category == "Utility",\n  amount >= ৳500,\n  channel == "MTB Neo app"\n).count(last_30_days) >= 3\nAND transaction.status === "settled"\nAND member NOT IN staffAccounts\nAND duplicateBillerSameDay === false\nTHEN issue(500, "STARS")\nLIMIT once per member\nWITHIN 30 days',
      deps:[['Campaign','Bill Pay Booster'],['Segment','Utility Bill Payers'],['Reward','500 STARS flat'],['Limit','Once per member'],['Approval','Marketing + Risk']],
    },
    {
      id:'RUL_002', mark:'Q', markBg:'var(--green)',
      name:'QR Pay Cashback Rule',
      type:'Campaign earning',   source:'QR payment ledger',
      condition:'5 QR payments / month',   action:'Issue 300 STARS',
      priority:'P2', lastTriggered:'28 min ago', status:'Active',
      linkedCampaign:'QR Pay Cashback',    linkedSegment:'High QR Pay Users',
      triggerCount:'320K evaluations',     qualifications:'26,400',
      starsIssued:'2.4M',                  failureRate:'0.9%',
      lastUpdated:'Today, 08:45',
      logic:'IF member.completedQRPayments(last_30_days) >= 5\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN issue(300, "STARS")\nLIMIT once per month\nWITHIN 30 days',
      deps:[['Campaign','QR Pay Cashback'],['Segment','High QR Pay Users'],['Reward','300 STARS flat'],['Limit','Once per month'],['Approval','Marketing']],
    },
    {
      id:'RUL_003', mark:'W', markBg:'var(--blue)',
      name:'Weekend Card Spend Multiplier',
      type:'Spend multiplier',   source:'Card transaction feed',
      condition:'Spend ৳5,000 Fri–Sun',    action:'2× STARS',
      priority:'P2', lastTriggered:'1h ago', status:'Scheduled',
      linkedCampaign:'Weekend Card Spend Streak', linkedSegment:'All Active MTB Neo Users',
      triggerCount:'0 evaluations',        qualifications:'0',
      starsIssued:'—',                     failureRate:'—',
      lastUpdated:'Jun 05, 14:22',
      logic:'IF member.cardSpend(\n  dayOfWeek IN ["Friday","Saturday","Sunday"],\n  amount >= ৳5000\n)\nAND member.accountStatus === "Active"\nTHEN multiply(member.earnRate, 2)\nLIMIT ৳2,000 STARS per weekend\nSTARTS 14 Jun 2026',
      deps:[['Campaign','Weekend Card Spend Streak'],['Segment','Gold+ Members'],['Reward','2× STARS multiplier'],['Limit','৳2,000 STARS / weekend'],['Approval','Pending']],
    },
    {
      id:'RUL_004', mark:'R', markBg:'var(--violet)',
      name:'Refer-a-Friend Verification',
      type:'Referral',           source:'Customer identity service',
      condition:'Invitee KYC verified',    action:'Issue 1,000 STARS',
      priority:'P1', lastTriggered:'2h ago', status:'Active',
      linkedCampaign:'Refer-a-Friend 2.0', linkedSegment:'All Active MTB Neo Users',
      triggerCount:'24K evaluations',      qualifications:'9,200',
      starsIssued:'9.2M',                  failureRate:'0.4%',
      lastUpdated:'Jun 04, 11:30',
      logic:'IF referrer.invitee.kycStatus === "Verified"\nAND invitee.registeredViaReferral === true\nAND invitee.firstTransaction(amount >= ৳100)\nAND referrer NOT IN staffAccounts\nTHEN issue(1000, "STARS") TO referrer\nLIMIT 10 referrals per member',
      deps:[['Campaign','Refer-a-Friend 2.0'],['Segment','All Active MTB Neo Users'],['Reward','1,000 STARS flat'],['Limit','10 referrals / member'],['Approval','Marketing + Compliance']],
    },
    {
      id:'RUL_005', mark:'G', markBg:'var(--amber)',
      name:'Gold Tier Upgrade Rule',
      type:'Tier movement',      source:'STARS wallet',
      condition:'Earn 20,000 STARS / quarter', action:'Upgrade to Gold',
      priority:'P2', lastTriggered:'Today', status:'Active',
      linkedCampaign:'Gold Tier Upgrade Sprint', linkedSegment:'Silver Tier Members',
      triggerCount:'8.4K evaluations',     qualifications:'1,240',
      starsIssued:'—',                     failureRate:'0.2%',
      lastUpdated:'Jun 01, 09:00',
      logic:'IF member.starsEarned(\n  period == "current_quarter"\n) >= 20000\nAND member.currentTier === "Silver"\nAND member.accountStatus === "Active"\nTHEN upgrade(member.tier, "Gold")\nAND notify(member, "tier_upgrade")',
      deps:[['Campaign','Gold Tier Upgrade Sprint'],['Segment','Silver Tier Members'],['Reward','Tier upgrade'],['Limit','One-time per quarter'],['Approval','Finance']],
    },
    {
      id:'RUL_006', mark:'E', markBg:'var(--slate)',
      name:'STARS Expiry Rule',
      type:'Expiry',             source:'STARS wallet',
      condition:'STARS older than 12 months', action:'Expire unused STARS',
      priority:'P3', lastTriggered:'Daily batch', status:'Active',
      linkedCampaign:'Platform policy',    linkedSegment:'All members',
      triggerCount:'18M STARS evaluated',  qualifications:'N/A',
      starsIssued:'—',                     failureRate:'3 exceptions',
      lastUpdated:'Jun 07, 01:00',
      logic:'IF member.stars.ageInDays > 365\nAND member.stars.status === "active"\nAND member NOT IN exemptAccounts\nTHEN expire(member.stars)\nAND notify(member, "expiry_warning", days_before=30)',
      deps:[['Campaign','Platform policy'],['Segment','All members'],['Reward','N/A'],['Limit','Platform-wide'],['Approval','Finance + Compliance']],
    },
    {
      id:'RUL_007', mark:'D', markBg:'var(--red)',
      name:'Duplicate Biller Protection',
      type:'Fraud control',      source:'Bill payment ledger',
      condition:'Same biller paid multiple times/day', action:'Count once',
      priority:'P1', lastTriggered:'8 min ago', status:'Active',
      linkedCampaign:'All bill pay campaigns', linkedSegment:'All members',
      triggerCount:'12.8K events checked',  qualifications:'N/A',
      starsIssued:'—',                      failureRate:'0.7% events excluded',
      lastUpdated:'Today, 08:45',
      logic:'IF member.billPayments(\n  biller == event.biller,\n  date == today\n).count() > 1\nTHEN countOnce(event)\nAND flag(event, "duplicate_biller")\nAND excludeFromReward(event)',
      deps:[['Campaign','All bill pay campaigns'],['Segment','All members'],['Reward','N/A — exclusion rule'],['Limit','Platform-wide'],['Approval','Risk']],
    },
    {
      id:'RUL_008', mark:'S', markBg:'#5C6373',
      name:'Staff Account Exclusion',
      type:'Eligibility control', source:'CRM profile',
      condition:'Account tagged staff/test',  action:'Exclude from rewards',
      priority:'P1', lastTriggered:'6 min ago', status:'Active',
      linkedCampaign:'All campaigns',      linkedSegment:'All members',
      triggerCount:'1,120 accounts',       qualifications:'N/A',
      starsIssued:'—',                     failureRate:'0.0%',
      lastUpdated:'Today, 08:45',
      logic:'IF member.crmProfile.accountType IN\n  ["Staff","QA_Test","Admin","Internal"]\nOR member.crmProfile.staffFlag === true\nTHEN exclude(member)\nFROM all campaigns\nAND log(exclusion_reason, "staff_account")',
      deps:[['Campaign','All campaigns'],['Segment','All members'],['Reward','N/A — exclusion rule'],['Limit','Platform-wide'],['Approval','Compliance']],
    },
  ];

  const defaultRule = RULES[0];
  const [sel, setSel] = uRE(defaultRule);
  const [showCreate, setShowCreate] = uRE(false);
  const [searchQ, setSearchQ] = uRE('');

  const filtered = RULES.filter(r =>
    !searchQ || r.name.toLowerCase().includes(searchQ.toLowerCase()) || r.type.toLowerCase().includes(searchQ.toLowerCase())
  );

  const kpis = [
    { label:'Active rules',            value:'32',   sub:'18 campaign-linked',              iconKey:'rules',    iBg:'var(--accent-soft)',  iFg:'var(--accent)'  },
    { label:'Rules triggered',         value:'1.8M', sub:'Last 30 days',                    iconKey:'bolt',     iBg:'var(--green-bg)',     iFg:'var(--green)'   },
    { label:'Rule-driven STARS issued',  value:'18.4M',sub:'Across active earning rules',     iconKey:'star',     iBg:'var(--blue-bg)',      iFg:'var(--blue)'    },
    { label:'Evaluation exceptions',       value:'0.3%', sub:'Within expected range',           iconKey:'target',   iBg:'var(--slate-bg)',     iFg:'var(--slate)'   },
    { label:'Rules requiring review',  value:'3',    sub:'Risk or expiry related',          iconKey:'warn',     iBg:'var(--amber-bg)',     iFg:'var(--amber)'   },
  ];

  const perfItems = [
    { role:'Most triggered',    name:'Bill Pay Booster Qualification', val:'480K evaluations', tone:'accent' },
    { role:'Highest issuance',  name:'QR Pay Cashback Rule',           val:'2.4M STARS',       tone:'green'  },
    { role:'Highest priority',  name:'Duplicate Biller Protection',    val:'P1 fraud control', tone:'red'    },
    { role:'Needs review',      name:'STARS Expiry Rule',              val:'3 exceptions',     tone:'amber'  },
  ];

  const evaluations = [
    { time:'09:14', member:'MBR_43829', event:'Bill payment completed',  result:'Qualified',   action:'500 STARS queued', reason:'3 of 3 payments completed',   ok:true  },
    { time:'09:09', member:'MBR_77104', event:'Bill payment completed',  result:'Pending',     action:'No action',        reason:'2 of 3 payments completed',   ok:null  },
    { time:'09:02', member:'MBR_18290', event:'Bill payment reversed',   result:'Excluded',    action:'No action',        reason:'Reversed transaction',        ok:false },
    { time:'08:57', member:'MBR_55201', event:'Duplicate bill payment',  result:'Counted once',action:'No action',        reason:'Duplicate biller same day',   ok:false },
    { time:'08:44', member:'MBR_90218', event:'Bill payment completed',  result:'Excluded',    action:'No action',        reason:'Staff / test account',        ok:false },
  ];

  const alerts = [
    { label:'STARS Expiry Rule',          detail:'3 exceptions need review',             tone:'amber' },
    { label:'Weekend Card Spend Multiplier', detail:'Scheduled to start in 4 days',    tone:'blue'  },
    { label:'Duplicate Biller Protection', detail:'0.7% of events excluded this period', tone:'slate' },
    { label:'Staff Account Exclusion',    detail:'1,120 accounts excluded platform-wide', tone:'slate' },
  ];

  const healthItems = [
    { label:'Evaluation latency',   val:'180ms',    tone:'green' },
    { label:'Failed evaluations',   val:'0.3%',     tone:'green' },
    { label:'Duplicate protection', val:'Active',   tone:'green' },
    { label:'Staff exclusions',     val:'Active',   tone:'green' },
    { label:'Ledger sync',          val:'Connected',tone:'green' },
  ];

  const resultTone = { 'Qualified':'green', 'Pending':'blue', 'Excluded':'red', 'Counted once':'amber' };

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Rules Engine</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Configure and monitor the earning, redemption, tier, expiry, and fraud rules that power STARS campaigns.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} All rule types {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('activity',{size:14})} All sources {window.Ic('chevDown',{size:13})}</button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <div className="search" style={{ width:200, height:34, fontSize:13 }}>
              {window.Ic('search',{size:14})}
              <input placeholder="Search rules…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowCreate(true)}>
              {window.Ic('plus',{size:14})} Create rule
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

            {/* RULES TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Rules</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>{filtered.length} rules{searchQ?' matching "'+searchQ+'"':' · click to view detail'}</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Rule</th>
                    <th>Type</th>
                    <th>Event source</th>
                    <th>Condition</th>
                    <th>Action</th>
                    <th>Priority</th>
                    <th>Last triggered</th>
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
                        <td><RuleTypeTag type={row.type} /></td>
                        <td className="small muted" style={{ fontSize:12.5 }}>{row.source}</td>
                        <td className="small" style={{ fontSize:12.5, maxWidth:160 }}>{row.condition}</td>
                        <td className="small" style={{ fontSize:12.5, fontWeight:600 }}>{row.action}</td>
                        <td><PrioTag p={row.priority} /></td>
                        <td className="small muted" style={{ fontFamily:'var(--mono)', fontSize:11.5, whiteSpace:'nowrap' }}>{row.lastTriggered}</td>
                        <td>
                          <span className={'badge '+(row.status==='Active'?'green':row.status==='Scheduled'?'blue':'amber')} style={{ fontSize:11 }}>
                            <span className="dot"></span>{row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Showing {filtered.length} of {RULES.length} rules</span>
                <div style={{ marginLeft:'auto' }} className="row gap-8">
                  <button className="btn btn-ghost btn-sm">Previous</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>

            {/* RULE PERFORMANCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Rule performance</div>
                <span className="xsmall muted-2">Last 30 days</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
                {perfItems.map((p,i) => {
                  const toneMap = { accent:['var(--accent-soft)','var(--accent)'], green:['var(--green-bg)','var(--green)'], red:['var(--red-bg)','var(--red)'], amber:['var(--amber-bg)','var(--amber)'] };
                  const [bg,fg] = toneMap[p.tone] || toneMap.accent;
                  return (
                    <div key={i} style={{ padding:'16px 18px', borderRight: i<perfItems.length-1?'1px solid var(--border)':'none' }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>{p.role}</div>
                      <div style={{ fontSize:13.5, fontWeight:700, lineHeight:1.3, marginBottom:6 }}>{p.name}</div>
                      <span style={{ display:'inline-flex', fontSize:12, fontWeight:600, color:fg, background:bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}>{p.val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RULE LOGIC PREVIEW */}
            {sel && (
              <div className="card">
                <div className="card-head">
                  <div style={{ flex:1 }}>
                    <div className="card-title">Rule logic preview</div>
                    <div className="xsmall muted-2" style={{ marginTop:2 }}>Evaluated on every qualifying event · <b>{sel.name}</b></div>
                  </div>
                  <RuleTypeTag type={sel.type} />
                </div>
                <div style={{ padding:'0 22px' }}>
                  <div style={{ padding:'11px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)' }}></div>
                    <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>
                      Rules Engine · source: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.source}</span>
                    </span>
                    <PrioTag p={sel.priority} />
                  </div>
                  <div style={{ padding:'18px 0', fontFamily:'var(--mono)', fontSize:13, lineHeight:2.1, color:'var(--text)' }}>
                    {sel.logic.split('\n').map((line, i) => {
                      const kw = ['IF','AND','OR','THEN','LIMIT','WITHIN','FROM','STARTS'].find(k => line.trim().startsWith(k));
                      const isThen = line.trim().startsWith('THEN');
                      const isLimit = ['LIMIT','WITHIN','FROM','STARTS'].some(k=>line.trim().startsWith(k));
                      const indent = ['AND','OR'].some(k=>line.trim().startsWith(k)) || (!kw && line.trim().startsWith(' ')) || line.startsWith(' ');
                      return (
                        <div key={i} style={{ paddingLeft: indent && !kw ? 24 : line.startsWith('  ') ? 24 : 0 }}>
                          {kw && <span style={{ color: isThen?'var(--green)':isLimit?'var(--text-3)':'var(--accent)', fontWeight:700 }}>{kw}</span>}
                          <span style={{ color: isThen?'var(--green)':isLimit?'var(--text-3)':'var(--text)' }}>
                            {kw ? line.trim().slice(kw.length) : line}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* RECENT EVALUATIONS TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Recent rule evaluations</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>{sel ? sel.name : 'Bill Pay Booster Qualification'} · live log</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('list',{size:14})} Full log</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Member</th>
                    <th>Event</th>
                    <th>Result</th>
                    <th>Action</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluations.map((ev,i) => {
                    const tone = resultTone[ev.result] || 'slate';
                    return (
                      <tr key={i}>
                        <td className="small" style={{ fontFamily:'var(--mono)', fontSize:12, whiteSpace:'nowrap', color:'var(--text-3)' }}>{ev.time}</td>
                        <td className="small" style={{ fontFamily:'var(--mono)', fontSize:12, fontWeight:600 }}>{ev.member}</td>
                        <td className="small" style={{ fontSize:12.5 }}>{ev.event}</td>
                        <td>
                          <span className={'badge '+tone} style={{ fontSize:11 }}>
                            <span className="dot"></span>{ev.result}
                          </span>
                        </td>
                        <td className="small" style={{ fontSize:12.5, fontWeight: ev.ok ? 600 : 400, color: ev.ok ? 'var(--green)' : 'var(--text-3)' }}>{ev.action}</td>
                        <td className="small muted" style={{ fontSize:12 }}>{ev.reason}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Live · auto-refreshing every 30s</span>
              </div>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* SELECTED RULE DETAIL */}
            {sel && (
              <div className="card">
                <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'var(--r-md)', background: sel.markBg, color:'#fff', display:'grid', placeItems:'center', fontSize:15, fontWeight:700, flex:'none' }}>
                    {sel.mark}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.3 }}>{sel.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginTop:2 }}>{sel.id}</div>
                  </div>
                  <span className={'badge '+(sel.status==='Active'?'green':sel.status==='Scheduled'?'blue':'amber')} style={{ fontSize:11 }}>
                    <span className="dot"></span>{sel.status}
                  </span>
                </div>
                <div style={{ padding:'12px 18px' }}>
                  <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                  {[
                    ['Type',            sel.type],
                    ['Linked campaign', sel.linkedCampaign],
                    ['Event source',    sel.source],
                    ['Priority',        sel.priority],
                    ['Trigger count',   sel.triggerCount],
                    ['Qualifications',  sel.qualifications],
                    ['STARS issued',    sel.starsIssued],
                    ['Failure rate',    sel.failureRate],
                    ['Last updated',    sel.lastUpdated],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, padding:'5px 0' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)', flex:'none' }}>{k}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right', lineHeight:1.4 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ height:1, background:'var(--border)', margin:'12px 0' }}></div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('list',{size:14})} Edit rule</button>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('plus',{size:14})} Duplicate rule</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('pause',{size:14})} Pause rule</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start', color:'var(--accent)' }}>{window.Ic('activity',{size:14})} View evaluation log</button>
                  </div>
                </div>
              </div>
            )}

            {/* RULE HEALTH */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Rule health</div>
                <span className="badge green" style={{ fontSize:11 }}>Healthy</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {healthItems.map((h,i) => {
                  const dotColor = { green:'var(--green)', amber:'var(--amber)', red:'var(--red)', slate:'var(--slate)' }[h.tone];
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'11px 0', borderBottom: i<healthItems.length-1?'1px solid var(--border)':'none' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{h.label}</span>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12.5, fontWeight:600 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:dotColor }}></span>
                        {h.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DEPENDENCY MAP */}
            {sel && (
              <div className="card">
                <div className="card-head">
                  <div className="card-title">Dependency map</div>
                </div>
                <div style={{ padding:'10px 18px 14px' }}>
                  {sel.deps.map(([k,v],i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom: i<sel.deps.length-1?'1px solid var(--border)':'none' }}>
                      <div style={{ width:22, height:22, borderRadius:'var(--r-xs)', background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center', flex:'none' }}>
                        {window.Ic(['campaigns','segments','star','rules','check'][i]||'list',{size:12})}
                      </div>
                      <span style={{ fontSize:12, color:'var(--text-3)', flex:'none' }}>{k}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, marginLeft:'auto', textAlign:'right', lineHeight:1.3 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RULE ALERTS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Rule alerts</div>
                <span className="badge amber" style={{ fontSize:11 }}>4 items</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {alerts.map((a,i) => {
                  const toneMap = { amber:['var(--amber-bg)','var(--amber)'], blue:['var(--blue-bg)','var(--blue)'], slate:['var(--slate-bg)','var(--slate)'] };
                  const [bg,fg] = toneMap[a.tone] || toneMap.slate;
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'12px 0', borderBottom: i<alerts.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
                      <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', flex:'none', marginTop:1, display:'grid', placeItems:'center', background:bg, color:fg }}>
                        {window.Ic(a.tone==='blue'?'calendar':'warn',{size:13,sw:2.2})}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, lineHeight:1.3 }}>{a.label}</div>
                        <div style={{ fontSize:12, color:'var(--text-3)', marginTop:3, lineHeight:1.4 }}>{a.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── CREATE RULE MODAL ── */}
      {showCreate && (
        <div className="scrim" onClick={()=>setShowCreate(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('rules',{size:17})}</div>
              <div>
                <div className="modal-title">Create rule</div>
                <div className="modal-sub">Define a new evaluation rule for the STARS Rules Engine.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowCreate(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>
            <div className="modal-body">
              <div className="grid" style={{ gap:16 }}>
                <div className="field">
                  <label className="label">Rule name</label>
                  <input className="input" placeholder="e.g. Utility Bill Qualification Rule" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Rule type</label>
                    <select className="select">
                      <option>Campaign earning</option>
                      <option>Spend multiplier</option>
                      <option>Referral</option>
                      <option>Tier movement</option>
                      <option>Expiry</option>
                      <option>Fraud control</option>
                      <option>Eligibility control</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Priority</label>
                    <select className="select">
                      <option>P1 — Critical</option>
                      <option>P2 — Standard</option>
                      <option>P3 — Low</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Event source</label>
                    <select className="select">
                      <option>MTB Neo ledger</option>
                      <option>QR payment ledger</option>
                      <option>Card transaction feed</option>
                      <option>STARS wallet</option>
                      <option>Customer identity service</option>
                      <option>CRM profile</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Linked campaign</label>
                    <select className="select">
                      <option>Bill Pay Booster</option>
                      <option>QR Pay Cashback</option>
                      <option>Weekend Card Spend Streak</option>
                      <option>Refer-a-Friend 2.0</option>
                      <option>Platform policy</option>
                      <option>All campaigns</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Condition</label>
                  <textarea className="textarea" rows="3" placeholder="e.g. member.completedBillPayments(last_30_days) >= 3" style={{ fontFamily:'var(--mono)', fontSize:12.5 }} />
                  <span className="hint">Use Rules Engine expression syntax. Reference: member, transaction, event objects.</span>
                </div>
                <div className="field">
                  <label className="label">Action</label>
                  <input className="input" placeholder="e.g. Issue 500 STARS" />
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowCreate(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowCreate(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowCreate(false)}>Create rule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.RulesEnginePage = RulesEnginePage;
