import { CREW, PCT, PHOTOS, TIMELINES, CASTING_TIMELINE, STAGE_LABELS } from './pulseData.js';
import LiveStatus from './LiveStatus.jsx';

/* crew stage 0–5 maps straight onto the 7-stage funnel; wrap day = Thanked */
export const stageOf = (c, day) => (day === 30 ? 6 : c.stage);

/* A · Amine — the designer's cohort-funnel page (benable-cohort-funnel repo,
   Figma 11603:48887) rebuilt on v32's states: DAYS scrubber, CREW rows,
   LiveStatus registers, banners and stage filtering all stay; every visual
   value below is lifted from Amine's build (see its NOTES.md).
   Casting has no place in his 7-stage funnel, so it renders as a leading
   hatched block — his "Exited" treatment, mirrored to the start. */

const B = import.meta.env.BASE_URL;
const AIC = {
  group: `${B}labs/group.svg`,
  invites: `${B}labs/invites.svg`,
  insight: `${B}labs/insight.svg`,
  plus: `${B}labs/plus.svg`,
  chevron: `${B}labs/chevron.svg`,
  check: `${B}labs/check-circle.svg`,
  paceStrip: `${B}labs/pace-strip.jpg`,
  stayTuned: `${B}labs/stay-tuned.png`,
};

/* Amine's 7-stage ramp — stages 1-4 Figma-exact, 5-7 his extrapolation;
   ink clears 4.5:1 on every fill (his contrast fix). */
export const AM_STAGES = [
  { label: 'Invited', fill: '#d8efe2', ink: '#06301f', off: 'invites go out on approval' },
  { label: 'Accepted', fill: '#b2e0c7', ink: '#06301f', off: 'as invites are accepted' },
  { label: 'Order placed', fill: '#7ac299', ink: '#06301f', off: 'after orders are placed' },
  { label: 'Order received', fill: '#4da673', ink: '#06301f', off: 'once packages land' },
  { label: 'Draft submitted', fill: '#1f7a50', ink: '#ffffff', off: 'after filming' },
  { label: 'Content published', fill: '#14603d', ink: '#ffffff', off: 'after our checks' },
  { label: 'Thanked', fill: '#0d4830', ink: '#ffffff', off: 'after posts go live' },
];

/* One derivation for the whole page, from CREW — bar, chips and table agree. */
export function amFunnel(scene) {
  const rows = CREW[scene.day] || [];
  const named = rows.filter((c) => !c.mystery);
  const casting = rows.length - named.length;
  const found = rows.filter((c) => c.mystery && c.found).length;

  const counts = AM_STAGES.map(() => 0);
  const needs = AM_STAGES.map(() => 0);
  const who = AM_STAGES.map(() => []);
  named.forEach((c) => {
    const s = stageOf(c, scene.day);
    counts[s] += 1;
    who[s].push(c.name);
    if (c.action) needs[s] += 1;
  });

  const reached = (i) => named.filter((c) => stageOf(c, scene.day) >= i).length;
  return { rows, named, casting, found, counts, needs, who, reached, flagged: needs.reduce((a, b) => a + b, 0) + found };
}

/* ---- stat row: "Your campaign progress N%" + schedule note (Tony) ------ */
export function AmineStat({ scene }) {
  const wrapped = scene.day === 30;
  return (
    <div className="am-stat">
      <div className="am-stat-left">
        <span className="am-stat-big">{PCT[scene.day]}</span>
        <span className="am-stat-cap">through your campaign</span>
      </div>
      <div className="am-stat-note">
        <span aria-hidden>{wrapped ? '🎉' : '🚀'}</span>
        <span>
          {wrapped
            ? 'Wrapped 37 days ahead of average'
            : 'Campaign on schedule, up to 4 weeks faster than industry average'}
        </span>
      </div>
    </div>
  );
}

/* ---- V2 · the stage rail (Figma 11638:139353) --------------------------
   Equal-width columns carry the reading in the label + hint underneath, so
   there is no chip row; the amber badge is a button and does what V1's
   "Needs you" chip does. Fills are his V2 ramp (two moved for contrast,
   see his NOTES §7); hints are the frame's copy verbatim. The frame's
   leading "Casting…" column (#dbeee3) — which he dropped for lack of a
   casting state — comes back here, since v32 has one. */
/* Hint = what's happening NOW in that stage (Julia, Jul 27); the stage label
   above it is what has already happened. Empty stages keep a forward-looking
   line (no-zeros rule). Voice: "Katie's team", never "Benable Team". */
const AM2_RAIL = [
  { fill: '#b9dfcb', ink: '#06301f', hint: (n) => (n ? 'Creators are reviewing your invites' : 'Once you approve your shortlist') },
  { fill: '#8fceae', ink: '#06301f', hint: (n) => (n ? (n === 1 ? '1 placing an order now' : `${n} placing orders now`) : 'Waiting on replies') },
  { fill: '#5fb98c', ink: '#06301f', hint: (n) => (n ? `${n} ${n === 1 ? 'package' : 'packages'} on the way` : 'As creators pick their products') },
  { fill: '#30aa70', ink: '#06301f', hint: (n) => (n ? `${n} creating content` : 'When packages arrive') },
  { fill: '#17864f', ink: '#ffffff', hint: (n) => (n ? 'Katie’s team is verifying quality' : 'Once creators finish filming') },
  { fill: '#1a6f4c', ink: '#ffffff', hint: (n) => (n ? `${n} ${n === 1 ? 'post' : 'posts'} now live!` : 'Once quality checks pass') },
  { fill: '#124a33', ink: '#ffffff', hint: (n) => (n ? 'All done!' : 'After posts go live') },
];

function RailColumn({ label, hint, count, fill, hatchClass, ink, radius, disabled, selected, dimmed, badge, onActivate, onBadge }) {
  return (
    <div className={`am2-col${dimmed ? ' am-dim' : ''}`}>
      <button
        type="button"
        disabled={disabled}
        aria-pressed={disabled ? undefined : selected}
        className={`am2-bar${hatchClass ? ` ${hatchClass}` : ''}${selected ? ' am-seg--active' : ''}`}
        style={{ background: fill, borderRadius: `${radius.left}px ${radius.right}px ${radius.right}px ${radius.left}px` }}
        onClick={disabled ? undefined : onActivate}
      >
        <span className="am2-count" style={{ color: ink }}>{count}</span>
      </button>
      {badge > 0 && (
        <button
          type="button"
          className="am-badge am2-badge"
          aria-label={`${badge} ${badge === 1 ? 'creator needs' : 'creators need'} you in ${label}`}
          onClick={onBadge}
        >
          {badge}
        </button>
      )}
      <div className="am2-leg">
        <p className="am2-label">{label}</p>
        <p className="am2-hint">{hint}</p>
      </div>
    </div>
  );
}

export function AmineRailBar({ scene, filter, onFilter }) {
  const f = amFunnel(scene);
  const total = f.rows.length || 1;
  const filtering = filter != null;
  const last = AM_STAGES.length - 1;

  return (
    <div className="am2-rail" role="group" aria-label={`Creator funnel: ${PCT[scene.day]} through`}>
      {f.casting > 0 && (
        <RailColumn
          label={f.found ? 'Matches found' : 'Sourcing…'}
          hint={f.found
            ? 'New profiles to review'
            : f.named.length ? 'Rematching you' : 'Matching you with creators'}
          count={f.casting}
          fill="#dbeee3"
          ink="#06301f"
          radius={{ left: 74, right: 4 }}
          selected={filter === 'casting'}
          dimmed={filtering && filter !== 'casting' && !(filter === 'needs' && f.found > 0)}
          badge={f.found}
          onActivate={() => onFilter(filter === 'casting' ? null : 'casting')}
          onBadge={() => onFilter(filter === 'needs' ? null : 'needs')}
        />
      )}
      {AM_STAGES.map((s, i) => {
        const n = f.counts[i];
        const empty = n === 0;
        const active = filter === i;
        const rail = AM2_RAIL[i];
        return (
          <RailColumn
            key={s.label}
            label={s.label}
            hint={rail.hint(n, f.named.length)}
            count={n}
            fill={empty ? undefined : rail.fill}
            hatchClass={empty ? 'am-seg--sliver' : ''}
            ink={empty ? '#808080' : rail.ink}
            radius={{ left: i === 0 && f.casting === 0 ? 74 : 4, right: i === last ? 100 : 4 }}
            disabled={empty}
            selected={active}
            dimmed={filtering && !active && !(filter === 'needs' && f.needs[i] > 0)}
            badge={f.needs[i]}
            onActivate={() => onFilter(active ? null : i)}
            onBadge={() => onFilter(filter === 'needs' ? null : 'needs')}
          />
        );
      })}
    </div>
  );
}

export function AmineProgress2({ scene, filter, onFilter }) {
  return (
    <div className="am-progress">
      <AmineStat scene={scene} />
      <AmineRailBar scene={scene} filter={filter} onFilter={onFilter} />
    </div>
  );
}

/* ---- pre-campaign states (Figma 7199:20453 / 7199:21448) ---------------- */
export function StayTuned() {
  return (
    <div className="am-state">
      <img className="am-state-img" src={AIC.stayTuned} alt="" />
      <div className="am-state-copy">
        <p className="am-state-title">Stay Tuned!</p>
        <p className="am-state-sub">We're hand-picking creators who are the perfect fit for your campaign. We'll alert you via email and in-app notification.</p>
      </div>
    </div>
  );
}

export function CreatorsFound({ count }) {
  return (
    <div className="am-state am-state--found">
      <span className="am-state-avatar"><img src={PHOTOS.Maya} alt="" /></span>
      <div className="am-state-copy am-state-copy--found">
        <p className="am-found-title">
          We Found <b>{count} {count === 1 ? 'creator' : 'creators'}</b> who are a great fit
        </p>
        <p className="am-found-sub">Review each profile and add the ones you'd like to invite to your campaign.</p>
      </div>
      <button type="button" className="am-found-btn">Review Creators</button>
    </div>
  );
}

/* ---- creators table ---------------------------------------------------- */
export const AM_FILTER_LABEL = (filter) =>
  filter === 'needs' ? 'Needs you' : filter === 'casting' ? 'Sourcing…' : AM_STAGES[filter]?.label;

export function AmineTable({ scene, rows, filter, onFilter, openCrew, toggleCrew }) {
  const cohort = (CREW[scene.day] || []).length;
  const filtered = filter != null;

  return (
    <section className="am-card am-table" aria-label="Creators">
      <div className="am-card-head">
        <div className="am-head-l">
          <span className="am-symtile"><img src={AIC.group} alt="" /></span>
          <div>
            <p className="am-card-title">Creators</p>
            <p className="am-card-sub">
              {filtered ? `${rows.length} of ${cohort} on this campaign` : `${cohort} on this campaign`}
            </p>
          </div>
        </div>
        {filtered && (
          <button type="button" className="am-showall" onClick={() => onFilter(null)}>
            Show all <span aria-hidden>✕</span>
          </button>
        )}
      </div>

      <div className="am-cols" aria-hidden>
        <span>CREATOR</span><span>LATEST UPDATE</span><span>STAGE</span><span />
      </div>

      {rows.length === 0 ? (
        <div className="am-empty">
          <p className="am-empty-title">Nobody is in {AM_FILTER_LABEL(filter) ?? 'this filter'} right now</p>
          <p className="am-empty-sub">The stage is empty at the moment. Clear the filter to see the rest of the cohort.</p>
          <button type="button" className="am-showall am-empty-btn" onClick={() => onFilter(null)}>
            Show all creators
          </button>
        </div>
      ) : (
        rows.map((c, i) => {
          const rowKey = `${scene.day}-${c.name}-${i}`;
          const open = openCrew.has(rowKey);
          const timeline = c.mystery ? CASTING_TIMELINE : TIMELINES[c.name] || [];
          const reached = c.mystery ? -1 : stageOf(c, scene.day);
          const foundRow = c.mystery && c.found;
          const flaggedRow = (!c.mystery && !!c.action) || foundRow;
          return (
            <div key={rowKey} className="am-item">
              <button type="button" className="am-row" onClick={foundRow ? undefined : () => toggleCrew(rowKey)} aria-expanded={foundRow ? undefined : open}>
                <span className="am-who">
                  {foundRow ? (
                    <span className="am-avatar am-avatar--blur"><img src={PHOTOS.Amara} alt="" /></span>
                  ) : !c.mystery && PHOTOS[c.name] ? (
                    <span className="am-avatar"><img src={PHOTOS[c.name]} alt="" /></span>
                  ) : (
                    <span className="am-avatar am-avatar--mystery">?</span>
                  )}
                  <span className="am-names">
                    <span className="am-name">
                      {foundRow ? c.name : c.mystery ? 'Sourcing…' : c.name}
                      {!c.mystery && <img src={AIC.check} alt="Verified" className="am-verified" />}
                    </span>
                    <span className="am-handle">{foundRow ? 'for Lena’s spot · found this morning' : c.mystery ? 'sourcing now' : c.handle}</span>
                  </span>
                </span>
                <span className={`am-update${flaggedRow ? ' am-update--flag' : ''}`}>
                  {flaggedRow && <span aria-hidden>⚑ </span>}
                  <LiveStatus status={c.status} />
                </span>
                <span className="am-dashes" role="img" aria-label={c.mystery ? 'Sourcing' : `Stage ${reached + 1} of ${AM_STAGES.length}: ${AM_STAGES[reached].label}`}>
                  {AM_STAGES.map((s, si) => (
                    <i key={s.label} style={{ background: si <= reached ? '#7a5cfa' : '#e3e3e3' }} />
                  ))}
                </span>
                <span className="am-chev">
                  {!foundRow && <img src={AIC.chevron} alt="" style={{ rotate: open ? '270deg' : '90deg' }} />}
                </span>
              </button>
              {open && (
                <div className="am-hist">
                  <p className="am-hist-title">Stage history</p>
                  <div className="cp-crew-history am-hist-body">
                    {timeline.map((st, si) => {
                      const state = c.mystery
                        ? (st.live ? 'now' : st.when ? 'done' : 'next')
                        : si < c.stage ? 'done' : si === c.stage ? 'now' : 'next';
                      return (
                        <div key={si} className={`cp-hist-step cp-hist-step--${state}`} style={{ animationDelay: `${0.05 * si}s` }}>
                          <span className="cp-hist-dot">{state === 'done' ? '✓' : ''}</span>
                          <div className="cp-hist-body">
                            <div className="cp-hist-top">
                              <span className="cp-hist-label">{c.mystery ? st.label : STAGE_LABELS[si]}</span>
                              <span className="cp-hist-when">{state === 'done' ? (st.when || 'done') : state === 'now' ? 'right now' : (st.eta || 'up next')}</span>
                            </div>
                            <div className="cp-hist-detail">{st.detail}</div>
                            {state === 'now' && <div className="cp-hist-live"><LiveStatus status={c.status} /></div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <div className="am-foot">
        <button type="button" className="am-more">
          <span className="am-more-plus"><img src={AIC.plus} alt="" /></span>
          Request more
        </button>
      </div>
    </section>
  );
}

/* ---- right rail -------------------------------------------------------- */
function RailCard({ icon, title, subtitle, children, pad }) {
  return (
    <section className="am-card">
      <div className="am-card-head">
        <div className="am-head-l">
          <span className="am-symtile"><img src={icon} alt="" /></span>
          <div>
            <p className="am-card-title">{title}</p>
            {subtitle && <p className="am-card-sub">{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className={pad || 'am-card-body'}>{children}</div>
    </section>
  );
}

function NoteRow({ emoji, strong, rest, last }) {
  return (
    <div className={`am-note${last ? ' am-note--last' : ''}`}>
      <span className="am-note-emoji" aria-hidden>{emoji}</span>
      <p className="am-note-text">
        <strong>{strong}</strong>
        {rest && <span>{rest}</span>}
      </p>
    </div>
  );
}

function Meter({ label, trailing, pct, fill }) {
  return (
    <div className="am-meter">
      <div className="am-meter-top">
        <span className="am-meter-label">{label}</span>
        {trailing && <span className="am-meter-day">{trailing}</span>}
      </div>
      <div className="am-meter-track" role="meter" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <i style={{ width: `calc(${pct}% - 2px)`, background: fill }} />
      </div>
    </div>
  );
}

export function AmineRail({ scene }) {
  const { recap, race } = scene;
  return (
    <aside className="am-rail">
      <RailCard
        icon={AIC.invites}
        title="While you were away"
        subtitle={<>Since, <b className="am-sub-b">{recap.since.replace(/^since /, '')}</b></>}
      >
        {recap.items.map((it, i) => (
          <NoteRow key={it.bold} emoji={it.emoji} strong={it.bold} rest={it.rest} last={i === recap.items.length - 1} />
        ))}
      </RailCard>

      <RailCard icon={AIC.invites} title="Up next">
        {scene.upNext.map((u, i) => (
          <NoteRow key={u.text} emoji={u.emoji} strong={u.text} rest={` — ${u.eta}`} last={i === scene.upNext.length - 1} />
        ))}
      </RailCard>

      <RailCard icon={AIC.insight} title="The pace" subtitle={`Day ${scene.day} out of 30`} pad="am-pace-body">
        <Meter label="Your campaign" trailing={`Day ${scene.day}`} pct={race.you} fill="#815aff" />
        <div style={{ height: 10 }} />
        <Meter label="Industry average" pct={race.them} fill="#c4c4c4" />
        <div className="am-pace-strip">
          <span aria-hidden className="am-pace-img">
            <img src={AIC.paceStrip} alt="" />
            <i />
          </span>
          <p className="am-pace-caption" dangerouslySetInnerHTML={{ __html: race.caption }} />
        </div>
      </RailCard>
    </aside>
  );
}
