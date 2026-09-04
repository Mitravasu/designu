import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';
import '@fontsource/zen-kaku-gothic-new/700.css';

type TypeToken = {
  name: string;
  size: string;
  sample: string;
  weight: number;
};

const typeGroups: { title: string; tokens: TypeToken[] }[] = [
  {
    title: 'Headings',
    tokens: [
      { name: 'heading-xl', size: '28–32px', sample: 'Heading XL', weight: 700 },
      { name: 'heading-l', size: '24px', sample: 'Heading L', weight: 700 },
      { name: 'heading-m', size: '20px', sample: 'Heading M', weight: 700 },
      { name: 'heading-s', size: '16px', sample: 'Heading S', weight: 700 },
    ],
  },
  {
    title: 'Body',
    tokens: [
      { name: 'body-l', size: '16px', sample: 'Body L text for primary reading content.', weight: 400 },
      { name: 'body-m', size: '14px', sample: 'Body M text for supporting content.', weight: 400 },
      { name: 'body-s', size: '12px', sample: 'Body S text for compact supporting content.', weight: 400 },
    ],
  },
  {
    title: 'Labels',
    tokens: [
      { name: 'label-m', size: '14px', sample: 'LABEL M', weight: 500 },
      { name: 'label-s', size: '12px', sample: 'LABEL S', weight: 500 },
    ],
  },
];

const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The typography scale uses Zen Kaku Gothic New for headings, body copy, and labels.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function TypeTokenRow({ token }: { token: TypeToken }) {
  const sampleStyle = {
    fontFamily: 'var(--font-family-sans)',
    fontSize: `var(--${token.name})`,
    fontWeight: token.weight,
  } satisfies CSSProperties;

  return (
    <div style={styles.row}>
      <div style={styles.sample}>
        <div style={sampleStyle}>{token.sample}</div>
      </div>
      <div style={styles.details}>
        <code style={styles.name}>{`--${token.name}`}</code>
        <span style={styles.size}>{token.size}</span>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Typography</h1>
        <p style={styles.intro}>
          A practical type scale for clear hierarchy and consistent reading experiences.
        </p>
      </div>
      {typeGroups.map((group) => (
        <section key={group.title} style={styles.section}>
          <h2 style={styles.sectionTitle}>{group.title}</h2>
          <div style={styles.list}>
            {group.tokens.map((token) => (
              <TypeTokenRow key={token.name} token={token} />
            ))}
          </div>
        </section>
      ))}
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
    fontWeight: 700,
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
    display: 'flex',
    gap: 24,
    justifyContent: 'space-between',
    minHeight: 80,
    padding: '16px 20px',
  },
  sample: {
    minWidth: 0,
  },
  details: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    gap: 6,
  },
  name: {
    color: '#6d5047',
    fontSize: 13,
  },
  size: {
    color: '#0981b7',
    fontSize: 12,
  },
};
