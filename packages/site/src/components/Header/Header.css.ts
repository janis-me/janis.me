import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { focusRing, pressedFill, slideFill } from '#styles/mixins.ts';
import { control, line, row, spread, surface, visuallyHidden } from '#styles/presets.ts';
import { theme, themeNames } from '#styles/theme.css.ts';

const { color, space } = theme;

const header = select('.site-header');
const home = header.child('.home');
const logo = home.child('.logo');
const nav = header.child('.site-nav');

const picker = header.descendant('.theme-picker');
const trigger = picker.child('summary');
const menu = picker.child('menu');
const option = menu.descendant('button');

header.use(surface, spread).style({
	position: 'sticky',
	top: '0',
	zIndex: '20',
	gap: space[24],
	flexShrink: '0',
	width: '100%',
	height: space[64],
	padding: `0 ${space[64]}`,
	borderBottom: line.solid,
});

nav.use(row).style({
	gap: space[16],
	marginLeft: 'auto',
});

nav.child('a').style({ padding: `${space[4]} ${space[4]}` });

nav.child('a[aria-current="page"]').style({
	backgroundSize: '100% 100%',
	color: color.primary.fg,
	textDecorationColor: 'currentColor',
	textDecorationStyle: 'solid',
});

home.use(row);

logo.style({
	width: space[32],
	height: space[32],
});

picker.style({
	position: 'relative',
});

trigger.use(control, row, ...slideFill, focusRing).style({
	gap: space[8],
	minWidth: '10ch',
	justifyContent: 'space-between',
	listStyle: 'none',
	userSelect: 'none',
});

const label = trigger.child('.theme-label');
trigger.child('.visually-hidden').use(visuallyHidden);
label.style({ display: 'none' });

for (const name of themeNames) {
	select(`[data-theme="${name}"] ${label}[data-for="${name}"]`).style({ display: 'inline' });
}

select(`${trigger}::-webkit-details-marker`).style({
	display: 'none',
});

trigger.after().style({
	content: '"▾"',
	transition: 'rotate 0.15s',
});

select(`${picker}[open] > summary::after`).style({
	rotate: '180deg',
});

menu.use(surface).style({
	position: 'absolute',
	top: `calc(100% + ${space[4]})`,
	right: '0',
	zIndex: '10',
	minWidth: '100%',
	margin: '0',
	padding: '0',
	listStyle: 'none',
	border: line.dashed,
});

menu.child('li').adjacent('li').style({
	borderTop: line.dashed,
});

option.use(row, pressedFill, ...slideFill, focusRing).style({
	gap: space[8],
	width: '100%',
	padding: `${space[4]} ${space[8]}`,
	font: 'inherit',
	color: 'inherit',
	textAlign: 'left',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
});

option.before().style({
	content: '"□"',
});

select(`${option}[aria-pressed="true"]::before`).style({
	content: '"■"',
});

upTo('desktop').select(header).style({ paddingInline: space[32] });
upTo('desktop').select(logo).style({ width: space[32], height: space[32] });

upTo('tablet').select(header).style({ paddingInline: space[16], gap: space[12] });
upTo('tablet').select(nav).style({ gap: space[8] });
upTo('phone').select(nav).style({ gap: space[4], fontSize: '0.875rem' });
upTo('tablet').select(logo).style({ width: space[24], height: space[24] });
