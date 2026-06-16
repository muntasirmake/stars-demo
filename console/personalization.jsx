// STARS Admin Console — Personalization Engine page
const { useState: uPE } = React;

const PE_STATUS_TONE = {
  'Active':  { bg:'var(--green-bg)',  fg:'var(--green)'  },
  'Draft':   { bg:'var(--slate-bg)', fg:'var(--slate)'  },
  'Paused':  { bg:'var(--amber-bg)', fg:'var(--amber)'  },
  'Pending': { bg:'var(--blue-bg)',  fg:'var(--blue)'   },
};

function PEStatusPill({ status }) {
  const t = PE_STATUS_TONE[status] || PE_STATUS_TONE['Draft'];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:t.fg, flex:'none' }}></span>
      {status}
    </span>
  );
}

function PersonalizationPage({ onCreate }) {

  const ACTION_CARDS = [
    {
      id:'PAC_001', segment:'New User',
      segColor:'var(--violet)', segBg:'var(--violet-bg)',
      condition:'Profile completion < 100%',
      message:'Complete your profile and earn 500 STARS',
      reward:'500 STARS', status:'Active', approval:'Approved', users:'12,400', completionRate:41, journey:'Onboarding',
    },
    {
      id:'PAC_002', segment:'No Bill-Pay History',
      segColor:'var(--blue)', segBg:'var(--blue-bg)',
      condition:'Zero bill payments in last 60 days',
      message:'Pay your first utility bill and earn 300 STARS',
      reward:'300 STARS', status:'Active', approval:'Approved', users:'28,300', completionRate:22, journey:'Activation',
    },
    {
      id:'PAC_003', segment:'Frequent Bill Payer',
      segColor:'var(--green)', segBg:'var(--green-bg)',
      condition:'2+ bill payments this month',
      message:'Pay 1 more bill to complete your monthly streak',
      reward:'200 STARS streak bonus', status:'Active', approval:'Approved', users:'38,900', completionRate:58, journey:'Engagement',
    },
    {
      id:'PAC_004', segment:'Dormant User',
      segColor:'var(--amber)', segBg:'var(--amber-bg)',
      condition:'No app activity in 30+ days',
      message:'Come back and complete one transaction',
      reward:'500 STARS reactivation bonus', status:'Active', approval:'Approved', users:'31,600', completionRate:14, journey:'Reactivation',
    },
    {
      id:'PAC_005', segment:'Product-Ready User',
      segColor:'var(--accent)', segBg:'var(--accent-soft)',
      condition:'Watched card education content',
      message:'Explore your credit card benefits today',
      reward:'1,000 STARS', status:'Draft', approval:'Needs review', users:'8,200', completionRate:0, journey:'Product Education',
    },
  ];

  const JOURNEY_RULES = [
    {
      id:'JR_001', ifSeg:'New User', ifBehavior:'profile is incomplete',
      then:'Show Profile Completion Mission', thenType:'Mission', priority:'P1', status:'Active',
    },
    {
      id:'JR_002', ifSeg:'Frequent Bill Payer', ifBehavior:'paid 2 bills this month',
      then:'Show Bill Pay Streak Card', thenType:'Streak card', priority:'P2', status:'Active',
    },
    {
      id:'JR_003', ifSeg:'Dormant 30+ days', ifBehavior:'no app login in 30 days',
      then:'Show Reactivation Mission', thenType:'Mission', priority:'P3', status:'Active',
    },
    {
      id:'JR_004', ifSeg:'Product-Ready User', ifBehavior:'watched card education content',
      then:'Show Card Benefits Mission', thenType:'Mission', priority:'P4', status:'Draft',
    },
  ];

  const PREVIEWS = {
    new_user: {
      label:'New User', greeting:'Welcome to MTB NEO',
      action:'Complete your profile',
      actionSub:'3 of 5 steps completed',
      mission:'Profile Completion Bonus', missionProgress:60, missionSteps:'3 of 5 steps completed',
      reward:'500 STARS', rewardSub:'Earn on completion',
      nudge:'Finish your profile to unlock your first reward.',
      accent:'#5B3AE8',
    },
    dormant: {
      label:'Dormant User', greeting:'Welcome back to MTB NEO',
      action:'Complete one transaction',
      actionSub:'Reactivate your rewards journey',
      mission:'Reactivation Mission', missionProgress:0, missionSteps:'0 of 1 step done',
      reward:'500 STARS reactivation bonus', rewardSub:'One-time reactivation bonus',
      nudge:'One transaction brings you back into your rewards journey.',
      accent:'#D97706',
    },
    bill_payer: {
      label:'Frequent Bill Payer', greeting:'Keep your streak going',
      action:'Pay 1 more bill',
      actionSub:'2 of 3 payments completed',
      mission:'Bill Pay Streak — June', missionProgress:67, missionSteps:'2 of 3 payments completed',
      reward:'200 STARS streak bonus', rewardSub:'Bonus on streak completion',
      nudge:'You\'re almost there. One more payment completes your June streak.',
      accent:'#137A4F',
    },
    product_ready: {
      label:'Product-Ready User', greeting:'Explore card benefits',
      action:'Learn about MTB credit card benefits',
      actionSub:'Eligible for card education reward',
      mission:'Card Benefits Education', missionProgress:0, missionSteps:'0 of 5 sections explored',
      reward:'1,000 STARS', rewardSub:'On completing the card education journey',
      nudge:'Watch a short guide and unlock your next reward.',
      accent:'#4F5BD5',
    },
    gold_tier: {
      label:'Gold Tier User', greeting:'Gold benefits unlocked',
      action:'Redeem your priority benefit',
      actionSub:'Gold tier exclusive benefit available',
      mission:'Gold Tier Benefit', missionProgress:40, missionSteps:'2 of 5 milestones reached',
      reward:'Fee waiver / partner voucher', rewardSub:'Gold-tier exclusive reward',
      nudge:'You have unlocked exclusive Gold tier benefits.',
      accent:'#B45309',
    },
  };

  const PERFORMANCE = [
    { journey:'Bill Pay Streak',    rate:58, color:'var(--green)',  users:'22,562' },
    { journey:'Profile Completion', rate:41, color:'var(--violet)', users:'5,084'  },
    { journey:'Card Benefits',      rate:28, color:'var(--accent)', users:'2,296'  },
    { journey:'Reactivation',       rate:14, color:'var(--amber)',  users:'4,424'  },
  ];

  const LIFECYCLE = [
    { from:'Onboarded',  to:'Activated',      n:'11,200', color:'var(--violet)' },
    { from:'Activated',  to:'Frequent',        n:'4,800',  color:'var(--green)'  },
    { from:'Frequent',   to:'Product-Ready',   n:'2,400',  color:'var(--accent)' },
  ];

  const REWARD_COST = [
    { label:'STARS issued',          val:'4.8M',  color:'var(--accent)' },
    { label:'Est. liability',        val:'৳4.2L', color:'var(--amber)'  },
    { label:'Cost per completion',   val:'৳88',   color:'var(--slate)'  },
  ];

  const kpis = [
    { label:'Next actions shown',                   value:'2.4M',           sub:'Last 30 days · all segments',      iBg:'var(--accent-soft)', iFg:'var(--accent)', icon:'bolt'    },
    { label:'Action completion rate',               value:'34.2%',          sub:'+6.1pp vs. last month',            iBg:'var(--green-bg)',    iFg:'var(--green)',  icon:'target'  },
    { label:'Users moved to next lifecycle stage',  value:'18,400',         sub:'Onboarded → Activated and beyond', iBg:'var(--blue-bg)',     iFg:'var(--blue)',   icon:'arrowUp' },
    { label:'Best performing journey',              value:'Bill Pay Streak', sub:'58% completion rate',             iBg:'var(--amber-bg)',    iFg:'var(--amber)',  icon:'star'    },
  ];

  const SEGS = [
    { key:'new_user',      label:'New User'            },
    { key:'dormant',       label:'Dormant User'        },
    { key:'bill_payer',    label:'Frequent Bill Payer' },
    { key:'product_ready', label:'Product-Ready User'  },
    { key:'gold_tier',     label:'Gold Tier User'      },
  ];

  const [selSeg, setSelSeg] = uPE('bill_payer');
  const [showCreate, setShowCreate] = uPE(false);
  const [formSeg, setFormSeg] = uPE('New User');
  const [formMsg, setFormMsg] = uPE('');
  const [formReward, setFormReward] = uPE('500 STARS');
  const [formPriority, setFormPriority] = uPE('P2');
  const preview = PREVIEWS[selSeg];

  const SEG_SIZES = {
    'New User':'12,400','No Bill-Pay History':'28,300','Frequent Bill Payer':'38,900',
    'Dormant User':'31,600','Product-Ready User':'8,200','Gold Tier User':'24,800','Custom segment…':'—',
  };
  const accentFor = s => s==='Frequent Bill Payer'?'#137A4F':s==='Dormant User'?'#D97706':s==='Gold Tier User'?'#B45309':s==='No Bill-Pay History'?'#2563EB':s==='Product-Ready User'?'#4F5BD5':'#5B3AE8';

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Personalization Engine</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Configure relevant missions, rewards, nudges, and next actions for each customer stage.</p>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:7, padding:'4px 11px', background:'var(--slate-bg)', border:'1px solid var(--border-2)', borderRadius:'var(--r-pill)', fontSize:11.5, color:'var(--text-3)', lineHeight:1 }}>
              {window.Ic('check', { size:12, sw:2.3 })}
              Rule-controlled · Approval-ready · AI-assisted recommendations can be added later
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('segments',{size:14})} All segments {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowCreate(true)}>
              {window.Ic('plus',{size:14})} Create action
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:'22px 28px 32px' }}>

        {/* ── KPI ROW ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:22 }}>
          {kpis.map((k,i) => (
            <div key={i} className="card" style={{ padding:'16px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text-2)', lineHeight:1.3 }}>{k.label}</span>
                <span style={{ width:28, height:28, borderRadius:'var(--r-sm)', background:k.iBg, color:k.iFg, display:'grid', placeItems:'center', flex:'none' }}>
                  {window.Ic(k.icon, { size:14 })}
                </span>
              </div>
              <div style={{ fontSize: i===3 ? 17 : 24, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, marginBottom:6, fontVariantNumeric:'tabular-nums' }}>{k.value}</div>
              <div style={{ fontSize:11.5, color:'var(--text-3)', lineHeight:1.4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>

            {/* TODAY'S ACTION CARDS */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Today's action cards</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>What each segment sees as their primary next action in the MTB Neo app</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Segment</th>
                    <th>Condition</th>
                    <th>App message</th>
                    <th>Reward</th>
                    <th className="num">Reach</th>
                    <th style={{ minWidth:110 }}>Completion</th>
                    <th>Status</th>
                    <th>Approval</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ACTION_CARDS.map((row,i) => (
                    <tr key={i}>
                      <td>
                        <span style={{ display:'inline-flex', alignItems:'center', fontSize:11.5, fontWeight:600, color:row.segColor, background:row.segBg, borderRadius:'var(--r-pill)', padding:'3px 9px', whiteSpace:'nowrap' }}>
                          {row.segment}
                        </span>
                      </td>
                      <td className="small muted" style={{ fontSize:12, maxWidth:150 }}>{row.condition}</td>
                      <td style={{ fontSize:13, fontWeight:500, maxWidth:220, lineHeight:1.4 }}>{row.message}</td>
                      <td>
                        <span style={{ fontSize:12.5, fontWeight:700, color:'var(--accent)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{row.reward}</span>
                      </td>
                      <td className="num tnum" style={{ fontSize:12.5 }}>{row.users}</td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ flex:1, height:4, background:'var(--border)', borderRadius:2, overflow:'hidden', minWidth:44 }}>
                            <div style={{ height:'100%', width:row.completionRate+'%', borderRadius:2, background: row.completionRate>=45 ? 'var(--green)' : row.completionRate>=20 ? 'var(--accent)' : 'var(--amber)' }}></div>
                          </div>
                          <span style={{ fontSize:12, fontWeight:700, color:'var(--text-2)', minWidth:28, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{row.completionRate}%</span>
                        </div>
                      </td>
                      <td><PEStatusPill status={row.status} /></td>
                      <td>
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600,
                          borderRadius:'var(--r-pill)', padding:'3px 9px', whiteSpace:'nowrap',
                          color: row.approval==='Approved' ? 'var(--green)' : 'var(--amber)',
                          background: row.approval==='Approved' ? 'var(--green-bg)' : 'var(--amber-bg)',
                        }}>
                          <span style={{ width:5, height:5, borderRadius:'50%', flex:'none',
                            background: row.approval==='Approved' ? 'var(--green)' : 'var(--amber)',
                          }}></span>
                          {row.approval}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize:11.5, padding:'3px 9px' }}>{window.Ic('list',{size:13})} Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">{ACTION_CARDS.length} action cards configured · {ACTION_CARDS.filter(c=>c.status==='Active').length} active</span>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft:'auto' }} onClick={()=>setShowCreate(true)}>
                  {window.Ic('plus',{size:13})} Add action card
                </button>
              </div>
            </div>

            {/* JOURNEY RULES */}
            <div className="card">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Journey rules</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Rule-based eligibility logic · each rule is version-controlled and requires approval</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={()=>setShowCreate(true)}>{window.Ic('plus',{size:14})} Add rule</button>
              </div>
              <div style={{ padding:'0 20px 4px' }}>
                {JOURNEY_RULES.map((rule,i) => (
                  <div key={i} style={{ padding:'16px 0', borderBottom: i<JOURNEY_RULES.length-1 ? '1px solid var(--border)' : 'none' }}>
                    {/* Rule row */}
                    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                      {/* Priority */}
                      <span style={{
                        fontFamily:'var(--mono)', fontSize:11, fontWeight:800, borderRadius:'var(--r-sm)', padding:'3px 9px', flex:'none', letterSpacing:'.03em',
                        color: rule.priority==='P1'?'var(--red)':rule.priority==='P2'?'var(--amber)':rule.priority==='P3'?'var(--slate)':'var(--text-3)',
                        background: rule.priority==='P1'?'var(--red-bg)':rule.priority==='P2'?'var(--amber-bg)':'var(--slate-bg)',
                        border: '1px solid', borderColor: rule.priority==='P1'?'var(--red-bd)':rule.priority==='P2'?'var(--amber-bd)':'var(--border-2)',
                      }}>{rule.priority}</span>
                      {/* IF */}
                      <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--accent)', background:'var(--accent-soft)', borderRadius:'var(--r-sm)', padding:'3px 8px', flex:'none' }}>IF</span>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', fontSize:12.5, fontWeight:600, cursor:'default' }}>
                        {window.Ic('segments',{size:13})}
                        {rule.ifSeg}
                        {window.Ic('chevDown',{size:12})}
                      </div>
                      <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--text-3)', padding:'3px 6px' }}>AND</span>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', fontSize:12.5, fontWeight:600, cursor:'default' }}>
                        {window.Ic('activity',{size:13})}
                        {rule.ifBehavior}
                        {window.Ic('chevDown',{size:12})}
                      </div>
                      {/* Arrow */}
                      <div style={{ color:'var(--text-4)', display:'flex', alignItems:'center' }}>
                        {window.Ic('arrow',{size:15,sw:2})}
                      </div>
                      {/* THEN */}
                      <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--green)', background:'var(--green-bg)', borderRadius:'var(--r-sm)', padding:'3px 8px', flex:'none' }}>THEN</span>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', background:'var(--green-bg)', border:'1px solid rgba(19,122,79,.18)', borderRadius:'var(--r-md)', fontSize:12.5, fontWeight:600, color:'var(--green)', cursor:'default' }}>
                        {window.Ic('bolt',{size:13})}
                        {rule.then}
                        {window.Ic('chevDown',{size:12})}
                      </div>
                      {/* Status + edit */}
                      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, flex:'none' }}>
                        <PEStatusPill status={rule.status} />
                        <button className="btn btn-ghost btn-sm" style={{ padding:'3px 8px' }}>{window.Ic('list',{size:13})}</button>
                      </div>
                    </div>
                    {/* Rule meta */}
                    <div style={{ marginTop:8, fontSize:12, color:'var(--text-3)' }}>
                      <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--text-4)' }}>{rule.id}</span>
                      {' · '}Priority: <strong>{rule.priority}</strong>
                      {' · '}Output: <strong>{rule.thenType}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PERSONALIZATION PERFORMANCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Personalization performance</div>
                <span className="xsmall muted-2">Last 30 days</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>

                {/* Completion by journey */}
                <div style={{ padding:'16px 20px', borderRight:'1px solid var(--border)' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:14 }}>Completion rate by journey</div>
                  {PERFORMANCE.map((p,i) => (
                    <div key={i} style={{ marginBottom:13 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ fontSize:12.5, color:'var(--text-2)', fontWeight:500 }}>{p.journey}</span>
                        <span style={{ fontSize:12.5, fontWeight:700, color:p.color, fontVariantNumeric:'tabular-nums' }}>{p.rate}%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width:p.rate+'%', background:p.color }}></div>
                      </div>
                      <div style={{ fontSize:11, color:'var(--text-4)', marginTop:3 }}>{p.users} users completed</div>
                    </div>
                  ))}
                </div>

                {/* Lifecycle + Reward cost */}
                <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:0 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:12 }}>Lifecycle movement</div>
                  {LIFECYCLE.map((m,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
                      <div style={{ flex:1, fontSize:12.5, lineHeight:1.3 }}>
                        <span style={{ color:'var(--text-3)' }}>{m.from}</span>
                        <span style={{ color:'var(--text-4)', margin:'0 4px' }}>→</span>
                        <span style={{ fontWeight:600 }}>{m.to}</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:m.color, fontVariantNumeric:'tabular-nums', flex:'none' }}>{m.n}</span>
                    </div>
                  ))}
                  <div style={{ height:1, background:'var(--border)', margin:'16px 0 12px' }}></div>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>Reward cost used</div>
                  {REWARD_COST.map((r,i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{r.label}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:r.color, fontVariantNumeric:'tabular-nums' }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* Segment selector */}
            <div className="card" style={{ padding:'16px 18px' }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:4, letterSpacing:'-.01em' }}>App experience preview</div>
              <div style={{ fontSize:12, color:'var(--text-3)', marginBottom:13, lineHeight:1.45 }}>Select a customer type to preview what they see in the MTB Neo app.</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {SEGS.map(s => (
                  <button key={s.key} onClick={()=>setSelSeg(s.key)} style={{
                    width:'100%', textAlign:'left', padding:'8px 12px',
                    borderRadius:'var(--r-md)',
                    border: selSeg===s.key ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                    background: selSeg===s.key ? 'var(--accent-soft)' : 'var(--surface)',
                    color: selSeg===s.key ? 'var(--accent)' : 'var(--text-2)',
                    fontFamily:'inherit', fontSize:13, fontWeight: selSeg===s.key ? 700 : 500,
                    cursor:'pointer', transition:'all .12s',
                  }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile preview */}
            <div className="card" style={{ padding:0, overflow:'hidden' }}>
              <div style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)' }}></div>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text-2)' }}>MTB Neo · {preview.label}</span>
              </div>

              {/* Phone shell */}
              <div style={{ padding:'14px', background:'var(--bg-sunken)' }}>
                <div style={{ background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid rgba(0,0,0,.07)' }}>

                  {/* App header bar */}
                  <div style={{ padding:'13px 15px 11px', background:preview.accent }}>
                    <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.65)', marginBottom:3 }}>MTB NEO</div>
                    <div style={{ fontSize:15, fontWeight:700, color:'#fff', lineHeight:1.3 }}>{preview.greeting}</div>
                  </div>

                  {/* Today's Action */}
                  <div style={{ padding:'11px 14px 10px', borderBottom:'1px solid #EBEBF4' }}>
                    <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:6 }}>TODAY'S ACTION</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#14142B', lineHeight:1.35, marginBottom:3 }}>{preview.action}</div>
                    <div style={{ fontSize:11, color:'#8888A8', marginBottom:10 }}>{preview.actionSub}</div>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'5px 13px', background:preview.accent, color:'#fff', borderRadius:20, fontSize:11.5, fontWeight:700, letterSpacing:'.01em' }}>
                      Get started →
                    </div>
                  </div>

                  {/* Active Mission */}
                  <div style={{ padding:'10px 14px 10px', borderBottom:'1px solid #EBEBF4' }}>
                    <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:6 }}>ACTIVE MISSION</div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#14142B', marginBottom:8, lineHeight:1.3 }}>{preview.mission}</div>
                    <div style={{ height:5, background:'#EEEEF8', borderRadius:3, overflow:'hidden', marginBottom:4 }}>
                      <div style={{ height:'100%', width:preview.missionProgress+'%', background:preview.accent, borderRadius:3 }}></div>
                    </div>
                    <div style={{ fontSize:10.5, color:'#9898B8' }}>{preview.missionSteps} · {preview.missionProgress}% complete</div>
                  </div>

                  {/* Eligible Reward */}
                  <div style={{ padding:'10px 14px', borderBottom:'1px solid #EBEBF4', display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:4 }}>ELIGIBLE REWARD</div>
                      <div style={{ fontSize:13, fontWeight:800, color:preview.accent, lineHeight:1.2 }}>{preview.reward}</div>
                      <div style={{ fontSize:10.5, color:'#9898B8', marginTop:2 }}>{preview.rewardSub}</div>
                    </div>
                    <div style={{ width:34, height:34, borderRadius:'50%', background:'#F4F4FE', display:'grid', placeItems:'center', fontSize:17, flex:'none' }}>⭐</div>
                  </div>

                  {/* Nudge */}
                  <div style={{ padding:'10px 14px 13px', background:'#F7F7FC' }}>
                    <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:5 }}>NUDGE</div>
                    <div style={{ fontSize:11.5, color:'#4A4A6A', lineHeight:1.55, fontStyle:'italic' }}>"{preview.nudge}"</div>
                  </div>

                </div>
              </div>

              <div style={{ padding:'9px 16px', fontSize:11, color:'var(--text-4)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
                Preview only · reflects current active rules
              </div>
            </div>

            {/* Audit note */}
            <div className="card" style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center', flex:'none', marginTop:1 }}>
                  {window.Ic('check',{size:13,sw:2.3})}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>Audit-ready control</div>
                  <div style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.55 }}>All personalization rules are version-controlled, approval-gated, and logged with timestamp and approver identity before being served to customers.</div>
                </div>
              </div>
            </div>

            {/* Most effective card */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Most effective action card</div>
              </div>
              <div style={{ padding:'12px 18px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <div style={{ width:40, height:40, borderRadius:'var(--r-md)', background:'var(--green-bg)', color:'var(--green)', display:'grid', placeItems:'center', flex:'none' }}>
                    {window.Ic('star',{size:18})}
                  </div>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:700, lineHeight:1.3 }}>Bill Pay Streak</div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginTop:2 }}>Frequent Bill Payer · Engagement</div>
                  </div>
                </div>
                {[
                  ['Completion rate', '58%'],
                  ['Users reached',   '38,900'],
                  ['STARS issued',    '1.1M'],
                  ['Cost per user',   '৳62'],
                ].map(([k,v],i,arr) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:i<arr.length-1?'1px solid var(--border)':'none' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── CREATE ACTION MODAL ── */}
      {showCreate && (
        <div className="scrim" onClick={()=>setShowCreate(false)}>
          <div className="modal" style={{ maxWidth:840, overflow:'hidden' }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('bolt',{size:17})}</div>
              <div>
                <div className="modal-title">Create next action card</div>
                <div className="modal-sub">Define what a customer segment sees as their next action in MTB NEO.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowCreate(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>

            {/* Two-column body */}
            <div className="modal-body" style={{ padding:0 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 236px' }}>

                {/* ── LEFT: Form fields ── */}
                <div style={{ padding:'20px 22px', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:14 }}>

                  {/* Priority + Segment */}
                  <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:14, alignItems:'start' }}>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Priority</label>
                      <div style={{ display:'flex', gap:5 }}>
                        {['P1','P2','P3','P4'].map(p => {
                          const active = formPriority===p;
                          const fg = p==='P1'?'var(--red)':p==='P2'?'var(--amber)':p==='P3'?'var(--slate)':'var(--text-3)';
                          const bg = p==='P1'?'var(--red-bg)':p==='P2'?'var(--amber-bg)':'var(--slate-bg)';
                          return (
                            <button key={p} onClick={()=>setFormPriority(p)} style={{
                              padding:'5px 10px', borderRadius:'var(--r-sm)', cursor:'pointer',
                              border: active ? '1.5px solid '+fg : '1px solid var(--border)',
                              background: active ? bg : 'var(--surface)',
                              color: active ? fg : 'var(--text-3)',
                              fontFamily:'var(--mono)', fontSize:12, fontWeight:800, transition:'all .1s',
                            }}>{p}</button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Target segment</label>
                      <select className="select" value={formSeg} onChange={e=>setFormSeg(e.target.value)}>
                        <option>New User</option>
                        <option>No Bill-Pay History</option>
                        <option>Frequent Bill Payer</option>
                        <option>Dormant User</option>
                        <option>Product-Ready User</option>
                        <option>Gold Tier User</option>
                        <option>Custom segment…</option>
                      </select>
                    </div>
                  </div>

                  <div className="field" style={{ marginBottom:0 }}>
                    <label className="label">Eligibility condition</label>
                    <input className="input" placeholder="e.g. Profile completion &lt; 100%" />
                    <span className="hint">Use plain language. The Rules Engine translates this into an evaluation expression.</span>
                  </div>

                  <div className="field" style={{ marginBottom:0 }}>
                    <label className="label">App message</label>
                    <textarea className="textarea" rows="2"
                      placeholder="e.g. Complete your profile and earn 500 STARS"
                      value={formMsg} onChange={e=>setFormMsg(e.target.value)}
                    />
                    <span className="hint">Shown as the customer’s primary next action card in MTB NEO.</span>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Linked reward</label>
                      <select className="select" value={formReward} onChange={e=>setFormReward(e.target.value)}>
                        <option>500 STARS</option>
                        <option>300 STARS</option>
                        <option>200 STARS streak bonus</option>
                        <option>1,000 STARS</option>
                        <option>No reward</option>
                      </select>
                    </div>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Customer journey</label>
                      <select className="select">
                        <option>Onboarding</option>
                        <option>Activation</option>
                        <option>Engagement</option>
                        <option>Reactivation</option>
                        <option>Product Education</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Start date</label>
                      <input className="input" type="date" defaultValue="2026-06-15" />
                    </div>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">End date</label>
                      <input className="input" type="date" defaultValue="2026-06-30" />
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Reward budget cap</label>
                      <div style={{ position:'relative' }}>
                        <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--text-3)', pointerEvents:'none', fontWeight:600 }}>৳</span>
                        <input className="input tnum" style={{ paddingLeft:22 }} placeholder="50,000" />
                      </div>
                      <span className="hint">Maximum reward liability for this card.</span>
                    </div>
                    <div className="field" style={{ marginBottom:0 }}>
                      <label className="label">Est. eligible users</label>
                      <input className="input tnum" value={SEG_SIZES[formSeg]||'—'} readOnly
                        style={{ background:'var(--bg-sunken)', color:'var(--text-2)', cursor:'default' }}
                        onChange={()=>{}}
                      />
                      <span className="hint">Based on current segment size.</span>
                    </div>
                  </div>

                  <div className="callout info">
                    <span className="c-ic">{window.Ic('info',{size:18,sw:1.7})}</span>
                    <div>
                      <div className="callout-title">Approval required before going live</div>
                      Next action cards require approval before going live. Approval rules can include Marketing, Risk, Compliance, or Product owners.
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Mobile Preview ── */}
                <div style={{ padding:'18px 14px', background:'var(--bg-sunken)', display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text-2)', letterSpacing:'-.01em' }}>MTB NEO preview</div>
                  <div style={{ fontSize:11.5, color:'var(--text-3)', lineHeight:1.4 }}>Updates as you type.</div>

                  {/* Phone mockup */}
                  <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', border:'1px solid rgba(0,0,0,.08)' }}>
                    {/* App header */}
                    <div style={{ padding:'11px 13px 9px', background:accentFor(formSeg) }}>
                      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginBottom:2 }}>MTB NEO</div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#fff', lineHeight:1.3 }}>{formSeg}</div>
                    </div>

                    {/* Today's Action */}
                    <div style={{ padding:'10px 13px 9px', borderBottom:'1px solid #EBEBF4' }}>
                      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:5 }}>TODAY’S ACTION</div>
                      <div style={{ fontSize:12, fontWeight:700, color:'#14142B', lineHeight:1.4, marginBottom:8, minHeight:36 }}>
                        {formMsg
                          ? formMsg
                          : <span style={{ color:'#C0C0D8', fontStyle:'italic', fontWeight:400 }}>Enter message to preview…</span>
                        }
                      </div>
                      <div style={{ display:'inline-flex', alignItems:'center', padding:'4px 11px', borderRadius:16, fontSize:10.5, fontWeight:700, color:'#fff', background:accentFor(formSeg) }}>
                        Get started →
                      </div>
                    </div>

                    {/* Reward */}
                    <div style={{ padding:'9px 13px', borderBottom:'1px solid #EBEBF4', display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:8, fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', color:'#9898B8', marginBottom:3 }}>ELIGIBLE REWARD</div>
                        <div style={{ fontSize:12.5, fontWeight:800, color:accentFor(formSeg) }}>{formReward}</div>
                      </div>
                      <span style={{ fontSize:15 }}>⭐</span>
                    </div>

                    {/* Priority + status */}
                    <div style={{ padding:'8px 13px', background:'#F7F7FC', display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{
                        fontFamily:'var(--mono)', fontSize:10, fontWeight:800, borderRadius:4, padding:'2px 7px',
                        color: formPriority==='P1'?'var(--red)':formPriority==='P2'?'var(--amber)':'var(--slate)',
                        background: formPriority==='P1'?'var(--red-bg)':formPriority==='P2'?'var(--amber-bg)':'var(--slate-bg)',
                      }}>{formPriority}</span>
                      <span style={{ fontSize:10.5, color:'#9898B8' }}>Rule-controlled · Approval-gated</span>
                    </div>
                  </div>

                  {/* Draft note */}
                  <div style={{ padding:'9px 11px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', display:'flex', alignItems:'flex-start', gap:7, fontSize:11, color:'var(--text-3)', lineHeight:1.5 }}>
                    <span style={{ flex:'none', marginTop:1 }}>{window.Ic('info',{size:12,sw:1.8})}</span>
                    <span>Shown to customers only after approval. Remains in draft until submitted.</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowCreate(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowCreate(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowCreate(false)}>Submit for approval</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.PersonalizationPage = PersonalizationPage;
