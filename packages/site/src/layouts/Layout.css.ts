import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { framed, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const frame = select('.frame');
const footer = select('.site-footer');
// Page head content lines up with the frame below it.
const column = select('.frame', '.page-head > hgroup');

// Reading measure. Both share the body font, so `ch` resolves the same for each.
column.style({
	width: `calc(100% - 2 * ${space[32]})`,
	maxWidth: '100ch',
});

frame.use(framed).style({
	flexGrow: '1',
	margin: `${space[32]} auto`,
});

footer.use(surface, spread).style({
	gap: space[16],
	padding: `0 ${space[64]}`,
	borderTop: line.solid,
	fontSize: '0.875rem',
});

footer.child('p').style({
	margin: `${space[16]} 0`,
});

footer.child('.socials').use(row).style({ gap: space[12] });

upTo('desktop').select(footer).style({ paddingInline: space[32] });
upTo('tablet').select(footer).style({ paddingInline: space[16], fontSize: '0.8rem' });
upTo('tablet').select(footer.descendant('.extra')).style({ display: 'none' });

// Mobile: full-bleed, every edge (logo, heading, content, footer) on the same 16px gutter.
upTo('tablet').select(column).style({ width: '100%', maxWidth: 'none' });
upTo('tablet')
	.select(frame)
	.style({ width: `calc(100% - 2 * ${space[16]})`, marginBlock: space[16] });
upTo('tablet').select('.page-head > hgroup').style({ paddingInline: space[16] });
