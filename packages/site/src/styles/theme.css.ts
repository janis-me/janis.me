import { media, select } from 'surimi';
import { createTheme, defineTokens } from 'surimi/theme';

type Palette = Record<keyof typeof janis, string>;

const space = {
	1: '1px',
	2: '2px',
	4: '4px',
	6: '6px',
	8: '8px',
	12: '12px',
	16: '16px',
	20: '20px',
	24: '24px',
	32: '32px',
	40: '40px',
	48: '48px',
	56: '56px',
	64: '64px',
	72: '72px',
	80: '80px',
} as const;

const janis = {
	background: '#fafafa',
	text: '#212529',
	code: '#e4e4e4',
	gray1: '#fdfdfd',
	gray2: '#f9f9f9',
	gray3: '#e4e4e4',
	gray4: '#e8e8e8',
	gray5: '#e1e1e1',
	gray6: '#d9d9d9',
	gray7: '#cecece',
	gray8: '#bbbbbb',
	gray9: '#8d8d8d',
	gray10: '#828282',
	gray11: '#636363',
	gray12: '#202020',
} as const;

const dark = {
	text: '#fafafa',
	background: '#212529',
	code: '#2f3438',
	gray1: '#0f1114',
	gray2: '#17191c',
	gray3: '#2f3438',
	gray4: '#252a2f',
	gray5: '#2b3137',
	gray6: '#343a41',
	gray7: '#41484f',
	gray8: '#5a6168',
	gray9: '#686f76',
	gray10: '#757c83',
	gray11: '#adb4bc',
	gray12: '#eceef1',
} as const satisfies Palette;

const lucie = {
	text: '#032b43',
	background: '#8ecae6',
	code: '#98d5f4',
	gray1: '#e3f4fa',
	gray2: '#c5e7f8',
	gray3: '#84b2d6',
	gray4: '#acdcf5',
	gray5: '#98d5f4',
	gray6: '#b3e0f7',
	gray7: '#78a5c7',
	gray8: '#0f5279',
	gray9: '#032b43',
	gray10: '#518ca6',
	gray11: '#3a6b81',
	gray12: '#022331',
} as const satisfies Palette;

const sannie = {
	text: '#ccc162',
	background: '#111113',
	code: '#252419',
	gray1: '#12110c',
	gray2: '#191913',
	gray3: '#252419',
	gray4: '#302f1e',
	gray5: '#3b3923',
	gray6: '#494529',
	gray7: '#595530',
	gray8: '#6f6939',
	gray9: '#ccc162',
	gray10: '#c1b657',
	gray11: '#d3c978',
	gray12: '#efeabd',
} as const satisfies Palette;

export const theme = defineTokens({
	space,
	color: janis,
	font: {
		mono: "'IBM Plex Mono', Tahoma, Geneva, Verdana, sans-serif",
	},
});

// Exported as plain data, so Astro can render the theme picker from the same source.
export const colorSchemes = {
	janis: 'light',
	dark: 'dark',
	lucie: 'light',
	sannie: 'dark',
} as const;

export type ThemeName = keyof typeof colorSchemes;
export const themeNames = Object.keys(colorSchemes) as ThemeName[];

const palettes = { dark, lucie, sannie } satisfies Record<Exclude<ThemeName, 'janis'>, Palette>;

select(':root').style({ colorScheme: 'light' });

for (const name of Object.keys(palettes) as Array<keyof typeof palettes>) {
	select(`[data-theme="${name}"]`)
		.use(createTheme(theme, { color: palettes[name] }))
		.style({ colorScheme: colorSchemes[name] });
}

// No explicit choice: follow the OS.
media()
	.prefersColorScheme('dark')
	.select(':root:not([data-theme])')
	.use(createTheme(theme, { color: dark }))
	.style({ colorScheme: 'dark' });

export default theme;
