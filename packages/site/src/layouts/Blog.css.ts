import { select } from 'surimi';
import { slideFill } from '#styles/mixins.ts';
import { eyebrow, gutter, linkBox } from '#styles/presets.ts';
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

// Markdown: `<a class="video-link" href="https://youtube.com/...">Title</a>`. Plain link, no embed, no tracking.
const video = post.descendant('.video-link');

video.use(linkBox, ...slideFill).style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[8],
	marginBlock: space[16],
	fontWeight: '600',
});

video.before().use(eyebrow).style({
	content: '"▶ Watch the video"',
	fontWeight: '400',
	transition: 'color 0.2s ease-out',
});

select(`${video}:is(:hover, :focus-visible)::before`).style({ color: 'inherit' });
