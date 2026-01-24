import { ICardLayout, layoutDirection } from '../../models/models';

export const layoutMap: LayoutMap = {
  horizontalLayout: 'horizontal-layout',
  singleDevice: 'single-device',
  verticalLayout: 'vertical-layout',
};

interface LayoutMap {
  readonly horizontalLayout: 'horizontal-layout';
  readonly singleDevice: 'single-device';
  readonly verticalLayout: 'vertical-layout';
}

export function resolveLayoutClass(layout: ICardLayout): layoutDirection {
  return layoutMap[layout] ?? 'horizontal-layout';
}

export function toKebabCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
