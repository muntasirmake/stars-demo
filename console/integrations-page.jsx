// STARS Admin Console — Integrations (full-page v2)
const { useState: uINT } = React;

const INT_TYPE_TONE = {
  'Customer app':      { bg:'var(--accent-soft)', fg:'var(--accent)'  },
  'Banking core':      { bg:'var(--amber-bg)',    fg:'var(--amber)'   },
  'Transaction ledger':{ bg:'var(--green-bg)',    fg:'var(--green)'   },
  'Loyalty wallet':    { bg:'var(--violet-bg)',   fg:'var(--violet)'  },
  'Customer data':     { bg:'var(--blue-bg)',     fg:'var(--blue)'    },
  'Transaction feed':  { bg:'var(--green-bg)',    fg:'var(--green)'   },
  'Messaging':         { bg:'var(--slate-bg)',    fg:'var(--slate)'   },
  'Risk control':      { bg:'var(--red-bg)',      fg:'var(--red)'     },
  'Reporting':         { bg:'var(--slate-bg)',    fg:'var(--slate)'   },
  'Rewards partner':   { bg:'var(--amber-bg)',    fg:'var(--amber)'   },
};
const INT_STATUS_TONE = {
  'Connected':     'green',
  'Demo Mode testing':   'blue',
  'Needs review':  'amber',
  'Pending config':'amber',
};

function IntTypeTag({ type }) {
  const t = INT_TYPE_TONE[type] || { bg:'var(--slate-bg)', fg:'var(--slate)' };
  return <span style={{ display:'inline-flex', fontSize:11, fontWeight:600, color:t.fg, background:t.bg, borderRadius:'var(--r-pill)', padding:'3px 9px', whiteSpace:'nowrap' }}>{type}</span>;
}

function IntegrationsPage({ onCreate }) {

  const INTEGRATIONS = [
    {
      id:'INT_001', mark:'A', markBg:'var(--accent)',
      name:'MTB Neo App',          type:'Customer app',
      dataFlow:'Campaign display + mission progress',
      lastSync:'2 min ago',        events:'480K',    health:'99.9%', status:'Connected',
      owner:'MTB Product + IT',    direction:'Bidirectional', auth:'OAuth 2.0',      retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE: app.campaignView / mission.progress\nMAP TO: campaign.impressions + member.progress\nREQUIRED FIELDS:\n  member_id, campaign_id, action_type,\n  timestamp, session_token\nUSED BY:\n  All active campaigns\n  Member notification triggers\n  Campaign analytics',
      usedBy:['All active campaigns','Member notification triggers','Campaign analytics','Mission completion tracking'],
    },
    {
      id:'INT_002', mark:'B', markBg:'var(--amber)',
      name:'Core Banking System',  type:'Banking core',
      dataFlow:'Account status + eligibility checks',
      lastSync:'5 min ago',        events:'220K',    health:'99.8%', status:'Connected',
      owner:'MTB IT Core',         direction:'Inbound', auth:'Secure API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE: core.accountStatus / core.kycStatus\nMAP TO: member.eligibility\nREQUIRED FIELDS:\n  account_id, account_type, status,\n  kyc_status, tier, last_activity\nUSED BY:\n  Eligibility rules engine\n  Tier movement rules\n  Staff account exclusion',
      usedBy:['Eligibility rules engine','Tier movement rules','Staff account exclusion','Segment qualification'],
    },
    {
      id:'INT_003', mark:'P', markBg:'var(--green)',
      name:'Bill Payment Ledger',  type:'Transaction ledger',
      dataFlow:'Utility bill payment events',
      lastSync:'1 min ago',        events:'310K',    health:'99.9%', status:'Connected',
      owner:'MTB IT + Program Admin', direction:'Inbound', auth:'Secure API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE EVENT: bill_payment.completed\nMAP TO: transaction.category = "Utility"\nREQUIRED FIELDS:\n  member_id, transaction_id,\n  biller_id, amount, channel,\n  settlement_status, timestamp\nUSED BY:\n  Bill Pay Booster Qualification\n  Utility Bill Payers Segment\n  Duplicate Biller Protection\n  Analytics & Liability',
      usedBy:['Bill Pay Booster Qualification','Utility Bill Payers Segment','Duplicate Biller Protection','Analytics & Liability'],
    },
    {
      id:'INT_004', mark:'W', markBg:'var(--violet)',
      name:'STARS Wallet',         type:'Loyalty wallet',
      dataFlow:'STARS issue, redeem, expire',
      lastSync:'30 sec ago',       events:'640K',    health:'99.7%', status:'Connected',
      owner:'MTB Loyalty IT',      direction:'Bidirectional', auth:'Internal service token', retry:'5 attempts',
      env:'Demo Mode',
      mapping:'SOURCE EVENT: stars.issued / stars.redeemed\nMAP TO: member.starsBalance\nREQUIRED FIELDS:\n  member_id, transaction_type,\n  stars_amount, campaign_id,\n  expiry_date, timestamp\nUSED BY:\n  Tier upgrade rules\n  STARS expiry rule\n  Liability calculations\n  Member app balance display',
      usedBy:['Tier upgrade rules','STARS expiry rule','Liability calculations','Member app balance display'],
    },
    {
      id:'INT_005', mark:'C', markBg:'var(--blue)',
      name:'CRM / Customer Profile', type:'Customer data',
      dataFlow:'Segment attributes + exclusions',
      lastSync:'8 min ago',        events:'185K',    health:'99.5%', status:'Connected',
      owner:'MTB CRM Team',        direction:'Inbound', auth:'Secure API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE: crm.memberProfile / crm.segmentAttributes\nMAP TO: member.segment\nREQUIRED FIELDS:\n  member_id, account_type,\n  staff_flag, tier, product_tags,\n  churn_risk_score\nUSED BY:\n  Customer Segments refresh\n  Staff account exclusion\n  At-Risk Churn segment',
      usedBy:['Customer Segments refresh','Staff account exclusion','At-Risk Churn segment','Eligibility filtering'],
    },
    {
      id:'INT_006', mark:'T', markBg:'#2F62D6',
      name:'Card Transaction Feed', type:'Transaction feed',
      dataFlow:'Card spend events',
      lastSync:'12 min ago',       events:'96K',     health:'98.9%', status:'Demo Mode testing',
      owner:'MTB Cards IT',        direction:'Inbound', auth:'Secure API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE EVENT: card.transactionSettled\nMAP TO: transaction.type = "Card"\nREQUIRED FIELDS:\n  member_id, card_id, amount,\n  merchant_category, channel,\n  day_of_week, timestamp\nUSED BY:\n  Weekend Card Spend Multiplier\n  Card spend analytics\n  Tier calculation feed',
      usedBy:['Weekend Card Spend Multiplier','Card spend analytics','Tier calculation feed'],
    },
    {
      id:'INT_007', mark:'N', markBg:'#5C6373',
      name:'Notification Service',  type:'Messaging',
      dataFlow:'Push, SMS, email campaign alerts',
      lastSync:'4 min ago',        events:'72K',     health:'99.2%', status:'Connected',
      owner:'MTB Comms Team',      direction:'Outbound', auth:'Service API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE: notification.trigger\nMAP TO: push / sms / email delivery\nREQUIRED FIELDS:\n  member_id, notification_type,\n  campaign_id, channel,\n  template_id, timestamp\nUSED BY:\n  Campaign completion alerts\n  STARS expiry warnings\n  Tier upgrade notifications',
      usedBy:['Campaign completion alerts','STARS expiry warnings','Tier upgrade notifications','Mission progress updates'],
    },
    {
      id:'INT_008', mark:'F', markBg:'var(--red)',
      name:'Fraud & Risk System',   type:'Risk control',
      dataFlow:'Exception flags + suspicious patterns',
      lastSync:'15 min ago',       events:'18K',     health:'98.4%', status:'Needs review',
      owner:'MTB Risk Team',       direction:'Inbound', auth:'Secure API token', retry:'3 attempts',
      env:'Demo Mode',
      mapping:'SOURCE EVENT: risk.exceptionFlag\nMAP TO: member.riskScore\nREQUIRED FIELDS:\n  member_id, exception_type,\n  risk_score, flagged_events,\n  review_status, timestamp\nUSED BY:\n  Fraud exception controls\n  Auto-pause rules\n  At-Risk Churn segment',
      usedBy:['Fraud exception controls','Auto-pause rules','At-Risk Churn segment','Risk dashboard'],
    },
    {
      id:'INT_009', mark:'R', markBg:'#5C6373',
      name:'Finance Reporting Export', type:'Reporting',
      dataFlow:'Liability and redemption reports',
      lastSync:'Daily batch',      events:'31 reports', health:'100%', status:'Connected',
      owner:'MTB Finance',         direction:'Outbound', auth:'Scheduled export', retry:'N/A',
      env:'Demo Mode',
      mapping:'SOURCE: analytics.liabilitySnapshot\nMAP TO: finance.report\nREQUIRED FIELDS:\n  period, total_stars_issued,\n  total_liability_bdt, campaign_breakdown,\n  partner_offset, report_timestamp\nUSED BY:\n  Finance monthly close\n  Liability provisioning\n  Board reporting',
      usedBy:['Finance monthly close','Liability provisioning','Board reporting','Audit trail'],
    },
    {
      id:'INT_010', mark:'V', markBg:'var(--amber)',
      name:'Partner Voucher API',   type:'Rewards partner',
      dataFlow:'Voucher inventory + redemption status',
      lastSync:'Pending',          events:'—',       health:'—',     status:'Pending config',
      owner:'MTB Partnerships',    direction:'Bidirectional', auth:'Pending credentials', retry:'TBD',
      env:'Demo Mode',
      mapping:'SOURCE: partner.voucherInventory\nMAP TO: reward.availability\nREQUIRED FIELDS:\n  partner_id, voucher_type,\n  available_count, redemption_url,\n  expiry_date, api_key\nUSED BY:\n  Rewards Catalogue inventory\n  Partner voucher redemption\n  Inventory alerts',
      usedBy:['Rewards Catalogue inventory','Partner voucher redemption','Inventory alerts'],
    },
  ];

  const defaultIntegration = INTEGRATIONS.find(i => i.name === 'Bill Payment Ledger') || INTEGRATIONS[0];
  const [sel, setSel] = uINT(defaultIntegration);
  const [showAdd, setShowAdd] = uINT(false);
  const [searchQ, setSearchQ] = uINT('');

  const filtered = INTEGRATIONS.filter(i =>
    !searchQ || i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.type.toLowerCase().includes(searchQ.toLowerCase())
  );

  const kpis = [
    { label:'Configured integrations', value:'10',   sub:'8 connected in Demo Mode',       iconKey:'integrations', iBg:'var(--accent-soft)', iFg:'var(--accent)' },
    { label:'Events processed',       value:'1.8M', sub:'Last 30 days',             iconKey:'bolt',         iBg:'var(--green-bg)',    iFg:'var(--green)'  },
    { label:'Sync health',            value:'99.7%',sub:'Across connected services', iconKey:'target',       iBg:'var(--blue-bg)',     iFg:'var(--blue)'   },
    { label:'Pending configuration',  value:'2',    sub:'Requires MTB IT review',   iconKey:'warn',         iBg:'var(--amber-bg)',    iFg:'var(--amber)'  },
    { label:'Integration alerts',     value:'3',    sub:'Non-critical',             iconKey:'bell',         iBg:'var(--red-bg)',      iFg:'var(--red)'    },
  ];

  const syncActivity = [
    { time:'09:12', system:'Bill Payment Ledger',  event:'bill_payment.completed', result:'Success', records:'1,240', note:'Processed for campaign eligibility', ok:true  },
    { time:'09:10', system:'STARS Wallet',         event:'stars.issued',           result:'Success', records:'890',   note:'Reward issuance completed',          ok:true  },
    { time:'09:08', system:'CRM / Customer Profile',event:'segment.refresh',       result:'Success', records:'185,420',note:'Daily segment refresh',             ok:true  },
    { time:'09:05', system:'Notification Service', event:'push.sent',              result:'Success', records:'12,800',note:'Campaign notification batch',        ok:true  },
    { time:'09:01', system:'Fraud & Risk System',  event:'exception.sync',         result:'Warning', records:'42',    note:'Review recommended',                 ok:null  },
    { time:'08:55', system:'Partner Voucher API',  event:'inventory.sync',         result:'Pending', records:'—',     note:'Awaiting partner credentials',       ok:false },
  ];

  const sysAlerts = [
    { label:'Fraud & Risk System',    detail:'Review required — 42 unresolved exceptions', tone:'amber' },
    { label:'Partner Voucher API',    detail:'API credentials pending — inventory sync blocked', tone:'amber' },
    { label:'Card Transaction Feed',  detail:'Demo Mode testing in progress — not yet promoted',   tone:'blue'  },
    { label:'Retry queue',            detail:'42 events pending retry across all sources',    tone:'slate' },
  ];

  const healthItems = [
    { label:'API uptime',     val:'99.7%',   tone:'green' },
    { label:'Avg latency',    val:'210ms',   tone:'green' },
    { label:'Failed events',  val:'0.3%',    tone:'green' },
    { label:'Retry queue',    val:'42 events',tone:'amber' },
    { label:'Data freshness', val:'Healthy', tone:'green' },
  ];

  const secItems = [
    { label:'Encrypted in transit',     ok:true  },
    { label:'Role-based access',        ok:true  },
    { label:'Audit logs enabled',       ok:true  },
    { label:'PII fields masked',        ok:true  },
    { label:'Data retention policy active', ok:true  },
  ];

  const resultTone = { Success:'green', Warning:'amber', Pending:'blue', Failed:'red' };

  const pipelineNodes = [
    { icon:'campaigns', label:'MTB Neo App', sub:'Banking Systems' },
    { icon:'bolt',      label:'Event Ingestion', sub:'Events validated' },
    { icon:'rules',     label:'Rules Engine', sub:'Rules evaluated' },
    { icon:'star',      label:'STARS Wallet', sub:'STARS issued / redeemed' },
    { icon:'analytics', label:'Analytics', sub:'Liability updated' },
    { icon:'bell',      label:'Customer Notification', sub:'User notified' },
  ];

  const healthColor = (h) => {
    if (h === '—') return 'var(--text-3)';
    const n = parseFloat(h);
    if (n >= 99.5) return 'var(--green)';
    if (n >= 98)   return 'var(--amber)';
    return 'var(--red)';
  };

  return (
    <div style={{ height:'calc(100vh - var(--header-h))', overflowY:'auto', background:'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding:'18px 28px 16px', borderBottom:'1px solid var(--border)', background:'rgba(250,250,251,.96)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <h1 className="h1">Integrations</h1>
            <p className="page-sub" style={{ marginTop:3 }}>Monitor the connected MTB systems that power STARS events, wallet updates, customer segments, rewards, notifications, and reporting.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, flexWrap:'wrap' }}>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} All types {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm">{window.Ic('filter',{size:14})} All statuses {window.Ic('chevDown',{size:13})}</button>
            <button className="btn btn-secondary btn-sm" style={{ color:'var(--amber)', borderColor:'var(--amber-bd)', background:'var(--amber-bg)' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--amber)', display:'inline-block', marginRight:4 }}></span>Demo Mode
            </button>
            <div style={{ width:1, height:18, background:'var(--border-strong)' }}></div>
            <div className="search" style={{ width:200, height:34, fontSize:13 }}>
              {window.Ic('search',{size:14})}
              <input placeholder="Search integrations…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">{window.Ic('list',{size:14})} Export logs</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(true)}>
              {window.Ic('plus',{size:14})} Add integration
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

            {/* INTEGRATIONS TABLE */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Connected systems</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>{filtered.length} integrations{searchQ?' matching "'+searchQ+'"':' · click to view detail'}</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('filter',{size:14})} Filter</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Integration</th>
                    <th>Type</th>
                    <th>Data flow</th>
                    <th>Last sync</th>
                    <th className="num">Events</th>
                    <th className="num">Health</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row,i) => {
                    const isSel = sel && sel.id === row.id;
                    return (
                      <tr key={i}
                        style={{ cursor:'pointer', background: isSel?'var(--accent-soft)':undefined, transition:'background .12s' }}
                        onClick={()=>setSel(row)}
                      >
                        <td>
                          <div className="cell-flex">
                            <div className="row-ic" style={{ background:row.markBg, color:'#fff', fontSize:12, fontWeight:700, flex:'none' }}>{row.mark}</div>
                            <div>
                              <a className="link" style={{ fontWeight:600 }} onClick={e=>{e.stopPropagation(); setSel(row);}}>{row.name}</a>
                              <div className="cell-sub" style={{ fontFamily:'var(--mono)', fontSize:11 }}>{row.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><IntTypeTag type={row.type} /></td>
                        <td className="small muted" style={{ fontSize:12.5, maxWidth:180 }}>{row.dataFlow}</td>
                        <td className="small" style={{ fontFamily:'var(--mono)', fontSize:11.5, color:'var(--text-3)', whiteSpace:'nowrap' }}>{row.lastSync}</td>
                        <td className="num tnum" style={{ fontWeight:600 }}>{row.events}</td>
                        <td className="num tnum" style={{ fontWeight:700, color: healthColor(row.health) }}>{row.health}</td>
                        <td>
                          <span className={'badge '+(INT_STATUS_TONE[row.status]||'slate')} style={{ fontSize:11 }}>
                            <span className="dot"></span>{row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Showing {filtered.length} of {INTEGRATIONS.length} integrations</span>
                <div style={{ marginLeft:'auto' }} className="row gap-8">
                  <button className="btn btn-ghost btn-sm">Previous</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>

            {/* EVENT FLOW PIPELINE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Event flow</div>
                <div className="xsmall muted-2">MTB Neo STARS · data orchestration pipeline</div>
              </div>
              <div style={{ padding:'20px 24px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:0, overflowX:'auto', paddingBottom:4 }}>
                  {pipelineNodes.map((node,i) => (
                    <React.Fragment key={i}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:'none', minWidth:110 }}>
                        <div style={{ width:48, height:48, borderRadius:'var(--r-md)', background: i===0?'var(--accent)':i===pipelineNodes.length-1?'var(--green-bg)':'var(--accent-soft)', color: i===0?'#fff':i===pipelineNodes.length-1?'var(--green)':'var(--accent)', display:'grid', placeItems:'center', border: i>0&&i<pipelineNodes.length-1 ? '1.5px solid var(--accent-tint)' : 'none', boxShadow: i===0?'var(--sh-sm)':'var(--sh-xs)' }}>
                          {window.Ic(node.icon,{size:20})}
                        </div>
                        <div style={{ fontSize:12, fontWeight:700, marginTop:10, textAlign:'center', lineHeight:1.3 }}>{node.label}</div>
                        <div style={{ fontSize:11, color:'var(--text-3)', marginTop:3, textAlign:'center', lineHeight:1.3 }}>{node.sub}</div>
                      </div>
                      {i < pipelineNodes.length-1 && (
                        <div style={{ display:'flex', alignItems:'center', paddingTop:14, flex:'none' }}>
                          <div style={{ width:28, height:1.5, background:'var(--accent-tint)' }}></div>
                          <div style={{ width:0, height:0, borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderLeft:'6px solid var(--accent-tint)' }}></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* RECENT SYNC ACTIVITY */}
            <div className="card table-wrap">
              <div className="card-head">
                <div className="grow">
                  <div className="card-title">Recent sync activity</div>
                  <div className="xsmall muted-2" style={{ marginTop:2 }}>Live system events · auto-refreshing</div>
                </div>
                <button className="btn btn-ghost btn-sm">{window.Ic('list',{size:14})} Full log</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>System</th>
                    <th>Event</th>
                    <th>Status</th>
                    <th className="num">Records</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {syncActivity.map((ev,i) => (
                    <tr key={i}>
                      <td className="small" style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text-3)', whiteSpace:'nowrap' }}>{ev.time}</td>
                      <td className="small" style={{ fontSize:12.5, fontWeight:500 }}>{ev.system}</td>
                      <td className="small" style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--accent)' }}>{ev.event}</td>
                      <td>
                        <span className={'badge '+(resultTone[ev.result]||'slate')} style={{ fontSize:11 }}>
                          <span className="dot"></span>{ev.result}
                        </span>
                      </td>
                      <td className="num tnum small" style={{ fontWeight:600 }}>{ev.records}</td>
                      <td className="small muted" style={{ fontSize:12 }}>{ev.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-foot">
                <span className="small muted-2">Live · last updated 09:12</span>
              </div>
            </div>

            {/* API / EVENT MAPPING PREVIEW */}
            {sel && (
              <div className="card">
                <div className="card-head">
                  <div style={{ flex:1 }}>
                    <div className="card-title">API / event mapping</div>
                    <div className="xsmall muted-2" style={{ marginTop:2 }}>Schema and field mapping · <b>{sel.name}</b></div>
                  </div>
                  <IntTypeTag type={sel.type} />
                </div>
                <div style={{ padding:'0 22px' }}>
                  <div style={{ padding:'11px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background: sel.status==='Connected'?'var(--green)':sel.status==='Needs review'?'var(--amber)':'var(--blue)' }}></div>
                    <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>
                      {sel.status} · direction: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.direction.toLowerCase()}</span> · auth: <span style={{ fontFamily:'var(--mono)', color:'var(--accent)' }}>{sel.auth.toLowerCase().replace(/ /g,'_')}</span>
                    </span>
                  </div>
                  <div style={{ padding:'18px 0', fontFamily:'var(--mono)', fontSize:13, lineHeight:2, color:'var(--text)' }}>
                    {sel.mapping.split('\n').map((line,i) => {
                      const isKw = ['SOURCE','MAP','REQUIRED','USED'].some(k=>line.trim().startsWith(k));
                      const isItem = line.trim().startsWith('-') || line.trim().startsWith(' ');
                      return (
                        <div key={i} style={{ paddingLeft: isItem&&!isKw ? 16 : 0 }}>
                          {isKw
                            ? <><span style={{ color:'var(--accent)', fontWeight:700 }}>{line.split(':')[0]}</span><span style={{ color:'var(--text-3)' }}>:</span><span>{line.slice(line.indexOf(':')+1)}</span></>
                            : <span style={{ color: line.trim().startsWith('-') ? 'var(--text)' : 'var(--green)', fontWeight: line.trim().startsWith('-')?400:600 }}>{line}</span>
                          }
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

            {/* SELECTED INTEGRATION DETAIL */}
            {sel && (
              <div className="card">
                <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'var(--r-md)', background:sel.markBg, color:'#fff', display:'grid', placeItems:'center', fontSize:15, fontWeight:700, flex:'none' }}>
                    {sel.mark}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, letterSpacing:'-.01em', lineHeight:1.3 }}>{sel.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-3)', marginTop:2 }}>{sel.id}</div>
                  </div>
                  <span className={'badge '+(INT_STATUS_TONE[sel.status]||'slate')} style={{ fontSize:11 }}>
                    <span className="dot"></span>{sel.status}
                  </span>
                </div>
                <div style={{ padding:'12px 18px' }}>
                  <div style={{ height:1, background:'var(--border)', marginBottom:12 }}></div>
                  {[
                    ['Type',            sel.type],
                    ['Environment',     sel.env],
                    ['Last sync',       sel.lastSync],
                    ['Events processed',sel.events],
                    ['Health',          sel.health],
                    ['Owner',           sel.owner],
                    ['Data direction',  sel.direction],
                    ['Auth method',     sel.auth],
                    ['Retry policy',    sel.retry],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, padding:'5px 0' }}>
                      <span style={{ fontSize:12.5, color:'var(--text-3)', flex:'none' }}>{k}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, textAlign:'right', lineHeight:1.4,
                        color: k==='Health' ? healthColor(v) : 'var(--text)'
                      }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ height:1, background:'var(--border)', margin:'12px 0' }}></div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('list',{size:14})} View logs</button>
                    <button className="btn btn-secondary btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('activity',{size:14})} Test connection</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('list',{size:14})} Edit mapping</button>
                    <button className="btn btn-ghost btn-sm" style={{ justifyContent:'flex-start' }}>{window.Ic('pause',{size:14})} Pause sync</button>
                  </div>
                </div>
              </div>
            )}

            {/* INTEGRATION HEALTH */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Integration health</div>
                <span className="badge green" style={{ fontSize:11 }}>Healthy</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {healthItems.map((h,i) => {
                  const dotColor = { green:'var(--green)', amber:'var(--amber)', red:'var(--red)' }[h.tone] || 'var(--slate)';
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

            {/* SYSTEM ALERTS */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">System alerts</div>
                <span className="badge amber" style={{ fontSize:11 }}>3 active</span>
              </div>
              <div style={{ padding:'0 16px' }}>
                {sysAlerts.map((a,i) => {
                  const toneMap = { amber:['var(--amber-bg)','var(--amber)'], blue:['var(--blue-bg)','var(--blue)'], slate:['var(--slate-bg)','var(--slate)'] };
                  const [bg,fg] = toneMap[a.tone] || toneMap.slate;
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'12px 0', borderBottom: i<sysAlerts.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
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

            {/* SECURITY & COMPLIANCE */}
            <div className="card">
              <div className="card-head">
                <div className="card-title grow">Security & compliance</div>
                <span className="badge green" style={{ fontSize:11 }}>All checks pass</span>
              </div>
              <div style={{ padding:'0 18px' }}>
                {secItems.map((s,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 0', borderBottom: i<secItems.length-1?'1px solid var(--border)':'none' }}>
                    <div style={{ width:22, height:22, borderRadius:'var(--r-xs)', background:'var(--green-bg)', color:'var(--green)', display:'grid', placeItems:'center', flex:'none' }}>
                      {window.Ic('check',{size:12,sw:2.5})}
                    </div>
                    <span style={{ fontSize:12.5, fontWeight:500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end right sidebar */}
        </div>
      </div>

      {/* ── ADD INTEGRATION MODAL ── */}
      {showAdd && (
        <div className="scrim" onClick={()=>setShowAdd(false)}>
          <div className="modal" style={{ maxWidth:560 }} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('integrations',{size:17})}</div>
              <div>
                <div className="modal-title">Add integration</div>
                <div className="modal-sub">Connect a new MTB system or partner API to the STARS platform.</div>
              </div>
              <button className="icon-btn modal-x" style={{ width:32, height:32 }} onClick={()=>setShowAdd(false)}>
                {window.Ic('x',{size:18,sw:1.8})}
              </button>
            </div>
            <div className="modal-body">
              <div className="grid" style={{ gap:16 }}>
                <div className="field">
                  <label className="label">Integration name</label>
                  <input className="input" placeholder="e.g. QR Payment Partner API" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Integration type</label>
                    <select className="select">
                      <option>Transaction ledger</option>
                      <option>Customer app</option>
                      <option>Banking core</option>
                      <option>Loyalty wallet</option>
                      <option>Customer data</option>
                      <option>Messaging</option>
                      <option>Risk control</option>
                      <option>Reporting</option>
                      <option>Rewards partner</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Data direction</label>
                    <select className="select">
                      <option>Inbound</option>
                      <option>Outbound</option>
                      <option>Bidirectional</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="field">
                    <label className="label">Auth method</label>
                    <select className="select">
                      <option>Secure API token</option>
                      <option>OAuth 2.0</option>
                      <option>Internal service token</option>
                      <option>Scheduled export</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Environment</label>
                    <select className="select">
                      <option>Demo Mode</option>
                      <option>Production</option>
                      <option>Sandbox</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Endpoint URL</label>
                  <input className="input" placeholder="https://api.mtbneo.com/v1/events" style={{ fontFamily:'var(--mono)', fontSize:12.5 }} />
                </div>
                <div className="callout warn">
                  <span className="c-ic">{window.Ic('warn',{size:18,sw:1.7})}</span>
                  <div><div className="callout-title">Demo Mode</div>New integrations are tested in Demo Mode before being promoted to production. Coordinate with MTB IT before going live.</div>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
              <div style={{ marginLeft:'auto' }} className="row gap-10">
                <button className="btn btn-secondary" onClick={()=>setShowAdd(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={()=>setShowAdd(false)}>Add integration</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.IntegrationsPage = IntegrationsPage;
