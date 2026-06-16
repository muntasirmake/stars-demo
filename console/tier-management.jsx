// STARS Admin Console — Tier Management page
const { useState: uTM } = React;

function TierManagementPage({ onCreate }) {

  const TIERS = [
    {
      id:'TIR_001', mark:'S', markBg:'var(--slate)', color:'var(--slate)', bg:'var(--slate-bg)', bd:'var(--slate-bd)',
      name:'Silver',   members:'112,600', share:'60.7%', multiplier:'1x',    reviewCycle:'Monthly',   status:'Active',
      qualRule:'Join STARS program',
      benefits:'Base earning, standard rewards',
      upgradeRule:'Join STARS programme — default for all new members',
      gracePeriod:'N/A', linkedCampaigns:2, tierRewards:3,
      logic:'IF member.joinsSTARS()\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN assign(member.tier, "Silver")\nDEFAULT tier for all new STARS members',
      upgrades:[
        {label:'9,350 Silver members close to Gold',    detail:'Within 20% of the 20,000 STARS / quarter threshold',    tone:'green'},
      ],
      campaigns:[{name:'Bill Pay Booster',elig:'All tiers'},{name:'Weekend Card Spend Streak',elig:'All tiers'}],
    },
    {
      id:'TIR_002', mark:'G', markBg:'var(--amber)', color:'var(--amber)', bg:'var(--amber-bg)', bd:'var(--amber-bd)',
      name:'Gold',     members:'48,200',  share:'26.0%', multiplier:'1.25x', reviewCycle:'Quarterly', status:'Active',
      qualRule:'Earn 20,000 STARS / quarter OR spend ৳100K / quarter',
      benefits:'Bonus STARS, priority offers, fee waiver',
      upgradeRule:'20,000 STARS or ৳100K spend / quarter',
      gracePeriod:'30 days', linkedCampaigns:3, tierRewards:6,
      logic:'IF member.starsEarned(current_quarter) >= 20000\nOR member.spend(current_quarter) >= 100000\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN upgrade_or_maintain(member.tier, "Gold")\nREVIEW quarterly\nGRACE PERIOD 30 days\nDOWNGRADE PROTECTION one-cycle grace',
      upgrades:[
        {label:'9,350 Silver members close to Gold',        detail:'Within 20% of the 20,000 STARS threshold',                      tone:'green'},
        {label:'2,180 Gold members close to Platinum',      detail:'Within 20% of the 50,000 STARS threshold',                      tone:'green'},
        {label:'7,600 Gold members at risk of downgrade',   detail:'Activity drop — may fall below Gold threshold this quarter',     tone:'amber'},
      ],
      campaigns:[{name:'Bill Pay Booster',elig:'Gold+ eligible'},{name:'Weekend Card Spend Streak',elig:'All tiers'},{name:'Gold Tier Upgrade Sprint',elig:'Gold eligible'}],
    },
    {
      id:'TIR_003', mark:'P', markBg:'var(--violet)', color:'var(--violet)', bg:'var(--violet-bg)', bd:'var(--violet-bd)',
      name:'Platinum', members:'20,900',  share:'11.3%', multiplier:'1.5x',  reviewCycle:'Quarterly', status:'Active',
      qualRule:'Earn 50,000 STARS / quarter OR spend ৳300K / quarter',
      benefits:'Premium rewards, lounge access, higher limits',
      upgradeRule:'50,000 STARS or ৳300K spend / quarter',
      gracePeriod:'30 days', linkedCampaigns:4, tierRewards:9,
      logic:'IF member.starsEarned(current_quarter) >= 50000\nOR member.spend(current_quarter) >= 300000\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN upgrade_or_maintain(member.tier, "Platinum")\nREVIEW quarterly\nGRACE PERIOD 30 days\nDOWNGRADE PROTECTION one-cycle grace',
      upgrades:[
        {label:'2,180 Gold members close to Platinum',             detail:'Within 20% of the 50,000 STARS threshold',        tone:'green'},
        {label:'1,120 Platinum members eligible for Premier review',detail:'Annual relationship value approaching ৳1M',       tone:'green'},
      ],
      campaigns:[{name:'Bill Pay Booster',elig:'Gold+ eligible'},{name:'Airport Lounge Reward',elig:'Platinum+ eligible'},{name:'Weekend Card Spend Streak',elig:'All tiers'}],
    },
    {
      id:'TIR_004', mark:'R', markBg:'var(--accent)', color:'var(--accent)', bg:'var(--accent-soft)', bd:'var(--accent-tint)',
      name:'Premier',  members:'3,720',   share:'2.0%',  multiplier:'2x',    reviewCycle:'Annual',    status:'Active',
      qualRule:'Invite-only OR ৳1M annual relationship value',
      benefits:'Exclusive rewards, concierge, partner privileges',
      upgradeRule:'Invite-only or ৳1M annual relationship value',
      gracePeriod:'90 days', linkedCampaigns:2, tierRewards:12,
      logic:'IF member.annualRelationshipValue >= 1000000\nOR member.premierInvite === true\nAND member.accountStatus === "Active"\nAND member NOT IN staffAccounts\nTHEN upgrade_or_maintain(member.tier, "Premier")\nREVIEW annually\nGRACE PERIOD 90 days',
      upgrades:[
        {label:'1,120 Platinum members eligible for Premier review',detail:'Annual relationship value approaching ৳1M',         tone:'green'},
        {label:'All Premier members are current',                   detail:'No Premier members at risk of downgrade',           tone:'green'},
      ],
      campaigns:[{name:'Premier Partner Privileges',elig:'Premier only'},{name:'Airport Lounge Reward',elig:'Platinum+ eligible'}],
    },
  ];

  const BENEFITS = [
    {benefit:'Base STARS earning',     values:['Included',     'Included',     'Included',  'Included' ]},
    {benefit:'Earning multiplier',     values:['1x',           '1.25x',        '1.5x',      '2x'       ]},
    {benefit:'Exclusive campaigns',    values:['Limited',      'Included',     'Included',  'Included' ]},
    {benefit:'Fee waiver rewards',     values:['Not included', 'Included',     'Included',  'Included' ]},
    {benefit:'Airport lounge access',  values:['Not included', 'Not included', 'Included',  'Included' ]},
    {benefit:'Concierge / RM support', values:['Not included', 'Not included', 'Limited',   'Included' ]},
    {benefit:'Partner privileges',     values:['Standard',     'Enhanced',     'Premium',   'Premier'  ]},
  ];

  const MOV_CARDS = [
    {label:'Upgraded this month',   value:'4,820', color:'var(--green)',  bg:'var(--green-bg)',  icon:'arrowUp'  },
    {label:'Downgraded this month', value:'1,240', color:'var(--red)',    bg:'var(--red-bg)',    icon:'warn'     },
    {label:'At risk of downgrade',  value:'7,600', color:'var(--amber)',  bg:'var(--amber-bg)',  icon:'warn'     },
    {label:'Close to upgrade',      value:'9,350', color:'var(--accent)', bg:'var(--accent-soft)',icon:'target'  },
  ];

  const TIER_CAMPAIGNS = [
    {name:'Bill Pay Booster',            elig:'Gold+ eligible'},
    {name:'Weekend Card Spend Streak',   elig:'All tiers'},
    {name:'Airport Lounge Reward',       elig:'Platinum+'},
    {name:'Premier Partner Privileges',  elig:'Premier only'},
    {name:'Gold Welcome Bonus',          elig:'Gold only'},
    {name:'Platinum Anniversary Reward', elig:'Platinum+'},
  ];

  const HEALTH = [
    {label:'STARS wallet sync',        val:'Connected',   tone:'green'},
    {label:'Spend data sync',          val:'Connected',   tone:'green'},
    {label:'CRM profile sync',         val:'Connected',   tone:'green'},
    {label:'Last tier review',         val:'Today, 08:30',tone:'green'},
    {label:'Excluded staff / test',    val:'1,120',        tone:'slate'},
  ];

  const DIST = [
    {label:'Silver',   pct:60.7, color:'var(--slate)', bg:'var(--slate-bg)'},
    {label:'Gold',     pct:26.0, color:'var(--amber)', bg:'var(--amber-bg)'},
    {label:'Platinum', pct:11.3, color:'var(--violet)',bg:'var(--violet-bg)'},
    {label:'Premier',  pct:2.0,  color:'var(--accent)',bg:'var(--accent-soft)'},
  ];

  const [sel, setSel] = uTM(TIERS[1]); // default Gold
  const [showEdit, setShowEdit] = uTM(false);
  const selIdx = TIERS.findIndex(t => t.id === sel.id);

  const cellStyle = (val, colIdx) => {
    const isSelected = colIdx === selIdx;
    const baseColor = val==='Included'?'var(--green)':val==='Not included'?'var(--text-4)':val==='Limited'?'var(--amber)':'var(--text)';
    return {
      fontSize:13, fontWeight: isSelected ? 700 : val==='Not included'?400:500,
      color: baseColor,
      background: isSelected ? sel.bg : 'transparent',
      padding:'11px 14px', textAlign:'center', borderBottom:'1px solid var(--border)',
      transition:'background .15s',
    };
  };

  const kpis = [
    {label:'Total tiered members', value:'185,420', sub:'Across all active loyalty tiers',   icon:'users',   iBg:'var(--accent-soft)', iFg:'var(--accent)' },
    {label:'Silver members',       value:'112,600', sub:'60.7% of loyalty base',            icon:'star',    iBg:'var(--slate-bg)',    iFg:'var(--slate)'  },
    {label:'Gold members',         value:'48,200',  sub:'26.0% of loyalty base',            icon:'star',    iBg:'var(--amber-bg)',    iFg:'var(--amber)'  },
    {label:'Platinum members',     value:'20,900',  sub:'11.3% of loyalty base',            icon:'star',    iBg:'var(--violet-bg)',   iFg:'var(--violet)' },
    {label:'Premier members',      value:'3,720',   sub:'2.0% of loyalty base',             icon:'star',    iBg:'var(--accent-soft)', iFg:'var(--accent)' },
  ];

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Tier Management</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Manage Silver, Gold, Platinum, and Premier tiers, upgrade rules, benefits, and tier-based campaign eligibility.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('star',{size:14})} All tiers {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('calendar',{size:14})} Quarterly {window.Ic('chevDown',{size:13})}</button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <div className="search" style={{ width:180, height:34, fontSize:13 }}>
              {window.Ic('search',{size:14})}
              <input placeholder="Search tiers…" />
            </div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowEdit(true)}>
              {window.Ic('list',{size:14})} Edit tier rules
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
                  {window.Ic(k.icon,{size:14})}
                </span>
              </div>
              <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-.02em', fontVariantNumeric:'tabular-nums', lineHeight:1.1, marginBottom:6 }}>{k.value}</div>
              <div style={{ fontSize:11.5, color:'var(--text-3)' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>

            {/* TIER OVERVIEW TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Tier overview</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Click a tier to view detail, rules, and linked campaigns</div>
                </div>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Tier</th><th className="num">Members</th><th>Qualification rule</th>
                    <th>STARS multiplier</th><th>Key benefits</th><th>Review cycle</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((t,i) => {
                    const isSel = sel.id === t.id;
                    return (
                      <tr key={i} style={{ cursor:'pointer', background: isSel?t.bg:undefined, transition:'background .12s' }} onClick={()=>setSel(t)}>
                        <td>
                          <div className="cell-flex">
                            <div className="row-ic" style={{ background:t.markBg, color:'#fff', fontWeight:700, fontSize:13 }}>{t.mark}</div>
                            <div>
                              <a className="link" style={{ fontWeight:700, color: isSel?t.color:undefined }} onClick={e=>{e.stopPropagation();setSel(t);}}>{t.name}</a>
                              <div className="cell-sub" style={{ fontFamily:'var(--mono)', fontSize:11 }}>{t.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="num tnum" style={{ fontWeight:600 }}>{t.members}</td>
                        <td className="small muted" style={{ fontSize:12.5, maxWidth:200 }}>{t.qualRule}</td>
                        <td><span style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight:700, color:t.color }}>{t.multiplier}</span></td>
                        <td className="small muted" style={{ fontSize:12.5, maxWidth:180 }}>{t.benefits}</td>
                        <td><span className="tag" style={{ fontSize:11 }}>{t.reviewCycle}</span></td>
                        <td><span className="badge green" style={{ fontSize:11 }}><span className="dot"></span>{t.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TIER MOVEMENT */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier movement</div>
                <span className="xsmall muted-2">Current month · rolling 30 days</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
                {MOV_CARDS.map((c,i) => (
                  <div key={i} style={{ padding:'18px 20px', borderRight: i<MOV_CARDS.length-1?'1px solid var(--border)':'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                      <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', background:c.bg, color:c.color, display:'grid', placeItems:'center' }}>
                        {window.Ic(c.icon,{size:13,sw:2})}
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>{c.label}</span>
                    </div>
                    <div style={{ fontSize:26, fontWeight:700, letterSpacing:'-.02em', fontVariantNumeric:'tabular-nums', color:c.color }}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BENEFITS MATRIX */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Benefits matrix</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Selected tier <b style={{ color:sel.color }}>{sel.name}</b> is highlighted</div>
                </div>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Benefit</th>
                    {TIERS.map((t,i) => (
                      <th key={i} style={{ textAlign:'center', background: i===selIdx?t.bg:'var(--surface-2)', color: i===selIdx?t.color:undefined, cursor:'pointer' }} onClick={()=>setSel(t)}>
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BENEFITS.map((row,ri) => (
                    <tr key={ri}>
                      <td className="small" style={{ fontWeight:500, fontSize:13 }}>{row.benefit}</td>
                      {row.values.map((v,ci) => (
                        <td key={ci} style={cellStyle(v,ci)}>
                          {v==='Included'
                            ? <span style={{ color:'var(--green)', fontWeight:600 }}>{v}</span>
                            : v==='Not included'
                              ? <span style={{ color:'var(--text-4)' }}>—</span>
                              : v==='Limited'
                                ? <span style={{ color:'var(--amber)', fontWeight:600 }}>{v}</span>
                                : <span style={{ fontWeight:600 }}>{v}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TIER RULE PREVIEW */}
            <div className="card">
              <div className="card-head">
                <div style={{ flex:1 }}>
                  <div className="card-title">Tier rule preview</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Qualification logic · <b>{sel.name}</b> tier · reviewed {sel.reviewCycle.toLowerCase()}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:sel.color, background:sel.bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}>{sel.multiplier} STARS</span>
              </div>
              <div style={{ padding:'0 22px' }}>
                <div style={{ padding:'11px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)' }}></div>
                  <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>
                    Tier engine · review: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.reviewCycle.toLowerCase()}</span> · grace: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.gracePeriod.toLowerCase()}</span>
                  </span>
                </div>
                <div style={{ padding:'18px 0', fontFamily:'var(--mono)', fontSize:13, lineHeight:2.1, color:'var(--text)' }}>
                  {sel.logic.split('\n').map((line,i) => {
                    const kw = ['IF','OR','AND','THEN','REVIEW','GRACE','DOWNGRADE','DEFAULT'].find(k=>line.trim().startsWith(k));
                    const isThen = line.trim().startsWith('THEN');
                    const isMeta = ['REVIEW','GRACE','DOWNGRADE','DEFAULT'].some(k=>line.trim().startsWith(k));
                    const isOr = line.trim().startsWith('OR');
                    return (
                      <div key={i} style={{ paddingLeft: (isOr||line.trim().startsWith('AND'))&&!isMeta ? 24 : 0 }}>
                        {kw && <span style={{ color: isThen?'var(--green)':isMeta?'var(--text-3)':'var(--accent)', fontWeight:700 }}>{kw}</span>}
                        <span style={{ color: isThen?'var(--green)':isMeta?'var(--text-3)':'var(--text)' }}>
                          {kw ? line.trim().slice(kw.length) : line}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* UPGRADE FUNNEL */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Upgrade funnel</div>
                <span className="xsmall muted-2">Close to next tier</span>
              </div>
              <div style={{ padding:'16px 22px', display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  {from:'Silver',  to:'Gold',    n:9350,  total:112600, color:'var(--amber)',  bg:'var(--amber-bg)'  },
                  {from:'Gold',    to:'Platinum', n:2180,  total:48200,  color:'var(--violet)', bg:'var(--violet-bg)' },
                  {from:'Platinum',to:'Premier',  n:1120,  total:20900,  color:'var(--accent)', bg:'var(--accent-soft)'},
                ].map((f,i) => {
                  const pct = Math.round(f.n/f.total*100*10)/10;
                  return (
                    <div key={i}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7 }}>
                        <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text-3)' }}>{f.from}</span>
                        <div style={{ display:'flex', alignItems:'center', gap:4, color:'var(--text-3)' }}>{window.Ic('arrow',{size:13,sw:2})}</div>
                        <span style={{ fontSize:12.5, fontWeight:700, color:f.color }}>{f.to}</span>
                        <span style={{ marginLeft:'auto', fontSize:13, fontWeight:700, color:f.color, fontVariantNumeric:'tabular-nums' }}>{f.n.toLocaleString()} members</span>
                        <span style={{ fontSize:11.5, color:'var(--text-3)' }}>{pct}%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width:pct+'%', background:f.color }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TIER DISTRIBUTION TREND */}
            <div className="card">
              <div className="card-head">
                <div style={{ flex:1 }}>
                  <div className="card-title">Tier distribution trend</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Indexed growth from Jul 2025 · base = 100</div>
                </div>
                <div className="chart-legend" style={{ gap:10 }}>
                  {[['var(--slate)','Silver'],['var(--amber)','Gold'],['var(--violet)','Platinum'],['var(--accent)','Premier']].map(([c,l])=>(
                    <span key={l} className="legend-item"><span className="legend-swatch" style={{ background:c }}></span>{l}</span>
                  ))}
                </div>
              </div>
              <div className="card-pad">
                <svg viewBox="0 0 600 110" width="100%" height="110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="tgPremier" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F5BD5" stopOpacity="0.12"/><stop offset="1" stopColor="#4F5BD5" stopOpacity="0"/></linearGradient>
                  </defs>
                  <g className="area-grid"><line x1="0" y1="22" x2="600" y2="22"/><line x1="0" y1="55" x2="600" y2="55"/><line x1="0" y1="88" x2="600" y2="88"/></g>
                  {/* Premier - fastest growing */}
                  <path d="M0,88 C30,88 50,88 109,77 C163,66 200,55 272,44 C327,33 381,22 436,18 C490,14 545,12 600,11" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
                  {/* Platinum - growing */}
                  <path d="M0,88 C50,85 90,80 163,74 C218,68 272,62 327,58 C381,54 436,52 600,50" fill="none" stroke="var(--violet)" strokeWidth="2.2" strokeLinecap="round"/>
                  {/* Gold - stable/slight growth */}
                  <path d="M0,88 C80,86 160,84 218,82 C272,80 327,79 381,78 C436,78 490,76 600,76" fill="none" stroke="var(--amber)" strokeWidth="2.2" strokeLinecap="round"/>
                  {/* Silver - slowly declining as members upgrade */}
                  <path d="M0,88 C80,89 160,90 218,91 C272,92 327,92.5 381,93 C436,93 490,93.5 600,94" fill="none" stroke="var(--slate)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="5,3"/>
                </svg>
                <div className="chart-axis" style={{ paddingTop:4 }}>
                  <span>Jul '25</span><span>Sep</span><span>Nov</span><span>Jan '26</span><span>Mar</span><span>May</span><span>Jun</span>
                </div>
                <div style={{ marginTop:10, padding:'10px 12px', background:'var(--accent-soft)', border:'1px solid var(--accent-tint)', borderRadius:'var(--r-sm)', fontSize:12, color:'var(--text-2)', lineHeight:1.5 }}>
                  Premier tier shows the highest growth index (+33% since Jul 2025). Silver is gradually declining as members qualify for Gold — a healthy sign.
                </div>
              </div>
            </div>

            {/* TIER LIABILITY */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier liability</div>
                <span className="xsmall muted-2">Outstanding unredeemed STARS by tier</span>
              </div>
              <div style={{ padding:'14px 22px 16px' }}>
                {[
                  {name:'Silver',   val:'৳5.2L', pct:28, color:'var(--slate)'  },
                  {name:'Gold',     val:'৳4.1L', pct:22, color:'var(--amber)'  },
                  {name:'Platinum', val:'৳6.8L', pct:37, color:'var(--violet)' },
                  {name:'Premier',  val:'৳2.4L', pct:13, color:'var(--accent)' },
                ].map((t,i)=>{
                  const isSelected = TIERS[i].id === sel.id;
                  return (
                    <div key={i} style={{ marginBottom:12, cursor:'pointer' }} onClick={()=>setSel(TIERS[i])}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ fontSize:12.5, fontWeight:600, color: isSelected?t.color:'var(--text-2)' }}>{t.name}</span>
                        <span style={{ fontSize:12.5, fontWeight:700, color:t.color, fontVariantNumeric:'tabular-nums' }}>{t.val}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width:t.pct+'%', background:t.color, opacity: isSelected?1:0.7 }}></div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ height:1, background:'var(--border)', margin:'10px 0' }}></div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:12.5, color:'var(--text-3)' }}>Total tier liability</span>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--amber)', fontVariantNumeric:'tabular-nums' }}>৳18.5L</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontSize:12.5, color:'var(--text-3)' }}>Highest liability tier</span>
                  <span style={{ fontSize:12.5, fontWeight:600, color:'var(--violet)' }}>Platinum</span>
                </div>
                <div style={{ padding:'9px 12px', background:'var(--bg-sunken)', borderRadius:'var(--r-sm)', fontSize:12, color:'var(--text-3)', lineHeight:1.5 }}>
                  Based on outstanding unredeemed STARS by tier.
                </div>
              </div>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* SELECTED TIER DETAIL */}
            <div className="card">
              <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:'var(--r-md)', background:sel.markBg, color:'#fff', display:'grid', placeItems:'center', fontSize:16, fontWeight:800, flex:'none' }}>
                  {sel.mark}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:15, fontWeight:700, letterSpacing:'-.01em' }}>{sel.name} Tier</div>
                  <div style={{ fontSize:12, color:'var(--text-3)', marginTop:1 }}>{sel.id}</div>
                </div>
                <span className="badge green" style={{ fontSize:11 }}><span className="dot"></span>{sel.status}</span>
              </div>
              <div style={{ padding:'12px 18px' }}>
                <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                {[
                  ['Members',          sel.members],
                  ['Share of base',    sel.share],
                  ['STARS multiplier', sel.multiplier],
                  ['Review cycle',     sel.reviewCycle],
                  ['Upgrade rule',     sel.upgradeRule],
                  ['Grace period',     sel.gracePeriod],
                  ['Linked campaigns', sel.linkedCampaigns+' campaigns'],
                  ['Tier-gated rewards', sel.tierRewards+' rewards'],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', gap:8, padding:'5px 0' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right' }}>{v}</span>
                  </div>
                ))}
                <div style={{ height:1, background:'var(--border)', margin:'12px 0' }}></div>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }} onClick={()=>setShowEdit(true)}>{window.Ic('list',{size:14})} Edit tier</button>
                  <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('star',{size:14})} Edit benefits</button>
                  <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start', color:'var(--accent)' }}>{window.Ic('users',{size:14})} View members</button>
                  <button className="btn btn-primary btn-sm" style={{ justifyContent:'flex-start' }} onClick={onCreate}>{window.Ic('campaigns',{size:14})} Create tier campaign</button>
                </div>
              </div>
            </div>

            {/* TIER DISTRIBUTION */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier distribution</div>
                <span className="xsmall muted-2">185,420 members</span>
              </div>
              <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                {DIST.map((d,i) => (
                  <div key={i} style={{ cursor:'pointer' }} onClick={()=>setSel(TIERS[i])}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:12.5, fontWeight:600, color:d.color }}>{d.label}</span>
                      <span style={{ fontSize:12.5, fontWeight:700, color:d.color }}>{d.pct}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width:d.pct+'%', background:d.color, opacity: TIERS[i].id===sel.id?1:0.6 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPGRADE OPPORTUNITIES */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Upgrade opportunities</div>
                <span className="badge green" style={{ fontSize:11 }}>4 signals</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {[
                  {label:'9,350 Silver → Gold',            detail:'Within 20% of Gold STARS threshold',              tone:'green'},
                  {label:'2,180 Gold → Platinum',          detail:'Within 20% of Platinum STARS threshold',          tone:'green'},
                  {label:'7,600 Gold at-risk of downgrade',detail:'Activity drop this quarter',                      tone:'amber'},
                  {label:'1,120 Platinum → Premier review',detail:'Annual relationship value approaching ৳1M',       tone:'green'},
                ].map((o,i,arr)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'11px 0', borderBottom:i<arr.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
                    <div style={{ width:24, height:24, borderRadius:'var(--r-xs)', flex:'none', marginTop:1, display:'grid', placeItems:'center',
                      background: o.tone==='green'?'var(--green-bg)':'var(--amber-bg)',
                      color:      o.tone==='green'?'var(--green)':'var(--amber)',
                    }}>
                      {window.Ic(o.tone==='green'?'arrowUp':'warn',{size:12,sw:2.2})}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12.5, fontWeight:600, lineHeight:1.3 }}>{o.label}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', marginTop:2, lineHeight:1.4 }}>{o.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER-LINKED CAMPAIGNS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier-linked campaigns</div>
              </div>
              <div style={{ padding:'0 16px' }}>
                {TIER_CAMPAIGNS.map((c,i,arr)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom:i<arr.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
                    <div style={{ width:24, height:24, borderRadius:'var(--r-xs)', background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center', flex:'none' }}>
                      {window.Ic('campaigns',{size:12})}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{c.name}</div>
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', background:'var(--bg-sunken)', border:'1px solid var(--border-2)', borderRadius:'var(--r-pill)', padding:'2px 8px', whiteSpace:'nowrap' }}>{c.elig}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER ECONOMICS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier economics</div>
                <span className="xsmall muted-2">Est. reward cost</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {[
                  {tier:'Silver',   cost:'৳120 / member',   color:'var(--slate)',  bg:'var(--slate-bg)' },
                  {tier:'Gold',     cost:'৳280 / member',   color:'var(--amber)',  bg:'var(--amber-bg)' },
                  {tier:'Platinum', cost:'৳780 / member',   color:'var(--violet)', bg:'var(--violet-bg)'},
                  {tier:'Premier',  cost:'৳2,100 / member', color:'var(--accent)', bg:'var(--accent-soft)'},
                ].map((t,i,arr)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 0', borderBottom:i<arr.length-1?'1px solid var(--border)':'none' }}>
                    <span style={{ fontSize:12, fontWeight:700, color:t.color, background:t.bg, borderRadius:'var(--r-pill)', padding:'2px 9px', flex:'none' }}>{t.tier}</span>
                    <span style={{ marginLeft:'auto', fontSize:13, fontWeight:700, fontVariantNumeric:'tabular-nums', color:t.color }}>{t.cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding:'12px 18px', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--text-3)', lineHeight:1.5, background:'var(--surface-2)' }}>
                Higher tiers carry higher reward cost but represent higher-value customers.
              </div>
            </div>

            {/* DOWNGRADE RISK DRIVERS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Downgrade risk drivers</div>
                <span className="badge amber" style={{ fontSize:11 }}>7,600 at risk</span>
              </div>
              <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  {label:'Activity decline',        pct:45, color:'var(--amber)' },
                  {label:'Low spend',               pct:30, color:'var(--amber)' },
                  {label:'No app engagement',       pct:15, color:'var(--red)'   },
                  {label:'Inactive STARS earning',  pct:10, color:'var(--slate)' },
                ].map((d,i)=>(
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:12.5, color:'var(--text-2)', fontWeight:500 }}>{d.label}</span>
                      <span style={{ fontSize:12.5, fontWeight:700, color:d.color }}>{d.pct}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width:d.pct+'%', background:d.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER QUALIFICATION SOURCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Tier qualification source</div>
              </div>
              <div style={{ padding:'0 18px' }}>
                {[
                  ['Tier source',        'MTB Core Banking + STARS Wallet'],
                  ['Refresh frequency',  'Daily'],
                  ['Last sync',          'Today, 08:15'],
                  ['Data steward',       'MTB IT'],
                  ['Business owner',     'MTB Loyalty Team'],
                ].map(([k,v],i,arr)=>(
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10, padding:'10px 0', borderBottom:i<arr.length-1?'1px solid var(--border)':'none' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right', lineHeight:1.4 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER DATA HEALTH */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Tier data health</div>
                <span className="badge green" style={{ fontSize:11 }}>Healthy</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {HEALTH.map((h,i)=>{
                  const dot = {green:'var(--green)',amber:'var(--amber)',slate:'var(--slate)'}[h.tone];
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'10px 0', borderBottom:i<HEALTH.length-1?'1px solid var(--border)':'none' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{h.label}</span>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12.5, fontWeight:600 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:dot }}></span>{h.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── EDIT TIER RULES MODAL ── */}
      {showEdit && (
        <div className="scrim" onClick={()=>setShowEdit(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('star',{size:17})}</div>
              <div>
                <div className="modal-title">Edit tier rules — {sel.name}</div>
                <div className="modal-sub">Modify qualification thresholds, review cycle, and grace period.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowEdit(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>
            <div className="modal-body">
              <div className="grid" style={{ gap:16 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Tier</label>
                    <input className="input" disabled value={sel.name} />
                  </div>
                  <div className="field">
                    <label className="label">STARS multiplier</label>
                    <div className="input-group"><input className="input has-suffix tnum" defaultValue={sel.multiplier.replace('x','')} /><span className="input-suffix">×</span></div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Qualification rule</label>
                  <textarea className="textarea" rows="2" defaultValue={sel.qualRule} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Review cycle</label>
                    <select className="select" defaultValue={sel.reviewCycle}>
                      <option>Monthly</option><option>Quarterly</option><option>Annual</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Grace period</label>
                    <input className="input tnum" defaultValue={sel.gracePeriod} />
                  </div>
                </div>
                <div className="callout info">
                  <span className="c-ic">{window.Ic('info',{size:18,sw:1.7})}</span>
                  <div><div className="callout-title">Changes require Finance approval</div>Tier rule changes affecting member count or liability exposure require Finance + Risk sign-off before taking effect.</div>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowEdit(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowEdit(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowEdit(false)}>Submit for approval</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.TierManagementPage = TierManagementPage;
