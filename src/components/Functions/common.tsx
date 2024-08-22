export function formatAmount(amount: number): string {
    const absAmount = Math.abs(amount);
    let formatted: string;

    if (absAmount >= 1_000_000_000) {
      formatted = (absAmount / 1_000_000_000).toFixed(0) + " B";
    } else if (absAmount >= 1_000_000) {
      formatted = (absAmount / 1_000_000).toFixed(0) + " M";
    } else if (absAmount >= 1_000) {
      formatted = (absAmount / 1_000).toFixed(0) + " K";
    } else {
      formatted = absAmount.toFixed(0);
    }

    return amount < 0 ? `-${formatted}` : formatted;
  }

