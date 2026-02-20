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
