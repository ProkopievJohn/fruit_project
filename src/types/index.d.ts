export interface Nutritions {
  "carbohydrates": number;
  "protein": number;
  "fat": number;
  "calories": number;
  "sugar": number;
}

export interface Fruit {
  "genus": string;
  "name": string;
  "id": number;
  "family": string;
  "order": string;
  "nutritions": Nutritions;
}

export interface GroupedFruits {
  [key: Omit<GroupBy, 'none'>]: Fruit[];
}

export type GroupBy = 'none' | 'family' | 'order' | 'genus';
export type TabValue = '1' | '2';

export interface ColumnData {
  dataKey: keyof Fruit | 'actions';
  label: string;
  numeric?: boolean;
  width: number;
}
