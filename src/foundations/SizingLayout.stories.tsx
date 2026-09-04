import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import '@fontsource/zen-kaku-gothic-new/400.css';
import '@fontsource/zen-kaku-gothic-new/500.css';

type TokenExample = {
  description: string;
  name: string;
  size: string;
};

const controls: TokenExample[] = [
  {
    name: 'size-control-sm',
    size: '32px',
    description: 'Compact actions in dense toolbars and tables.',
  },
  {
    name: 'size-control-md',
    size: '40px',
    description: 'Default buttons and inputs in everyday forms.',
  },
  {
    name: 'size-control-lg',
    size: '48px',
    description: 'Prominent controls in focused or touch-friendly flows.',
  },
];

const icons: TokenExample[] = [
  {
    name: 'size-icon-sm',
    size: '16px',
    description: 'Supporting icons beside compact labels and metadata.',
  },
  {
    name: 'size-icon-md',
    size: '20px',
    description: 'Default icons inside standard controls and navigation.',
  },
  {
    name: 'size-icon-lg',
    size: '24px',
    description: 'Standalone actions or icons that need more emphasis.',
  },
];

const containers: TokenExample[] = [
  {
    name: 'size-container-sm',
    size: '640px',
    description: 'A focused reading column, form, or settings page.',
  },
  {
    name: 'size-container-md',
    size: '960px',
    description: 'A content page with a main column and supporting rail.',
  },
  {
    name: 'size-container-lg',
    size: '1200px',
    description: 'A standard application shell with navigation and content.',
  },
  {
    name: 'size-container-xl',
    size: '1440px',
    description: 'A data-dense dashboard that benefits from a wide canvas.',
  },
];

const gutters: TokenExample[] = [
  {
    name: 'layout-gutter-sm',
    size: '16px',
    description: 'Keeps content away from the edges on narrow screens.',
  },
  {
    name: 'layout-gutter-md',
    size: '24px',
    description: 'Default page padding for most application layouts.',
  },
  {
    name: 'layout-gutter-lg',
    size: '32px',
    description: 'Adds breathing room when the viewport has space to spare.',
  },
];

const sectionGaps: TokenExample[] = [
  {
    name: 'layout-section-gap-sm',
    size: '24px',
    description: 'Separates related sections in a compact view.',
  },
  {
    name: 'layout-section-gap-md',
    size: '32px',
    description: 'Default separation between distinct page sections.',
  },
  {
    name: 'layout-section-gap-lg',
    size: '48px',
    description: 'Creates a strong break between major page regions.',
  },
];

const meta = {
  title: 'Foundations/Sizing and layout',
  tags: [],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shared control, icon, container, gutter, and section spacing tokens shown in the UI patterns they are designed for.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchIcon({ size }: { size: string }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={`var(--${size})`}
      style={styles.iconSvg}
      viewBox="0 0 24 24"
      width={`var(--${size})`}
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}

function TokenDetails({ description, name, size }: TokenExample) {
  return (
    <div style={styles.details}>
      <div style={styles.tokenLine}>
        <code style={styles.name}>{`--${name}`}</code>
        <span style={styles.size}>{size}</span>
      </div>
      <span style={styles.description}>{description}</span>
    </div>
  );
}

function ExampleRow({
  children,
  token,
}: {
  children: ReactNode;
  token: TokenExample;
}) {
  return (
    <article style={styles.row}>
      <div style={styles.preview}>{children}</div>
      <TokenDetails {...token} />
    </article>
  );
}

function ControlExample({ token }: { token: TokenExample }) {
  const controlStyle = {
    ...styles.control,
    height: `var(--${token.name})`,
  } satisfies CSSProperties;

  return (
    <ExampleRow token={token}>
      <div style={styles.controlGroup}>
        <div style={{ ...controlStyle, ...styles.field }}>
          <SearchIcon size="size-icon-sm" />
          <span>Search projects</span>
        </div>
        <div style={{ ...controlStyle, ...styles.button }}>Search</div>
      </div>
    </ExampleRow>
  );
}

function IconExample({ token }: { token: TokenExample }) {
  const buttonSize =
    token.name === 'size-icon-lg' ? 'size-control-lg' : 'size-control-md';
  const label =
    token.name === 'size-icon-sm'
      ? 'Filter results'
      : token.name === 'size-icon-md'
        ? 'Search'
        : 'Explore';

  return (
    <ExampleRow token={token}>
      <div style={styles.iconExample}>
        <div
          style={{
            ...styles.iconButton,
            height: `var(--${buttonSize})`,
            width: `var(--${buttonSize})`,
          }}
        >
          <SearchIcon size={token.name} />
        </div>
        <span style={styles.exampleLabel}>{label}</span>
      </div>
    </ExampleRow>
  );
}

function ContainerExample({ token }: { token: TokenExample }) {
  const width = `${(Number.parseInt(token.size, 10) / 1440) * 100}%`;
  const columns =
    token.name === 'size-container-sm'
      ? '1fr'
      : token.name === 'size-container-md'
        ? '2fr 1fr'
        : token.name === 'size-container-lg'
          ? '72px 1fr'
          : '72px 1fr 96px';

  return (
    <ExampleRow token={token}>
      <div style={styles.viewport}>
        <div style={{ ...styles.containerFrame, width }}>
          <div
            style={{ ...styles.containerColumns, gridTemplateColumns: columns }}
          >
            {columns.split(' ').map((_, index) => (
              <div
                key={index}
                style={index === 1 ? styles.columnAccent : styles.column}
              />
            ))}
          </div>
        </div>
      </div>
    </ExampleRow>
  );
}

function GutterExample({ token }: { token: TokenExample }) {
  return (
    <ExampleRow token={token}>
      <div
        style={{
          ...styles.gutterFrame,
          paddingLeft: `var(--${token.name})`,
          paddingRight: `var(--${token.name})`,
        }}
      >
        <div style={styles.gutterContent}>
          <div style={styles.miniHeading} />
          <div style={styles.miniLine} />
          <div style={{ ...styles.miniLine, width: '72%' }} />
        </div>
      </div>
    </ExampleRow>
  );
}

function SectionGapExample({ token }: { token: TokenExample }) {
  return (
    <ExampleRow token={token}>
      <div style={{ ...styles.sectionStack, gap: `var(--${token.name})` }}>
        <div style={styles.miniSection}>
          <span style={styles.miniSectionTitle}>Account</span>
          <span style={styles.miniSectionLine} />
        </div>
        <div style={styles.miniSection}>
          <span style={styles.miniSectionTitle}>Preferences</span>
          <span style={styles.miniSectionLine} />
        </div>
      </div>
    </ExampleRow>
  );
}

function ScaleSection({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <p style={styles.sectionDescription}>{description}</p>
      </div>
      <div style={styles.list}>{children}</div>
    </section>
  );
}

export const SizingLayout: Story = {
  render: () => (
    <main style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Foundations</p>
        <h1 style={styles.title}>Sizing and layout</h1>
        <p style={styles.intro}>
          Shared dimensions and layout limits, demonstrated in the contexts
          where each token should be used.
        </p>
      </div>

      <ScaleSection
        description="The same control pattern at three heights shows how density and emphasis change."
        title="Control heights"
      >
        {controls.map((token) => (
          <ControlExample key={token.name} token={token} />
        ))}
      </ScaleSection>

      <ScaleSection
        description="Icons are shown inside appropriately sized actions, rather than as abstract blocks."
        title="Icon sizes"
      >
        {icons.map((token) => (
          <IconExample key={token.name} token={token} />
        ))}
      </ScaleSection>

      <ScaleSection
        description="Each frame is scaled against the same 1440px viewport so their relative limits stay visible."
        title="Container widths"
      >
        {containers.map((token) => (
          <ContainerExample key={token.name} token={token} />
        ))}
      </ScaleSection>

      <ScaleSection
        description="The highlighted bands show the actual inset between a page edge and its content."
        title="Layout gutters"
      >
        {gutters.map((token) => (
          <GutterExample key={token.name} token={token} />
        ))}
      </ScaleSection>

      <ScaleSection
        description="Two real page sections make the increasing degree of separation easy to compare."
        title="Major vertical spacing"
      >
        {sectionGaps.map((token) => (
          <SectionGapExample key={token.name} token={token} />
        ))}
      </ScaleSection>
    </main>
  ),
};

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: 'var(--neutral-0)',
    boxSizing: 'border-box',
    color: 'var(--neutral-950)',
    fontFamily: 'var(--font-family-sans)',
    maxWidth: 'var(--size-container-md)',
    minHeight: '100vh',
    padding: '48px var(--layout-gutter-lg) 64px',
    margin: '0 auto',
  },
  header: {
    borderBottom: '1px solid var(--neutral-200)',
    marginBottom: 'var(--layout-section-gap-lg)',
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
    maxWidth: 640,
  },
  section: { marginBottom: 56 },
  sectionHeader: { marginBottom: 'var(--space-5)' },
  sectionTitle: {
    fontSize: 'var(--heading-m)',
    letterSpacing: '-0.01em',
    margin: 0,
  },
  sectionDescription: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-m)',
    lineHeight: 1.5,
    margin: 'var(--space-2) 0 0',
  },
  list: { display: 'grid', gap: 'var(--space-3)' },
  row: {
    alignItems: 'center',
    border: '1px solid var(--neutral-200)',
    display: 'grid',
    gap: 'var(--space-5)',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
    minHeight: 96,
    padding: 'var(--space-4)',
  },
  preview: {
    alignItems: 'center',
    backgroundColor:
      'color-mix(in srgb, var(--neutral-100) 32%, var(--neutral-0))',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 72,
    overflow: 'hidden',
    padding: 'var(--space-3)',
  },
  details: { display: 'grid', gap: 'var(--space-2)' },
  tokenLine: {
    alignItems: 'baseline',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2) var(--space-3)',
  },
  name: { color: 'var(--neutral-600)', fontSize: 13 },
  size: {
    color: 'var(--info-600)',
    fontSize: 'var(--body-s)',
    fontWeight: 500,
  },
  description: {
    color: 'var(--neutral-500)',
    fontSize: 'var(--body-s)',
    lineHeight: 1.45,
  },
  controlGroup: {
    alignItems: 'center',
    display: 'flex',
    gap: 'var(--space-2)',
    width: '100%',
  },
  control: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    fontSize: 'var(--body-m)',
  },
  field: {
    backgroundColor: 'var(--neutral-0)',
    border: '1px solid var(--neutral-300)',
    color: 'var(--neutral-500)',
    flex: 1,
    gap: 'var(--space-2)',
    minWidth: 0,
    padding: '0 var(--space-3)',
  },
  button: {
    backgroundColor: 'var(--primary-600)',
    color: 'var(--neutral-0)',
    fontWeight: 500,
    justifyContent: 'center',
    padding: '0 var(--space-4)',
  },
  iconSvg: { display: 'block', flex: '0 0 auto' },
  iconExample: { alignItems: 'center', display: 'flex', gap: 'var(--space-3)' },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'var(--neutral-0)',
    border: '1px solid var(--neutral-300)',
    boxSizing: 'border-box',
    color: 'var(--neutral-600)',
    display: 'flex',
    justifyContent: 'center',
  },
  exampleLabel: {
    color: 'var(--neutral-600)',
    fontSize: 'var(--body-m)',
    fontWeight: 500,
  },
  viewport: {
    alignItems: 'stretch',
    backgroundColor: 'var(--neutral-200)',
    display: 'flex',
    height: 64,
    justifyContent: 'center',
    padding: 'var(--space-2)',
    width: '100%',
  },
  containerFrame: {
    backgroundColor: 'var(--neutral-0)',
    boxSizing: 'border-box',
    minWidth: 42,
    padding: 'var(--space-2)',
  },
  containerColumns: { display: 'grid', gap: 4, height: '100%' },
  column: { backgroundColor: 'var(--neutral-100)' },
  columnAccent: { backgroundColor: 'var(--primary-200)' },
  gutterFrame: {
    backgroundColor: 'var(--primary-200)',
    boxSizing: 'border-box',
    width: '100%',
  },
  gutterContent: {
    backgroundColor: 'var(--neutral-0)',
    boxSizing: 'border-box',
    display: 'grid',
    gap: 6,
    minHeight: 64,
    padding: 'var(--space-3)',
  },
  miniHeading: {
    backgroundColor: 'var(--neutral-500)',
    height: 6,
    width: '38%',
  },
  miniLine: { backgroundColor: 'var(--neutral-100)', height: 5, width: '100%' },
  sectionStack: { display: 'flex', flexDirection: 'column', width: '100%' },
  miniSection: {
    backgroundColor: 'var(--neutral-0)',
    borderLeft: '3px solid var(--primary-600)',
    display: 'grid',
    gap: 6,
    padding: 'var(--space-2) var(--space-3)',
  },
  miniSectionTitle: {
    color: 'var(--neutral-600)',
    fontSize: 'var(--body-s)',
    fontWeight: 500,
  },
  miniSectionLine: {
    backgroundColor: 'var(--neutral-100)',
    display: 'block',
    height: 4,
    width: '68%',
  },
};
