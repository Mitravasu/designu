import { useState, type CSSProperties, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';

type DurationSample = {
  description: string;
  label: string;
  token: string;
  value: string;
};

type EasingSample = {
  animation: string;
  description: string;
  label: string;
  token: string;
  value: string;
};

const durations: DurationSample[] = [
  {
    label: 'Fast',
    token: 'motion-fast',
    value: '100ms',
    description: 'Hover, focus, and color feedback.',
  },
  {
    label: 'Default',
    token: 'motion-default',
    value: '200ms',
    description: 'Dropdowns, tooltips, and small transitions.',
  },
  {
    label: 'Slow',
    token: 'motion-slow',
    value: '300ms',
    description: 'Modals, panels, and larger movement.',
  },
];

const easings: EasingSample[] = [
  {
    label: 'Standard',
    token: 'ease-standard',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    description: 'Use for most state changes and transitions.',
    animation: 'motion-foundation-standard',
  },
  {
    label: 'Ease out',
    token: 'ease-out',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Use when an element enters the interface.',
    animation: 'motion-foundation-enter',
  },
  {
    label: 'Ease in',
    token: 'ease-in',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    description: 'Use when an element leaves the interface.',
    animation: 'motion-foundation-leave',
  },
];

const meta = {
  title: 'Foundations/Motion',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A focused motion foundation comprising three durations, three easing curves, and a reduced-motion fallback.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ReplayButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={styles.replayButton} type="button">
      <svg
        aria-hidden="true"
        fill="none"
        height="16"
        viewBox="0 0 24 24"
        width="16"
      >
        <path
          d="M5 8V4m0 0h4M5 4l3 3a7 7 0 1 1-2 7"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
        />
      </svg>
      {children}
    </button>
  );
}

function TokenDetails({
  description,
  label,
  token,
  value,
}: {
  description: string;
  label: string;
  token: string;
  value: string;
}) {
  return (
    <div style={styles.details}>
      <div style={styles.detailHeading}>
        <strong style={styles.sampleTitle}>{label}</strong>
        <span style={styles.value}>{value}</span>
      </div>
      <code style={styles.token}>{`--${token}`}</code>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

function DurationCard({
  run,
  sample,
}: {
  run: number;
  sample: DurationSample;
}) {
  return (
    <article style={styles.card}>
      <div style={styles.motionPreview}>
        <div style={styles.track}>
          <div
            key={run}
            style={{
              ...styles.dot,
              animation: `motion-foundation-travel var(--${sample.token}) var(--ease-standard) both`,
            }}
          />
        </div>
      </div>
      <TokenDetails {...sample} />
    </article>
  );
}

function EasingCard({ run, sample }: { run: number; sample: EasingSample }) {
  const isStandard = sample.token === 'ease-standard';

  return (
    <article style={styles.card}>
      <div style={styles.motionPreview}>
        <div style={styles.easingStage}>
          <div
            key={run}
            style={{
              ...(isStandard ? styles.standardDot : styles.miniPanel),
              animation: `${sample.animation} var(--motion-slow) var(--${sample.token}) both`,
            }}
          >
            {isStandard
              ? null
              : sample.token === 'ease-out'
                ? 'Enter'
                : 'Leave'}
          </div>
        </div>
      </div>
      <TokenDetails {...sample} />
    </article>
  );
}

function GuidanceCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <article style={styles.guidanceCard}>
      <h3 style={styles.guidanceTitle}>{title}</h3>
      <p style={styles.guidanceText}>{children}</p>
    </article>
  );
}

function MotionFoundation() {
  const [durationRun, setDurationRun] = useState(0);
  const [easingRun, setEasingRun] = useState(0);

  return (
    <main style={styles.page}>
      <style>{`
        @keyframes motion-foundation-travel {
          from { transform: translateX(0); }
          to { transform: translateX(200px); }
        }

        @keyframes motion-foundation-standard {
          from { transform: translateX(0); }
          to { transform: translateX(176px); }
        }

        @keyframes motion-foundation-enter {
          from { opacity: 0; transform: translateX(104px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes motion-foundation-leave {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(104px); }
        }
      `}</style>

      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Motion</h1>
        <p style={styles.intro}>
          A small, predictable motion vocabulary for communicating state
          changes, entrances, and exits.
        </p>
      </div>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Duration</h2>
            <p style={styles.sectionDescription}>
              Replay the examples together to compare how long each transition
              takes.
            </p>
          </div>
          <ReplayButton onClick={() => setDurationRun((run) => run + 1)}>
            Replay durations
          </ReplayButton>
        </div>
        <div style={styles.grid}>
          {durations.map((sample) => (
            <DurationCard
              key={sample.token}
              run={durationRun}
              sample={sample}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Easing</h2>
            <p style={styles.sectionDescription}>
              Each curve uses the slow duration so its acceleration is easier to
              observe.
            </p>
          </div>
          <ReplayButton onClick={() => setEasingRun((run) => run + 1)}>
            Replay easings
          </ReplayButton>
        </div>
        <div style={styles.grid}>
          {easings.map((sample) => (
            <EasingCard key={sample.token} run={easingRun} sample={sample} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Usage principles</h2>
            <p style={styles.sectionDescription}>
              Keep motion purposeful and let the operating system preference
              take priority.
            </p>
          </div>
        </div>
        <div style={styles.guidanceGrid}>
          <GuidanceCard title="Pair by purpose">
            Use standard for most transitions, ease out for entrances, and ease
            in for exits.
          </GuidanceCard>
          <GuidanceCard title="Animate sparingly">
            Prefer opacity and transform; avoid motion that does not communicate
            a change.
          </GuidanceCard>
          <GuidanceCard title="Reduce when requested">
            Animations and transitions resolve almost instantly when reduced
            motion is enabled.
          </GuidanceCard>
        </div>
      </section>
    </main>
  );
}

export const Motion: Story = {
  render: () => <MotionFoundation />,
};

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: 'var(--neutral-0)',
    boxSizing: 'border-box',
    color: 'var(--neutral-950)',
    fontFamily: 'var(--font-family-sans)',
    margin: '0 auto',
    maxWidth: 1080,
    minHeight: '100vh',
    padding: '48px 32px 64px',
  },
  header: {
    borderBottom: '1px solid var(--neutral-200)',
    marginBottom: 48,
    paddingBottom: 32,
  },
  eyebrow: {
    color: 'var(--info-600)',
    fontSize: 'var(--label-s)',
    fontWeight: 500,
    letterSpacing: '0.12em',
    margin: '0 0 12px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'var(--heading-xl)',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: 0,
  },
  intro: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-l)',
    lineHeight: 1.5,
    margin: '16px 0 0',
    maxWidth: 680,
  },
  section: { marginBottom: 56 },
  sectionHeader: {
    alignItems: 'end',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px 24px',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 'var(--heading-m)',
    letterSpacing: '-0.01em',
    margin: 0,
  },
  sectionDescription: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-m)',
    lineHeight: 1.5,
    margin: '8px 0 0',
  },
  replayButton: {
    alignItems: 'center',
    backgroundColor: 'var(--neutral-600)',
    border: 0,
    color: 'var(--neutral-0)',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: 'inherit',
    fontSize: 'var(--body-s)',
    fontWeight: 500,
    gap: 8,
    height: 'var(--size-control-sm)',
    padding: '0 12px',
    transition: 'background-color var(--motion-fast) var(--ease-standard)',
  },
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
  },
  card: { border: '1px solid var(--neutral-200)', overflow: 'hidden' },
  motionPreview: {
    alignItems: 'center',
    backgroundColor:
      'color-mix(in srgb, var(--neutral-100) 40%, var(--neutral-0))',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 132,
    overflow: 'hidden',
    padding: 20,
  },
  track: {
    backgroundColor: 'var(--neutral-200)',
    height: 2,
    position: 'relative',
    width: 220,
  },
  dot: {
    backgroundColor: 'var(--primary-600)',
    height: 20,
    left: 0,
    position: 'absolute',
    top: -9,
    width: 20,
  },
  standardDot: {
    backgroundColor: 'var(--primary-600)',
    height: 20,
    left: 12,
    position: 'absolute',
    top: 26,
    width: 20,
  },
  easingStage: {
    alignItems: 'center',
    backgroundColor: 'var(--neutral-600)',
    boxSizing: 'border-box',
    display: 'flex',
    height: 72,
    overflow: 'hidden',
    padding: '0 12px',
    position: 'relative',
    width: 220,
  },
  miniPanel: {
    alignItems: 'center',
    backgroundColor: 'var(--primary-600)',
    color: 'var(--neutral-0)',
    display: 'flex',
    fontSize: 'var(--body-s)',
    fontWeight: 500,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    width: 88,
  },
  details: { display: 'grid', gap: 6, padding: 16 },
  detailHeading: {
    alignItems: 'baseline',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px 10px',
  },
  sampleTitle: { fontSize: 'var(--body-m)', fontWeight: 500 },
  value: {
    color: 'var(--info-600)',
    fontSize: 'var(--body-s)',
    fontWeight: 500,
  },
  token: { color: 'var(--neutral-500)', fontSize: 12 },
  description: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-s)',
    lineHeight: 1.45,
    margin: 0,
  },
  guidanceGrid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
  },
  guidanceCard: {
    borderLeft: '3px solid var(--primary-600)',
    backgroundColor:
      'color-mix(in srgb, var(--neutral-100) 32%, var(--neutral-0))',
    padding: 20,
  },
  guidanceTitle: { fontSize: 'var(--body-m)', fontWeight: 500, margin: 0 },
  guidanceText: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-s)',
    lineHeight: 1.5,
    margin: '8px 0 0',
  },
};
