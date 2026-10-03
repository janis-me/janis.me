import { select } from 'surimi';
import { flush, gutter, line, row, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const post = select('.post');
const back = post.child('nav');
const article = post.child('article');
const heading = article.child('hgroup');

back.use(surface, row, gutter).style({
	position: 'sticky',
	top: '0',
	zIndex: '1',
	height: space[40],
	borderBottom: line.dashed,
});

back.child('a').use(row).style({ gap: space[8] });

back.descendant('span').style({
	textDecoration: 'underline',
	textDecorationStyle: 'dashed',
});

article.use(gutter);

heading.child('p').style({
	margin: `${space[16]} 0 ${space[8]} 0`,
	fontSize: '0.8em',
	color: color.gray11,
});

heading.child('h2').use(flush);

article.descendant('img').style({
	width: '100%',
	height: 'min-content',
	marginTop: space[16],
	objectFit: 'contain',
});
