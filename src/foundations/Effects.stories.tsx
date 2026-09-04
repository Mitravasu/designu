import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const overlaySamples = [
  ['Hover', '5% white', 'var(--color-overlay-hover)'],
  ['Active', '10% white', 'var(--color-overlay-active)'],
  ['Selected', '10% white', 'var(--color-overlay-selected)'],
  ['Backdrop', '60% black', 'var(--color-overlay-backdrop)'],
];

const highlightSamples = [
  ['Subtle', 'var(--color-highlight-subtle)'],
  ['Default', 'var(--color-highlight-default)'],
];

const shadowSamples = [
  ['Subtle', 'shadow-sm'],
  ['Default', 'shadow-md'],
  ['Strong', 'shadow-lg'],
];

const meta = {
  title: 'Foundations/Effects',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Semantic overlays, highlights, and shadow elevation roles for interface surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function OverlayDemo({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="overlay-demo" style={styles.overlayDemo}>
      <div className="overlay-layer" style={{ ...styles.overlayLayer, backgroundColor: color }}>
        <span>{label}</span>
        <small>{value}</small>
      </div>
    </div>
  );
}

function ShadowDemo({ label, token }: { label: string; token: string }) {
  return (
    <div className="shadow-sample" style={{ ...styles.shadowSample, boxShadow: `var(--${token})` }}>
      <span>{label}</span>
      <small>{token}</small>
    </div>
  );
}

export const Effects: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Effects</h1>
        <p style={styles.intro}>Semantic effects for surfaces, states, and elevation.</p>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Overlays</h2>
        <div style={styles.grid}>
          {overlaySamples.map(([label, value, color]) => (
            <OverlayDemo color={color} key={label} label={label} value={value} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Highlights</h2>
        <div style={styles.grid}>
          {highlightSamples.map(([label, color]) => (
            <OverlayDemo color={color} key={label} label={label} value={label.toLowerCase()} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Shadows</h2>
        <div style={styles.grid}>
          {shadowSamples.map(([label, token]) => (
            <ShadowDemo key={token} label={label} token={token} />
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
    maxWidth: 1080,
    minHeight: '100vh',
    padding: '48px 32px 64px',
    margin: '0 auto',
  },
  header: {
    borderBottom: '1px solid var(--border-default)',
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
    lineHeight: 1.1,
    margin: 0,
  },
  intro: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-l)',
    lineHeight: 1.5,
    margin: '16px 0 0',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 'var(--heading-m)',
    margin: '0 0 20px',
  },
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  },
  overlayDemo: {
    backgroundColor: 'var(--neutral-500)',
    minHeight: 112,
  },
  overlayLayer: {
    alignItems: 'center',
    color: 'var(--neutral-0)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    minHeight: 112,
  },
  shadowSample: {
    alignItems: 'center',
    backgroundColor: 'var(--neutral-0)',
    borderRadius: 'var(--radius-none)',
    color: 'var(--neutral-950)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    minHeight: 112,
  },
};
