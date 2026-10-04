import { defineTokens, token } from 'surimi/theme';

/**
 * Every ramp shares one OKLCH lightness ladder, so a shade is equally light in every color:
 * 50 .985 · 100 .955 · 200 .91 · 300 .84 · 400 .74 · 500 .63 · 600 .53 · 700 .44 · 800 .36 · 900 .28
 * 925–975 (.255 · .24 · .205) are dense on purpose: dark themes need small steps around the page.
 * Hand-picked anchors (brand colors, theme backgrounds) may sit slightly off the ladder.
 */
export type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 925 | 950 | 975;

const shades = (values: Record<Shade, string>) => {
	const entries = Object.entries(values).map(([shade, value]) => [shade, token(value, '<color>')]);
	return Object.fromEntries(entries) as Record<Shade, ReturnType<typeof token>>;
};

// Raw palette, never themed. Themes pick from it in `theme.css.ts`.
export const colors = defineTokens({
	gray: shades({
		50: 'oklch(0.985 0.000 0)',
		100: 'oklch(0.954 0.005 258)',
		200: 'oklch(0.911 0.007 248)',
		300: 'oklch(0.840 0.010 253)',
		400: 'oklch(0.739 0.012 257)',
		500: 'oklch(0.630 0.011 248)',
		600: 'oklch(0.529 0.011 253)',
		700: 'oklch(0.440 0.010 248)',
		800: 'oklch(0.322 0.010 242)',
		900: 'oklch(0.262 0.009 248)',
		925: 'oklch(0.255 0.009 248)',
		950: 'oklch(0.240 0.009 248)',
		975: 'oklch(0.179 0.004 286)',
	}),
	sky: shades({
		50: 'oklch(0.985 0.008 237)',
		100: 'oklch(0.956 0.024 230)',
		200: 'oklch(0.909 0.053 233)',
		300: 'oklch(0.808 0.073 229)',
		400: 'oklch(0.739 0.104 232)',
		500: 'oklch(0.630 0.110 232)',
		600: 'oklch(0.529 0.105 233)',
		700: 'oklch(0.439 0.089 232)',
		800: 'oklch(0.360 0.073 233)',
		900: 'oklch(0.276 0.061 241)',
		925: 'oklch(0.255 0.056 241)',
		950: 'oklch(0.240 0.053 241)',
		975: 'oklch(0.205 0.045 241)',
	}),
	ice: shades({
		50: 'oklch(0.960 0.013 262)',
		100: 'oklch(0.936 0.026 267)',
		200: 'oklch(0.891 0.050 267)',
		300: 'oklch(0.823 0.088 267)',
		400: 'oklch(0.739 0.105 268)',
		500: 'oklch(0.630 0.110 268)',
		600: 'oklch(0.529 0.104 268)',
		700: 'oklch(0.439 0.094 268)',
		800: 'oklch(0.361 0.076 268)',
		900: 'oklch(0.280 0.061 268)',
		925: 'oklch(0.255 0.056 268)',
		950: 'oklch(0.240 0.052 268)',
		975: 'oklch(0.205 0.045 268)',
	}),
	raisin: shades({
		50: 'oklch(0.984 0.013 322)',
		100: 'oklch(0.956 0.020 326)',
		200: 'oklch(0.910 0.034 324)',
		300: 'oklch(0.839 0.048 325)',
		400: 'oklch(0.740 0.057 325)',
		500: 'oklch(0.630 0.059 325)',
		600: 'oklch(0.531 0.056 325)',
		700: 'oklch(0.440 0.050 325)',
		800: 'oklch(0.361 0.041 326)',
		900: 'oklch(0.272 0.025 323)',
		925: 'oklch(0.258 0.021 326)',
		950: 'oklch(0.240 0.021 323)',
		975: 'oklch(0.206 0.016 321)',
	}),
	bone: shades({
		50: 'oklch(0.985 0.005 95)',
		100: 'oklch(0.954 0.008 99)',
		200: 'oklch(0.896 0.019 97)',
		300: 'oklch(0.840 0.021 98)',
		400: 'oklch(0.739 0.023 98)',
		500: 'oklch(0.631 0.025 99)',
		600: 'oklch(0.530 0.023 98)',
		700: 'oklch(0.440 0.021 100)',
		800: 'oklch(0.359 0.017 98)',
		900: 'oklch(0.280 0.014 96)',
		925: 'oklch(0.255 0.013 96)',
		950: 'oklch(0.240 0.012 96)',
		975: 'oklch(0.205 0.011 96)',
	}),
	yellow: shades({
		50: 'oklch(0.984 0.026 102)',
		100: 'oklch(0.955 0.046 102)',
		200: 'oklch(0.910 0.071 102)',
		300: 'oklch(0.800 0.118 103)',
		400: 'oklch(0.739 0.123 102)',
		500: 'oklch(0.630 0.130 102)',
		600: 'oklch(0.530 0.109 102)',
		700: 'oklch(0.441 0.091 102)',
		800: 'oklch(0.360 0.075 102)',
		900: 'oklch(0.282 0.058 102)',
		925: 'oklch(0.255 0.052 102)',
		950: 'oklch(0.240 0.049 102)',
		975: 'oklch(0.205 0.042 102)',
	}),
});

export default colors;
