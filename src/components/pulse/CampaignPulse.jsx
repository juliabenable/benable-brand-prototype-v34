import { useEffect, useRef, useState } from 'react';
import '../../styles/pulse.css';
import { CREW, DAYS } from './pulseData.js';
import { stageOf, AmineProgress2, AmineTable, AmineRail, StayTuned, CreatorsFound } from './amine.jsx';

/*
  Campaign Pulse v34 — single experience (v33's C), kept lean for polishing:
  stat row + Amine stage rail + creators table + right rail, driven by the
  DAYS/CREW demo states. The A–D/W/Y/Z/0 exploration lives in v33 and git.
*/

// Survive captured-DOM remounts.
let persistedIdx = 2; // open on Day 9 — the dead middle is the thesis

export default function CampaignPulse() {
  const [idx, setIdx] = useState(persistedIdx);
  const [openCrew, setOpenCrew] = useState(() => new Set());
  const [stageFilter, setStageFilter] = useState(null);
  const rootRef = useRef(null);
  const scene = DAYS[idx];
  const phase = scene.phase; // 'sourcing' | 'review' | undefined (live dashboard)

  useEffect(() => { persistedIdx = idx; }, [idx]);
  useEffect(() => { setStageFilter(null); }, [idx]);

  const toggleCrew = (k) =>
    setOpenCrew((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });

  // The pulse view replaces the Dashboard tab's own content; the grey
  // #f9fafb pane fills everything below the tabs (tabs strip stays white).
  useEffect(() => {
    const wrap = rootRef.current?.parentElement;
    const column = wrap?.classList.contains('cp-host') ? wrap.parentElement : wrap;
    if (!column) return undefined;
    const pane = column.parentElement;
    column.classList.add('cp-crew-mode');
    if (!phase) {
      column.classList.add('cp-crew-mode--labs');
      pane?.classList.add('cp-labs-pane');
    }
    return () => {
      column.classList.remove('cp-crew-mode', 'cp-crew-mode--labs');
      pane?.classList.remove('cp-labs-pane');
    };
  }, [phase]);

  // Recruiting pill (Figma #fff0ce/#a85321) while sourcing/reviewing; Active after.
  useEffect(() => {
    const pill = document.querySelector('.workflow-header-main .phase-pill');
    const label = pill?.querySelector('span:last-child');
    const dot = pill?.querySelector('.phase-pill-dot');
    if (!pill || !label) return undefined;
    if (!phase) return undefined;
    label.textContent = 'Recruiting';
    pill.style.background = '#fff0ce';
    pill.style.color = '#a85321';
    if (dot) dot.style.background = '#a85321';
    return () => {
      label.textContent = 'Active';
      pill.style.background = '';
      pill.style.color = '';
      if (dot) dot.style.background = '';
    };
  }, [phase]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(i + 1, DAYS.length - 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const needsAction = (c) => (c.mystery && c.found) || (!c.mystery && !!c.action);
  const crewRows = (CREW[scene.day] || [])
    .filter((c) => {
      if (stageFilter == null) return true;
      if (stageFilter === 'casting') return !!c.mystery;
      if (stageFilter === 'needs') return needsAction(c);
      return !c.mystery && stageOf(c, scene.day) === stageFilter;
    })
    // action items float to the top of the list
    .sort((a, b) => Number(needsAction(b)) - Number(needsAction(a)));

  return (
    <div className="cp-root cp-root--c" ref={rootRef}>
      {phase === 'sourcing' ? (
        <StayTuned />
      ) : phase === 'review' ? (
        <CreatorsFound count={(CREW[scene.day] || []).length} />
      ) : (
        <>
          <AmineProgress2 scene={scene} filter={stageFilter} onFilter={setStageFilter} />
          <div className="cp-crew2" key={`b-${scene.day}`}>
            <div className="cp-crew-cols cp-crew-cols--left">
              <div className="cp-crew-left">
                <AmineTable
                  scene={scene}
                  rows={crewRows}
                  filter={stageFilter}
                  onFilter={setStageFilter}
                  openCrew={openCrew}
                  toggleCrew={toggleCrew}
                />
              </div>

              <aside className="cp-tile-stack">
                <AmineRail scene={scene} />
              </aside>
            </div>
          </div>
        </>
      )}

      {/* demo scrubber — presenter control, not product UI */}
      <nav className="cp-scrubber" aria-label="Demo controls">
        <span className="cp-scrub-tag">PULSE DEMO</span>
        <button type="button" className="cp-scrub-arrow" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>←</button>
        {DAYS.map((d, i) => (
          <button type="button" key={d.day} className={i === idx ? 'cp-scrub-day cp-scrub-day--active' : 'cp-scrub-day'} onClick={() => setIdx(i)}>
            {i === idx ? d.scrubLabel : `D${d.day}`}
          </button>
        ))}
        <button type="button" className="cp-scrub-arrow" disabled={idx === DAYS.length - 1} onClick={() => setIdx(idx + 1)}>→</button>
      </nav>
    </div>
  );
}
