import tinycolor from 'tinycolor2';

// install vscode extension naumovs.color-highlight to view colors nicely

export const lightColors: string[] = [
  'rgb(255, 200, 200)',
  'rgb(255, 220, 180)',
  'rgb(150, 230, 200)',
  'rgb(140, 220, 255)',
  'rgb(150, 180, 255)',
  'rgb(220, 190, 255)',
];

export const brightColors: string[] = [
  'hsl(0, 100%, 77%)',
  'hsl(30, 100%, 70%)',
  'hsl(155, 80%, 60%)',
  'hsl(220, 100%, 70%)',
  'hsl(280, 100%, 77%)',
  'hsl(310, 100%, 77%)',
];

export function isColorLight(textColor: string): boolean {
  const color = tinycolor(textColor);
  return color.isLight();
}
