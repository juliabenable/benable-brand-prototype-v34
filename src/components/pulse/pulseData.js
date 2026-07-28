/* Campaign Pulse data — all demo content lives here.
   Full A–W variant history is archived in benable-brand-prototype-v27. */

export const STAGE_LABELS = ['Invited', 'Confirmed', 'Product', 'Filming', 'Submitted', 'Live'];

/* campaign completion per demo day */
export const PCT = { 1: '4%', 3: '12%', 4: '16%', 9: '34%', 11: '42%', 16: '58%', 22: '80%', 30: '100%' };
const B = import.meta.env.BASE_URL;
export const PHOTOS = {
  Maya: `${B}creators/maya.jpg`,
  Nia: `${B}creators/nia.jpg`,
  Sofia: `${B}creators/sofia.jpg`,
  Jade: `${B}creators/jade.jpg`,
  Priya: `${B}creators/priya.jpg`,
  Amara: `${B}creators/amara.jpg`,
  Lena: `${B}creators/lena.jpg`,
};

/* status types: shimmer = machine working now · katie = human present ·
   heartbeat = watching (breathe) · celebrate = go-live (emoji bounces) ·
   facts/static = quiet truths */
export const CREW = {
  1: [
    { mystery: true, name: 'Casting…', stage: 0, status: { type: 'shimmer', phrases: ['Scanning creators…', 'Checking aesthetic fit…', 'Reading engagement quality…', 'Matching to your brief…'] } },
    { mystery: true, name: 'Casting…', stage: 0, status: { type: 'shimmer', phrases: ['Scanning skincare creators…', 'Filtering by audience…', 'Shortlisting…'] } },
    { mystery: true, name: 'Casting…', stage: 0, status: { type: 'shimmer', phrases: ['Studying your brief…', 'Browsing look-alikes…', 'Scoring matches…'] } },
  ],
  3: [
    { name: 'Maya', handle: '@maya.skin', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
    { name: 'Nia', handle: '@niaglow', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
    { name: 'Lena', handle: '@lena.lately', stage: 0, status: { type: 'static', phrases: ['Ready for your review ✨'] } },
  ],
  4: [
    { name: 'Maya', handle: '@maya.skin', stage: 0, status: { type: 'facts', phrases: ['Invite sent this morning'] } },
    { name: 'Nia', handle: '@niaglow', stage: 0, status: { type: 'facts', phrases: ['Viewed your invite'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 0, status: { type: 'facts', phrases: ['Invite sent this morning'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 0, status: { type: 'facts', phrases: ['Viewed your invite'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 0, status: { type: 'facts', phrases: ['Invite sent this morning'] } },
    { name: 'Lena', handle: '@lena.lately', stage: 0, status: { type: 'facts', phrases: ['Invite sent this morning'] } },
  ],
  9: [
    { name: 'Maya', handle: '@maya.skin', stage: 2, status: { type: 'facts', phrases: ['📦 Cleared the Memphis hub'] } },
    { name: 'Nia', handle: '@niaglow', stage: 2, status: { type: 'facts', phrases: ['🧴 Picked SPF 50 Tinted'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 1, status: { type: 'static', phrases: ['✅ Confirmed — shipping next'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 2, status: { type: 'facts', phrases: ['📬 Delivered yesterday'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 1, status: { type: 'facts', phrases: ['💭 Sketching content ideas'] } },
    { mystery: true, name: 'Casting…', stage: 0, status: { type: 'shimmer', phrases: ['Sourcing her replacement…', 'Vetting stand-ins…', 'Checking availability…'] } },
  ],
  11: [
    { name: 'Maya', handle: '@maya.skin', stage: 3, status: { type: 'facts', phrases: ['📬 Delivered — unboxing soon'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 3, status: { type: 'facts', phrases: ['📬 Delivered yesterday'] } },
    { name: 'Nia', handle: '@niaglow', stage: 2, status: { type: 'facts', phrases: ['🚚 Out for delivery'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 2, status: { type: 'facts', phrases: ['📦 In transit — arriving tomorrow'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 2, status: { type: 'facts', phrases: ['🚚 Out for delivery'] } },
    { mystery: true, found: true, name: 'New matches found', stage: 0, status: { type: 'static', phrases: ['Review new matches'] } },
  ],
  16: [
    { name: 'Jade', handle: '@jadebythesea', stage: 4, action: { cta: 'Review reel' }, status: { type: 'static', phrases: ['Her reel passed every check — waiting on your approval since 9:40 am'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 4, status: { type: 'shimmer', phrases: ['Verifying your required link…', 'Checking the disclosure tag…', 'Running brand-safety checks…'] } },
    { name: 'Maya', handle: '@maya.skin', stage: 3, status: { type: 'facts', phrases: ['🎥 Filming Saturday — confirmed Tuesday'] } },
    { name: 'Nia', handle: '@niaglow', stage: 3, status: { type: 'facts', phrases: ['🤳 Posted a BTS teaser to stories'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 3, status: { type: 'facts', phrases: ['💭 Storyboarding her before/after'] } },
    { name: 'Amara', handle: '@amara.gold', stage: 3, status: { type: 'facts', phrases: ['🎬 First shoot this week'] } },
  ],
  22: [
    { name: 'Nia', handle: '@niaglow', stage: 5, status: { type: 'celebrate', emoji: '🎉', phrases: ['Live — 3× more first-hour views than her typical videos'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 5, status: { type: 'celebrate', emoji: '💬', phrases: ['Live on TikTok — already getting comments'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 5, status: { type: 'celebrate', emoji: '✨', phrases: ['Live — engagement is starting · 214 link taps'] } },
    { name: 'Maya', handle: '@maya.skin', stage: 4, status: { type: 'facts', phrases: ['⏰ Posting Thursday'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 4, status: { type: 'katie', phrases: ['Katie’s team is scheduling her post'] } },
    { name: 'Amara', handle: '@amara.gold', stage: 3, status: { type: 'facts', phrases: ['🎬 Final edits — due Sunday'] } },
  ],
  30: [
    { name: 'Nia', handle: '@niaglow', stage: 5, status: { type: 'static', phrases: ['🏆 18.9k views — your top post · thank-you sent 💌'] } },
    { name: 'Jade', handle: '@jadebythesea', stage: 5, status: { type: 'static', phrases: ['💜 Fan favorite — 6.1% engagement · thank-you sent 💌'] } },
    { name: 'Sofia', handle: '@sofia.films', stage: 5, status: { type: 'static', phrases: ['✅ 2 posts live · thank-you sent 💌'] } },
    { name: 'Maya', handle: '@maya.skin', stage: 5, status: { type: 'static', phrases: ['✅ Posted + link shared · thank-you sent 💌'] } },
    { name: 'Priya', handle: '@priyacreates', stage: 5, status: { type: 'static', phrases: ['✅ Posted + link shared · thank-you sent 💌'] } },
    { name: 'Amara', handle: '@amara.gold', stage: 5, status: { type: 'static', phrases: ['✅ Posted — strong debut · thank-you sent 💌'] } },
  ],
};

export const TIMELINES = {
  Maya: [
    { when: 'Jul 16', detail: 'Matched to your brief — 94% aesthetic fit' },
    { when: 'Jul 17', detail: 'Accepted in under 5 hours' },
    { when: 'Jul 21', detail: 'Picked SPF 50 Tinted · UPS label created' },
    { eta: 'Saturday', detail: 'Shoot confirmed — golden hour planned' },
    { eta: 'early next week', detail: 'Draft + link & disclosure pre-checks' },
    { eta: 'next week', detail: 'Post goes live · we watch views hourly' },
  ],
  Nia: [
    { when: 'Jul 16', detail: 'Matched — her audience loves sun care' },
    { when: 'Jul 16', detail: 'Accepted same day 🎉' },
    { when: 'Jul 19', detail: '“I’ve wanted to try this one forever”' },
    { when: 'Jul 26', detail: 'Filmed at the beach — two takes' },
    { when: 'Jul 29', detail: 'Passed link + disclosure checks' },
    { when: 'Aug 5', detail: 'Reel live — her best post this month' },
  ],
  Sofia: [
    { when: 'Jul 16', detail: 'Matched via your “clean girl” aesthetic' },
    { when: 'Jul 18', detail: 'Accepted after a schedule check' },
    { when: 'Jul 24', detail: 'Product delivered to Austin' },
    { when: 'Jul 27', detail: 'Storyboarded her before/after' },
    { when: 'Jul 30', detail: 'Draft approved first pass ✓' },
    { when: 'Aug 6', detail: 'TikTok live — tags verified' },
  ],
  Jade: [
    { when: 'Jul 16', detail: 'Hand-picked by Katie’s team — “the light in her work”' },
    { when: 'Jul 17', detail: 'Accepted + shared her moodboard' },
    { when: 'Jul 23', detail: 'Delivered — she unboxed on stories' },
    { when: 'Jul 25', detail: 'Golden-hour beach shoot' },
    { when: 'Jul 28', detail: '34s reel submitted — checks passed' },
    { eta: 'after your approval', detail: 'Goes live + link in bio' },
  ],
  Priya: [
    { when: 'Jul 16', detail: 'Matched — strong before/after format' },
    { when: 'Jul 17', detail: 'Accepted, confirmed her angle with Katie’s team' },
    { when: 'Jul 24', detail: 'Product delivered' },
    { when: 'Jul 27', detail: 'Shot her story set' },
    { when: 'Jul 29', detail: 'Submitted — running pre-checks' },
    { eta: 'this week', detail: 'Stories go live' },
  ],
  Amara: [
    { when: 'Jul 25', detail: 'Cast as Lena’s replacement — 96% fit' },
    { when: 'Jul 25', detail: 'Accepted in 4 hours' },
    { when: 'Jul 26', detail: 'Express-shipped her product' },
    { eta: 'this week', detail: 'First shoot scheduled' },
    { eta: 'Sunday', detail: 'Draft due' },
    { eta: 'next week', detail: 'Post + link tracking' },
  ],
  Lena: [
    { when: 'Jul 16', detail: 'Matched to your brief' },
    { eta: 'on your approval', detail: 'Invite goes out' },
    { eta: '—', detail: 'Product pick + shipping' },
    { eta: '—', detail: 'Filming window' },
    { eta: '—', detail: 'Draft + pre-checks' },
    { eta: '—', detail: 'Post + link tracking' },
  ],
};

export const CASTING_TIMELINE = [
  { label: 'Brief studied', when: 'this morning', detail: 'Palette, tone and audience mapped' },
  { label: 'Scanning', live: true, detail: 'Working through the creator graph' },
  { label: 'Shortlisting', eta: 'next', detail: 'Top matches go to Katie’s team for a human pass' },
  { label: 'Your review', eta: '~2 days', detail: 'Cards land in your queue' },
];

export const DAYS = [
  {
    day: 1,
    phase: 'sourcing',
    scrubLabel: 'Day 1 · Launch',
    race: { you: 8, them: 2, caption: 'Day 1 — most brands are still writing the brief. Yours is already in the field.' },
    upNext: [
      { emoji: '✨', text: 'Your creator shortlist lands for review', eta: 'in ~2 days' },
      { emoji: '💌', text: 'Invites go out the moment you approve', eta: 'right after your review' },
    ],
    recap: {
      since: 'since this morning',
      items: [
        { emoji: '✅', bold: '214 profiles scanned', rest: ' against your brief' },
        { emoji: '✨', bold: '12 creators shortlisted', rest: ' — Katie’s team hand-picked them' },
        { emoji: '💌', bold: 'Availability checks out', rest: ' to our top picks' },
      ],
      closer: { clear: true, text: 'Nothing needs you until your shortlist lands — about 2 days' },
    },
  },
  {
    day: 3,
    phase: 'review',
    scrubLabel: 'Day 3 · Creators ready',
    race: { you: 18, them: 5, caption: 'Day 3 and your shortlist is ready. <strong>Industry average: day 12.</strong>' },
    upNext: [
      { emoji: '💌', text: 'Invites out within hours of your approvals', eta: 'same day' },
      { emoji: '📦', text: 'Product picks + shipping as creators accept', eta: 'this week' },
    ],
    recap: {
      since: 'since Monday',
      items: [
        { emoji: '✨', bold: '6 creators shortlisted', rest: ' — your lineup is ready' },
        { emoji: '🔬', bold: 'Engagement checks passed', rest: ' on all 6 (4.2%+)' },
        { emoji: '🧪', bold: 'Products matched', rest: ' to each creator' },
      ],
      closer: { text: '6 creators are waiting on you', cta: 'Review creators' },
    },
  },
  {
    day: 4,
    scrubLabel: 'Day 4 · Invites out',
    race: { you: 16, them: 6, caption: 'Invites out on day 4 — <strong>most brands are still shortlisting.</strong>' },
    upNext: [
      { emoji: '💌', text: 'First acceptances land', eta: 'usually within 48h' },
      { emoji: '📦', text: 'Product picks + shipping', eta: 'right after each yes' },
    ],
    recap: {
      since: 'since yesterday',
      items: [
        { emoji: '✉️', bold: '6 invites sent', rest: ' — the moment you approved your picks' },
        { emoji: '🧴', bold: 'Products reserved for each creator', rest: ' — orders ship the moment they accept' },
        { emoji: '👀', bold: '2 have already viewed their invite', rest: ' — a good early sign' },
      ],
      closer: { clear: true, text: 'Nothing needs you — acceptances usually land within 48h' },
    },
  },
  {
    day: 9,
    scrubLabel: 'Day 9 · Cooking',
    race: { you: 34, them: 12, caption: 'Day 9 — a typical agency would <strong>still be negotiating contracts</strong>. Your products are already in the mail.' },
    upNext: [
      { emoji: '📦', text: 'All packages delivered', eta: 'on track for Thursday' },
      { emoji: '🔁', text: 'Replacement picks for Lena', eta: 'within 48h — we’ll ping you' },
      { emoji: '🎬', text: 'First creators start filming', eta: 'this weekend' },
    ],
    recap: {
      since: 'since Friday',
      items: [
        { emoji: '✉️', bold: '6 invites sent', rest: ' — the moment you approved your picks' },
        { emoji: '✅', bold: '4 of 6 accepted their invite', rest: '' },
        { emoji: '👋', bold: '2 reminders to accept sent', rest: ' — nothing needed your input' },
        { emoji: '🔁', bold: '1 creator declined', rest: ' — we’re already sourcing replacements' },
      ],
      closer: { clear: true, text: 'Nothing needs you until Thursday — all packages land' },
    },
  },
  {
    day: 11,
    scrubLabel: 'Day 11 · Rematch found',
    race: { you: 42, them: 16, caption: 'Day 11 — replacement found in 48 hours. <strong>Most agencies take two weeks.</strong>' },
    upNext: [
      { emoji: '✨', text: 'Pick who you want to add to this campaign', eta: 'waiting on you' },
      { emoji: '📦', text: 'Last packages deliver', eta: 'by tomorrow' },
      { emoji: '🎬', text: 'First creators start filming', eta: 'this weekend' },
    ],
    recap: {
      since: 'since Thursday',
      items: [
        { emoji: '🔁', bold: 'Replacement matches found', rest: ' — profiles ready for your review' },
        { emoji: '📬', bold: '2 packages delivered', rest: ' — 3 more on the truck' },
        { emoji: '⏰', bold: 'Deadline reminders sent', rest: ' to keep everyone on pace' },
      ],
      closer: { text: 'New matches are waiting', cta: 'Review matches' },
    },
  },
  {
    day: 16,
    scrubLabel: 'Day 16 · First content',
    race: { you: 58, them: 24, caption: 'First content on day 16. <strong>Industry average: day 41.</strong>' },
    upNext: [
      { emoji: '📣', text: 'First posts go live', eta: 'after quality checks!' },
      { emoji: '🎥', text: '3 more creators film this week', eta: 'submissions by Sunday' },
    ],
    recap: {
      since: 'since Sunday',
      items: [
        { emoji: '📬', bold: 'All products delivered', rest: ' — the creators are creating!' },
        { emoji: '🎬', bold: '2 videos submitted for review', rest: ' — Katie’s team is reviewing them for quality' },
      ],
      closer: { text: '2 new videos are ready for a look', cta: 'Watch the first cuts' },
    },
  },
  {
    day: 22,
    scrubLabel: 'Day 22 · Going live',
    race: { you: 80, them: 31, caption: 'Day 22 — you’re moving about <strong>2.6× faster</strong> than a typical campaign.' },
    upNext: [
      { emoji: '⏰', text: 'Last creators go live', eta: 'this week' },
      { emoji: '🏁', text: 'Campaign wrap', eta: 'we’ll send you your campaign recap' },
    ],
    recap: {
      since: 'since Monday',
      items: [
        { emoji: '📣', bold: '3 posts went live', rest: ' on IG & TikTok' },
        { emoji: '👀', bold: '18.2k views', rest: ' and climbing' },
        { emoji: '🔗', bold: 'Links shared by all 3', rest: ' — bio + pinned comments' },
        { emoji: '💬', bold: 'People are loving it', rest: ' — “best SPF I’ve tried, hands down” · @niaglow' },
      ],
      closer: { text: 'Nia’s reel is taking off', cta: 'Open the post' },
    },
  },
  {
    day: 30,
    scrubLabel: 'Day 30 · Wrap',
    race: { you: 100, them: 45, caption: 'Wrapped in 30 days. <strong>Industry average: 67 days.</strong>' },
    upNext: [
      { emoji: '🚀', text: 'Campaign #2 — same crew or fresh faces', eta: 'whenever you’re ready' },
    ],
    recap: {
      since: 'since last week',
      items: [
        { emoji: '🏆', bold: 'Top post: 18.9k views', rest: ' — Nia’s reel' },
        { emoji: '🔗', bold: '1,142 link taps', rest: ' across all posts' },
        { emoji: '💌', bold: 'Thank-yous sent', rest: ' to all 6 creators' },
      ],
      closer: { text: 'Your wrap-up is ready', cta: 'See the wrap-up' },
    },
  },
];
