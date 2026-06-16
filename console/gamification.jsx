// STARS Admin Console — Gamification page

// Register gamification icon (shield + star — engagement credential)
window.I.gamification = ({size=18,sw=1.6,...p}={}) =>
  React.createElement('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round',...p},
    React.createElement('path',{key:1,d:'M12 2L4 6v6c0 5.52 3.48 10.45 8 12 4.52-1.55 8-6.48 8-12V6L12 2z'}),
    React.createElement('path',{key:2,d:'M12 8l1.2 2.4 2.6.4-1.9 1.85.45 2.65L12 14.1l-2.35 1.24.45-2.65L8.2 10.8l2.6-.4z'}),
  );

const { useState: uGM } = React;

function GamificationPage({ addNotif, setNotifOpen: openNotifPanel }) {
  const [showCreate, setShowCreate] = uGM(false);
  const [pfmStatus, setPfmStatus] = uGM(() => localStorage.getItem('demo_pfmstreak_status') || '');
  const [form, setForm] = uGM({
    name: '5-Day PFM Streak',
    type: 'Streak',
    trigger: 'Module opened',
    module: 'Personal Finance Management',
    condition: 'Daily',
    streakDuration: '5 days',
    reward: 'Points / STARS',
    rewardAmount: '200 STARS',
    segment: 'All active MTB Neo users',
    action: 'Submit for approval',
    challengeActions: ['Video completed','Module opened','Profile updated'],
    timeLimit: '7 days',
    progressMetric: 'Total points earned',
    numLevels: '4',
    resetPeriod: 'Lifetime progress',
    levelThresholds: [
      { level: 1, name: 'Starter',  threshold: '0 pts'      },
      { level: 2, name: 'Explorer', threshold: '1,000 pts'  },
      { level: 3, name: 'Achiever', threshold: '5,000 pts'  },
      { level: 4, name: 'Champion', threshold: '10,000 pts' },
    ],
    levelBenefits: [
      { level: 'Starter',  benefit: 'Welcome badge'                  },
      { level: 'Explorer', benefit: '1.1x points multiplier'         },
      { level: 'Achiever', benefit: 'Access to special rewards'      },
      { level: 'Champion', benefit: 'Premium offer eligibility'      },
    ],
    badgeCategory: 'Savings',
    badgeIcon: 'Savings badge',
    unlockCondition: 'Complete X actions',
    requirement: 'Complete 3 savings videos',
    bonusReward: 'Points',
    bonusRewardAmount: '300 points',
    visibility: 'Show in customer profile',
  });
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submitPfmRule = () => {
    setShowCreate(false);
    setPfmStatus('pending');
    localStorage.setItem('demo_pfmstreak_status', 'pending');
    if (addNotif) addNotif({ msg: '"5-Day PFM Streak" submitted for approval. Awaiting compliance review.', tone: 'pending' });
    if (openNotifPanel) openNotifPanel(true);
    setTimeout(() => {
      setPfmStatus('approved');
      localStorage.setItem('demo_pfmstreak_status', 'approved');
      if (addNotif) addNotif({ msg: '"5-Day PFM Streak" approved by the review team. Activating…', tone: 'info' });
      setTimeout(() => {
        setPfmStatus('live');
        localStorage.setItem('demo_pfmstreak_status', 'live');
        if (addNotif) addNotif({ msg: '"5-Day PFM Streak" is now live for all eligible MTB Neo users.', tone: 'success' });
        if (openNotifPanel) openNotifPanel(true);
      }, 2500);
    }, 2500);
  };

  const KPIS = [
    { label: 'Active Rules',           value: pfmStatus === 'live' ? '19' : '18', icon: 'bolt', iBg: 'var(--accent-soft)', iFg: 'var(--accent)'  },
    { label: 'Users Participating',    value: '42,580', icon: 'users',    iBg: 'var(--green-bg)',    iFg: 'var(--green)'   },
    { label: 'Badges Earned',          value: '11,240', icon: 'star',     iBg: 'var(--amber-bg)',    iFg: 'var(--amber)'   },
    { label: 'Streak Completion Rate', value: '38%',    icon: 'target',   iBg: 'var(--violet-bg)',   iFg: 'var(--violet)'  },
  ];

  const MODULES = [
    {
      icon: 'activity', color: 'var(--accent)', bg: 'var(--accent-soft)',
      name: 'Streaks',
      desc: 'Reward repeated customer actions over time.',
      example: '5-Day Financial Literacy Streak',
      status: '3 active · 2 draft',
    },
    {
      icon: 'star', color: 'var(--amber)', bg: 'var(--amber-bg)',
      name: 'Badges',
      desc: 'Recognize customer milestones and achievements.',
      example: 'Smart Saver Badge',
      status: '8 active · 4 draft',
    },
    {
      icon: 'target', color: 'var(--violet)', bg: 'var(--violet-bg)',
      name: 'Levels',
      desc: 'Progress customers based on points and activity.',
      example: 'MTB Loyalty Journey',
      status: '4 levels configured',
    },
    {
      icon: 'campaigns', color: 'var(--green)', bg: 'var(--green-bg)',
      name: 'Challenges',
      desc: 'Bundle multiple customer actions into structured engagement campaigns.',
      example: 'Digital Banking Starter Challenge',
      status: '5 active · 3 draft',
    },
  ];

  const RULES = [
    { name: '5-Day Literacy Streak',    type: 'Streak',    trigger: 'Video completed daily',    reward: '500 pts',      segment: 'All users',        status: 'Active', tone: 'green' },
    { name: 'Smart Saver',              type: 'Badge',     trigger: 'Complete 3 savings videos', reward: '300 pts',      segment: 'Retail users',     status: 'Active', tone: 'green' },
    { name: 'Digital Banking Starter',  type: 'Challenge', trigger: 'Complete 3 app actions',   reward: '800 pts',      segment: 'New users',         status: 'Draft',  tone: 'slate' },
    { name: 'MTB Rewards Journey',      type: 'Level',     trigger: 'Total points earned',       reward: 'Tier benefits', segment: 'All users',        status: 'Active', tone: 'green' },
    { name: 'Bill Pay Habit Builder',   type: 'Streak',    trigger: 'Weekly bill payment',       reward: '750 pts',      segment: 'Active app users', status: 'Paused', tone: 'amber' },
    ...(pfmStatus ? [{ name: '5-Day PFM Streak', type: 'Streak', trigger: 'Opens Personal Finance Management daily', reward: '200 STARS', segment: 'All active MTB Neo users', status: pfmStatus === 'live' ? 'Active' : pfmStatus === 'approved' ? 'Approved' : 'Pending', tone: pfmStatus === 'live' ? 'green' : pfmStatus === 'approved' ? 'blue' : 'amber' }] : []),
  ];

  const TYPE_COLOR = { Streak: 'var(--accent)', Badge: 'var(--amber)', Level: 'var(--violet)', Challenge: 'var(--green)' };
  const TYPE_BG    = { Streak: 'var(--accent-soft)', Badge: 'var(--amber-bg)', Level: 'var(--violet-bg)', Challenge: 'var(--green-bg)' };

  return (
    <div style={{ height: 'calc(100vh - var(--header-h))', overflowY: 'auto', background: 'var(--bg)' }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ padding: '18px 28px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(250,250,251,.96)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 className="h1">Gamification</h1>
            <p className="page-sub" style={{ marginTop: 3 }}>Design behavior loops using streaks, badges, levels, and challenges across video education and app actions.</p>
          </div>
          <button className="btn btn-primary" style={{ flexShrink: 0, marginTop: 4 }} onClick={() => setShowCreate(true)}>
            {window.Ic('plus', { size: 15 })} Create Gamification Rule
          </button>
        </div>
      </div>

      <div style={{ padding: '22px 28px 40px' }}>

        {/* ── KPI ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {KPIS.map((k, i) => (
            <div key={i} className="card" style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.3 }}>{k.label}</span>
                <span style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: k.iBg, color: k.iFg, display: 'grid', placeItems: 'center', flex: 'none' }}>
                  {window.Ic(k.icon, { size: 14 })}
                </span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* ── MODULE CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 24 }}>
          {MODULES.map((m, i) => (
            <div key={i} className="card" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: m.bg, color: m.color, display: 'grid', placeItems: 'center', flex: 'none' }}>
                  {window.Ic(m.icon, { size: 18 })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.01em', marginBottom: 3 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{m.desc}</div>
                </div>
              </div>
              <div style={{ padding: '11px 14px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 4 }}>Example</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.4 }}>{m.example}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{m.status}</span>
                <button className="btn btn-secondary btn-sm">Manage</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── ACTIVE RULES TABLE ── */}
        <div className="card table-wrap">
          <div className="card-head">
            <div className="grow">
              <div className="card-title">Active Gamification Rules</div>
              <div className="xsmall muted-2" style={{ marginTop: 2 }}>All configured rules across modules</div>
            </div>
            <button className="btn btn-ghost btn-sm">{window.Ic('filter', { size: 14 })} Filter</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowCreate(true)}>{window.Ic('plus', { size: 14 })} New rule</button>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Trigger</th>
                <th>Reward</th>
                <th>Segment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RULES.map((r, i) => (
                <tr key={i} style={{ cursor: 'pointer' }}>
                  <td>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{r.name}</span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 'var(--r-pill)', color: TYPE_COLOR[r.type], background: TYPE_BG[r.type] }}>
                      {r.type}
                    </span>
                  </td>
                  <td className="small muted">{r.trigger}</td>
                  <td className="small" style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{r.reward}</td>
                  <td className="small muted">{r.segment}</td>
                  <td>
                    <span className={`badge ${r.tone}`}><span className="dot"></span>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ── CREATE GAMIFICATION RULE DRAWER ── */}
      {showCreate && (
        <div className="scrim" onClick={() => setShowCreate(false)} style={{ padding: 0, justifyContent: 'flex-end', alignItems: 'stretch' }}>
          <div style={{
            width: 'min(480px, 96vw)',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid var(--border)',
            overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>

            {/* Drawer header */}
            <div className="modal-head">
              <div className="modal-ic">{window.Ic('gamification', { size: 17 })}</div>
              <div style={{ flex: 1 }}>
                <div className="modal-title">Create Gamification Rule</div>
                <div className="modal-sub">{form.type === 'Level' ? 'Configure progression tiers, thresholds, and level benefits' : form.type === 'Badge' ? 'Configure badge criteria, unlock condition, and visibility' : 'Configure trigger, condition, reward, and segment'}</div>
              </div>
              <button className="icon-btn modal-x" style={{ width: 32, height: 32 }} onClick={() => setShowCreate(false)}>
                {window.Ic('x', { size: 18, sw: 1.8 })}
              </button>
            </div>

            {/* Drawer body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div className="field">
                <label className="label">{form.type === 'Level' ? 'Program name' : form.type === 'Badge' ? 'Badge name' : 'Rule name'}</label>
                <input className="input" type="text" value={form.name} onChange={e => setF('name', e.target.value)} placeholder={form.type === 'Level' ? 'MTB Loyalty Journey' : form.type === 'Badge' ? 'Smart Saver' : '5-Day Financial Literacy Streak'} />
              </div>

              <div className="field">
                <label className="label">Rule type</label>
                <select className="select" value={form.type} onChange={e => {
                  const t = e.target.value;
                  setF('type', t);
                  if (t === 'Badge') setF('segment', 'Retail users');
                  else setF('segment', 'All users');
                }}>
                  {['Streak','Badge','Level','Challenge'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {form.type === 'Level' ? (
                <>
                  <div className="field">
                    <label className="label">Progress metric</label>
                    <select className="select" value={form.progressMetric} onChange={e => setF('progressMetric', e.target.value)}>
                      {['Total points earned','Completed missions','Eligible actions completed','Videos completed'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Number of levels</label>
                    <select className="select" value={form.numLevels} onChange={e => setF('numLevels', e.target.value)}>
                      {['3','4','5','6'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Level thresholds</label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', marginTop: 2 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '7px 12px', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
                        {['Level','Name','Threshold'].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</span>)}
                      </div>
                      {form.levelThresholds.map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', padding: '8px 12px', gap: 8, borderBottom: i < form.levelThresholds.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-3)' }}>{row.level}</span>
                          <input className="input" style={{ padding: '5px 9px', fontSize: 13, height: 32 }} value={row.name} onChange={e => { const t = [...form.levelThresholds]; t[i] = {...t[i], name: e.target.value}; setF('levelThresholds', t); }} />
                          <input className="input" style={{ padding: '5px 9px', fontSize: 13, height: 32 }} value={row.threshold} onChange={e => { const t = [...form.levelThresholds]; t[i] = {...t[i], threshold: e.target.value}; setF('levelThresholds', t); }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Level benefits</label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', marginTop: 2 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', padding: '7px 12px', background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
                        {['Level','Benefit'].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</span>)}
                      </div>
                      {form.levelBenefits.map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', padding: '8px 12px', gap: 8, borderBottom: i < form.levelBenefits.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--violet)' }}>{row.level}</span>
                          <input className="input" style={{ padding: '5px 9px', fontSize: 13, height: 32 }} value={row.benefit} onChange={e => { const b = [...form.levelBenefits]; b[i] = {...b[i], benefit: e.target.value}; setF('levelBenefits', b); }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : form.type === 'Badge' ? (
                <>
                  <div className="field">
                    <label className="label">Badge category</label>
                    <select className="select" value={form.badgeCategory} onChange={e => setF('badgeCategory', e.target.value)}>
                      {['Financial Literacy','Savings','Bill Payment','Card Usage','App Exploration'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Badge icon</label>
                    <select className="select" value={form.badgeIcon} onChange={e => setF('badgeIcon', e.target.value)}>
                      {['Savings badge','Learning badge','Bill pay badge','Card badge','Explorer badge'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Unlock condition</label>
                    <select className="select" value={form.unlockCondition} onChange={e => setF('unlockCondition', e.target.value)}>
                      {['Complete X actions','Complete selected videos','Complete selected app modules','Complete a challenge','Reach point threshold'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Requirement</label>
                    <input className="input" type="text" value={form.requirement} onChange={e => setF('requirement', e.target.value)} placeholder="e.g. Complete 3 savings videos" />
                  </div>
                  <div className="field">
                    <label className="label">Bonus reward</label>
                    <select className="select" value={form.bonusReward} onChange={e => setF('bonusReward', e.target.value)}>
                      {['None','Points','Voucher','Level progress'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  {form.bonusReward !== 'None' && (
                    <div className="field">
                      <label className="label">Bonus reward amount</label>
                      <input className="input" type="text" value={form.bonusRewardAmount} onChange={e => setF('bonusRewardAmount', e.target.value)} placeholder="e.g. 300 points" />
                    </div>
                  )}
                  <div className="field">
                    <label className="label">Visibility</label>
                    <select className="select" value={form.visibility} onChange={e => setF('visibility', e.target.value)}>
                      {['Show in customer profile','Show after unlock only','Internal only'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </>
              ) : form.type === 'Challenge' ? (
                <div className="field">
                  <label className="label">Required actions</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                    {['Video completed','Module opened','Bill payment completed','Profile updated','Card transaction completed','Referral completed'].map(opt => {
                      const checked = form.challengeActions.includes(opt);
                      const toggle = () => setF('challengeActions', checked
                        ? form.challengeActions.filter(a => a !== opt)
                        : [...form.challengeActions, opt]);
                      return (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '9px 12px', borderRadius: 'var(--r-md)', border: `1px solid ${checked ? 'var(--accent-tint)' : 'var(--border)'}`, background: checked ? 'var(--accent-soft)' : 'var(--surface)', transition: 'all .12s' }}>
                          <div style={{ width: 16, height: 16, borderRadius: 'var(--r-xs)', border: `2px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`, background: checked ? 'var(--accent)' : 'transparent', display: 'grid', placeItems: 'center', flex: 'none', transition: 'all .12s' }} onClick={toggle}>
                            {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>}
                          </div>
                          <span style={{ fontSize: 13.5, fontWeight: checked ? 600 : 450, color: checked ? 'var(--accent)' : 'var(--text-2)' }} onClick={toggle}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  <div className="field">
                    <label className="label">Trigger action</label>
                    <select className="select" value={form.trigger} onChange={e => setF('trigger', e.target.value)}>
                      {['Video completed','Module opened','Bill payment completed','Profile updated','Card transaction completed','Referral completed'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  {form.trigger === 'Module opened' && (
                    <div className="field">
                      <label className="label">Module</label>
                      <select className="select" value={form.module} onChange={e => setF('module', e.target.value)}>
                        {['Personal Finance Management','Budget Planner','Savings Goals','Card Controls','Spending Insights'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  )}
                </>
              )}

              {form.type !== 'Level' && form.type !== 'Badge' && (
                <div className="field">
                  <label className="label">{form.type === 'Challenge' ? 'Completion condition' : 'Condition'}</label>
                  <select className="select" value={form.type === 'Challenge' ? 'Complete all selected actions' : form.condition} onChange={e => setF('condition', e.target.value)}>
                    {form.type === 'Challenge'
                      ? ['Complete all selected actions','Complete any selected action','Complete X of selected actions'].map(o => <option key={o}>{o}</option>)
                      : ['Once','Daily','Weekly','Complete X times','Complete all selected actions'].map(o => <option key={o}>{o}</option>)
                    }
                  </select>
                </div>
              )}

              {form.type === 'Streak' && (
                <div className="field">
                  <label className="label">Streak duration</label>
                  <select className="select" value={form.streakDuration} onChange={e => setF('streakDuration', e.target.value)}>
                    {['3 days','5 days','7 days','14 days','21 days','30 days'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}

              {form.type === 'Challenge' && (
                <div className="field">
                  <label className="label">Time limit</label>
                  <select className="select" value={form.timeLimit} onChange={e => setF('timeLimit', e.target.value)}>
                    {['3 days','7 days','14 days','30 days','60 days','No limit'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}

              {form.type !== 'Level' && form.type !== 'Badge' && (
                <>
                  <div className="field">
                    <label className="label">Reward</label>
                    <select className="select" value={form.reward} onChange={e => setF('reward', e.target.value)}>
                      {['Points','Badge','Level progress','Voucher'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label">Reward amount</label>
                    <input className="input" type="text" value={form.rewardAmount} onChange={e => setF('rewardAmount', e.target.value)} placeholder="e.g. 500 points" />
                  </div>
                </>
              )}

              <div className="field">
                <label className="label">Segment</label>
                <select className="select" value={form.segment} onChange={e => setF('segment', e.target.value)}>
                  {['All users','New users','Retail users','Dormant users','Cardholders','Savings users','Custom segment'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {form.type === 'Level' && (
                <div className="field">
                  <label className="label">Reset period</label>
                  <select className="select" value={form.resetPeriod} onChange={e => setF('resetPeriod', e.target.value)}>
                    {['Lifetime progress','Annual reset','Quarterly reset'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}

              <div style={{ height: 1, background: 'var(--border)' }}></div>

              <div className="field">
                <label className="label">Approval action</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
                  {['Save as draft','Submit for approval','Request activation'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', borderRadius: 'var(--r-md)', border: `1px solid ${form.action === opt ? 'var(--accent-tint)' : 'var(--border)'}`, background: form.action === opt ? 'var(--accent-soft)' : 'var(--surface)', transition: 'all .12s' }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${form.action === opt ? 'var(--accent)' : 'var(--border-strong)'}`, background: form.action === opt ? 'var(--accent)' : 'transparent', display: 'grid', placeItems: 'center', flex: 'none', transition: 'all .12s' }}>
                        {form.action === opt && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }}></div>}
                      </div>
                      <input type="radio" name="gam-action" value={opt} checked={form.action === opt} onChange={() => setF('action', opt)} style={{ display: 'none' }} />
                      <span style={{ fontSize: 13.5, fontWeight: form.action === opt ? 600 : 450, color: form.action === opt ? 'var(--accent)' : 'var(--text-2)' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="callout info">
                <span className="c-ic">{window.Ic('info', { size: 18, sw: 1.7 })}</span>
                <div>
                  <div className="callout-title">Demo Mode</div>
                  Rules are simulated for demo purposes. In production, activation follows the MTB role-based approval workflow.
                </div>
              </div>

            </div>

            {/* Drawer footer */}
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setShowCreate(false)}>Cancel</button>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Save as draft</button>
                <button className="btn btn-primary" onClick={() => form.action === 'Submit for approval' ? submitPfmRule() : setShowCreate(false)}>
                  {form.action === 'Request activation' ? 'Request activation' : form.action === 'Submit for approval' ? 'Submit for approval' : 'Save as draft'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

window.GamificationPage = GamificationPage;
