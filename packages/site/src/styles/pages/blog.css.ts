import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { chip, flush, gutter } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const posts = select('.posts');
const tag = posts.descendant('.tag');

posts.use(gutter);

select(`${posts} > h2`, `${posts} > ul`).use(flush);

posts.descendant('h3').style({ margin: `${space[4]} 0` });
posts.descendant('li').style({ lineHeight: '2' });

tag.use(chip).style({
	height: space[24],
	marginRight: space[6],
});

upTo('phone').select(tag).style({ display: 'none' });
