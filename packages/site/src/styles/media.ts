import { media } from 'surimi';

export const breakpoints = {
	phone: '420px',
	tablet: '768px',
	desktop: '1024px',
	ultrawide: '2000px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Factories, not constants: every compiled `.css.ts` gets a fresh surimi root,
// so builders must be created inside the file that uses them.
export const below = (bp: Breakpoint) => media().width('<', breakpoints[bp]);
export const upTo = (bp: Breakpoint) => media().width('<=', breakpoints[bp]);
export const from = (bp: Breakpoint) => media().width('>=', breakpoints[bp]);
export const above = (bp: Breakpoint) => media().width('>', breakpoints[bp]);

export const between = (min: Breakpoint, max: Breakpoint) =>
	media().width('>=', breakpoints[min]).and().width('<', breakpoints[max]);

export const print = () => media().print();
