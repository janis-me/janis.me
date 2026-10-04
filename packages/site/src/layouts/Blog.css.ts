import { select } from 'surimi';
import { focusRing, hoverBorder } from '#styles/mixins.ts';
import { eyebrow, gridPaper, gutter, line } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const post = select('.post');

post.use(gutter);

post.descendant('img').style({
	width: '100%',
	height: 'min-content',
	marginTop: space[16],
	objectFit: 'contain',
});

// Markdown: `<a class="video-link" href="https://youtube.com/...">Title</a>`. Plain link, no embed, no tracking.
const video = post.descendant('.video-link');

video.use(gridPaper, focusRing, hoverBorder).style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[4],
	marginBlock: space[16],
	padding: space[16],
	border: line.dashed,
	color: color.fg.base,
	fontWeight: '600',
	transition: 'border-color 0.15s',
});

video.before().use(eyebrow).style({
	content: '"▶ Watch the video"',
	fontWeight: '400',
});
