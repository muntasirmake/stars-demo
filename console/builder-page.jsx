// STARS Admin Console — Full-page Campaign Builder (v2)
const { useState: usBP } = React;

const BP_STEPS = [
  { id: 'basics',   label: 'Basics',   icon: 'list',     desc: 'Name, objective & dates'   },
  { id: 'audience', label: 'Audience', icon: 'segments', desc: 'Target members'              },
  { id: 'trigger',  label: 'Trigger',  icon: 'bolt',     desc: 'Qualifying action'           },
  { id: 'reward',   label: 'Reward',   icon: 'star',     desc: 'STARS amount & type'        },
  { id: 'limits',   label: 'Limits',   icon: 'vault',    desc: 'Budget & member caps'       },
  { id: 'approval', label: 'Approval', icon: 'check',    desc: 'Sign-off & publish'         },
];

const BPS = {
  card:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)' },
  pad:     { padding:'20px 22px' },
  sec:     { marginBottom:28 },
  stitle:  { fontSize:16, fontWeight:600, letterSpacing:'-.01em', marginBottom:4 },
  sdesc:   { fontSize:13, color:'var(--text-2)', marginBottom:18, lineHeight:1.55 },
  row2:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 },
  row3:    { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18 },
  divider: { height:1, background:'var(--border)', margin:'20px 0' },
  preview: { padding:'13px 16px', background:'var(--accent-soft)', border:'1px solid var(--accent-tint)', borderRadius:'var(--r-md)', marginTop:4 },
};

// Step status uses explicit visited tracking, NOT field-value presence
// visited = Set of step indices the user has clicked "Continue" on

// ── STEP 1 ── Basics ────────────────────────────────────────────
function BPBasics({ f, set }) {
  return (
    <div>
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Campaign identity</div>
        <div style={BPS.sdesc}>Define the core identity and purpose of this campaign. This information is used for internal tracking and regulatory records.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{ gap:20 }}>
              <div className="field">
                <label className="label">Campaign type</label>
                <div className="segmented" style={{ width:'fit-content' }}>
                  {[['promotional','Promotional'],['always-on','Always-on']].map(([v,l])=>(
                    <button key={v} className={(f.campaignMode||'promotional')===v?'on':''} onClick={()=>set('campaignMode',v)}>{l}</button>
                  ))}
                </div>
                <span className="hint">{(f.campaignMode||'promotional')==='always-on'?'Runs continuously with no end date — requires a periodic review cycle.':'Time-bound campaign with defined start and end dates and a budget cap.'}</span>
              </div>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Campaign name</label>
                  <input className="input" value={f.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Bill Pay Booster" />
                </div>
                <div className="field">
                  <label className="label">Reward mechanism</label>
                  <div className="segmented">
                    {['Earn','Redeem','Mission'].map(t=>(
                      <button key={t} className={f.campaignType===t?'on':''} onClick={()=>set('campaignType',t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Objective</label>
                <textarea className="textarea" rows="2" value={f.objective} onChange={e=>set('objective',e.target.value)} placeholder="What is this campaign designed to achieve?" />
              </div>
              <div className="field">
                <label className="label">Campaign description <span className="opt">· shown to approvers</span></label>
                <textarea className="textarea" rows="2" value={f.description||''} onChange={e=>set('description',e.target.value)} placeholder="Provide a plain-language description for internal stakeholders and approval reviewers." />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={BPS.sec}>
        <div style={BPS.stitle}>Metrics & ownership</div>
        <div style={BPS.sdesc}>Define who owns this campaign and how success will be measured.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{ gap:20 }}>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Campaign owner</label>
                  <select className="select" value={f.owner||'Kaiser Jahangir'} onChange={e=>set('owner',e.target.value)}>
                    <option>Kaiser Jahangir</option>
                    <option>Nadia Karim</option>
                    <option>Rafiq Ahmed</option>
                    <option>Tahmina Sultana</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Success metric / KPI</label>
                  <select className="select" value={f.kpi||'Transaction volume'} onChange={e=>set('kpi',e.target.value)}>
                    <option>Transaction volume</option>
                    <option>Utility bill payment volume</option>
                    <option>STARS issued</option>
                    <option>Member activation rate</option>
                    <option>Redemption rate</option>
                    <option>Net liability reduction</option>
                    <option>Referral count</option>
                  </select>
                </div>
              </div>
              {(f.campaignMode||'promotional')==='promotional' ? (
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Start date</label>
                  <div className="input-group"><span className="input-icon">{window.Ic('calendar',{size:16,sw:1.7})}</span><input className="input has-icon" value={f.startDate} onChange={e=>set('startDate',e.target.value)} /></div>
                </div>
                <div className="field">
                  <label className="label">End date</label>
                  <div className="input-group"><span className="input-icon">{window.Ic('calendar',{size:16,sw:1.7})}</span><input className="input has-icon" value={f.endDate} onChange={e=>set('endDate',e.target.value)} /></div>
                </div>
              </div>
              ) : (
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Status</label>
                  <div style={{ display:'flex', alignItems:'center', gap:10, height:40, padding:'0 12px', background:'var(--green-bg)', border:'1px solid var(--green-bd)', borderRadius:'var(--r-md)' }}>
                    <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)', flex:'none' }}></span>
                    <span style={{ fontSize:13.5, fontWeight:600, color:'var(--green)' }}>Always active — no end date</span>
                  </div>
                  <span className="hint">Campaign runs continuously until manually paused.</span>
                </div>
                <div className="field">
                  <label className="label">Review cycle</label>
                  <select className="select" value={f.reviewCycle||'monthly'} onChange={e=>set('reviewCycle',e.target.value)}>
                    <option value="monthly">Monthly review</option>
                    <option value="quarterly">Quarterly review</option>
                  </select>
                  <span className="hint">Periodic review to confirm campaign parameters remain valid.</span>
                </div>
              </div>
              )}
              <div className="field">
                <label className="label">Internal notes <span className="opt">· not shown to members</span></label>
                <textarea className="textarea" rows="2" value={f.internalNotes||''} onChange={e=>set('internalNotes',e.target.value)} placeholder="Budget rationale, campaign history, escalation contacts, or compliance notes." />
              </div>
              <div className="field">
                <label className="label">Internal reference</label>
                <input className="input" disabled value="CMP_DRAFT" style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--text-3)'}} />
                <span className="hint">Auto-assigned on first save. Immutable after publication.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STEP 2 ── Audience ──────────────────────────────────────────
function BPAudience({ f, set }) {
  const reach = { all:'185,420', tier:'12,400', segment:'38,600' };
  const auds  = [['all','All members'],['tier','By tier'],['segment','By segment']];
  return (
    <div>
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Target audience</div>
        <div style={BPS.sdesc}>Define which MTB Neo members are eligible to participate in this campaign.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{ gap:20 }}>
              <div className="field">
                <label className="label">Audience type</label>
                <div className="segmented">{auds.map(([v,l])=><button key={v} className={f.segment===v?'on':''} onClick={()=>set('segment',v)}>{l}</button>)}</div>
              </div>
              {f.segment==='tier' && <div className="field"><label className="label">Tier</label><select className="select"><option>All tiers</option><option>Silver</option><option>Gold</option><option>Gold+</option><option>Platinum</option><option>Platinum+</option><option>Premier</option></select></div>}
              {f.segment==='segment' && <div className="field"><label className="label">Segment</label><select className="select"><option>Salaried</option><option>SME / Business</option><option>Frequent payers</option><option>App-active</option></select></div>}
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Eligibility</label>
                  <select className="select" value={f.eligibility} onChange={e=>set('eligibility',e.target.value)}>
                    <option>Active in last 30 days</option>
                    <option>All members</option>
                    <option>KYC verified only</option>
                    <option>Salary account holders</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Estimated reach</label>
                  <input className="input tnum" disabled value={(reach[f.segment]||'—')+' members'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="callout" style={{ background:'var(--accent-soft)', border:'1px solid rgba(79,91,213,.15)', borderRadius:'var(--r-md)', padding:'12px 14px', display:'flex', alignItems:'flex-start', gap:10, marginBottom:12 }}>
        <span style={{ color:'var(--accent)', flex:'none', marginTop:1 }}>{window.Ic('bolt',{size:18,sw:1.7})}</span>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>Recommended by STARS Intelligence</div>
          <div style={{ fontSize:12.5, color:'var(--text-2)', lineHeight:1.45 }}>Based on NEO Growth Score analysis, <strong>Activated but No Bill Pay</strong> (28,300 users) is the highest-priority segment for this campaign type — 91% confidence score.</div>
        </div>
      </div>
      <div className="callout info"><span className="c-ic">{window.Ic('info',{size:18,sw:1.7})}</span><div><div className="callout-title">Reach resolved at publish time</div>Final audience is drawn live from the MTB Neo member ledger when the campaign activates.</div></div>
    </div>
  );
}

// ── STEP 3 ── Trigger ───────────────────────────────────────────
function BPTrigger({ f, set }) {
  const TRIGGER_TYPES = [
    { id:'Transaction',   label:'Transaction',    icon:'bolt',     desc:'Payments, transfers, bill pay'  },
    { id:'AppEngagement', label:'App engagement', icon:'activity', desc:'Logins, app feature usage'      },
    { id:'Referral',      label:'Referral',       icon:'users',    desc:'Invite & verify a friend'       },
    { id:'TierMovement',  label:'Tier movement',  icon:'star',     desc:'Upgrade or maintain tier rank'  },
    { id:'ManualUpload',  label:'Manual upload',  icon:'list',     desc:'Batch eligibility file import'  },
  ];
  const excl   = f.exclusions   || { failedTx:true, reversedTx:true, dupeBillers:true, staffAccounts:true };
  const setExcl = (k,v) => set('exclusions', {...excl,[k]:v});
  const cat    = f.triggerCategory  || 'Utility bill payment';
  const ch     = f.triggerChannel   || 'MTB Neo app';
  const minAmt = f.triggerMinAmount || '500';
  const cnt    = f.triggerCount;
  const win    = f.triggerWindow;
  const validItems = [
    { label:'Core banking event mapped',         ok:true,              desc:'BillPay.Completed → STARS trigger handler' },
    { label:'Bill payment category verified',    ok:true,              desc:`${cat} confirmed in MTB Neo ledger category map` },
    { label:'Duplicate transaction protection',  ok:excl.dupeBillers,  desc:excl.dupeBillers?'Same-day duplicate biller exclusion enabled':'Not enabled — consider enabling for integrity' },
    { label:'Risk review required',              ok:false,             desc:'Campaigns with ৳500+ threshold require Risk sign-off before Demo Mode' },
  ];
  return (
    <div>
      {/* 1. Trigger type */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Trigger type</div>
        <div style={BPS.sdesc}>Select the category of member action that will qualify for this campaign’s reward.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
          {TRIGGER_TYPES.map(t=>{
            const on=(f.triggerType||'Transaction')===t.id;
            return (
              <div key={t.id} onClick={()=>set('triggerType',t.id)} style={{padding:'14px 10px',borderRadius:'var(--r-md)',cursor:'pointer',border:'1.5px solid '+(on?'var(--accent)':'var(--border)'),background:on?'var(--accent-soft)':'var(--surface)',textAlign:'center',transition:'all .15s'}}>
                <div style={{width:32,height:32,borderRadius:'var(--r-sm)',margin:'0 auto 8px',display:'grid',placeItems:'center',background:on?'var(--accent)':'var(--bg-sunken)',color:on?'#fff':'var(--text-3)'}}>
                  {window.Ic(t.icon,{size:16})}
                </div>
                <div style={{fontSize:12,fontWeight:600,color:on?'var(--accent)':'var(--text)',lineHeight:1.3}}>{t.label}</div>
                <div style={{fontSize:11,color:'var(--text-3)',marginTop:3,lineHeight:1.4}}>{t.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Transaction condition */}
      {(f.triggerType||'Transaction')==='Transaction' && (
        <div style={BPS.sec}>
          <div style={BPS.stitle}>Transaction condition</div>
          <div style={BPS.sdesc}>Define the specific transaction parameters members must satisfy to qualify for the reward.</div>
          <div style={BPS.card}>
            <div style={BPS.pad}>
              <div className="grid" style={{gap:18}}>
                <div style={BPS.row2}>
                  <div className="field">
                    <label className="label">Transaction category</label>
                    <select className="select" value={cat} onChange={e=>set('triggerCategory',e.target.value)}>
                      <option>Utility bill payment</option><option>QR payment</option><option>Mobile top-up</option>
                      <option>Fund transfer</option><option>Card transaction</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Channel</label>
                    <select className="select" value={ch} onChange={e=>set('triggerChannel',e.target.value)}>
                      <option>MTB Neo app</option><option>All channels</option><option>Agent banking</option><option>Internet banking</option>
                    </select>
                  </div>
                </div>
                <div style={BPS.row3}>
                  <div className="field">
                    <label className="label">Min. transaction amount</label>
                    <div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" value={minAmt} onChange={e=>set('triggerMinAmount',e.target.value)} /></div>
                    <span className="hint">Per qualifying transaction</span>
                  </div>
                  <div className="field">
                    <label className="label">Required count</label>
                    <div className="input-group"><input className="input has-suffix tnum" value={cnt} onChange={e=>set('triggerCount',e.target.value)} /><span className="input-suffix">payments</span></div>
                    <span className="hint">Total across time window</span>
                  </div>
                  <div className="field">
                    <label className="label">Time window</label>
                    <div className="input-group"><input className="input has-suffix tnum" value={win} onChange={e=>set('triggerWindow',e.target.value)} /><span className="input-suffix">days</span></div>
                    <span className="hint">From campaign start or member entry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Qualification rule preview */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Qualification rule preview</div>
        <div style={BPS.sdesc}>Human-readable representation of the rule evaluated against the MTB Neo ledger on every qualifying event.</div>
        <div style={{...BPS.card,overflow:'hidden'}}>
          <div style={{padding:'11px 18px',borderBottom:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'var(--green)'}}></div>
            <span style={{fontSize:12,fontWeight:600,color:'var(--text-3)'}}>Rules Engine · evaluated on every <span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>BillPay.Completed</span> event</span>
          </div>
          <div style={{padding:'20px 22px'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:13,lineHeight:2.1,color:'var(--text)'}}>
              <div><span style={{color:'var(--accent)',fontWeight:700}}>IF</span> member.completedPayments(</div>
              <div style={{paddingLeft:24}}>category = <span style={{color:'var(--green)',fontWeight:600}}>&#34;{cat}&#34;</span>,</div>
              <div style={{paddingLeft:24}}>channel  = <span style={{color:'var(--green)',fontWeight:600}}>&#34;{ch}&#34;</span>,</div>
              <div style={{paddingLeft:24}}>amount  &gt;= <span style={{color:'var(--amber)',fontWeight:600}}>৳{minAmt}</span></div>
              <div style={{paddingLeft:24}}>.count() &gt;= <span style={{color:'var(--amber)',fontWeight:600}}>{cnt}</span></div>
              <div style={{paddingLeft:24}}>.within(<span style={{color:'var(--amber)',fontWeight:600}}>{win}</span> days)</div>
              <div style={{marginTop:6}}><span style={{color:'var(--accent)',fontWeight:700}}>THEN</span> member.qualifiesForReward(</div>
              <div style={{paddingLeft:24}}>campaign = <span style={{color:'var(--green)',fontWeight:600}}>&#34;{f.name||'Bill Pay Booster'}&#34;</span></div>
              <div>)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Exclusions */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Exclusions</div>
        <div style={BPS.sdesc}>Transaction events that do not count toward the trigger condition regardless of other criteria.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:10}}>
              {[
                ['failedTx',      'Exclude failed transactions',            'Transactions that did not reach the core banking system'],
                ['reversedTx',    'Exclude reversed transactions',          'Payments reversed within the settlement window'],
                ['dupeBillers',   'Exclude duplicate billers in same day',  'Prevents counting multiple payments to the same biller in one calendar day'],
                ['staffAccounts', 'Exclude staff accounts',                 'Bank employees and admin users are ineligible for the campaign'],
              ].map(([key,label,desc])=>{
                const on=excl[key];
                return (
                  <div key={key} onClick={()=>setExcl(key,!on)} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 14px',border:'1px solid '+(on?'var(--border-2)':'var(--border)'),borderRadius:'var(--r-md)',cursor:'pointer',background:on?'var(--surface-2)':'var(--surface)',transition:'all .15s'}}>
                    <div style={{width:20,height:20,borderRadius:5,border:'1.5px solid '+(on?'var(--accent)':'var(--border-strong)'),background:on?'var(--accent)':'transparent',display:'grid',placeItems:'center',flex:'none',transition:'all .15s'}}>
                      {on && window.Ic('check',{size:12,sw:3,style:{color:'#fff'}})}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13.5}}>{label}</div>
                      <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{desc}</div>
                    </div>
                    {on && <span className="badge green" style={{fontSize:11}}>Enabled</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Validation status */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Validation status</div>
        <div style={BPS.sdesc}>Automated checks run against the MTB Neo integration layer and STARS Rules Engine configuration.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:0}}>
              {validItems.map((v,i)=>(
                <div key={v.label} style={{display:'flex',alignItems:'center',gap:13,padding:'13px 0',borderBottom:i<validItems.length-1?'1px solid var(--border)':'none'}}>
                  <div style={{width:28,height:28,borderRadius:'var(--r-sm)',flex:'none',display:'grid',placeItems:'center',background:v.ok?'var(--green-bg)':'var(--amber-bg)',color:v.ok?'var(--green)':'var(--amber)'}}>
                    {v.ok ? window.Ic('check',{size:14,sw:2.2}) : window.Ic('warn',{size:14,sw:2})}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{v.label}</div>
                    <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{v.desc}</div>
                  </div>
                  <span className={'badge '+(v.ok?'green':'amber')} style={{fontSize:11}}>
                    <span className="dot"></span>{v.ok?'Verified':'Required'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STEP 4 ── Reward ────────────────────────────────────────────────────────
function BPReward({ f, set }) {
  const REWARD_TYPES = [
    { id:'fixed',      label:'Fixed STARS',         icon:'star',     desc:'Flat STARS per qualifying member'   },
    { id:'multiplier', label:'STARS multiplier',     icon:'bolt',     desc:'Multiply STARS on qualifying spend' },
    { id:'cashback',   label:'Cashback equivalent',  icon:'vault',    desc:'STARS pegged to a ৳ cashback value' },
    { id:'tier',       label:'Tier upgrade',         icon:'arrowUp',  desc:'Upgrade member tier on completion'  },
    { id:'voucher',    label:'Partner voucher',      icon:'rewards',  desc:'Redeem for a partner offer or gift' },
  ];
  const rt       = f.rewardType2       || 'fixed';
  const reward   = f.reward            || '500';
  const timing   = f.rewardTiming      || 'within_24h';
  const freq     = f.rewardFrequency   || 'once_per_member';
  const expiry   = f.rewardExpiry      || '12';
  const dispName = f.rewardDisplayName || 'Bill Pay Booster Reward';
  const starsExp = parseInt(reward||0) * 8400;

  const validItems = [
    { label:'STARS wallet mapped',                 ok:true,  desc:'Member STARS wallet linked to STARS ledger' },
    { label:'Issuance rule configured',            ok:true,  desc:`${reward} STARS flat reward on trigger completion` },
    { label:'Expiry policy applied',               ok:true,  desc:`STARS expire after ${expiry} months from issuance` },
    { label:'Liability estimate generated',        ok:true,  desc:'৳4.2L estimated across projected eligible members' },
    { label:'Approval required before publishing', ok:false, desc:'Marketing + Risk sign-off required before Demo Mode promotion' },
  ];

  return (
    <div>
      {/* 1. Reward type cards */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Reward type</div>
        <div style={BPS.sdesc}>Select the type of reward members will receive when they complete the campaign trigger.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
          {REWARD_TYPES.map(t=>{
            const on=rt===t.id;
            return (
              <div key={t.id} onClick={()=>set('rewardType2',t.id)} style={{padding:'14px 10px',borderRadius:'var(--r-md)',cursor:'pointer',border:'1.5px solid '+(on?'var(--accent)':'var(--border)'),background:on?'var(--accent-soft)':'var(--surface)',textAlign:'center',transition:'all .15s'}}>
                <div style={{width:32,height:32,borderRadius:'var(--r-sm)',margin:'0 auto 8px',display:'grid',placeItems:'center',background:on?'var(--accent)':'var(--bg-sunken)',color:on?'#fff':'var(--text-3)'}}>{window.Ic(t.icon,{size:16})}</div>
                <div style={{fontSize:12,fontWeight:600,color:on?'var(--accent)':'var(--text)',lineHeight:1.3}}>{t.label}</div>
                <div style={{fontSize:11,color:'var(--text-3)',marginTop:3,lineHeight:1.4}}>{t.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Reward configuration */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Reward configuration</div>
        <div style={BPS.sdesc}>Configure the STARS reward parameters applied when a member qualifies. These values are immutable once the campaign is live.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:20}}>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Reward amount</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={reward} onChange={e=>set('reward',e.target.value)} /><span className="input-suffix">STARS</span></div>
                  <span className="hint">Flat STARS awarded per qualifying member</span>
                </div>
                <div className="field">
                  <label className="label">Credit timing</label>
                  <select className="select" value={timing} onChange={e=>set('rewardTiming',e.target.value)}>
                    <option value="within_24h">Within 24 hours after qualification</option>
                    <option value="end_of_period">End of campaign period</option>
                    <option value="next_day">Next business day</option>
                  </select>
                </div>
              </div>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Reward frequency</label>
                  <select className="select" value={freq} onChange={e=>set('rewardFrequency',e.target.value)}>
                    <option value="once_per_member">Once per member</option>
                    <option value="per_trigger">Every qualifying trigger</option>
                    <option value="once_per_month">Once per month</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">STARS expiry</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={expiry} onChange={e=>set('rewardExpiry',e.target.value)} /><span className="input-suffix">months</span></div>
                  <span className="hint">From date of issuance</span>
                </div>
              </div>
              <div className="field">
                <label className="label">Display name in customer app</label>
                <input className="input" value={dispName} onChange={e=>set('rewardDisplayName',e.target.value)} />
                <span className="hint">Shown in MTB Neo app reward history and campaign feed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Member-facing message preview */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Member-facing message preview</div>
        <div style={BPS.sdesc}>How this campaign reward will appear in the MTB Neo app campaign card and push notification.</div>
        <div style={{...BPS.card,overflow:'hidden'}}>
          <div style={{padding:'11px 18px',borderBottom:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:'var(--green)'}}></div>
            <span style={{fontSize:12,fontWeight:600,color:'var(--text-3)'}}>MTB Neo app · Campaign card preview</span>
          </div>
          <div style={{padding:'20px 22px'}}>
            <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{width:44,height:44,borderRadius:'var(--r-md)',background:'var(--accent)',display:'grid',placeItems:'center',flex:'none'}}>{window.Ic('star',{size:22,style:{color:'#fff'}})}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,letterSpacing:'-.01em',marginBottom:6}}>{dispName}</div>
                <div style={{fontSize:14,color:'var(--text-2)',lineHeight:1.6}}>Complete 3 utility bill payments through MTB Neo and earn <b>{reward} STARS</b>.</div>
                <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                  <span className="tag">{reward} STARS</span>
                  <span className="tag">3 payments required</span>
                  <span className="tag">30 days to qualify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Economic impact */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Economic impact</div>
        <div style={BPS.sdesc}>Projected STARS exposure and liability based on estimated eligible member participation at 30 days.</div>
        <div style={{...BPS.card,...BPS.pad}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,paddingBottom:16,borderBottom:'1px solid var(--border)'}}>
            <div><div style={{fontSize:11,color:'var(--text-3)',marginBottom:4}}>Eligible members</div><div style={{fontSize:22,fontWeight:600,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums'}}>8,400</div><div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>projected at 30d</div></div>
            <div><div style={{fontSize:11,color:'var(--text-3)',marginBottom:4}}>Max STARS exposure</div><div style={{fontSize:22,fontWeight:600,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums',color:'var(--accent)'}}>{(starsExp/1000000).toFixed(1)}M</div><div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{reward} STARS × 8,400 members</div></div>
            <div><div style={{fontSize:11,color:'var(--text-3)',marginBottom:4}}>Est. liability</div><div style={{fontSize:22,fontWeight:600,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums',color:'var(--amber)'}}>৳4.2L</div><div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>@ ৳0.10 per STAR</div></div>
            <div><div style={{fontSize:11,color:'var(--text-3)',marginBottom:4}}>Per-member cap</div><div style={{fontSize:22,fontWeight:600,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums'}}>{reward}</div><div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>STARS max</div></div>
          </div>
          <div className="bar-track" style={{marginTop:16}}><div className="bar-fill" style={{width:'69%'}}></div></div>
          <div style={{fontSize:11,color:'var(--text-3)',marginTop:6}}>69% of ৳{f.budget||'4,20,000'} budget cap at projected participation</div>
        </div>
      </div>

      {/* 5. Reward validation */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Reward validation</div>
        <div style={BPS.sdesc}>System checks confirming reward configuration is complete and ready for the Limits step.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:0}}>
              {validItems.map((v,i)=>(
                <div key={v.label} style={{display:'flex',alignItems:'center',gap:13,padding:'13px 0',borderBottom:i<validItems.length-1?'1px solid var(--border)':'none'}}>
                  <div style={{width:28,height:28,borderRadius:'var(--r-sm)',flex:'none',display:'grid',placeItems:'center',background:v.ok?'var(--green-bg)':'var(--amber-bg)',color:v.ok?'var(--green)':'var(--amber)'}}>
                    {v.ok ? window.Ic('check',{size:14,sw:2.2}) : window.Ic('warn',{size:14,sw:2})}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{v.label}</div>
                    <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{v.desc}</div>
                  </div>
                  <span className={'badge '+(v.ok?'green':'amber')} style={{fontSize:11}}><span className="dot"></span>{v.ok?'Verified':'Required'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STEP 5 ── Limits ────────────────────────────────────────────
function BPLimits({ f, set }) {
  const fraud = f.fraudControls || { reversedTx:true, failedTx:true, dupeBillers:true, staffAccounts:true, fraudThreshold:true };
  const setFraud = (k,v) => set('fraudControls', {...fraud,[k]:v});
  const fraudCount = Object.values(fraud).filter(Boolean).length;

  const validItems = [
    { label:'Budget cap configured',     ok:true,  desc:`৳${f.budget||'4,20,000'} total cap with auto-pause at ${f.pauseBudgetPct||'90'}% utilization` },
    { label:'Member cap applied',         ok:true,  desc:`Max ${f.maxPerUser||'500'} STARS per member · ${f.limitsMaxCycles||'1'} qualifying cycle` },
    { label:'Fraud controls enabled',     ok:true,  desc:`${fraudCount} of 5 fraud protection rules active` },
    { label:'Auto-pause rules active',    ok:true,  desc:'Campaign will auto-pause on breach of budget, liability or exception thresholds' },
    { label:'Ready for approval workflow',ok:true,  desc:'All limit controls configured — proceed to Approval step' },
  ];

  return (
    <div>
      {/* 1. Budget controls */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Budget controls</div>
        <div style={BPS.sdesc}>Set the financial ceiling for this campaign. These caps enforce hard stops on STARS issuance and associated liability.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:20}}>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Total campaign budget cap</label>
                  <div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" value={f.budget||'4,20,000'} onChange={e=>set('budget',e.target.value)} /></div>
                  <span className="hint">Hard stop — campaign auto-pauses when liability hits this amount.</span>
                </div>
                <div className="field">
                  <label className="label">Max STARS exposure</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.limitsMaxStars||'4,200,000'} onChange={e=>set('limitsMaxStars',e.target.value)} /><span className="input-suffix">STARS</span></div>
                  <span className="hint">Total STARS that can be issued across the campaign lifetime.</span>
                </div>
              </div>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Daily issuance cap</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.limitsDailyStars||'50,000'} onChange={e=>set('limitsDailyStars',e.target.value)} /><span className="input-suffix">STARS</span></div>
                  <span className="hint">Alert only — notifies Program Admin when breached. Campaign does not pause.</span>
                </div>
                <div className="field">
                  <label className="label">Monthly issuance cap</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.limitsMonthlyStars||'1,500,000'} onChange={e=>set('limitsMonthlyStars',e.target.value)} /><span className="input-suffix">STARS</span></div>
                  <span className="hint">Alert only — rolling 30-day ceiling. Does not pause the campaign.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Member-level limits */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Member-level limits</div>
        <div style={BPS.sdesc}>Control how much any individual member can earn, and how many times they can qualify across the campaign period.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:20}}>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Max reward per member</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.maxPerUser||'500'} onChange={e=>set('maxPerUser',e.target.value)} /><span className="input-suffix">STARS</span></div>
                  <span className="hint">Lifetime cap for this campaign per account.</span>
                </div>
                <div className="field">
                  <label className="label">Max qualifying cycles per member</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.limitsMaxCycles||'1'} onChange={e=>set('limitsMaxCycles',e.target.value)} /><span className="input-suffix">cycle(s)</span></div>
                  <span className="hint">How many times a member can trigger the reward.</span>
                </div>
              </div>
              <div style={BPS.row2}>
                <div className="field">
                  <label className="label">Cooldown period</label>
                  <select className="select" value={f.limitsCooldown||'none'} onChange={e=>set('limitsCooldown',e.target.value)}>
                    <option value="none">Not applicable</option>
                    <option value="7d">7 days between triggers</option>
                    <option value="30d">30 days between triggers</option>
                    <option value="campaign">Once per campaign</option>
                  </select>
                  <span className="hint">Minimum gap between reward cycles for a member.</span>
                </div>
                <div className="field">
                  <label className="label">Account duplicate protection</label>
                  <select className="select" value={f.limitsHousehold||'enabled'} onChange={e=>set('limitsHousehold',e.target.value)}>
                    <option value="enabled">Enabled — one reward per account</option>
                    <option value="household">Household level — one per NID</option>
                    <option value="disabled">Disabled</option>
                  </select>
                  <span className="hint">Prevents reward farming across multiple accounts.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Risk & fraud controls */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Risk & fraud controls</div>
        <div style={BPS.sdesc}>Define which transaction signals disqualify a member from earning. These controls run at the event level before any reward is issued.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:10}}>
              {[
                ['reversedTx',    'Auto-exclude reversed transactions',          'Transactions reversed within the settlement window do not count toward the trigger'],
                ['failedTx',      'Auto-exclude failed transactions',             'Transactions that did not reach the core banking system are excluded'],
                ['dupeBillers',   'Detect duplicate billers in same day',         'Multiple payments to the same biller on the same calendar day count as one'],
                ['staffAccounts', 'Exclude staff and test accounts',              'Bank employee and QA test accounts cannot receive campaign rewards'],
                ['fraudThreshold','Pause campaign if fraud threshold exceeded',   'Auto-pauses and escalates to Risk if suspicious pattern rate exceeds 3%'],
              ].map(([key,label,desc]) => {
                const on = fraud[key];
                return (
                  <div key={key} onClick={()=>setFraud(key,!on)} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 14px',border:'1px solid '+(on?'var(--border-2)':'var(--border)'),borderRadius:'var(--r-md)',cursor:'pointer',background:on?'var(--surface-2)':'var(--surface)',transition:'all .15s'}}>
                    <label className="toggle" onClick={e=>e.stopPropagation()}>
                      <input type="checkbox" checked={on} onChange={()=>setFraud(key,!on)} />
                      <span className="track"><span className="thumb"></span></span>
                    </label>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13.5}}>{label}</div>
                      <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{desc}</div>
                    </div>
                    <span className={'badge '+(on?'green':'slate')} style={{fontSize:11}}><span className="dot"></span>{on?'Active':'Off'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Auto-pause rules */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Auto-pause rules</div>
        <div style={BPS.sdesc}>Configure the thresholds at which STARS automatically suspends this campaign and escalates to Program Admin and Risk.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:20}}>
              <div style={BPS.row3}>
                <div className="field">
                  <label className="label">Pause at budget utilization</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.pauseBudgetPct||'90'} onChange={e=>set('pauseBudgetPct',e.target.value)} /><span className="input-suffix">%</span></div>
                  <span className="hint">of total budget cap</span>
                </div>
                <div className="field">
                  <label className="label">Pause if liability exceeds</label>
                  <div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" value={f.pauseLiabilityAmt||'4,50,000'} onChange={e=>set('pauseLiabilityAmt',e.target.value)} /></div>
                  <span className="hint">absolute liability threshold</span>
                </div>
                <div className="field">
                  <label className="label">Pause if exception rate exceeds</label>
                  <div className="input-group"><input className="input has-suffix tnum" value={f.pauseExceptionPct||'3'} onChange={e=>set('pauseExceptionPct',e.target.value)} /><span className="input-suffix">%</span></div>
                  <span className="hint">of total qualifying events</span>
                </div>
              </div>
              <div style={{padding:'13px 16px',background:'var(--accent-soft)',border:'1px solid var(--accent-tint)',borderRadius:'var(--r-md)'}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--accent)',marginBottom:6}}>Auto-pause preview</div>
                <div style={{fontFamily:'var(--mono)',fontSize:13,lineHeight:2,color:'var(--text)'}}>
                  <div><span style={{color:'var(--accent)',fontWeight:700}}>IF</span> budgetUtilization &gt;= <span style={{color:'var(--amber)',fontWeight:600}}>{f.pauseBudgetPct||'90'}%</span></div>
                  <div style={{paddingLeft:12}}><span style={{color:'var(--accent)',fontWeight:700}}>OR</span> liabilityAmount &gt; <span style={{color:'var(--amber)',fontWeight:600}}>৳{f.pauseLiabilityAmt||'4,50,000'}</span></div>
                  <div style={{paddingLeft:12}}><span style={{color:'var(--accent)',fontWeight:700}}>OR</span> exceptionRate &gt; <span style={{color:'var(--amber)',fontWeight:600}}>{f.pauseExceptionPct||'3'}%</span></div>
                  <div style={{marginTop:4}}><span style={{color:'var(--accent)',fontWeight:700}}>THEN</span> campaign.pause() + notify(ProgramAdmin, Risk)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Limits validation */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Limits validation</div>
        <div style={BPS.sdesc}>System checks confirming all limit controls are correctly configured before proceeding to approval.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:0}}>
              {validItems.map((v,i)=>(
                <div key={v.label} style={{display:'flex',alignItems:'center',gap:13,padding:'13px 0',borderBottom:i<validItems.length-1?'1px solid var(--border)':'none'}}>
                  <div style={{width:28,height:28,borderRadius:'var(--r-sm)',flex:'none',display:'grid',placeItems:'center',background:v.ok?'var(--green-bg)':'var(--amber-bg)',color:v.ok?'var(--green)':'var(--amber)'}}>
                    {v.ok ? window.Ic('check',{size:14,sw:2.2}) : window.Ic('warn',{size:14,sw:2})}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{v.label}</div>
                    <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{v.desc}</div>
                  </div>
                  <span className={'badge '+(v.ok?'green':'amber')} style={{fontSize:11}}><span className="dot"></span>{v.ok?'Verified':'Required'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STEP 6 ── Approval ──────────────────────────────────────────
function BPApproval({ f, set, onSend, onPublish, allStepsDone }) {
  const checks = [
    { label: 'Campaign details completed',        desc: 'Name, objective, dates and owner configured' },
    { label: 'Audience selected',                 desc: '185,420 eligible members · Active in last 30 days' },
    { label: 'Trigger configured',                desc: 'Utility bill payment · 3 payments · 30 days · ৳500 min' },
    { label: 'Reward configured',                 desc: '500 STARS flat · Once per member · 12-month expiry' },
    { label: 'Budget and member caps configured', desc: '৳4.2L cap · 500 STARS per member · 1 qualifying cycle' },
    { label: 'Fraud controls enabled',            desc: '5 of 5 fraud protection rules active' },
    { label: 'Liability estimate generated',      desc: '৳4.2L across projected eligible members @ ৳0.10 / STAR' },
  ];

  const chain = [
    { role: 'Program Admin',  name: 'Kaiser Jahangir', status: 'prepared', label: 'Prepared',               color: 'green' },
    { role: 'Marketing Lead', name: null,               status: 'pending',  label: 'Pending approval',        color: 'amber' },
    { role: 'Risk Team',      name: null,               status: 'pending',  label: 'Pending approval',        color: 'amber' },
    { role: 'Finance Review', name: null,               status: 'pending',  label: 'Pending liability review', color: 'amber' },
  ];

  const riskCards = [
    { label: 'Estimated reach',     value: '185,420', sub: 'members',      color: 'var(--text)'   },
    { label: 'Estimated liability', value: '৳4.2L',   sub: '@ ৳0.10/STAR', color: 'var(--amber)'  },
    { label: 'Max STARS exposure',  value: '4.2M',    sub: 'STARS',        color: 'var(--accent)' },
    { label: 'Auto-pause at',       value: '90%',     sub: 'budget util.', color: 'var(--text)'   },
    { label: 'Fraud controls',      value: 'Enabled', sub: '5 / 5 rules',  color: 'var(--green)'  },
  ];

  const auditLog = [
    { action: 'Campaign created',        actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:14' },
    { action: 'Basics completed',        actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:21' },
    { action: 'Audience configured',     actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:28' },
    { action: 'Trigger rule configured', actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:35' },
    { action: 'Reward configured',       actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:43' },
    { action: 'Limits configured',       actor: 'Kaiser Jahangir', time: '07 Jun 2026 · 09:51' },
  ];

  const canPublish = allStepsDone && f.approvers && f.approvers.length > 0;

  return (
    <div>

      {/* 1. Campaign readiness checklist */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Campaign readiness</div>
        <div style={BPS.sdesc}>All pre-submission checks must pass before this campaign can be sent for approval or published to Demo Mode.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="grid" style={{gap:0}}>
              {checks.map((c, i) => (
                <div key={c.label} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 0',borderBottom:i<checks.length-1?'1px solid var(--border)':'none'}}>
                  <div style={{width:28,height:28,borderRadius:'var(--r-sm)',flex:'none',display:'grid',placeItems:'center',background:'var(--green-bg)',color:'var(--green)'}}>
                    {window.Ic('check',{size:14,sw:2.2})}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{c.label}</div>
                    <div style={{fontSize:12,color:'var(--text-3)',marginTop:1}}>{c.desc}</div>
                  </div>
                  <span className="badge green" style={{fontSize:11}}><span className="dot"></span>Verified</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:'12px 20px',borderTop:'1px solid var(--border)',background:'var(--green-bg)',display:'flex',alignItems:'center',gap:10}}>
            {window.Ic('check',{size:15,sw:2.5,style:{color:'var(--green)'}})}
            <span style={{fontSize:13,fontWeight:600,color:'var(--green)'}}>7 / 7 checks complete — campaign is ready for approval submission</span>
          </div>
        </div>
      </div>

      {/* 2. Approval route */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Approval route</div>
        <div style={BPS.sdesc}>Sign-off is required from Marketing Lead, Risk Team, and Finance Review before this campaign can be published to Demo Mode. Approvals are sequential.</div>
        <div style={BPS.card}>
          <div style={{padding:'4px 22px'}}>
            {chain.map((node, i) => (
              <div key={node.role} style={{display:'flex',gap:16,padding:'16px 0',borderBottom:i<chain.length-1?'1px solid var(--border)':'none',position:'relative'}}>
                {i < chain.length-1 && (
                  <div style={{position:'absolute',left:13,top:44,bottom:-1,width:1.5,background:node.status==='prepared'?'var(--accent-tint)':'var(--border-2)',zIndex:0}}></div>
                )}
                <div style={{width:28,height:28,borderRadius:'50%',flex:'none',marginTop:3,display:'grid',placeItems:'center',fontSize:11,fontWeight:700,zIndex:1,
                  background: node.status==='prepared' ? 'var(--accent)' : 'var(--surface)',
                  border: '1.5px solid ' + (node.status==='prepared' ? 'var(--accent)' : 'var(--border-strong)'),
                  color: node.status==='prepared' ? '#fff' : 'var(--text-3)',
                }}>
                  {node.status === 'prepared' ? window.Ic('check',{size:12,sw:3}) : i+1}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                    <span style={{fontSize:14,fontWeight:600}}>{node.role}</span>
                    {node.name && <span style={{fontSize:12.5,color:'var(--text-3)'}}>{node.name}</span>}
                    <span style={{marginLeft:'auto',flexShrink:0}}>
                      <span className={'badge '+node.color} style={{fontSize:11}}><span className="dot"></span>{node.label}</span>
                    </span>
                  </div>
                  <div style={{fontSize:12.5,color:'var(--text-3)',marginTop:5,lineHeight:1.5}}>
                    {node.status==='prepared'
                      ? 'Campaign prepared and submitted to the approval chain.'
                      : node.role==='Finance Review'
                        ? 'Reviewing budget allocation, liability exposure, and P&L impact.'
                        : 'Will be notified by email upon submission.'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Approval notes */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Approval notes</div>
        <div style={BPS.sdesc}>These notes are included in the approval request and visible to all reviewers in the sign-off workflow.</div>
        <div style={BPS.card}>
          <div style={BPS.pad}>
            <div className="field">
              <label className="label">Message to approvers</label>
              <textarea className="textarea" rows="4" value={f.notes} onChange={e=>set('notes',e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Risk & liability summary */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Risk & liability summary</div>
        <div style={BPS.sdesc}>Key financial and risk indicators compiled for approver review. Derived from configured Limits and Reward steps.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
          {riskCards.map(rc => (
            <div key={rc.label} style={{...BPS.card,padding:'14px 16px'}}>
              <div style={{fontSize:11,color:'var(--text-3)',marginBottom:6,fontWeight:500,lineHeight:1.3}}>{rc.label}</div>
              <div style={{fontSize:20,fontWeight:700,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums',color:rc.color,lineHeight:1.1,marginBottom:4}}>{rc.value}</div>
              <div style={{fontSize:11,color:'var(--text-3)'}}>{rc.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Audit log */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Audit log</div>
        <div style={BPS.sdesc}>Immutable record of all configuration actions on this campaign, preserved for compliance and regulatory review.</div>
        <div style={BPS.card}>
          <div style={{padding:'0 22px'}}>
            {auditLog.map((entry, i) => (
              <div key={entry.action} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 0',borderBottom:i<auditLog.length-1?'1px solid var(--border)':'none'}}>
                <div style={{width:28,height:28,borderRadius:'var(--r-sm)',flex:'none',display:'grid',placeItems:'center',background:'var(--bg-sunken)',color:'var(--text-3)'}}>
                  {window.Ic('list',{size:13,sw:1.9})}
                </div>
                <div style={{flex:1}}>
                  <span style={{fontSize:13.5,fontWeight:600}}>{entry.action}</span>
                  <span style={{fontSize:12.5,color:'var(--text-3)',marginLeft:8}}>by {entry.actor}</span>
                </div>
                <span style={{fontSize:11.5,color:'var(--text-3)',fontFamily:'var(--mono)',flexShrink:0}}>{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Submission status */}
      <div style={BPS.sec}>
        <div style={BPS.stitle}>Submission status</div>
        <div style={BPS.sdesc}>Send this campaign for approval to notify all required reviewers. Publish to Demo Mode becomes available once all approvals are received.</div>
        <div style={{...BPS.card,...BPS.pad,display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:40,height:40,borderRadius:'var(--r-md)',background:'var(--amber-bg)',display:'grid',placeItems:'center',flex:'none',color:'var(--amber)'}}>
            {window.Ic('bell',{size:20,sw:1.7})}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>Draft — awaiting approval submission</div>
            <div style={{fontSize:13,color:'var(--text-2)'}}>Send for approval to notify Marketing Lead, Risk Team, and Finance Review.</div>
          </div>
          <span className="badge amber"><span className="dot"></span>Not submitted</span>
        </div>
      </div>

    </div>
  );
}

// ── SUMMARY PANEL ───────────────────────────────────────────────
function BPSummary({ f, step, visited }) {
  const reach   = { all:'185,420', tier:'12,400', segment:'38,600' }[f.segment] || '—';
  const audLabel = { all:'All active MTB Neo users', tier:'Tier · Gold+ members', segment:'Segment · Salaried' }[f.segment] || '—';
  const cat     = f.triggerCategory  || 'Utility bill payment';
  const ch      = f.triggerChannel   || 'MTB Neo app';
  const minAmt  = f.triggerMinAmount || '500';
  const excl    = f.exclusions || { failedTx:true, reversedTx:true, dupeBillers:true, staffAccounts:true };
  const exclCount = Object.values(excl).filter(Boolean).length;
  const trgLabel  = `Pay ${f.triggerCount} ${cat.toLowerCase()} / ${f.triggerWindow}d`;
  const rwdLabel  = f.reward ? `${f.reward} STARS ${f.rewardType==='multiplier'?'×':'flat'}` : '—';
  const approvalStatus = (f.approvers&&f.approvers.length) ? f.approvers.join(', ') : 'Not configured';
  const budgetUsedPct = 69;

  const rows = [
    ['Campaign',    f.name||'—'],
    ['Type',       ((f.campaignMode||'promotional')==='always-on'?'Always-on':'Promotional')],
    ['Mechanism',  f.campaignType||'Earn'],
    ['Dates',       (f.startDate&&f.endDate)?`${f.startDate} – ${f.endDate}`:'—'],
    ['Owner',       f.owner||'Kaiser Jahangir'],
    ['KPI',         f.kpi||'Transaction volume'],
    ['Audience',    audLabel],
    ['Est. reach',  reach !== '—' ? reach+' members' : '—'],
    ['Trigger',     trgLabel],
    ['Min. amount', minAmt ? '৳'+minAmt : '—'],
    ['Channel',     ch],
    ['Exclusions',  exclCount+' enabled'],
    ['Validation',  'Ready for Risk review'],
    ['Reward',      f.reward ? f.reward+' STARS flat' : '—'],
    ['Timing',      (f.rewardTiming==='within_24h'||!f.rewardTiming) ? 'Within 24 hours' : f.rewardTiming==='end_of_period' ? 'End of period' : 'Next business day'],
    ['Frequency',   (!f.rewardFrequency||f.rewardFrequency==='once_per_member') ? 'Once per member' : 'Per trigger'],
    ['Max exposure','4.2M STARS'],
    ['Est. liability','৳4.2L'],
    ['Rwd. valid.', 'Ready for Limits review'],
    ['Budget cap',   f.budget ? '৳' + f.budget : '—'],
    ['Daily cap (alert)', (f.limitsDailyStars||'50,000')+' STARS'],
    ['Monthly cap',  (() => { const n = parseFloat((f.limitsMonthlyStars||'1500000').replace(/,/g,'')); return (n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+'M':f.limitsMonthlyStars||'1.5M')+' STARS'; })()],
    ['Per-member',   (f.maxPerUser||'500')+' STARS max'],
    ['Alert at daily', (f.limitsDailyStars||'50,000')+' STARS'],
    ['Auto-pause',   (f.pauseBudgetPct||'90')+'% util. · ৳'+(f.pauseLiabilityAmt||'4.5L')+' · '+(f.pauseExceptionPct||'3')+'% exc.'],
    ['Fraud controls','Enabled'],
    ['Limits valid.','Ready for Approval'],
    ['Required approvers', approvalStatus],
    ['Approval status',     f.approvalSubmitted ? 'Submitted' : 'Not submitted'],
    ['Readiness',           '7/7 checks complete'],
    ['Publish status',      'Locked until approval'],
  ];

  return (
    <div style={{borderLeft:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',flexDirection:'column',overflowY:'auto'}}>
      <div style={{padding:'20px 18px 14px',borderBottom:'1px solid var(--border)'}}>
        <div className="eyebrow" style={{marginBottom:8}}>Live summary</div>
        <div style={{fontSize:15,fontWeight:700,letterSpacing:'-.01em',lineHeight:1.3,wordBreak:'break-word'}}>{f.name||'Untitled campaign'}</div>
        <div style={{marginTop:8}}><span className="badge slate"><span className="dot"></span>Draft</span></div>
      </div>

      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border)'}}>
        {rows.map(([k,v])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:12,color:'var(--text-3)',fontWeight:500,flex:'none'}}>{k}</span>
            <span style={{fontSize:12.5,fontWeight:600,color:v==='—'||v==='Not configured'?'var(--text-4)':'var(--text)',textAlign:'right',lineHeight:1.4}}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border)'}}>
        <div className="eyebrow" style={{marginBottom:8}}>Budget utilization</div>
        <div style={{fontSize:20,fontWeight:600,letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums'}}>৳4.2L <span style={{fontSize:13,color:'var(--text-3)',fontWeight:500}}>/ ৳{f.budget||'—'}</span></div>
        <div className="bar-track" style={{marginTop:8}}><div className="bar-fill" style={{width:budgetUsedPct+'%',background:'var(--amber)'}}></div></div>
        <div style={{fontSize:11,color:'var(--text-3)',marginTop:6}}>{budgetUsedPct}% projected utilization</div>
      </div>

      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border)'}}>
        <div className="eyebrow" style={{marginBottom:8}}>Liability impact</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><div style={{fontSize:11,color:'var(--text-3)'}}>30-day est.</div><div style={{fontSize:15,fontWeight:600,marginTop:2,fontVariantNumeric:'tabular-nums',color:'var(--accent)'}}>৳4.2L</div></div>
          <div><div style={{fontSize:11,color:'var(--text-3)'}}>Portfolio share</div><div style={{fontSize:15,fontWeight:600,marginTop:2,fontVariantNumeric:'tabular-nums'}}>22.7%</div></div>
          <div><div style={{fontSize:11,color:'var(--text-3)'}}>Approval status</div><div style={{fontSize:12,fontWeight:600,marginTop:2,color:(f.approvers&&f.approvers.length)?'var(--amber)':'var(--text-4)'}}>{(f.approvers&&f.approvers.length)?'Pending':'Not set'}</div></div>
          <div><div style={{fontSize:11,color:'var(--text-3)'}}>Reach</div><div style={{fontSize:12,fontWeight:600,marginTop:2,fontVariantNumeric:'tabular-nums'}}>{reach}</div></div>
        </div>
      </div>

      <div style={{padding:'14px 18px'}}>
        <div className="eyebrow" style={{marginBottom:10}}>Steps</div>
        {BP_STEPS.map((s,i)=>{
          const done   = visited.has(i);
          const active = step === i;
          const statusLabel = done ? 'Done' : active ? 'In progress' : 'Not started';
          const statusColor = done ? 'var(--green)' : active ? 'var(--accent)' : 'var(--text-4)';
          return (
            <div key={s.id} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0'}}>
              <div style={{width:20,height:20,borderRadius:'50%',flex:'none',display:'grid',placeItems:'center',background:done?'var(--accent)':active?'var(--accent-soft-2)':'var(--border-2)',fontSize:10,fontWeight:700,color:done?'#fff':active?'var(--accent)':'var(--text-3)',border:active&&!done?'1.5px solid var(--accent)':'none',transition:'all .2s'}}>
                {done ? window.Ic('check',{size:10,sw:3}) : i+1}
              </div>
              <span style={{fontSize:12.5,fontWeight:active?600:500,color:active?'var(--text)':done?'var(--text-2)':'var(--text-3)'}}>{s.label}</span>
              <span style={{marginLeft:'auto',fontSize:11,color:statusColor,fontWeight:500}}>{statusLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN BUILDER PAGE ───────────────────────────────────────────
function BuilderPage({ onBack, onPublish }) {
  const [step, setStep] = usBP(5);
  const [visited, setVisited] = usBP(new Set([0,1,2,3,4])); // Basics + Audience + Trigger + Reward + Limits confirmed
  const [published, setPublished] = usBP(false);
  const [sentForApproval, setSentForApproval] = usBP(false);
  const [f, setF] = usBP({
    name:          'Bill Pay Bonus',
    objective:     'Increase bill payment usage through MTB app',
    description:   '',
    campaignType:  'Earn',
    campaignMode:  'promotional',
    reviewCycle:   'monthly',
    owner:         'Kaiser Jahangir',
    kpi:           'Utility bill payment volume',
    internalNotes: '',
    startDate:     '01 Jul 2026',
    endDate:       '31 Jul 2026',
    segment:       'all',
    eligibility:   'Active in last 30 days',
    triggerType:     'Transaction',
    triggerEvent:   'Bill payment completed',
    triggerCategory:'Utility bill payment',
    triggerChannel: 'MTB Neo app',
    triggerMinAmount:'500',
    triggerCount:   '1',
    triggerWindow:  '30',
    exclusions:     { failedTx:true, reversedTx:true, dupeBillers:true, staffAccounts:true },
    rewardType2:      'fixed',
    rewardFrequency:  'once_per_member',
    rewardExpiry:     '12',
    rewardDisplayName:'Bill Pay Booster Reward',
    rewardType:    'flat',
    reward:        '500',
    rewardTiming:  'on_completion',
    budget:        '4.2L',
    maxPerUser:    '500',
    dailyCap:      '50,000',
    autopause:     true,
    limitsDailyStars:  '50,000',
    limitsMonthlyStars:'1,500,000',
    limitsMaxCycles:   '1',
    limitsCooldown:    'none',
    limitsHousehold:   'enabled',
    limitsMaxStars:    '4,200,000',
    fraudControls:     { reversedTx:true, failedTx:true, dupeBillers:true, staffAccounts:true, fraudThreshold:true },
    pauseBudgetPct:    '90',
    pauseLiabilityAmt: '4.5L',
    pauseExceptionPct: '3',
    approvers:     ['Marketing', 'Risk', 'Finance'],
    notes:         'Please review Bill Pay Bonus for Demo Mode launch. Campaign rewards members with 500 STARS after 1 eligible utility bill payment through MTB Neo.',
    status:        'Draft',
  });
  const set = (k,v) => setF(o=>({...o,[k]:v}));

  // allStepsDone = user has clicked Continue through steps 0–4 (indices)
  const allStepsDone = [0,1,2,3,4].every(i => visited.has(i));
  const canPublish   = allStepsDone && f.approvers && f.approvers.length > 0;

  const advance = () => {
    setVisited(v => { const n = new Set(v); n.add(step); return n; });
    setStep(s => Math.min(s+1, 5));
  };

  const pub  = () => { setPublished(true); onPublish && onPublish(f); };
  const send = () => { setSentForApproval(true); onPublish && onPublish(f); };

  // ── Success state ──
  if (published) {
    return (
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:64,height:'calc(100vh - var(--header-h))'}}>
        <div className="state-ic success" style={{width:64,height:64}}>{window.Ic('check',{size:28,sw:2})}</div>
        <div className="h1">Campaign published to Demo Mode</div>
        <p style={{fontSize:15,color:'var(--text-2)',maxWidth:440,textAlign:'center',lineHeight:1.6,margin:0}}><b>{f.name}</b> is now active in Demo Mode for eligible MTB Neo members. Validate results before promoting to production.</p>
        <div className="row gap-12" style={{marginTop:8}}>
          <button className="btn btn-secondary" onClick={onBack}>Back to Campaigns</button>
          <button className="btn btn-primary" onClick={onBack}>View campaign</button>
        </div>
      </div>
    );
  }

  // ── Sent for approval state ──
  if (sentForApproval) {
    return (
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:64,height:'calc(100vh - var(--header-h))'}}>
        <div className="state-ic" style={{width:64,height:64,background:'var(--blue-bg)',color:'var(--blue)'}}>{window.Ic('arrow',{size:28,sw:2})}</div>
        <div className="h1">Sent for approval</div>
        <p style={{fontSize:15,color:'var(--text-2)',maxWidth:440,textAlign:'center',lineHeight:1.6,margin:0}}><b>{f.name}</b> has been submitted to <b>{(f.approvers||[]).join(' and ')}</b> for review. You'll be notified once all approvals are received.</p>
        <div className="row gap-12" style={{marginTop:8}}><button className="btn btn-secondary" onClick={onBack}>Back to Campaigns</button></div>
      </div>
    );
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr 288px',height:'calc(100vh - var(--header-h))',overflow:'hidden'}}>

      {/* ── LEFT NAV ── */}
      <div style={{borderRight:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',flexDirection:'column',overflow:'auto'}}>
        <div style={{padding:'20px 16px 14px'}}>
          <div className="eyebrow" style={{marginBottom:4}}>Campaign Builder</div>
          <div style={{fontSize:14,fontWeight:700,color:'var(--text)',letterSpacing:'-.01em',lineHeight:1.3,wordBreak:'break-word'}}>{f.name||'Untitled campaign'}</div>
          <div style={{marginTop:8}}><span className="badge slate"><span className="dot"></span>Draft</span></div>
        </div>
        <div style={{height:1,background:'var(--border)'}}></div>
        <div style={{padding:'10px',flex:1}}>
          {BP_STEPS.map((s,i)=>{
            const done   = visited.has(i);
            const active = step===i;
            return (
              <div key={s.id} onClick={()=>setStep(i)} style={{display:'flex',alignItems:'center',gap:11,padding:'10px 10px',borderRadius:'var(--r-sm)',cursor:'pointer',marginBottom:2,background:active?'var(--accent-soft)':'transparent',transition:'background .14s'}}>
                <div style={{width:26,height:26,borderRadius:'50%',flex:'none',display:'grid',placeItems:'center',fontSize:12,fontWeight:700,background:done?'var(--accent)':active?'var(--accent-soft-2)':'var(--border-2)',color:done?'#fff':active?'var(--accent)':'var(--text-3)',border:active&&!done?'1.5px solid var(--accent)':'none',transition:'all .18s'}}>
                  {done ? window.Ic('check',{size:12,sw:3}) : i+1}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:active?600:500,color:active?'var(--accent)':done?'var(--text)':'var(--text-2)'}}>{s.label}</div>
                  <div style={{fontSize:11.5,color:'var(--text-3)',marginTop:1}}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:'12px 14px',borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'flex-start',color:'var(--text-3)'}} onClick={onBack}>
            {window.Ic('chevRight',{size:14})} Back to Campaigns
          </button>
        </div>
      </div>

      {/* ── CENTER FORM ── */}
      <div style={{overflowY:'auto',display:'flex',flexDirection:'column',background:'var(--bg)'}}>
        {/* Sticky action bar */}
        <div style={{padding:'13px 28px',borderBottom:'1px solid var(--border)',background:'rgba(250,250,251,.94)',backdropFilter:'blur(8px)',position:'sticky',top:0,zIndex:10,display:'flex',alignItems:'center',gap:12}}>
          <div style={{flex:1}}>
            <div className="eyebrow" style={{marginBottom:1}}>Step {step+1} of 6 · {BP_STEPS[step].desc}</div>
            <div className="h3">{BP_STEPS[step].label}</div>
          </div>
          <button className="btn btn-ghost btn-sm">Save Draft</button>
          <button className={step === 5 ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'} onClick={send}>Send for Approval</button>
          <button
            className="btn btn-sm"
            onClick={canPublish && step !== 5 ? pub : undefined}
            style={{
              background: (canPublish && step !== 5) ? 'var(--accent)' : 'var(--border-2)',
              color:      (canPublish && step !== 5) ? '#fff'           : 'var(--text-3)',
              cursor:     (canPublish && step !== 5) ? 'pointer'        : 'not-allowed',
              border:     '1px solid ' + ((canPublish && step !== 5) ? 'transparent' : 'var(--border-strong)'),
              transition: 'all .2s',
            }}
            title={step === 5 ? 'Send for approval first — Publish to Demo Mode unlocks once all approvals are received' : (!canPublish ? 'Complete all steps and configure approvers to publish' : '')}
          >
            Publish to Demo Mode
          </button>
        </div>

        <div style={{padding:'28px',flex:1,maxWidth:680}}>
          {step===0 && <BPBasics f={f} set={set} />}
          {step===1 && <BPAudience f={f} set={set} />}
          {step===2 && <BPTrigger f={f} set={set} />}
          {step===3 && <BPReward f={f} set={set} />}
          {step===4 && <BPLimits f={f} set={set} />}
          {step===5 && <BPApproval f={f} set={set} onSend={send} onPublish={pub} allStepsDone={allStepsDone} />}
        </div>

        {/* Sticky bottom nav */}
        <div style={{padding:'14px 28px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',gap:12,position:'sticky',bottom:0,background:'var(--surface)',zIndex:10}}>
          <button className="btn btn-ghost" onClick={()=>step>0&&setStep(step-1)} style={{opacity:step===0?.4:1}} disabled={step===0}>
            {step===0 ? 'Cancel' : `Back to ${BP_STEPS[step-1].label}`}
          </button>
          <div style={{marginLeft:'auto'}} className="row gap-10">
            <button className="btn btn-secondary" onClick={()=>{}}>Save Draft</button>
            {step<5
              ? <button className="btn btn-primary" onClick={advance}>Continue to {BP_STEPS[step+1].label} {window.Ic('chevRight',{size:15})}</button>
              : <>
                  <button className="btn btn-secondary" disabled={true} style={{opacity:.4,cursor:'not-allowed'}} title="Send for approval first — Publish to Demo Mode unlocks once all approvals are received">Publish to Demo Mode</button>
                  <button className="btn btn-primary" onClick={send}>{window.Ic('arrow',{size:15})} Send for Approval</button>
                </>
            }
          </div>
        </div>
      </div>

      {/* ── RIGHT SUMMARY ── */}
      <BPSummary f={f} step={step} visited={visited} />
    </div>
  );
}

window.BuilderPage = BuilderPage;
