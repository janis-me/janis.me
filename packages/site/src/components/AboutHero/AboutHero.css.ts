import { select } from 'surimi';
import { below } from '#styles/media.ts';
import { flush, inset, line } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const hero = select('.about-hero');
const title = hero.child('h2');
const intro = hero.child('p');
const timeline = hero.child('div');

hero.style({
	display: 'grid',
	gridTemplateAreas: '"title title" "intro timeline"',
	gridTemplateColumns: '1fr 2fr',
});

title.use(flush, inset).style({
	gridArea: 'title',
	borderBottom: line.dashed,
});

intro.use(flush, inset).style({
	gridArea: 'intro',
	borderRight: line.dashed,
});

timeline.use(inset).style({
	gridArea: 'timeline',
});

timeline.child('h3').use(flush).style({
	fontSize: '1rem',
});

timeline.descendant('li').style({
	margin: `${space[2]} 0`,
});

below('tablet').select(hero).style({
	gridTemplateAreas: '"title title" "intro intro" "timeline timeline"',
});

below('tablet').select(intro).style({
	borderRight: 'none',
	borderBottom: line.dashed,
});
