// STARS Admin Console — Campaign Builder modal (multi-step)
const { useState: uSt } = React;

const STEPS = ['Basics', 'Audience', 'Rewards & rules', 'Budget', 'Review'];

function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && <div className={'step-line' + (i <= current ? ' done' : '')}></div>}
          <div className={'step' + (i < current ? ' done' : i === current ? ' active' : '')}>
            <span className="step-dot">{i < current ? window.Ic('check', { size: 13, sw: 3 }) : i + 1}</span>
            <span className="step-label">{s}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function BuilderModal({ onClose, onPublish }) {
  const [step, setStep] = uSt(0);
  const [done, setDone] = uSt(false);
  const [f, setF] = uSt({ name: 'Festival Spend Booster', reward: '2.0', trigger: 'QR payment', audience: 'All members', budget: '5,00,000', daily: '50,000', cap: true, approval: true });
  const set = (k, v) => setF(o => ({ ...o, [k]: v }));

  if (done) {
    return (
      <div className="scrim" onClick={onClose}>
        <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
          <div className="modal-body">
            <div className="state" style={{ padding: '28px 20px 12px' }}>
              <div className="state-ic success">{window.Ic('check', { size: 26, sw: 2 })}</div>
              <div className="state-title">Campaign published</div>
              <div className="state-desc"><b>{f.name}</b> is now live to 185,420 members. Stars will begin accruing on the next qualifying transaction.</div>
            </div>
          </div>
          <div className="modal-foot"><button className="btn btn-ghost" onClick={onClose}>Back to dashboard</button><div style={{ marginLeft: 'auto' }}><button className="btn btn-primary" onClick={onClose}>View campaign</button></div></div>
        </div>
      </div>
    );
  }

  const next = () => step < 4 ? setStep(step + 1) : (setDone(true), onPublish && onPublish(f));
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-ic">{window.Ic('builder', { size: 17 })}</div>
          <div><div className="modal-title">Create campaign</div><div className="modal-sub">Step {step + 1} of 5 · {STEPS[step]}</div></div>
          <button className="icon-btn modal-x" style={{ width: 32, height: 32 }} onClick={onClose}>{window.Ic('x', { size: 18, sw: 1.8 })}</button>
        </div>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <Stepper current={step} />
        </div>
        <div className="modal-body" style={{ minHeight: 232 }}>
          {step === 0 && (
            <div className="grid" style={{ gap: 18 }}>
              <div className="field"><label className="label">Campaign name</label><input className="input" value={f.name} onChange={e => set('name', e.target.value)} /></div>
              <div className="grid grid-2" style={{ gap: 18 }}>
                <div className="field"><label className="label">Objective</label><select className="select"><option>Increase transactions</option><option>Drive app engagement</option><option>Acquire new members</option></select></div>
                <div className="field"><label className="label">Start date</label><div className="input-group"><span className="input-icon">{window.Ic('calendar', { size: 16, sw: 1.7 })}</span><input className="input has-icon" defaultValue="14 Jun 2026" /></div></div>
              </div>
              <div className="field"><label className="label">Description <span className="opt">· optional</span></label><textarea className="textarea" rows="2" placeholder="What is this campaign trying to achieve?"></textarea></div>
            </div>
          )}
          {step === 1 && (
            <div className="grid" style={{ gap: 18 }}>
              <div className="field"><label className="label">Target audience</label>
                <div className="segmented" style={{ width: 'fit-content' }}>
                  {['All members', 'Segment', 'Tier'].map(a => <button key={a} className={f.audience === a ? 'on' : ''} onClick={() => set('audience', a)}>{a}</button>)}
                </div>
              </div>
              <div className="grid grid-2" style={{ gap: 18 }}>
                <div className="field"><label className="label">Estimated reach</label><input className="input" disabled value={f.audience === 'All members' ? '185,420 members' : f.audience === 'Tier' ? '12,400 members' : '38,600 members'} /></div>
                <div className="field"><label className="label">Eligibility</label><select className="select"><option>Active in last 30 days</option><option>All members</option><option>KYC verified only</option></select></div>
              </div>
              <div className="callout info"><span className="c-ic">{window.Ic('info', { size: 18, sw: 1.7 })}</span><div><div className="callout-title">Reach is an estimate</div>Final audience is resolved at publish time from the live MTB Neo ledger.</div></div>
            </div>
          )}
          {step === 2 && (
            <div className="grid" style={{ gap: 18 }}>
              <div className="grid grid-2" style={{ gap: 18 }}>
                <div className="field"><label className="label">Trigger event</label><select className="select" value={f.trigger} onChange={e => set('trigger', e.target.value)}><option>QR payment</option><option>Bill payment completed</option><option>Mission completed</option></select></div>
                <div className="field"><label className="label">Reward</label><div className="input-group"><input className="input has-suffix tnum" value={f.reward} onChange={e => set('reward', e.target.value)} /><span className="input-suffix">× Stars</span></div></div>
              </div>
              <label className="check"><input type="checkbox" checked={f.cap} onChange={e => set('cap', e.target.checked)} /><span className="box">{window.Ic('check', { size: 12, sw: 3 })}</span>Cap at 500 Stars per member / day</label>
              <label className="check"><input type="checkbox" checked={f.approval} onChange={e => set('approval', e.target.checked)} /><span className="box">{window.Ic('check', { size: 12, sw: 3 })}</span>Require admin approval before publishing</label>
            </div>
          )}
          {step === 3 && (
            <div className="grid" style={{ gap: 18 }}>
              <div className="grid grid-2" style={{ gap: 18 }}>
                <div className="field"><label className="label">Total budget cap</label><div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" value={f.budget} onChange={e => set('budget', e.target.value)} /></div></div>
                <div className="field"><label className="label">Daily liability limit</label><div className="input-group"><span className="input-prefix">৳</span><input className="input has-prefix tnum" value={f.daily} onChange={e => set('daily', e.target.value)} /></div></div>
              </div>
              <div className="card card-pad" style={{ background: 'var(--surface-2)', boxShadow: 'none' }}>
                <div className="spread"><span className="small muted">Projected 30-day issuance</span><span className="small cell-strong tnum">2.1M Stars</span></div>
                <div className="spread mt-8"><span className="small muted">Estimated liability</span><span className="small cell-strong tnum" style={{ color: 'var(--accent)' }}>৳4.2L</span></div>
                <div className="bar-track" style={{ marginTop: 12 }}><div className="bar-fill" style={{ width: '84%' }}></div></div>
                <div className="xsmall muted-2 mt-8">84% of budget cap at projected volume</div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="grid" style={{ gap: 16 }}>
              <div className="card card-pad" style={{ background: 'var(--surface-2)', boxShadow: 'none' }}>
                <div className="ds-label" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14 }}>Review</div>
                {[['Campaign', f.name], ['Audience', f.audience], ['Trigger', f.trigger], ['Reward', f.reward + '× Stars'], ['Budget cap', '৳' + f.budget], ['Est. liability', '৳4.2L']].map(([k, v]) => (
                  <div className="spread" key={k} style={{ padding: '7px 0' }}><span className="small muted">{k}</span><span className="small cell-strong" style={k === 'Est. liability' ? { color: 'var(--accent)' } : {}}>{v}</span></div>
                ))}
              </div>
              <div className="callout success"><span className="c-ic">{window.Ic('check', { size: 18, sw: 2 })}</span><div><div className="callout-title">Ready to publish</div>Guardrails are configured. This campaign will auto-pause if it breaches its daily limit.</div></div>
            </div>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={step === 0 ? onClose : back}>{step === 0 ? 'Cancel' : 'Back'}</button>
          <div style={{ marginLeft: 'auto' }} className="row gap-10">
            <button className="btn btn-secondary" onClick={onClose}>Save draft</button>
            <button className="btn btn-primary" onClick={next}>{step === 4 ? 'Publish campaign' : 'Continue'}{step < 4 && window.Ic('chevRight', { size: 15 })}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.BuilderModal = BuilderModal;
