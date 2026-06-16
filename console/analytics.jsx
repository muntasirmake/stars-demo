// STARS Admin Console — Analytics & Liability page
const { useState: uAL } = React;

function AnalyticsPage({ campaigns, onOpenBudget, onCreate }) {

  const campRows = [
    { mark:'B', name:'Bill Pay Booster',          status:'Live',      members:'38,900', stars:'3.1M',  redemption:'34.8%', liability:'৳4.2L', roi:'Strong',  roiTone:'green',  id:'CMP_8841', live:true },
    { mark:'Q', name:'QR Pay Cashback',            status:'Live',      members:'26,400', stars:'2.4M',  redemption:'29.1%', liability:'৳3.1L', roi:'Healthy', roiTone:'green',  id:'CMP_8842', live:true },
    { mark:'W', name:'Weekend Card Spend Streak',  status:'Scheduled', members:'18,200', stars:'—',     redemption:'—',     liability:'৳2.0L', roi:'Pending', roiTone:'blue',   id:'CMP_8839' },
    { mark:'S', name:'Salary Account Activation',  status:'Paused',    members:'9,800',  stars:'880K',  redemption:'18.4%', liability:'৳1.6L', roi:'Needs Review', roiTone:'amber',  id:'CMP_8833' },
    { mark:'G', name:'Gold Tier Upgrade Sprint',   status:'Completed', members:'12,100', stars:'1.2M',  redemption:'42.0%', liability:'৳1.3L', roi:'Strong',  roiTone:'green',  id:'CMP_8822' },
  ];

  const liabilityRows = [
    { date:'Jun 01', issued:'580K', redeemed:'210K', expired:'28K', net:'+342K', up:true  },
    { date:'May 25', issued:'330K', redeemed:'280K', expired:'30K', net:'+20K',  up:true  },
    { date:'May 21', issued:'460K', redeemed:'195K', expired:'22K', net:'+243K', up:true  },
    { date:'May 17', issued:'290K', redeemed:'340K', expired:'18K', net:'−68K',  up:false },
    { date:'May 13', issued:'510K', redeemed:'160K', expired:'25K', net:'+325K', up:true  },
    { date:'May 10', issued:'380K', redeemed:'210K', expired:'15K', net:'+155K', up:true  },
    { date:'May 08', issued:'420K', redeemed:'180K', expired:'20K', net:'+220K', up:true  },
  ];

  const riskSignals = [
    { label:'Campaign near budget threshold', detail:'Bill Pay Booster at 69% utilization', tone:'amber', icon:'warn' },
    { label:'Low redemption campaign',        detail:'Salary Account Activation at 18.4%',  tone:'amber', icon:'warn' },
    { label:'Expiring STARS next 30 days',   detail:'1.1M STARS approaching expiry',        tone:'amber', icon:'warn' },
    { label:'Fraud exceptions',              detail:'0.7% of qualifying events — within threshold', tone:'green', icon:'check' },
  ];

  const kpis = [
    { label:'STARS Issued',       value:'18.4M',  delta:'+12.5%', dir:'up', vs:'vs previous period',          iconKey:'star',     iBg:'var(--accent-soft)', iFg:'var(--accent)'  },
    { label:'STARS Redeemed',     value:'7.2M',   delta:'+8.1%',  dir:'up', vs:'vs previous period',          iconKey:'target',   iBg:'var(--green-bg)',    iFg:'var(--green)'   },
    { label:'Net STARS Float',    value:'11.2M',  sub:'Unredeemed STARS contributing to outstanding liability.',                          iconKey:'activity', iBg:'var(--blue-bg)',     iFg:'var(--blue)'    },
    { label:'Estimated Liability',value:'৳18.5L', sub:'39% of ৳47.2L provisioned budget',                     iconKey:'vault',    iBg:'var(--amber-bg)',    iFg:'var(--amber)'   },
    { label:'Redemption Rate',    value:'31.4%',  sub:'Healthy engagement range',                              iconKey:'bolt',     iBg:'var(--green-bg)',    iFg:'var(--green)'   },
  ];

  const MARK_COLORS = { B:'var(--accent)', Q:'var(--violet)', W:'var(--blue)', S:'var(--amber)', G:'var(--green)' };

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY PAGE HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Analytics & Liability</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Monitor STARS issuance, redemption, outstanding liability, campaign performance, and risk signals.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <button className="btn btn-secondary btn-sm">
              {window.Ic('calendar',{size:14})} Last 30 days {window.Ic('chevDown',{size:13})}
            </button>
            <button className="btn btn-secondary btn-sm">
              {window.Ic('segments',{size:14})} All members {window.Ic('chevDown',{size:13})}
            </button>
            <button className="btn btn-secondary btn-sm">
              {window.Ic('campaigns',{size:14})} All campaigns {window.Ic('chevDown',{size:13})}
            </button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <button className="btn btn-secondary btn-sm">
              {window.Ic('list',{size:14})} Export report
            </button>
            <button className="btn btn-primary btn-sm" onClick={onCreate}>
              {window.Ic('plus',{size:14})} Create Campaign
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
              {k.delta && (
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <span className={'kpi-delta '+k.dir}>{window.Ic('arrowUp',{size:12,sw:2.5})}{k.delta}</span>
                  <span className="kpi-delta vs">{k.vs}</span>
                </div>
              )}
              {k.sub && <div style={{ fontSize:11.5, color:'var(--text-3)', lineHeight:1.4 }}>{k.sub}</div>}
            </div>
          ))}
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

          {/* ══ LEFT / MAIN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>

            {/* STARS ECONOMY CHART */}
            <div className="card">
              <div className="card-head">
                <div style={{ flex:1 }}>
                  <div className="card-title">STARS economy</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Issued vs redeemed · last 30 days</div>
                </div>
                <div className="chart-legend">
                  <span className="legend-item"><span className="legend-swatch" style={{ background:'#4F5BD5' }}></span>Issued</span>
                  <span className="legend-item"><span className="legend-swatch" style={{ background:'#C7CBF2' }}></span>Redeemed</span>
                </div>
              </div>
              <div className="card-pad">
                {/* Inline stats */}
                <div style={{ display:'flex', gap:22, alignItems:'center', marginBottom:16 }}>
                  <div>
                    <div className="eyebrow">Issued</div>
                    <div className="h2 tnum" style={{ marginTop:3 }}>18.4M</div>
                  </div>
                  <div style={{ width:1, height:32, background:'var(--border)' }}></div>
                  <div>
                    <div className="eyebrow">Redeemed</div>
                    <div className="h2 tnum" style={{ marginTop:3 }}>7.2M</div>
                  </div>
                  <div style={{ width:1, height:32, background:'var(--border)' }}></div>
                  <div>
                    <div className="eyebrow">Net float</div>
                    <div className="h2 tnum" style={{ marginTop:3, color:'var(--accent)' }}>11.2M</div>
                  </div>
                  <div style={{ marginLeft:'auto', textAlign:'right' }}>
                    <div style={{ fontSize:11.5, color:'var(--text-3)' }}>Liability trend</div>
                    <div style={{ fontSize:13.5, fontWeight:600, color:'var(--amber)', marginTop:2 }}>↑ Increasing</div>
                    <div style={{ fontSize:11, color:'var(--text-3)', marginTop:1 }}>within approved range</div>
                  </div>
                </div>
                {/* SVG chart */}
                <svg viewBox="0 0 680 160" width="100%" height="160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="alGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#4F5BD5" stopOpacity="0.14" />
                      <stop offset="1" stopColor="#4F5BD5" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="alGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#C7CBF2" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#C7CBF2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="area-grid">
                    <line x1="0" y1="32"  x2="680" y2="32"  />
                    <line x1="0" y1="80"  x2="680" y2="80"  />
                    <line x1="0" y1="128" x2="680" y2="128" />
                  </g>
                  {/* Issued fill + line */}
                  <path d="M0,136 C80,124 150,106 220,96 C300,84 360,70 440,58 C520,46 600,34 680,20 L680,160 L0,160 Z" fill="url(#alGrad1)" />
                  <path d="M0,136 C80,124 150,106 220,96 C300,84 360,70 440,58 C520,46 600,34 680,20" fill="none" stroke="#4F5BD5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Redeemed fill + line */}
                  <path d="M0,152 C90,148 160,142 240,138 C320,134 380,128 460,122 C540,116 610,108 680,100 L680,160 L0,160 Z" fill="url(#alGrad2)" />
                  <path d="M0,152 C90,148 160,142 240,138 C320,134 380,128 460,122 C540,116 610,108 680,100" fill="none" stroke="#C7CBF2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="chart-axis">
                  <span>May 06</span><span>May 13</span><span>May 20</span><span>May 27</span><span>Jun 03</span>
                </div>
              </div>
            </div>

            {/* CAMPAIGN PERFORMANCE TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Campaign performance</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
                <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export CSV</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Status</th>
                    <th className="num">Members reached</th>
                    <th className="num">STARS issued</th>
                    <th className="num">Redemption rate</th>
                    <th className="num">Est. liability</th>
                    <th className="num">ROI signal</th>
                  </tr>
                </thead>
                <tbody>
                  {campRows.map((row,i) => (
                    <tr key={i} style={{ cursor:'pointer' }} onClick={()=>onOpenBudget && onOpenBudget({ name:row.name, id:row.id, liability:row.liability, mark:row.mark, status:row.status, live:row.live||false })}>
                      <td>
                        <div className="cell-flex">
                          <div className="row-ic" style={{ background: MARK_COLORS[row.mark]||'var(--accent-soft)', color: MARK_COLORS[row.mark] ? '#fff' : 'var(--accent)' }}>
                            {row.mark}
                          </div>
                          <a className="link" style={{ fontWeight:600 }} onClick={e=>{e.stopPropagation(); onOpenBudget&&onOpenBudget({name:row.name,id:row.id,liability:row.liability,mark:row.mark,status:row.status,live:row.live||false});}}>{row.name}</a>
                        </div>
                      </td>
                      <td><window.Badge status={row.status} /></td>
                      <td className="num tnum">{row.members}</td>
                      <td className="num tnum" style={{ fontWeight:600 }}>{row.stars}</td>
                      <td className="num tnum">{row.redemption}</td>
                      <td className="num tnum">{row.liability}</td>
                      <td className="num">
                        <span className={'badge '+row.roiTone} style={{ fontSize:11 }}>
                          <span className="dot"></span>{row.roi}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">5 campaigns · Last 30 days</span>
              </div>
            </div>

            {/* LIABILITY MOVEMENT TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div style={{ flex:1 }}>
                  <div className="card-title">Liability movement</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>STARS issuance, redemption and expiry events · rolling log</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('list',{size:14})} Export</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th className="num">STARS issued</th>
                    <th className="num">STARS redeemed</th>
                    <th className="num">Expired STARS</th>
                    <th className="num">Net liability movement</th>
                  </tr>
                </thead>
                <tbody>
                  {liabilityRows.map((row,i) => (
                    <tr key={i}>
                      <td><span className="cell-strong small">{row.date}</span></td>
                      <td className="num tnum" style={{ color:'var(--accent)', fontWeight:600 }}>+{row.issued}</td>
                      <td className="num tnum" style={{ color:'var(--green)', fontWeight:600 }}>−{row.redeemed}</td>
                      <td className="num tnum muted">{row.expired}</td>
                      <td className="num tnum" style={{ fontWeight:700, color: row.up ? 'var(--amber)' : 'var(--green)' }}>
                        {row.net}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Showing 7 most recent events</span>
                <div style={{ marginLeft:'auto' }} className="row gap-8">
                  <button className="btn btn-ghost btn-sm">Previous</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* LIABILITY SUMMARY */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Liability summary</div>
                <span style={{ width:28, height:28, borderRadius:'var(--r-sm)', background:'var(--amber-bg)', color:'var(--amber)', display:'grid', placeItems:'center' }}>
                  {window.Ic('vault',{size:14})}
                </span>
              </div>
              <div className="card-pad">
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:11, color:'var(--text-3)', marginBottom:4 }}>Outstanding STARS liability</div>
                  <div style={{ fontSize:30, fontWeight:700, letterSpacing:'-.025em', fontVariantNumeric:'tabular-nums', color:'var(--amber)' }}>৳18.5L</div>
                </div>
                <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                {[['Provisioned budget','৳47.2L'],['Utilization','39%']].map(([k,v])=>(
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:700, color: k==='Utilization'?'var(--amber)':'var(--text)' }}>{v}</span>
                  </div>
                ))}
                <div className="bar-track" style={{ marginTop:10 }}>
                  <div className="bar-fill" style={{ width:'39%' }}></div>
                </div>
                <div style={{ marginTop:12, padding:'10px 12px', background:'var(--amber-bg)', border:'1px solid var(--amber-bd)', borderRadius:'var(--r-sm)', fontSize:12, color:'#6f4d00', lineHeight:1.5 }}>
                  <b>Liability trend:</b> Increasing but within approved range — no action required.
                </div>
              </div>
            </div>

            {/* RISK SIGNALS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Risk signals</div>
                <span className="badge amber" style={{ fontSize:11 }}>3 active</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {riskSignals.map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'12px 0', borderBottom: i<riskSignals.length-1 ? '1px solid var(--border)' : 'none', cursor:'pointer' }}>
                    <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', flex:'none', marginTop:1, display:'grid', placeItems:'center',
                      background: s.tone==='amber' ? 'var(--amber-bg)' : 'var(--green-bg)',
                      color:      s.tone==='amber' ? 'var(--amber)'    : 'var(--green)',
                    }}>
                      {window.Ic(s.icon,{size:13,sw:2.2})}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, lineHeight:1.3 }}>{s.label}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', marginTop:3, lineHeight:1.4 }}>{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOP CAMPAIGN */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Top campaign</div>
                <window.Badge status="Live" />
              </div>
              <div className="card-pad">
                <div className="cell-flex" style={{ marginBottom:14 }}>
                  <div className="row-ic" style={{ width:36, height:36, background:'var(--accent)', color:'#fff', fontSize:15, fontWeight:700 }}>B</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, letterSpacing:'-.01em' }}>Bill Pay Booster</div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginTop:1 }}>500 STARS flat · utility bills</div>
                  </div>
                </div>
                <div style={{ height:1, background:'var(--border)', marginBottom:10 }}></div>
                {[['STARS issued','3.1M'],['Members reached','38,900'],['Redemption rate','34.8%'],['Est. liability','৳4.2L']].map(([k,v])=>(
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{v}</span>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" style={{ width:'100%', marginTop:14 }} onClick={()=>onOpenBudget&&onOpenBudget({name:'Bill Pay Booster',id:'CMP_8841',liability:'৳4.2L',mark:'B',status:'Live',live:true})}>
                  View campaign details
                </button>
              </div>
            </div>

            {/* EXPORT & REPORTING */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Export & reporting</div>
              </div>
              <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  ['list',     'Export CSV'],
                  ['vault',    'Download finance report'],
                  ['arrow',    'Send report to Risk'],
                  ['calendar', 'Schedule monthly report'],
                ].map(([icon, label])=>(
                  <button key={label} className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>
                    {window.Ic(icon,{size:14})} {label}
                  </button>
                ))}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>
    </div>
  );
}

window.AnalyticsPage = AnalyticsPage;
