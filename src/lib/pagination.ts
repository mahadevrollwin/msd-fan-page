/** Compact page window around the current page for numbered pagination. */
export function visiblePageNumbers(current: number, total: number, windowSize = 5) {
  if (total <= 1) return [1];
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  let end = start + windowSize - 1;

  if (end > total) {
    end = total;
    start = end - windowSize + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
