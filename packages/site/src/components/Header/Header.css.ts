import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { focusRing, hoverFill, pressedFill } from '#styles/mixins.ts';
import { control, flush, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const header = select('.site-header');
const title = header.descendant('h1');
const logo = title.descendant('.logo');

const picker = header.descendant('.theme-picker');
const trigger = picker.child('summary');
const menu = picker.child('menu');
const option = menu.descendant('button');

header.use(surface, spread).style({
	width: '100%',
	height: '100%',
	padding: `0 ${space[64]}`,
	borderBottom: line.solid,
});

title.use(flush, row);

logo.style({
	width: space[40],
	height: space[40],
});

picker.style({
	position: 'relative',
});

trigger.use(control, row, hoverFill, focusRing).style({
	gap: space[8],
	minWidth: '10ch',
	justifyContent: 'space-between',
	listStyle: 'none',
	userSelect: 'none',
});

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

option.use(row, hoverFill, pressedFill, focusRing).style({
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

upTo('tablet').select(header).style({ paddingInline: space[16] });
upTo('tablet').select(logo).style({ width: space[24], height: space[24] });
