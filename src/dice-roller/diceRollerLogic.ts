export const DICE_OPTIONS = [3, 4, 6, 8, 10, 12, 20] as const;
export const AGGREGATION_OPTIONS = ['sum', 'product', 'average', 'min', 'max', 'median', 'none'] as const;
export const HISTORY_STORAGE_KEY = 'charvy:dice-roller-history';
export const MAX_HISTORY_ITEMS = 50;
export const MAX_DICE_COUNT = 100;

export type AggregationMethod = (typeof AGGREGATION_OPTIONS)[number];

export type HistoryItem = {
  timestamp: string;
  sides: number;
  count: number;
  method: AggregationMethod;
  rolls: number[];
  aggregate: number | null;
};

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDice(sides: number, count: number): number[] {
  return Array.from({ length: count }, () => rollDie(sides));
}

export function aggregate(rolls: number[], method: AggregationMethod): number | null {
  if (!rolls.length || method === 'none') {
    return null;
  }

  switch (method) {
    case 'sum':
      return rolls.reduce((total, value) => total + value, 0);
    case 'product':
      return rolls.reduce((total, value) => total * value, 1);
    case 'average':
      return rolls.reduce((total, value) => total + value, 0) / rolls.length;
    case 'min':
      return Math.min(...rolls);
    case 'max':
      return Math.max(...rolls);
    case 'median': {
      const sorted = [...rolls].sort((a, b) => a - b);
      const middleIndex = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
      }
      return sorted[middleIndex];
    }
    default:
      return null;
  }
}

export const formatAggregateValue = (value: number, method: AggregationMethod): string => {
  if (method === 'average') {
    return value.toFixed(2);
  }

  return Number.isInteger(value) ? String(value) : value.toFixed(2);
};

export const safeParseHistory = (value: string | null): HistoryItem[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as HistoryItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
};
