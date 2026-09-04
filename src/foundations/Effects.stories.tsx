import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';

type EffectSample = {
  description: string;
  label: string;
  token: string;
  value: string;
};

const interactionSamples: EffectSample[] = [
  {
    label: 'Hover',
    token: 'color-overlay-hover',
    value: '5% white',
    description:
      'A quiet indication that a dark interactive surface is available.',
  },
  {
    label: 'Active',
    token: 'color-overlay-active',
    value: '10% white',
    description: 'Stronger feedback while a dark control is being pressed.',
  },
  {
    label: 'Selected',
    token: 'color-overlay-selected',
    value: '10% white',
    description: 'A persistent state for the current item or destination.',
  },
  {
    label: 'Disabled',
    token: 'color-overlay-disabled',
    value: '20% black',
    description: 'Reduces the prominence of content that is unavailable.',
  },
];

const highlightSamples: EffectSample[] = [
  {
    label: 'Subtle',
    token: 'color-highlight-subtle',
    value: '5% white',
    description:
      'A restrained lift for low-emphasis regions on a dark surface.',
  },
  {
    label: 'Default',
    token: 'color-highlight-default',
    value: '10% white',
    description: 'A clearer lift for emphasized regions on a dark surface.',
  },
];

const shadowSamples = [
  [
    'Low elevation',
    'shadow-sm',
    'Menus and controls resting just above the page.',
  ],
  ['Medium elevation', 'shadow-md', 'Popovers and floating panels.'],
  ['High elevation', 'shadow-lg', 'Dialogs and surfaces above an overlay.'],
];

const meta = {
  title: 'Foundations/Effects',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Semantic overlays, highlights, and shadow elevation roles shown against surfaces where their alpha values remain visible.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function EffectDetails({ description, label, token, value }: EffectSample) {
  return (
    <div style={styles.details}>
      <div style={styles.tokenLine}>
        <strong style={styles.sampleTitle}>{label}</strong>
        <span style={styles.value}>{value}</span>
      </div>
      <code style={styles.token}>{`--${token}`}</code>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

function Comparison({
  base = (
    <div style={styles.darkSurface}>
      <span style={styles.navIcon}>◆</span>
      <span>Overview</span>
    </div>
  ),
  children,
}: {
  base?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div style={styles.comparison}>
      <div style={styles.comparisonColumn}>
        <span style={styles.previewLabel}>Base</span>
        {base}
      </div>
      <div style={styles.comparisonColumn}>
        <span style={styles.previewLabel}>Effect applied</span>
        {children}
      </div>
    </div>
  );
}

function InteractionDemo({ sample }: { sample: EffectSample }) {
  return (
    <article style={styles.card}>
      <Comparison>
        <div style={styles.darkSurface}>
          <div
            aria-hidden="true"
            style={{
              ...styles.effectLayer,
              backgroundColor: `var(--${sample.token})`,
            }}
          />
          <span style={styles.navIcon}>◆</span>
          <span>Overview</span>
        </div>
      </Comparison>
      <EffectDetails {...sample} />
    </article>
  );
}

function BackdropDemo() {
  return (
    <article style={styles.wideCard}>
      <div style={styles.backdropPreview}>
        <div style={styles.mockPage}>
          <div style={styles.mockSidebar} />
          <div style={styles.mockContent}>
            <span style={styles.mockHeading} />
            <span style={styles.mockLine} />
            <span style={{ ...styles.mockLine, width: '70%' }} />
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            ...styles.backdropLayer,
            backgroundColor: 'var(--color-overlay-backdrop)',
          }}
        />
        <div style={styles.dialog}>
          <strong style={styles.dialogTitle}>Confirm change</strong>
          <span style={styles.dialogLine} />
          <span style={{ ...styles.dialogLine, width: '64%' }} />
        </div>
      </div>
      <EffectDetails
        description="Dims the page behind a dialog or drawer while the elevated surface remains clear."
        label="Backdrop"
        token="color-overlay-backdrop"
        value="60% black"
      />
    </article>
  );
}

function HighlightDemo({ sample }: { sample: EffectSample }) {
  const base = (
    <div style={styles.highlightSurface}>
      <span style={styles.metricLabel}>Conversion</span>
      <strong style={styles.metricValue}>8.4%</strong>
    </div>
  );

  return (
    <article style={styles.card}>
      <Comparison base={base}>
        <div style={styles.highlightSurface}>
          <div
            aria-hidden="true"
            style={{
              ...styles.effectLayer,
              backgroundColor: `var(--${sample.token})`,
            }}
          />
          <span style={styles.metricLabel}>Conversion</span>
          <strong style={styles.metricValue}>8.4%</strong>
        </div>
      </Comparison>
      <EffectDetails {...sample} />
    </article>
  );
}

function ShadowDemo({
  description,
  label,
  token,
}: {
  description: string;
  label: string;
  token: string;
}) {
  return (
    <article style={styles.shadowCard}>
      <div style={styles.shadowPreview}>
        <div style={{ ...styles.shadowSurface, boxShadow: `var(--${token})` }}>
          <span style={styles.shadowBar} />
          <span style={{ ...styles.shadowBar, width: '56%' }} />
        </div>
      </div>
      <div style={styles.details}>
        <strong style={styles.sampleTitle}>{label}</strong>
        <code style={styles.token}>{`--${token}`}</code>
        <p style={styles.description}>{description}</p>
      </div>
    </article>
  );
}

function SectionHeading({
  children,
  description,
}: {
  children: ReactNode;
  description: string;
}) {
  return (
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{children}</h2>
      <p style={styles.sectionDescription}>{description}</p>
    </div>
  );
}

export const Effects: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Effects</h1>
        <p style={styles.intro}>
          Semantic effects shown beside an untreated surface so even small alpha
          changes are easy to compare.
        </p>
      </div>

      <section style={styles.section}>
        <SectionHeading description="White interaction overlays belong on dark controls. Disabled uses black to reduce contrast.">
          Interaction overlays
        </SectionHeading>
        <div style={styles.grid}>
          {interactionSamples.map((sample) => (
            <InteractionDemo key={sample.token} sample={sample} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionHeading description="A backdrop is a page-level effect, so it is demonstrated behind an elevated dialog.">
          Backdrop overlay
        </SectionHeading>
        <BackdropDemo />
      </section>

      <section style={styles.section}>
        <SectionHeading description="Highlights use translucent white to lift regions of a dark surface; they are not intended for white backgrounds.">
          Surface highlights
        </SectionHeading>
        <div style={styles.grid}>
          {highlightSamples.map((sample) => (
            <HighlightDemo key={sample.token} sample={sample} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionHeading description="A lightly tinted canvas makes the change in elevation visible without exaggerating the shadows.">
          Shadows
        </SectionHeading>
        <div style={styles.shadowGrid}>
          {shadowSamples.map(([label, token, description]) => (
            <ShadowDemo
              description={description}
              key={token}
              label={label}
              token={token}
            />
          ))}
        </div>
      </section>
    </main>
  ),
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
  sectionHeader: { marginBottom: 20 },
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
    maxWidth: 720,
  },
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
  },
  card: {
    border: '1px solid var(--neutral-200)',
    display: 'grid',
    overflow: 'hidden',
  },
  wideCard: {
    border: '1px solid var(--neutral-200)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
    overflow: 'hidden',
  },
  comparison: {
    backgroundColor: 'var(--neutral-100)',
    display: 'grid',
    gap: 1,
    gridTemplateColumns: '1fr 1fr',
  },
  comparisonColumn: { backgroundColor: 'var(--neutral-0)' },
  previewLabel: {
    backgroundColor: 'var(--neutral-0)',
    color: 'var(--neutral-500)',
    display: 'block',
    fontSize: 10,
    letterSpacing: '0.08em',
    padding: '8px 12px',
    textTransform: 'uppercase',
  },
  darkSurface: {
    alignItems: 'center',
    backgroundColor: 'var(--neutral-600)',
    color: 'var(--neutral-0)',
    display: 'flex',
    fontSize: 'var(--body-s)',
    gap: 8,
    minHeight: 72,
    overflow: 'hidden',
    padding: '0 16px',
    position: 'relative',
  },
  effectLayer: {
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',
  },
  navIcon: { color: 'var(--primary-300)', fontSize: 10, position: 'relative' },
  details: { display: 'grid', gap: 6, padding: 16 },
  tokenLine: {
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
  backdropPreview: {
    backgroundColor: 'var(--neutral-100)',
    minHeight: 208,
    overflow: 'hidden',
    position: 'relative',
  },
  mockPage: {
    display: 'grid',
    gridTemplateColumns: '72px 1fr',
    inset: 20,
    position: 'absolute',
  },
  mockSidebar: { backgroundColor: 'var(--neutral-500)' },
  mockContent: {
    alignContent: 'start',
    backgroundColor: 'var(--neutral-0)',
    display: 'grid',
    gap: 10,
    padding: 20,
  },
  mockHeading: {
    backgroundColor: 'var(--neutral-500)',
    height: 8,
    width: '42%',
  },
  mockLine: { backgroundColor: 'var(--neutral-100)', height: 6, width: '100%' },
  backdropLayer: { inset: 0, position: 'absolute' },
  dialog: {
    backgroundColor: 'var(--neutral-0)',
    boxShadow: 'var(--shadow-lg)',
    display: 'grid',
    gap: 10,
    left: '50%',
    minWidth: 168,
    padding: 20,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dialogTitle: { fontSize: 'var(--body-m)', fontWeight: 500 },
  dialogLine: {
    backgroundColor: 'var(--neutral-100)',
    display: 'block',
    height: 5,
  },
  highlightSurface: {
    backgroundColor: 'var(--neutral-600)',
    color: 'var(--neutral-0)',
    display: 'grid',
    gap: 6,
    minHeight: 72,
    overflow: 'hidden',
    padding: '12px 16px',
    position: 'relative',
  },
  metricLabel: { fontSize: 10, opacity: 0.75, position: 'relative' },
  metricValue: { fontSize: 18, fontWeight: 500, position: 'relative' },
  shadowGrid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
  },
  shadowCard: { border: '1px solid var(--neutral-200)', overflow: 'hidden' },
  shadowPreview: {
    alignItems: 'center',
    backgroundColor:
      'color-mix(in srgb, var(--neutral-100) 40%, var(--neutral-0))',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 148,
    padding: 24,
  },
  shadowSurface: {
    backgroundColor: 'var(--neutral-0)',
    display: 'grid',
    gap: 8,
    padding: 20,
    width: 120,
  },
  shadowBar: {
    backgroundColor: 'var(--neutral-200)',
    display: 'block',
    height: 6,
    width: '100%',
  },
};
