import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';

const radiusTokens = [
  ['radius-none', '0px', 'Default for most UI, including buttons, inputs, controls, and structural surfaces.'],
  ['radius-sm', '2px', 'Subtle rounding for softer elements such as overlays, popovers, and supportive surfaces.'],
  ['radius-md', '4px', 'Reserved for larger, softer surfaces where a more noticeable edge treatment is appropriate.'],
];

const meta = {
  title: 'Foundations',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The radius scale defines consistent corner rounding across components and surfaces.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function RadiusCard({
  description,
  name,
  size,
}: {
  description: string;
  name: string;
  size: string;
}) {
  const previewStyle = {
    borderRadius: `var(--${name})`,
  } satisfies CSSProperties;

  return (
    <article style={styles.card}>
      <div style={styles.preview}>
        <div style={{ ...styles.shape, ...previewStyle }} />
      </div>
      <div style={styles.details}>
        <code style={styles.name}>{`--${name}`}</code>
        <span style={styles.size}>{size}</span>
        <p style={styles.description}>{description}</p>
      </div>
    </article>
  );
}

export const Radius: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Radius</h1>
        <p style={styles.intro}>
          Consistent corner rounding for components, controls, and surfaces.
        </p>
      </div>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Radius scale</h2>
        <div style={styles.grid}>
          {radiusTokens.map(([name, size, description]) => (
            <RadiusCard
              description={description}
              key={name}
              name={name}
              size={size}
            />
          ))}
        </div>
      </section>
    </main>
  ),
};

const styles: Record<string, CSSProperties> = {
  page: {
    boxSizing: 'border-box',
    color: '#2a1411',
    fontFamily: 'var(--font-family-sans)',
    maxWidth: 1080,
    padding: '48px 32px 64px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    borderBottom: '1px solid #d4b48f',
    marginBottom: 48,
    paddingBottom: 32,
  },
  eyebrow: {
    color: '#0981b7',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.12em',
    margin: '0 0 12px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 36,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: 0,
  },
  intro: {
    color: '#6d5047',
    fontSize: 16,
    lineHeight: 1.5,
    margin: '16px 0 0',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: '-0.01em',
    margin: '0 0 20px',
  },
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
  card: {
    border: '1px solid #eadcca',
    borderRadius: 12,
    overflow: 'hidden',
  },
  preview: {
    alignItems: 'center',
    backgroundColor: '#f8f4ed',
    display: 'flex',
    height: 128,
    justifyContent: 'center',
  },
  shape: {
    backgroundColor: '#f25f5c',
    height: 80,
    width: 160,
  },
  details: {
    padding: 16,
  },
  name: {
    color: '#6d5047',
    fontSize: 13,
  },
  size: {
    color: '#0981b7',
    display: 'block',
    fontSize: 12,
    marginTop: 6,
  },
  description: {
    color: '#6d5047',
    fontSize: 13,
    lineHeight: 1.45,
    margin: '12px 0 0',
  },
};
