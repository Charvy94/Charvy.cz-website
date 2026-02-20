import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AGGREGATION_OPTIONS,
  DICE_OPTIONS,
  HISTORY_STORAGE_KEY,
  MAX_DICE_COUNT,
  MAX_HISTORY_ITEMS,
  aggregate,
  formatAggregateValue,
  rollDice,
  safeParseHistory,
  type AggregationMethod,
  type HistoryItem,
} from '@/dice-roller/diceRollerLogic';
import './diceRoller.css';

const methodLabels: Record<AggregationMethod, string> = {
  sum: 'Sum',
  product: 'Product',
  average: 'Average',
  min: 'Min',
  max: 'Max',
  median: 'Median',
  none: 'None',
};

export function DiceRoller() {
  const [open, setOpen] = useState(false);
  const [sides, setSides] = useState<number>(6);
  const [count, setCount] = useState<number>(1);
  const [method, setMethod] = useState<AggregationMethod>('sum');
  const [showAnimation, setShowAnimation] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = safeParseHistory(window.localStorage.getItem(HISTORY_STORAGE_KEY));
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const lastRoll = history[0] ?? null;

  const productSafetyWarning = useMemo(() => {
    if (!lastRoll || lastRoll.method !== 'product' || lastRoll.aggregate === null) {
      return null;
    }

    if (Math.abs(lastRoll.aggregate) > Number.MAX_SAFE_INTEGER) {
      return 'Warning: Product exceeds Number.MAX_SAFE_INTEGER, so precision may be reduced.';
    }

    return null;
  }, [lastRoll]);

  const performRoll = () => {
    setRolling(showAnimation);

    const executeRoll = () => {
      const clampedCount = Math.min(Math.max(count, 1), MAX_DICE_COUNT);
      const newRolls = rollDice(sides, clampedCount);
      const aggregateValue = aggregate(newRolls, method);

      const newHistoryEntry: HistoryItem = {
        timestamp: new Date().toISOString(),
        sides,
        count: clampedCount,
        method,
        rolls: newRolls,
        aggregate: aggregateValue,
      };

      setHistory((previous) => [newHistoryEntry, ...previous].slice(0, MAX_HISTORY_ITEMS));
      setRolling(false);
    };

    if (showAnimation) {
      window.setTimeout(executeRoll, 450);
      return;
    }

    executeRoll();
  };

  const clearHistory = () => {
    setHistory([]);
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ttrpg" size="lg">Open Dice Roller</Button>
      </DialogTrigger>
      <DialogContent className="dice-roller-dialog max-w-3xl p-0">
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle>Dice Roller</DialogTitle>
            <DialogDescription>
              Roll virtual dice and keep your last {MAX_HISTORY_ITEMS} results.
            </DialogDescription>
          </DialogHeader>

          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              performRoll();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="dice-type" className="text-sm font-medium">Dice type</label>
                <select
                  id="dice-type"
                  className="dice-roller-input"
                  value={sides}
                  onChange={(event) => setSides(Number(event.target.value))}
                >
                  {DICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      d{option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="dice-count" className="text-sm font-medium">Quantity (1-{MAX_DICE_COUNT})</label>
                <input
                  id="dice-count"
                  className="dice-roller-input"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_DICE_COUNT}
                  step={1}
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="aggregation" className="text-sm font-medium">Aggregation</label>
                <select
                  id="aggregation"
                  className="dice-roller-input"
                  value={method}
                  onChange={(event) => setMethod(event.target.value as AggregationMethod)}
                >
                  {AGGREGATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {methodLabels[option]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={showAnimation}
                onChange={(event) => setShowAnimation(event.target.checked)}
              />
              Show animation
            </label>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={rolling}>
                {rolling ? 'Rolling…' : 'Roll'}
              </Button>
              <Button type="button" variant="outline" onClick={clearHistory}>
                Clear history
              </Button>
            </div>
          </form>

          <section className="mt-8 space-y-4" aria-live="polite">
            <h3 className="text-lg font-semibold">Last Roll</h3>
            {rolling && <p className="dice-roller-rolling">Rolling dice...</p>}
            {!rolling && !lastRoll && <p className="text-muted-foreground">No rolls yet.</p>}
            {!rolling && lastRoll && (
              <div className="rounded-lg border p-4 text-sm space-y-2">
                <p className="font-medium">Rolled {lastRoll.count} × d{lastRoll.sides}</p>
                <p>Individual results: [{lastRoll.rolls.join(', ')}]</p>
                {lastRoll.aggregate !== null && (
                  <p>
                    {methodLabels[lastRoll.method]} = {formatAggregateValue(lastRoll.aggregate, lastRoll.method)}
                  </p>
                )}
                {productSafetyWarning && <p className="text-amber-600">{productSafetyWarning}</p>}
              </div>
            )}
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-semibold">Roll History</h3>
            <div className="dice-roller-history mt-3 rounded-lg border p-3">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">History is empty.</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((entry, index) => (
                    <li key={`${entry.timestamp}-${index}`} className="rounded-md border p-3 text-sm">
                      <p className="font-medium">{new Date(entry.timestamp).toLocaleString()}</p>
                      <p>
                        {entry.count} × d{entry.sides} · {methodLabels[entry.method]}
                      </p>
                      <p>Rolls: [{entry.rolls.join(', ')}]</p>
                      {entry.aggregate !== null && (
                        <p>
                          Aggregate: {formatAggregateValue(entry.aggregate, entry.method)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
