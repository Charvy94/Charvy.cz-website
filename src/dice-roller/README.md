# Dice Roller component

Entrypoint: `src/dice-roller/diceRoller.tsx`

## Usage

```tsx
import { DiceRoller } from '@/dice-roller/diceRoller';

export function TTRPGTools() {
  return <DiceRoller />;
}
```

The component renders an **Open Dice Roller** button and handles modal open/close, rolling logic, and history persistence.

## UI notes

- Aggregation option label for `none`: **Only show results (no aggregation)**
- Roll value highlighting:
  - `1` is shown in red
  - value equal to selected die sides is shown in green
