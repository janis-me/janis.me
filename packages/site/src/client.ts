import { getPreferredColorScheme, getThemeFromLocalstorage, setThemeToDocument } from '@janis.me/themed/js';

const lsTheme = getThemeFromLocalstorage();

if (lsTheme) {
  const lsThemeComponents = lsTheme.split('-');
  if (!['janis', 'lucie'].includes(lsThemeComponents[0]) || !['light', 'dark'].includes(lsThemeComponents[1])) {
    setThemeToDocument('janis-light');
  } else {
    setThemeToDocument(lsTheme);
  }
} else {
  const preferredTheme = getPreferredColorScheme();
  setThemeToDocument(preferredTheme === 'light' ? 'janis-light' : 'janis-dark');
}
