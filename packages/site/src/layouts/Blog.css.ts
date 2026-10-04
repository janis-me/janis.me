import { select } from 'surimi';
import { gutter } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const post = select('.post');

post.use(gutter);

post.descendant('img').style({
	width: '100%',
	height: 'min-content',
	marginTop: space[16],
	objectFit: 'contain',
});
