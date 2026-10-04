import { select } from 'surimi';
import type { Shade } from '#styles/colors.css.ts';
import { theme } from '#styles/theme.css.ts';

const { color } = theme;

const logo = select('.logo');

const stripes = [100, 200, 300, 400, 500] as const satisfies Shade[];

logo.style({
	clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
});

stripes.forEach((shade, i) => {
	logo.child(`path:nth-of-type(${i + 1})`).style({ fill: color.fg[shade] });
});
