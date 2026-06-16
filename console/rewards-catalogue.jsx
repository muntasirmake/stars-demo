// STARS Admin Console — Rewards Catalogue page
const { useState: uRC } = React;

const REWARD_STATUS_TONE = {
  'Active':        'green',
  'Low stock':     'amber',
  'Out of stock':  'red',
  'Expiring soon': 'amber',
  'Draft':         'slate',
};

function RewardBadge({ status }) {
  const tone = REWARD_STATUS_TONE[status] || 'slate';
  return (
    <span className={'badge ' + tone} style={{ fontSize:11 }}>
      <span className="dot"></span>{status}
    </span>
  );
}

function RewardsCataloguePage({ onCreate }) {
  const REWARDS = [
    { id:'RWD_001', mark:'R', markBg:'var(--accent)',   name:'৳100 Mobile Recharge Voucher', category:'Mobile recharge',  stars:1000,  partner:'MTB',            inventory:'8,400 left',  invNum:8400,   redemptions:'12,800', liability:'৳3.2L', status:'Active',        tierElig:'All tiers',  fulfillment:'Instant digital voucher', expiry:'30 days after redemption', cashEq:'৳100',   desc:'Instant mobile top-up for any operator via MTB Neo app.' },
    { id:'RWD_002', mark:'U', markBg:'var(--blue)',     name:'Utility Bill Cashback',          category:'Bill payment',     stars:2500,  partner:'MTB',            inventory:'Unlimited',   invNum:Infinity,redemptions:'6,240',  liability:'৳2.8L', status:'Active',        tierElig:'All tiers',  fulfillment:'Wallet credit',           expiry:'N/A',                      cashEq:'৳250',   desc:'Cashback credit applied to MTB Neo wallet for utility bill payments.' },
    { id:'RWD_003', mark:'C', markBg:'#6B4F3B',        name:'Coffee Partner Voucher',         category:'Lifestyle',        stars:1200,  partner:'North End',      inventory:'320 left',    invNum:320,    redemptions:'2,180',  liability:'৳72K',  status:'Low stock',     tierElig:'All tiers',  fulfillment:'QR voucher',              expiry:'14 days after issue',      cashEq:'৳120',   desc:'One complimentary beverage at any North End Coffee outlet nationwide.' },
    { id:'RWD_004', mark:'A', markBg:'var(--amber)',    name:'Airport Lounge Access',          category:'Premium banking',  stars:12000, partner:'MTB Privilege',  inventory:'85 left',     invNum:85,     redemptions:'420',    liability:'৳1.6L', status:'Active',        tierElig:'Platinum+',  fulfillment:'Digital pass (24h)',       expiry:'60 days after issue',      cashEq:'৳1,200', desc:'Single-entry lounge access at Hazrat Shahjalal International Airport.' },
    { id:'RWD_005', mark:'F', markBg:'var(--green)',    name:'Gold Tier Fee Waiver',           category:'Banking benefit',  stars:8000,  partner:'MTB',            inventory:'Unlimited',   invNum:Infinity,redemptions:'310',    liability:'৳1.1L', status:'Active',        tierElig:'Gold+',      fulfillment:'Account credit',          expiry:'Valid for current month',  cashEq:'৳800',   desc:'Waive the monthly Gold Tier maintenance fee for one billing cycle.' },
    { id:'RWD_006', mark:'S', markBg:'#C65D3A',        name:'Shopping Partner Discount',      category:'Shopping',         stars:1500,  partner:'Aarong',         inventory:'1,200 left',  invNum:1200,   redemptions:'3,900',  liability:'৳95K',  status:'Expiring soon', tierElig:'All tiers',  fulfillment:'Promo code',              expiry:'Expires in 18 days',       cashEq:'৳150',   desc:'15% discount on regular-price items at any Aarong outlet.' },
    { id:'RWD_007', mark:'M', markBg:'var(--slate)',    name:'Movie Ticket Voucher',           category:'Entertainment',    stars:2000,  partner:'Star Cineplex',  inventory:'0 left',      invNum:0,      redemptions:'1,760',  liability:'৳64K',  status:'Out of stock',  tierElig:'All tiers',  fulfillment:'E-ticket',                expiry:'7 days after issue',       cashEq:'৳200',   desc:'One standard ticket for any currently screening film at Star Cineplex.' },
    { id:'RWD_008', mark:'D', markBg:'var(--border-strong)', name:'Dining Cashback Offer',   category:'Dining',           stars:3000,  partner:'Partner Network',inventory:'540 left',    invNum:540,    redemptions:'890',    liability:'৳1.0L', status:'Draft',         tierElig:'All tiers',  fulfillment:'Wallet credit',           expiry:'30 days after redemption', cashEq:'৳300',   desc:'Dining cashback credited to MTB Neo wallet for partner restaurant spend.' },
  ];

  const [sel, setSel] = uRC(REWARDS[0]);
  const [showAdd, setShowAdd] = uRC(false);
  const [searchQ, setSearchQ] = uRC('');

  const filtered = REWARDS.filter(r =>
    !searchQ || r.name.toLowerCase().includes(searchQ.toLowerCase()) || r.category.toLowerCase().includes(searchQ.toLowerCase())
  );

  const kpis = [
    { label:'Active rewards',                value:'24',     sub:'6 partner-funded',                        iconKey:'rewards', iBg:'var(--accent-soft)',  iFg:'var(--accent)'  },
    { label:'Total redemptions',             value:'42,180', delta:'+9.4%', dir:'up', vs:'vs last period',  iconKey:'target',  iBg:'var(--green-bg)',     iFg:'var(--green)'   },
    { label:'Redemption liability',          value:'৳11.8L', sub:'Based on active catalogue pricing',       iconKey:'vault',   iBg:'var(--amber-bg)',     iFg:'var(--amber)'   },
    { label:'Low stock rewards',             value:'3',      sub:'Requires attention',                      iconKey:'warn',    iBg:'var(--red-bg)',       iFg:'var(--red)'     },
    { label:'Partner offers',                value:'8',      sub:'4 expiring this month',                   iconKey:'star',    iBg:'var(--violet-bg)',    iFg:'var(--violet)'  },
  ];

  const perfItems = [
    { role:'Most redeemed',      name:'৳100 Mobile Recharge Voucher', val:'12,800 redemptions', tone:'accent' },
    { role:'Highest liability',  name:'Utility Bill Cashback',          val:'৳2.8L liability',    tone:'amber'  },
    { role:'Fastest moving',     name:'Coffee Partner Voucher',         val:'320 remaining',      tone:'green'  },
    { role:'Premium leader',     name:'Airport Lounge Access',          val:'12,000 STARS',       tone:'violet' },
  ];

  const healthItems = [
    { label:'Active rewards',                 val:'21', tone:'green'  },
    { label:'Low stock',                      val:'3',  tone:'amber'  },
    { label:'Out of stock',                   val:'1',  tone:'red'    },
    { label:'Expiring in 30 days',            val:'4',  tone:'amber'  },
    { label:'Require partner renewal',        val:'6',  tone:'slate'  },
  ];

  const inventoryAlerts = [
    { name:'Movie Ticket Voucher',       detail:'Out of stock — redemptions paused',       tone:'red'   },
    { name:'Coffee Partner Voucher',     detail:'320 left — restock in 7–10 days',         tone:'amber' },
    { name:'Shopping Partner Discount',  detail:'Offer expires in 18 days',                tone:'amber' },
  ];

  const invColor = (n) => {
    if (n === 0)        return 'var(--red)';
    if (n < 500)        return 'var(--amber)';
    if (n === Infinity) return 'var(--text-3)';
    return 'var(--text)';
  };

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Rewards Catalogue</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Manage redeemable rewards, partner offers, STARS pricing, inventory, and redemption liability.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} All categories {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('segments',{size:14})} All partners {window.Ic('chevDown',{size:13})}</button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <div className="search" style={{ width:200, height:34, fontSize:13 }}>
              {window.Ic('search',{size:14})}
              <input placeholder="Search rewards…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(true)}>
              {window.Ic('plus',{size:14})} Add reward
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

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>

            {/* REWARDS TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Rewards catalogue</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>{filtered.length} rewards{searchQ ? ' matching "'+searchQ+'"' : ' · click to view detail'}</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Reward</th>
                    <th>Category</th>
                    <th className="num">STARS cost</th>
                    <th>Partner</th>
                    <th className="num">Inventory</th>
                    <th className="num">Redemptions</th>
                    <th className="num">Liability</th>
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
                              <a className="link" style={{ fontWeight:600, textDecoration:'none' }} onClick={e=>{e.stopPropagation(); setSel(row);}}>{row.name}</a>
                              <div className="cell-sub" style={{ fontFamily:'var(--mono)', fontSize:11 }}>{row.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="tag" style={{ fontSize:11 }}>{row.category}</span></td>
                        <td className="num tnum" style={{ fontWeight:600 }}>{row.stars.toLocaleString()}</td>
                        <td className="small" style={{ color:'var(--text-2)', fontWeight:500 }}>{row.partner}</td>
                        <td className="num tnum" style={{ fontWeight:600, color: invColor(row.invNum) }}>{row.inventory}</td>
                        <td className="num tnum">{row.redemptions}</td>
                        <td className="num tnum" style={{ fontWeight:600 }}>{row.liability}</td>
                        <td><RewardBadge status={row.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Showing {filtered.length} of {REWARDS.length} rewards</span>
                <div style={{ marginLeft:'auto' }} className="row gap-8">
                  <button className="btn btn-ghost btn-sm">Previous</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>

            {/* REWARD PERFORMANCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Reward performance</div>
                <span className="xsmall muted-2">Last 30 days</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
                {perfItems.map((p,i) => {
                  const toneMap = { accent:['var(--accent-soft)','var(--accent)'], amber:['var(--amber-bg)','var(--amber)'], green:['var(--green-bg)','var(--green)'], violet:['var(--violet-bg)','var(--violet)'] };
                  const [bg, fg] = toneMap[p.tone] || toneMap.accent;
                  return (
                    <div key={i} style={{ padding:'16px 18px', borderRight: i<perfItems.length-1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>{p.role}</div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)', lineHeight:1.3, marginBottom:6 }}>{p.name}</div>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:fg, background:bg, borderRadius:'var(--r-pill)', padding:'3px 9px' }}>
                        {p.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CATALOGUE HEALTH */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Catalogue health</div>
                <button className="btn btn-ghost btn-sm">{window.Ic('list',{size:14})} Full report</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)' }}>
                {healthItems.map((h,i) => {
                  const toneColors = { green:'var(--green)', amber:'var(--amber)', red:'var(--red)', slate:'var(--slate)' };
                  const toneBg    = { green:'var(--green-bg)', amber:'var(--amber-bg)', red:'var(--red-bg)', slate:'var(--slate-bg)' };
                  return (
                    <div key={i} style={{ padding:'16px 18px', borderRight: i<healthItems.length-1 ? '1px solid var(--border)' : 'none', textAlign:'center' }}>
                      <div style={{ fontSize:28, fontWeight:700, letterSpacing:'-.02em', color: toneColors[h.tone] }}>{h.val}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', marginTop:5, lineHeight:1.3 }}>{h.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>{/* end left column */}

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, minWidth:0 }}>

            {/* SELECTED REWARD DETAIL */}
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
                  <RewardBadge status={sel.status} />
                </div>
                <div style={{ padding:'12px 18px' }}>
                  <div style={{ fontSize:12.5, color:'var(--text-2)', lineHeight:1.6, marginBottom:12 }}>{sel.desc}</div>
                  <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                  {[
                    ['Category',          sel.category],
                    ['Tier eligibility',  sel.tierElig || 'All tiers'],
                    ['STARS cost',        sel.stars.toLocaleString() + ' STARS'],
                    ['Cash equivalent',   sel.cashEq],
                    ['Inventory',         sel.inventory],
                    ['Total redemptions', sel.redemptions],
                    ['Est. liability',    sel.liability],
                    ['Fulfillment',       sel.fulfillment],
                    ['Expiry',            sel.expiry],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, padding:'5px 0' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)', flex:'none' }}>{k}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right', lineHeight:1.4 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ height:1, background:'var(--border)', margin:'12px 0' }}></div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('list',{size:14})} Edit reward</button>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('pause',{size:14})} Pause reward</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start', color:'var(--accent)' }}>{window.Ic('target',{size:14})} View redemptions</button>
                  </div>
                </div>
              </div>
            )}

            {/* LIABILITY IMPACT */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Liability impact</div>
                <span style={{ width:28, height:28, borderRadius:'var(--r-sm)', background:'var(--amber-bg)', color:'var(--amber)', display:'grid', placeItems:'center' }}>
                  {window.Ic('vault',{size:14})}
                </span>
              </div>
              <div style={{ padding:'14px 18px' }}>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:11, color:'var(--text-3)', marginBottom:3 }}>Current redemption liability</div>
                  <div style={{ fontSize:26, fontWeight:700, letterSpacing:'-.02em', color:'var(--amber)' }}>৳11.8L</div>
                </div>
                <div style={{ height:1, background:'var(--border)', marginBottom:10 }}></div>
                {[
                  ['Highest liability category', 'Bill payment'],
                  ['Partner-funded offset',       '৳2.4L'],
                  ['MTB-funded liability',         '৳9.4L'],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0' }}>
                    <span style={{ fontSize:12.5, color:'var(--text-3)' }}>{k}</span>
                    <span style={{ fontSize:12.5, fontWeight:600 }}>{v}</span>
                  </div>
                ))}
                <div className="bar-track" style={{ marginTop:12 }}>
                  <div className="bar-fill" style={{ width:'80%', background:'var(--amber)' }}></div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
                  <span style={{ fontSize:11, color:'var(--text-3)' }}>MTB-funded</span>
                  <span style={{ fontSize:11, color:'var(--text-3)' }}>Partner-funded</span>
                </div>
                <div style={{ marginTop:12, padding:'10px 12px', background:'var(--accent-soft)', border:'1px solid var(--accent-tint)', borderRadius:'var(--r-sm)', fontSize:12, color:'var(--text-2)', lineHeight:1.5 }}>
                  Partner-funded rewards reduce MTB-funded redemption liability and improve the programme's P&L position.
                </div>
              </div>
            </div>

            {/* INVENTORY ALERTS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Inventory alerts</div>
                <span className="badge red" style={{ fontSize:11 }}>3 issues</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {inventoryAlerts.map((a,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'12px 0', borderBottom: i<inventoryAlerts.length-1 ? '1px solid var(--border)' : 'none', cursor:'pointer' }}>
                    <div style={{ width:26, height:26, borderRadius:'var(--r-sm)', flex:'none', marginTop:1, display:'grid', placeItems:'center',
                      background: a.tone==='red' ? 'var(--red-bg)' : 'var(--amber-bg)',
                      color:      a.tone==='red' ? 'var(--red)'    : 'var(--amber)',
                    }}>
                      {window.Ic('warn',{size:13,sw:2.2})}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, lineHeight:1.3 }}>{a.name}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', marginTop:3, lineHeight:1.4 }}>{a.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Add reward</div>
              </div>
              <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  ['star',     'Add MTB-funded reward'],
                  ['rewards',  'Add partner voucher'],
                  ['target',   'Add tier benefit'],
                  ['list',     'Import reward inventory'],
                ].map(([icon,label])=>(
                  <button key={label} className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }} onClick={()=>setShowAdd(true)}>
                    {window.Ic(icon,{size:14})} {label}
                  </button>
                ))}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── ADD REWARD MODAL ── */}
      {showAdd && (
        <div className="scrim" onClick={()=>setShowAdd(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('rewards',{size:17})}</div>
              <div>
                <div className="modal-title">Add reward</div>
                <div className="modal-sub">Configure a new redeemable reward for the STARS catalogue.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowAdd(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>
            <div className="modal-body">
              <div className="grid" style={{ gap:16 }}>
                <div className="field">
                  <label className="label">Reward name</label>
                  <input className="input" placeholder="e.g. ৳200 Mobile Recharge Voucher" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Category</label>
                    <select className="select">
                      <option>Mobile recharge</option>
                      <option>Bill payment</option>
                      <option>Lifestyle</option>
                      <option>Premium banking</option>
                      <option>Banking benefit</option>
                      <option>Shopping</option>
                      <option>Entertainment</option>
                      <option>Dining</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">STARS cost</label>
                    <div className="input-group">
                      <input className="input has-suffix tnum" placeholder="1000" />
                      <span className="input-suffix">STARS</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Partner / Funded by</label>
                    <select className="select">
                      <option>MTB</option>
                      <option>MTB Privilege</option>
                      <option>North End</option>
                      <option>Aarong</option>
                      <option>Star Cineplex</option>
                      <option>Partner Network</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Cash equivalent</label>
                    <div className="input-group">
                      <span className="input-prefix">৳</span>
                      <input className="input has-prefix tnum" placeholder="100" />
                    </div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Inventory</label>
                    <input className="input tnum" placeholder="e.g. 5000 or Unlimited" />
                  </div>
                  <div className="field">
                    <label className="label">Fulfillment type</label>
                    <select className="select">
                      <option>Instant digital voucher</option>
                      <option>QR voucher</option>
                      <option>Wallet credit</option>
                      <option>Account credit</option>
                      <option>Promo code</option>
                      <option>Digital pass</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowAdd(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowAdd(false)}>Add to catalogue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.RewardsCataloguePage = RewardsCataloguePage;
