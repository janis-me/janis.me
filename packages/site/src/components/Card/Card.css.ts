import { select } from 'surimi';
import { box, eyebrow, flush, gridPaper, highlight } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const card = select('.card');

card.use(box).style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[8],
});

const highlighted = select('.card.highlight');
const highlightLink = highlighted.descendant('a');

highlighted.use(highlight);

highlighted.child('.card-title').style({ color: 'inherit' });

highlightLink.style({
	color: 'inherit',
	textDecorationColor: 'currentColor',
	backgroundImage: `linear-gradient(${color.primary.fg}, ${color.primary.fg})`,
	outlineColor: color.primary.fg,
});

select(`${highlightLink}:hover`, `${highlightLink}:focus-visible`).style({ color: color.primary.base });
select('.card.paper').use(gridPaper);

card.child('.card-title').use(flush, eyebrow);

select(`${card} > p`, `${card} > ul`).use(flush);

card.child('ul').style({ paddingLeft: space[16] });

card.descendant('li').adjacent('li').style({ marginTop: space[4] });
