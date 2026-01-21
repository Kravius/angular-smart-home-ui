export enum ItemType {
  SENSOR = 'sensor',
  DEVICE = 'device',
}

export interface BaseItem {
  id: string; // TODO i add ID will see what happened
  type: ItemType;
  icon: string;
  label: string;
}

export interface DashboardListItem {
  id: string;
  title: string;
  icon: string;
}

export interface SensorValue {
  amount: number;
  unit: string;
}

export interface SensorItem extends BaseItem {
  type: ItemType.SENSOR;
  value: SensorValue;
}

export interface DeviceItem extends BaseItem {
  type: ItemType.DEVICE;
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

export interface DashboardTabsData {
  tabs: Tab[];
}
export type layoutDirection = 'horizontal-layout' | 'single-device' | 'vertical-layout';
