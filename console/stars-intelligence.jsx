// STARS Admin Console — STARS Intelligence page
const { useState: uSI } = React;

function StarsIntelligencePage({ onCreate }) {

  const STAGES = [
    { stage:0, name:'Onboarded',     range:'0–19',   users:'31,600', pct:18, desc:'App access · low activity',           color:'var(--slate)',  bg:'var(--slate-bg)'  },
    { stage:1, name:'Activated',     range:'20–39',  users:'28,300', pct:16, desc:'Basic actions · first missions',      color:'var(--amber)',  bg:'var(--amber-bg)'  },
    { stage:2, name:'Frequent User', range:'40–59',  users:'54,200', pct:31, desc:'Repeat usage · repeat actions',       color:'var(--blue)',   bg:'var(--blue-bg)'   },
    { stage:3, name:'Product Ready', range:'60–79',  users:'38,900', pct:22, desc:'Product discovery · intent signals',  color:'var(--accent)', bg:'var(--accent-soft)'},
    { stage:4, name:'Super User',    range:'80–100', users:'22,100', pct:13, desc:'Multi-product · higher LTV',           color:'var(--green)',  bg:'var(--green-bg)'  },
  ];

  const SEGMENTS = [
    { name:'Newly Onboarded, Low Activity',         users:'31,600', campaign:'Profile Completion Reward',    reason:'No activity beyond login in 7+ days',                confidence:94 },
    { name:'Activated but No Bill Pay',             users:'28,300', campaign:'Bill Pay Booster',             reason:'First mission complete, no bill payment triggered',  confidence:91 },
    { name:'Frequent Users Ready for Discovery',    users:'38,900', campaign:'Product Discovery Mission',    reason:'Repeat transactions, no product exploration signals',confidence:87 },
    { name:'Product-Ready Users',                   users:'22,400', campaign:'Savings or Card Intro Mission',reason:'Browsed product content, no conversion yet',         confidence:83 },
    { name:'High-Value Super Users',                users:'22,100', campaign:'Priority Partner Rewards',     reason:'Multi-product, high LTV, top engagement scores',     confidence:96 },
  ];

  const ACTIONS = [
    {
      icon:'bolt',
      title:'Move “Activated but No Bill Pay” users into Bill Pay Booster',
      desc:'28,300 users completed onboarding but have not made a bill payment. A targeted incentive at this stage has the highest observed conversion rate.',
      why:'Users in this segment are active in-app but have not crossed the first high-value transaction threshold.',
      segment:'Activated but No Bill Pay', confidence:91,
    },
    {
      icon:'star',
      title:'Introduce a product discovery mission for Product-Ready users',
      desc:'22,400 users have browsed product-related content but have not converted. A structured discovery mission is the most effective next step.',
      why:'NEO Growth Score signals strong product intent. These users respond well to guided missions over passive nudges.',
      segment:'Product-Ready Users', confidence:83,
    },
    {
      icon:'users',
      title:'Re-engage Onboarded Low Activity users with a profile completion reward',
      desc:'31,600 users signed up but have not returned. A low-cost profile completion incentive is the most effective re-engagement trigger at Stage 0.',
      why:'Stage 0 users who receive a profile reward within 7 days show a 3× higher activation rate than those who do not.',
      segment:'Newly Onboarded, Low Activity', confidence:94,
    },
    {
      icon:'rewards',
      title:'Offer Super Users exclusive partner rewards or priority redemption access',
      desc:'22,100 Stage 4 users are the highest-LTV segment. Exclusive benefits at this tier improve retention and average STARS balance.',
      why:'Super Users who receive tier-exclusive offers are significantly less likely to reduce app engagement over the following quarter.',
      segment:'High-Value Super Users', confidence:96,
    },
  ];

  const confLabel = c => c >= 90 ? 'High confidence' : c >= 80 ? 'Medium confidence' : 'Low confidence';

  return (
    <div className="content">

      {/* ── Page head ── */}
      <div className="page-head">
        <div className="grow">
          <h1 className="h1">STARS Intelligence</h1>
          <p className="page-sub">AI-generated user maturity classifications, segments, and recommended actions for MTB Neo loyalty.</p>
        </div>
        <span style={{ fontSize:12, color:'var(--text-3)', fontWeight:600, letterSpacing:'.01em' }}>Updated daily from latest batch feed</span>
      </div>

      {/* ── A. NEO Growth Score ── */}
      <div className="card" style={{ marginBottom:18 }}>
        <div className="card-head">
          <div className="grow">
            <div className="card-title">NEO Growth Score</div>
            <div className="xsmall muted-2" style={{ marginTop:2 }}>User maturity classification · 175,100 users scored</div>
          </div>
          <span style={{ fontSize:12, color:'var(--text-3)', fontWeight:600 }}>All MTB Neo users</span>
        </div>
        <div className="card-pad">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
            {STAGES.map(s => (
              <div key={s.stage} style={{ border:'1px solid var(--border)', borderRadius:'var(--r-md)', padding:'14px 14px 12px', background:'var(--surface-2)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase', color:s.color }}>Stage {s.stage}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:'var(--text-4)', background:'var(--border)', borderRadius:'var(--r-pill)', padding:'2px 7px' }}>{s.range}</span>
                </div>
                <div style={{ fontSize:14.5, fontWeight:700, letterSpacing:'-0.01em', marginBottom:3 }}>{s.name}</div>
                <div style={{ fontSize:11.5, color:'var(--text-3)', marginBottom:12, lineHeight:1.4 }}>{s.desc}</div>
                <div style={{ fontSize:18, fontWeight:800, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums', color:s.color, marginBottom:6 }}>{s.users}</div>
                <div style={{ height:4, borderRadius:999, background:'var(--border)', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:999, background:s.color, width:s.pct+'%' }}></div>
                </div>
                <div style={{ fontSize:11, color:'var(--text-4)', fontWeight:600, marginTop:5 }}>{s.pct}% of users</div>
              </div>
            ))}
          </div>
          <div style={{ height:7, borderRadius:999, overflow:'hidden', display:'flex', gap:2 }}>
            {STAGES.map(s => (
              <div key={s.stage} style={{ flex:s.pct, background:s.color, opacity:.65 }}></div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            <span style={{ fontSize:11, color:'var(--text-4)', fontWeight:600 }}>Stage 0 · Onboarded</span>
            <span style={{ fontSize:11, color:'var(--text-4)', fontWeight:600 }}>Stage 4 · Super User</span>
          </div>
        </div>
      </div>

      {/* ── B. AI-Generated Segments ── */}
      <div className="card" style={{ marginBottom:18 }}>
        <div className="card-head">
          <div className="grow">
            <div className="card-title">Recommended Segments</div>
            <div className="xsmall muted-2" style={{ marginTop:2 }}>Derived from NEO Growth Score and recent user behavior · Updated daily</div>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Segment</th>
              <th className="num">Users</th>
              <th>Recommended campaign</th>
              <th>Reason</th>
              <th className="num">Confidence</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((seg,i) => (
              <tr key={i}>
                <td><span style={{ fontWeight:600, fontSize:13 }}>{seg.name}</span></td>
                <td className="num tnum" style={{ fontWeight:600 }}>{seg.users}</td>
                <td><span style={{ fontSize:12.5, color:'var(--accent)', fontWeight:600 }}>{seg.campaign}</span></td>
                <td><span style={{ fontSize:12, color:'var(--text-3)' }}>{seg.reason}</span></td>
                <td className="num">
                  <span style={{ display:'inline-flex', alignItems:'center', fontSize:11, fontWeight:600, color: seg.confidence >= 90 ? 'var(--green)' : seg.confidence >= 80 ? 'var(--accent)' : 'var(--amber)', background: seg.confidence >= 90 ? 'var(--green-bg)' : seg.confidence >= 80 ? 'var(--accent-soft)' : 'var(--amber-bg)', borderRadius:'var(--r-pill)', padding:'3px 9px' }}>
                    {confLabel(seg.confidence)}
                  </span>
                </td>
                <td><button className="btn btn-ghost btn-sm" onClick={onCreate}>Create campaign</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── C. Recommended Actions ── */}
      <div style={{ fontSize:15, fontWeight:700, letterSpacing:'-0.01em', marginBottom:12, color:'var(--text)' }}>Today's Recommended Actions</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14, marginBottom:32 }}>
        {ACTIONS.map((a,i) => (
          <div key={i} className="card card-pad">
            <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, flex:'none', display:'grid', placeItems:'center', background:'var(--accent-soft)', color:'var(--accent)' }}>
                {window.Ic(a.icon, { size:17 })}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13.5, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.3, marginBottom:6 }}>{a.title}</div>
                <div style={{ fontSize:12.5, color:'var(--text-2)', lineHeight:1.5, marginBottom:10 }}>{a.desc}</div>
                <div style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.45, marginBottom:10, paddingLeft:10, borderLeft:'2px solid var(--border)' }}><strong style={{ color:'var(--text-2)', fontWeight:600 }}>Why recommended — </strong>{a.why}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span style={{ fontSize:11, fontWeight:600, color: a.confidence >= 90 ? 'var(--green)' : a.confidence >= 80 ? 'var(--accent)' : 'var(--amber)', background: a.confidence >= 90 ? 'var(--green-bg)' : a.confidence >= 80 ? 'var(--accent-soft)' : 'var(--amber-bg)', borderRadius:'var(--r-pill)', padding:'3px 9px' }}>
                    {confLabel(a.confidence)}
                  </span>
                  <span style={{ fontSize:11, color:'var(--text-3)', fontWeight:600 }}>→ {a.segment}</span>
                </div>
              </div>
            </div>
            <div style={{ borderTop:'1px solid var(--border)', marginTop:14, paddingTop:12 }}>
              <button className="btn btn-secondary btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={onCreate}>
                {window.Ic('plus',{size:14})} Create campaign from recommendation
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

window.StarsIntelligencePage = StarsIntelligencePage;
