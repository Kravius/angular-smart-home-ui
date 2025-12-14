// --- Item Base ---
export interface BaseItem {
  type: 'sensor' | 'device';
  icon: string;
  label: string;
}

// --- Sensor Item ---
export interface SensorValue {
  amount: number;
  unit: string;
}

export interface SensorItem extends BaseItem {
  type: 'sensor';
  value: SensorValue;
}

// --- Device Item ---
export interface DeviceItem extends BaseItem {
  type: 'device';
  state: boolean;
}

// Union type for items
export type Item = SensorItem | DeviceItem;

// --- ICard ---
export type ICardLayout = 'horizontalLayout' | 'verticalLayout' | 'singleDevice';

export interface ICard {
  id: string;
  title: string;
  layout: ICardLayout;
  items: Item[];
}

// --- Tab ---
export interface Tab {
  id: string;
  title: string;
  cards: ICard[];
}

// --- Root Object ---
export interface DashboardData {
  tabs: Tab[];
}
export type layoutDirection = 'horizontal-layout' | 'single-device' | 'vertical-layout';
