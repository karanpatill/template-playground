import useAppStore, { DEFAULT_LEGAL_THEME, LegalTheme } from '../store/store';
import '../styles/components/LegalStylingStudio.css';
import {
  MdBalance,
  MdClose,
  MdFormatAlignLeft,
  MdFormatAlignJustify,
  MdRestartAlt,
  MdFormatBold,
  MdTextFields,
  MdSpaceBar,
  MdFormatLineSpacing,
} from 'react-icons/md';

interface LegalStylingStudioProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

interface FontPreset {
  label: string;
  sub: string;
  previewFont: string;
  value: string;
}

const FONT_PRESETS: FontPreset[] = [
  { label: 'Crimson',     sub: 'Classic Legal',    previewFont: '"Crimson Pro", Georgia, serif',     value: 'Crimson Pro, Georgia, serif' },
  { label: 'Playfair',   sub: 'Elegant',           previewFont: '"Playfair Display", Georgia, serif', value: 'Playfair Display, Georgia, serif' },
  { label: 'Merriweather', sub: 'Editorial',       previewFont: 'Merriweather, Georgia, serif',       value: 'Merriweather, Georgia, serif' },
  { label: 'Source Serif', sub: 'Professional',    previewFont: '"Source Serif 4", Georgia, serif',   value: 'Source Serif 4, Georgia, serif' },
  { label: 'Inter',       sub: 'Modern Corp',      previewFont: 'Inter, system-ui, sans-serif',       value: 'Inter, system-ui, sans-serif' },
  { label: 'Lato',        sub: 'Clean Sans',       previewFont: 'Lato, system-ui, sans-serif',        value: 'Lato, system-ui, sans-serif' },
];

function calcFill(val: number, min: number, max: number): string {
  return `${Math.round(((val - min) / (max - min)) * 100)}%`;
}

interface SliderRowProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

const SliderRow = ({ label, icon, value, min, max, step, display, onChange }: SliderRowProps) => (
  <div>
    <div className="lss-slider-row">
      <span className="lss-ctrl-label">
        {icon}
        {label}
      </span>
      <span className="lss-slider-value">{display}</span>
    </div>
    <input
      type="range"
      className="lss-range"
      min={min}
      max={max}
      step={step}
      value={value}
      style={{ '--fill': calcFill(value, min, max) } as React.CSSProperties}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
    />
  </div>
);

export const LegalStylingStudio = ({ isOpen, onClose, isDark }: LegalStylingStudioProps) => {
  const legalTheme = useAppStore((s) => s.legalTheme);
  const setLegalTheme = useAppStore((s) => s.setLegalTheme);

  const set = (partial: Partial<LegalTheme>) => setLegalTheme(partial);
  const darkCls = isDark ? ' lss-dark' : '';

  return (
    <div className="lss-overlay">
      <div className={`lss-panel${darkCls}${isOpen ? ' lss-open' : ''}`}>

        {/* ── Header ── */}
        <div className="lss-header">
          <div className="lss-header-title">
            <MdBalance className="lss-header-icon" />
            Legal Styling Studio
          </div>
          <button className="lss-close-btn" onClick={onClose} title="Close" aria-label="Close">
            <MdClose size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="lss-body">

          {/* ── Section: Typeface ── */}
          <section>
            <div className="lss-section-label">Typeface</div>
            <div className="lss-font-grid">
              {FONT_PRESETS.map(({ label, sub, previewFont, value }) => (
                <button
                  key={value}
                  className={`lss-font-btn${legalTheme.fontFamily === value ? ' lss-active' : ''}`}
                  onClick={() => set({ fontFamily: value })}
                  title={value}
                >
                  <span className="lss-font-preview" style={{ fontFamily: previewFont }}>Aa</span>
                  <span className="lss-font-name">{label}</span>
                  <span className="lss-font-sub">{sub}</span>
                </button>
              ))}
            </div>
          </section>

          <hr className="lss-divider" />

          {/* ── Section: Typography ── */}
          <section>
            <div className="lss-section-label">Typography</div>

            <SliderRow
              label="Font Size"
              icon={<MdTextFields size={13} />}
              value={legalTheme.fontSize}
              min={10} max={24} step={1}
              display={`${legalTheme.fontSize}px`}
              onChange={(v) => set({ fontSize: v })}
            />

            <SliderRow
              label="Line Height"
              icon={<MdFormatLineSpacing size={13} />}
              value={legalTheme.lineHeight}
              min={1.2} max={2.4} step={0.1}
              display={`${legalTheme.lineHeight.toFixed(1)}×`}
              onChange={(v) => set({ lineHeight: v })}
            />

            <SliderRow
              label="Letter Spacing"
              icon={<MdSpaceBar size={13} />}
              value={legalTheme.letterSpacing}
              min={-5} max={30} step={1}
              display={`${(legalTheme.letterSpacing / 100).toFixed(2)}em`}
              onChange={(v) => set({ letterSpacing: v })}
            />

            {/* Font weight toggle */}
            <div>
              <div className="lss-ctrl-label" style={{ marginBottom: 6 }}>
                <MdFormatBold size={13} /> Font Weight
              </div>
              <div className="lss-align-row">
                {([400, 700] as const).map((w) => (
                  <button
                    key={w}
                    className={`lss-align-btn${legalTheme.fontWeight === w ? ' lss-active' : ''}`}
                    style={{ fontWeight: w }}
                    onClick={() => set({ fontWeight: w })}
                  >
                    {w === 400 ? 'Regular' : 'Bold'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <hr className="lss-divider" />

          {/* ── Section: Layout ── */}
          <section>
            <div className="lss-section-label">Layout</div>

            <SliderRow
              label="Page Margin"
              icon={<span style={{ fontSize: 11 }}>▣</span>}
              value={legalTheme.marginPx}
              min={0} max={80} step={4}
              display={`${legalTheme.marginPx}px`}
              onChange={(v) => set({ marginPx: v })}
            />

            <SliderRow
              label="Paragraph Spacing"
              icon={<span style={{ fontSize: 11 }}>¶</span>}
              value={legalTheme.paraSpacing}
              min={0} max={48} step={2}
              display={`${legalTheme.paraSpacing}px`}
              onChange={(v) => set({ paraSpacing: v })}
            />

            {/* Text alignment */}
            <div>
              <div className="lss-ctrl-label" style={{ marginBottom: 6 }}>
                <MdFormatAlignLeft size={13} /> Alignment
              </div>
              <div className="lss-align-row">
                {(['left', 'justify'] as const).map((align) => (
                  <button
                    key={align}
                    className={`lss-align-btn${legalTheme.textAlign === align ? ' lss-active' : ''}`}
                    onClick={() => set({ textAlign: align })}
                  >
                    {align === 'left'
                      ? <><MdFormatAlignLeft size={14} /> Left</>
                      : <><MdFormatAlignJustify size={14} /> Justify</>}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <hr className="lss-divider" />

          {/* ── Reset ── */}
          <button
            className="lss-reset-btn"
            onClick={() => setLegalTheme({ ...DEFAULT_LEGAL_THEME })}
          >
            <MdRestartAlt size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Reset to Defaults
          </button>

        </div>
      </div>
    </div>
  );
};

export default LegalStylingStudio;
