import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const alphaSteps = [5, 10, 20, 30, 40, 60, 80];

const meta = {
  title: 'Foundations/Alpha colors',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Compact black and white alpha primitives for layering color over surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function AlphaSwatch({ color, step }: { color: 'black' | 'white'; step: number }) {
  const swatchStyle = {
    backgroundColor: `var(--${color}-alpha-${step})`,
  } satisfies CSSProperties;

  return (
    <div style={{ ...styles.swatchCard, ...styles[color] }}>
      <div style={{ ...styles.swatch, ...swatchStyle }} />
      <code>{`--${color}-alpha-${step}`}</code>
      <span style={styles.opacity}>{step}%</span>
    </div>
  );
}

function AlphaGroup({ color }: { color: 'black' | 'white' }) {
  return (
    <section style={styles.group}>
      <h2 style={styles.sectionTitle}>{color === 'black' ? 'Black alpha' : 'White alpha'}</h2>
      <div style={styles.grid}>
        {alphaSteps.map((step) => (
          <AlphaSwatch color={color} key={step} step={step} />
        ))}
      </div>
    </section>
  );
}

export const AlphaColors: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Alpha colors</h1>
        <p style={styles.intro}>Primitive color and opacity values for semantic effects.</p>
      </div>
      <AlphaGroup color="black" />
      <AlphaGroup color="white" />
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
    fontSize: 12,
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
  group: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 'var(--heading-m)',
    margin: '0 0 20px',
  },
  grid: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  },
  swatchCard: {
    alignItems: 'center',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    display: 'grid',
    gap: 8,
    padding: 12,
  },
  swatch: {
    borderRadius: 'var(--radius-sm)',
    height: 72,
  },
  black: {
    backgroundColor: 'var(--neutral-0)',
  },
  white: {
    backgroundColor: 'var(--neutral-600)',
  },
  opacity: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-s)',
  },
};
