import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';

const spacingTokens = [
  ['space-0', '0px', 'Remove spacing or reset a layout value.'],
  ['space-1', '4px', 'Tight gaps between icons and labels or compact controls.'],
  ['space-2', '8px', 'Spacing between closely related elements, such as labels and inputs.'],
  ['space-3', '12px', 'Spacing within compact groups and small component sections.'],
  ['space-4', '16px', 'Default internal spacing for components and related content.'],
  ['space-5', '20px', 'Comfortable component padding and separation between content groups.'],
  ['space-6', '24px', 'Card padding and spacing between distinct content groups.'],
  ['space-8', '32px', 'Spacing between larger component groups or content blocks.'],
  ['space-10', '40px', 'Separation between major content areas.'],
  ['space-12', '48px', 'Spacing between page sections and prominent layout regions.'],
  ['space-16', '64px', 'Large page-level spacing, such as hero and section separation.'],
];

const meta = {
  title: 'Foundations',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The spacing scale provides consistent increments for layout, alignment, and component internal spacing.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function SpacingRow({
  description,
  name,
  size,
}: {
  description: string;
  name: string;
  size: string;
}) {
  const barStyle = {
    height: 'var(--space-4)',
    width: `var(--${name})`,
  } satisfies CSSProperties;

  return (
    <div style={styles.row}>
      <div style={styles.preview}>
        <div style={{ ...styles.bar, ...barStyle }} />
      </div>
      <div style={styles.details}>
        <code style={styles.name}>{`--${name}`}</code>
        <span style={styles.description}>{description}</span>
      </div>
      <span style={styles.size}>{size}</span>
    </div>
  );
}

export const Spacing: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Spacing</h1>
        <p style={styles.intro}>
          Consistent spacing increments for building balanced layouts and interfaces.
        </p>
      </div>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Spacing scale</h2>
        <div style={styles.list}>
          {spacingTokens.map(([name, size, description]) => (
            <SpacingRow
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
  list: {
    display: 'grid',
    gap: 12,
  },
  row: {
    alignItems: 'center',
    border: '1px solid #eadcca',
    borderRadius: 12,
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'minmax(120px, 1fr) minmax(260px, 2fr) 64px',
    minHeight: 64,
    padding: '12px 20px',
  },
  preview: {
    alignItems: 'center',
    backgroundColor: '#f8f4ed',
    display: 'flex',
    minHeight: 32,
  },
  bar: {
    backgroundColor: '#f25f5c',
    borderRadius: 4,
    minWidth: 0,
  },
  name: {
    color: '#6d5047',
    fontSize: 13,
  },
  details: {
    display: 'grid',
    gap: 4,
  },
  description: {
    color: '#6d5047',
    fontSize: 12,
    lineHeight: 1.4,
  },
  size: {
    color: '#0981b7',
    fontSize: 12,
    textAlign: 'right',
  },
};
