import { fontFace, keyframes, media, select, viewTransition } from 'surimi';
import { below } from '#styles/media.ts';
import { focusRing, slideFill } from '#styles/mixins.ts';
import { theme } from '#styles/theme.css.ts';
import 'sanitize.css';

const { color, space, font } = theme;

viewTransition.navigation('auto');

const themeWipe = keyframes('theme-wipe')
	.from({ clipPath: 'polygon(100% 0, 100% 0, 100% 0)' })
	.to({ clipPath: 'polygon(-100% 0, 100% 0, 100% 200%)' });

select('html[data-theme-switch]::view-transition-old(root)').style({ animation: 'none' });

select('html[data-theme-switch]::view-transition-new(root)').style({
	animation: `${themeWipe} 0.6s cubic-bezier(0.65, 0, 0.35, 1)`,
});

media()
	.prefersReducedMotion('reduce')
	.select('html[data-theme-switch]::view-transition-new(root)')
	.style({ animation: 'none' });

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

body.style({
	margin: '0',
	minHeight: '100dvh',
});

html
	.style({
		// Browser default (16px unless the user changed it). Never shrink it per breakpoint.
		fontSize: '100%',
		scrollbarColor: `${color.primary.base} ${color.bg.base}`,
	})
	.selection()
	.style({
		background: color.primary.base,
		color: color.primary.fg,
	});

body.style({
	fontFamily: font.mono,
	color: color.fg.base,
	backgroundColor: color.bg.base,
	display: 'flex',
	flexDirection: 'column',
});

media().prefersReducedMotion('no-preference').select(html).style({
	scrollBehavior: 'smooth',
});

select('p').style({
	textWrap: 'pretty',
});

media().prefersReducedMotion('reduce').select('*', '::before', '::after').style({
	transitionDuration: '0s !important',
});

const link = select('a');

link.use(...slideFill, focusRing).style({
	cursor: 'pointer',
	color: color.fg.base,
	textDecoration: 'underline',
	textDecorationStyle: 'dashed',
	textDecorationColor: color.primary.base,
	textUnderlineOffset: space[4],
	boxDecorationBreak: 'clone',
});

select(':is(p, li) > a').style({
	paddingInline: space[4],
});

const iconLink = link.has('svg, h1, h2, h3, h4, h5, h6');

iconLink.style({
	textDecoration: 'none',
	backgroundImage: 'none',
});

select(`${iconLink}:hover`).style({ color: color.primary.base });

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
