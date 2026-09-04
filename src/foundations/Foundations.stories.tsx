import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

type ColorToken = {
  name: string;
  value: string;
  description: string;
};

const primaryColors: ColorToken[] = [
  ...[
    ['primary-0', 'Lightest primary tint for subtle backgrounds.'],
    ['primary-100', 'Light primary tint for soft fills and selected states.'],
    ['primary-200', 'Primary tint for borders and low-emphasis accents.'],
    ['primary-300', 'Light primary accent for secondary actions.'],
    ['primary-400', 'Bright primary accent for interactive states.'],
    ['primary-500', 'Vivid primary for prominent accents.'],
    ['primary-600', 'Brand primary for primary actions and emphasis.'],
    ['primary-700', 'Dark primary for pressed and high-contrast states.'],
    ['primary-800', 'Deep primary for strong emphasis.'],
    ['primary-900', 'Very dark primary for dark accents.'],
    ['primary-950', 'Darkest primary in the scale.'],
  ].map(([name, description]) => ({
    name,
    value: `var(--${name})`,
    description,
  })),
];

const neutralColors: ColorToken[] = [
  ...[
    ['neutral-0', 'Supporting neutral for the lightest surfaces and backgrounds.'],
    ['neutral-100', 'Light neutral for surfaces and subtle fills.'],
    ['neutral-200', 'Neutral for borders, dividers, and low-emphasis UI.'],
    ['neutral-300', 'Medium-light neutral for secondary UI elements.'],
    ['neutral-400', 'Midpoint neutral for quiet text and controls.'],
    ['neutral-500', 'Balanced neutral for supporting content and UI.'],
    ['neutral-600', 'Dark-mode background neutral.'],
    ['neutral-700', 'Dark neutral for surfaces and strong contrast.'],
    ['neutral-800', 'Deep neutral for dark surfaces.'],
    ['neutral-900', 'Near-black neutral for the darkest UI elements.'],
    ['neutral-950', 'Darkest neutral in the scale.'],
  ].map(([name, description]) => ({
    name,
    value: `var(--${name})`,
    description,
  })),
];

const statusColorGroups = [
  ['error', 'Destructive actions and error feedback.'],
  ['warning', 'Cautionary messaging and attention states.'],
  ['success', 'Successful actions and positive feedback.'],
  ['info', 'Informational messaging and neutral status feedback.'],
].map(([status, description]) => ({
  title: status.charAt(0).toUpperCase() + status.slice(1),
  mainToken: `${status}-600`,
  colors: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => ({
    name: `${status}-${step}`,
    value: `var(--${status}-${step})`,
    description,
  })),
}));

const alphaSteps = [5, 10, 20, 30, 40, 60, 80];

const blackAlphaColors: ColorToken[] = alphaSteps.map((step) => ({
  name: `black-alpha-${step}`,
  value: `var(--black-alpha-${step})`,
  description: `Black primitive at ${step}% opacity.`,
}));

const whiteAlphaColors: ColorToken[] = alphaSteps.map((step) => ({
  name: `white-alpha-${step}`,
  value: `var(--white-alpha-${step})`,
  description: `White primitive at ${step}% opacity.`,
}));

const semanticColors: ColorToken[] = [
  ['overlay-backdrop', 'Backdrop dimming behind dialogs and drawers.'],
  ['overlay-hover', 'Hover state overlay on interactive surfaces.'],
  ['overlay-active', 'Pressed or active state overlay.'],
  ['overlay-selected', 'Selected state overlay.'],
  ['overlay-disabled', 'Disabled state overlay.'],
  ['shadow-subtle', 'Subtle shadow color for low elevation.'],
  ['shadow-default', 'Default shadow color for standard elevation.'],
  ['shadow-strong', 'Strong shadow color for higher elevation.'],
  ['highlight-subtle', 'Subtle highlight on dark surfaces.'],
  ['highlight-default', 'Default highlight on dark surfaces.'],
].map(([name, description]) => ({
  name: `color-${name}`,
  value: `var(--color-${name})`,
  description,
}));

const meta = {
  title: 'Foundations',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The foundational color primitives used across the design system. Use these values as the source for semantic color tokens.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function ColorSwatch({ color }: { color: ColorToken }) {
  const swatchStyle = {
    backgroundColor: color.value,
  } satisfies CSSProperties;

  return (
    <div style={styles.token}>
      <div aria-label={`${color.name}: ${color.value}`} style={{ ...styles.swatch, ...swatchStyle }} />
      <div style={styles.tokenDetails}>
        <div style={styles.tokenName}>{color.name}</div>
        <code style={styles.tokenValue}>{color.value}</code>
        <p style={styles.tokenDescription}>{color.description}</p>
      </div>
    </div>
  );
}

function ColorSection({
  colors,
  mainToken,
  title,
}: {
  colors: ColorToken[];
  mainToken?: string;
  title: string;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {mainToken && (
        <p style={styles.mainColor}>
          Main color: <code>{`--${mainToken}`}</code>
        </p>
      )}
      <div style={styles.grid}>
        {colors.map((color) => (
          <ColorSwatch color={color} key={color.name} />
        ))}
      </div>
    </section>
  );
}

export const ColorPrimitives: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Color primitives</h1>
        <p style={styles.intro}>
          The core palette for building consistent, expressive interfaces.
        </p>
      </div>
      <ColorSection colors={primaryColors} mainToken="primary-600" title="Primary" />
      <ColorSection
        colors={neutralColors}
        mainToken="neutral-600"
        title="Neutral"
      />
      {statusColorGroups.map((group) => (
        <ColorSection
          colors={group.colors}
          mainToken={group.mainToken}
          title={group.title}
          key={group.title}
        />
      ))}
      <ColorSection colors={blackAlphaColors} title="Black alpha" />
      <ColorSection colors={whiteAlphaColors} title="White alpha" />
      <ColorSection colors={semanticColors} title="Semantic overlay, shadow, and highlight" />
    </main>
  ),
};

const styles: Record<string, CSSProperties> = {
  page: {
    boxSizing: 'border-box',
    color: '#2a1411',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
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
  mainColor: {
    color: '#6d5047',
    fontSize: 14,
    margin: '-8px 0 20px',
  },
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
  token: {
    border: '1px solid #eadcca',
    borderRadius: 12,
    overflow: 'hidden',
  },
  swatch: {
    height: 112,
  },
  tokenDetails: {
    padding: 16,
  },
  tokenName: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 6,
  },
  tokenValue: {
    color: '#6d5047',
    fontSize: 13,
  },
  tokenDescription: {
    color: '#6d5047',
    fontSize: 13,
    lineHeight: 1.45,
    margin: '12px 0 0',
  },
};
