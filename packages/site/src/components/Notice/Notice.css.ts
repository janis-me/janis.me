import { select } from 'surimi';
import { line } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;
const notice = select('.notice');

notice.style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[12],
	padding: space[16],
	border: line.dashed,
	textDecoration: 'none',
	marginInline: 'auto',
	marginBlock: space[16],
	fontSize: '0.875rem',
});

notice.descendant('p').style({
	margin: '0',
});
