export interface BaseItem {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
}

export interface SensorValue {
  amount: number;
  unit: string;
}

export interface SensorItem extends BaseItem {
  type: 'sensor';
  value: SensorValue;
}

export interface DeviceItem extends BaseItem {
  type: 'device';
  state: boolean;
}

export type Item = SensorItem | DeviceItem;

export type ICardLayout = 'horizontalLayout' | 'verticalLayout' | 'singleDevice';

export interface ICard {
  id: string;
  title: string;
  layout: ICardLayout;
  items: Item[];
}

export interface Tab {
  id: string;
  title: string;
  cards: ICard[];
}

export interface DashboardData {
  tabs: Tab[];
}
export type layoutDirection = 'horizontal-layout' | 'single-device' | 'vertical-layout';
