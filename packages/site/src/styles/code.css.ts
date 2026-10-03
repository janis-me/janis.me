import { media, select, style } from 'surimi';
import { line } from '#styles/presets.ts';
import { colorSchemes, theme, themeNames } from '#styles/theme.css.ts';

const { color, space } = theme;

const block = select('.astro-code');
const inline = select('code');
const lines = block.descendant('.line');

// Shiki writes colors inline, so overrides need !important.
select('code', '.astro-code').style({
	backgroundColor: `${color.code} !important`,
});

const shikiDark = style({ color: 'var(--shiki-dark) !important' });

for (const name of themeNames.filter(name => colorSchemes[name] === 'dark')) {
	select(`[data-theme="${name}"] .astro-code span`).use(shikiDark);
}

media().prefersColorScheme('dark').select(':root:not([data-theme]) .astro-code span').use(shikiDark);

inline.style({
	border: line.dashed,
	padding: `${space[2]} ${space[4]}`,
});

block.style({
	paddingTop: space[32],
	position: 'relative',
	overflow: 'hidden',
});

block.before().style({
	content: 'attr(data-language)',
	position: 'absolute',
	top: '0',
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: space[32],
	padding: `0 ${space[8]}`,
	textTransform: 'uppercase',
	fontSize: '0.8em',
	border: line.dashed,
	borderBottom: 'none',
	backgroundColor: color.gray4,
});

block.descendant('code').style({
	display: 'inline-grid',
	gridAutoRows: '25px',
	width: '100%',
	padding: '0',
	overflow: 'auto',
});

lines.style({
	display: 'inline-block',
	width: '100%',
	padding: `${space[1]} ${space[8]}`,
});

// `meta` highlight transformer: focus highlighted lines, frame each run.
const focused = select('.astro-code:has(.highlighted)');
const hl = focused.descendant('.line.highlighted');

select(`${hl}`, `${hl} span`).style({
	backgroundColor: `${color.gray4} !important`,
});

focused.descendant('.line:not(.highlighted)').style({
	filter: 'blur(1px)',
});

select(`${focused} .highlighted:first-of-type`, `${focused} .line:not(.highlighted) + .highlighted`).style({
	borderTop: line.dashed,
});

focused.descendant('.highlighted:not(:has(+ .highlighted))').style({
	borderBottom: line.dashed,
});
