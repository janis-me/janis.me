import { media, select } from 'surimi';
import { createTheme, defineTokens, type Token } from 'surimi/theme';
import { colors, type Shade } from '#styles/colors.css.ts';

const { gray, sky, ice, raisin, bone, yellow } = colors;

// Shades are absolute in every theme: 50 is lightest, 950 darkest.
type Ramp = Record<Shade, Token>;

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

type Palette = {
	bg: Ramp & Record<'base' | 'muted' | 'emphasis' | 'code', Token>;
	fg: Ramp & Record<'base' | 'muted', Token>;
	border: Record<'base' | 'strong', Token>;
	primary: Ramp & Record<'base' | 'subtle' | 'fg', Token>;
	secondary: Ramp & Record<'base' | 'subtle' | 'fg', Token>;
};

const light = {
	bg: { ...gray, base: gray[50], muted: gray[200], emphasis: gray[200], code: gray[100] },
	fg: { ...gray, base: gray[900], muted: gray[600] },
	border: { base: gray[400], strong: gray[500] },
	primary: { ...gray, base: gray[900], subtle: gray[200], fg: gray[50] },
	secondary: { ...gray, base: gray[600], subtle: gray[100], fg: gray[50] },
} satisfies Palette;

const dark = {
	bg: { ...gray, base: gray[900], muted: gray[800], emphasis: gray[800], code: gray[900] },
	fg: { ...gray, base: gray[50], muted: gray[300] },
	border: { base: gray[600], strong: gray[500] },
	primary: { ...gray, base: gray[50], subtle: gray[800], fg: gray[900] },
	secondary: { ...gray, base: gray[400], subtle: gray[800], fg: gray[900] },
} satisfies Palette;

const janis = {
	bg: { ...raisin, base: raisin[950], muted: raisin[900], emphasis: raisin[950], code: raisin[975] },
	fg: { ...ice, base: ice[100], muted: ice[200] },
	border: { base: raisin[800], strong: raisin[500] },
	primary: { ...ice, base: ice[300], subtle: raisin[925], fg: raisin[975] },
	secondary: { ...bone, base: bone[200], subtle: raisin[925], fg: raisin[975] },
} satisfies Palette;

const lucie = {
	bg: { ...sky, base: sky[100], muted: sky[200], emphasis: sky[200], code: sky[100] },
	fg: { ...sky, base: sky[900], muted: sky[700] },
	border: { base: sky[400], strong: sky[400] },
	primary: { ...sky, base: sky[900], subtle: sky[200], fg: sky[50] },
	secondary: { ...sky, base: sky[700], subtle: sky[100], fg: sky[50] },
} satisfies Palette;

const sannie = {
	bg: { ...bone, base: gray[975], muted: bone[900], emphasis: bone[800], code: bone[900] },
	fg: { ...yellow, base: yellow[300], muted: yellow[400] },
	border: { base: yellow[600], strong: yellow[400] },
	primary: { ...yellow, base: yellow[300], subtle: bone[900], fg: gray[975] },
	secondary: { ...bone, base: bone[200], subtle: bone[800], fg: gray[975] },
} satisfies Palette;

export const theme = defineTokens({
	space,
	color: light,
	font: {
		mono: "'IBM Plex Mono', Tahoma, Geneva, Verdana, sans-serif",
	},
});

// Exported as plain data, so Astro can render the theme picker from the same source.
export const colorSchemes = {
	light: 'light',
	dark: 'dark',
	janis: 'dark',
	lucie: 'light',
	sannie: 'dark',
} as const;

export type ThemeName = keyof typeof colorSchemes;
export const themeNames = Object.keys(colorSchemes) as ThemeName[];

const palettes = { dark, janis, lucie, sannie } satisfies Record<Exclude<ThemeName, 'light'>, Palette>;

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
