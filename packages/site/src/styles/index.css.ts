import { fontFace, select, viewTransition } from 'surimi';
import { below, upTo } from '#styles/media.ts';
import { focusRing } from '#styles/mixins.ts';
import { theme } from '#styles/theme.css.ts';
import 'sanitize.css';

const { color, space, font } = theme;

viewTransition.navigation('auto');

fontFace({
	fontFamily: 'IBM Plex Mono',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 400,
	src: "url(@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2) format('woff2')",
	unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`,
});

const html = select('html');
const body = select('body');

select('html', 'body').style({
	margin: '0',
	width: '100vw',
	height: '100vh',
});

html
	.style({
		fontSize: '16px',
		scrollbarColor: `${color.text} ${color.background}`,
	})
	.selection()
	.style({
		background: color.text,
		color: color.background,
	});

body.style({
	fontFamily: font.mono,
	color: color.text,
	backgroundColor: color.background,
	backgroundImage: [
		`linear-gradient(${color.gray3} 2px, transparent 2px)`,
		`linear-gradient(90deg, ${color.gray3} 2px, transparent 2px)`,
		`linear-gradient(${color.gray3} 1px, transparent 1px)`,
		`linear-gradient(90deg, ${color.gray3} 1px, ${color.background} 1px)`,
	].join(', '),
	backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
	backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
	backgroundRepeat: 'repeat',
});

body.style({
	overflow: 'hidden',
	display: 'grid',
	gridTemplateRows: `${space[64]} auto`,
});

select('p').style({
	textWrap: 'pretty',
});

const link = select('a');

link
	.style({
		cursor: 'pointer',
		color: color.text,
		textDecoration: 'underline',
		textDecorationStyle: 'dashed',
		textUnderlineOffset: space[4],
	})
	.use(focusRing);

link.has('svg, h1, h2, h3, h4, h5, h6').style({
	textDecoration: 'none',
});

const list = select('ul');

list.style({
	listStyleType: 'square',
	paddingLeft: space[24],
});

select('svg').style({
	width: '1em',
	height: '1em',
});

select('.strikethrough').style({
	backgroundImage:
		'linear-gradient(to left top, transparent 47.75%, currentColor 48%, currentColor 52%, transparent 52.25%)',
});

below('desktop').select(list).style({
	paddingLeft: space[16],
});

upTo('tablet').select(html).style({
	fontSize: '14px',
});

upTo('phone').select(html).style({
	fontSize: '12px',
});
