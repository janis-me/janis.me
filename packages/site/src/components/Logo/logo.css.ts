import { select } from 'surimi';
import { theme } from '#styles/theme.css.ts';

const { color } = theme;

const logo = select('.logo');

logo.style({
	clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
});

for (const stripe of [1, 2, 3, 4, 5] as const) {
	logo.child(`path:nth-of-type(${stripe})`).style({ fill: color.logo[stripe] });
}
