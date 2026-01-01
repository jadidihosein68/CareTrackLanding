interface RecentlyViewedItem {
  speciesId: string;
  timestamp: number;
}

const STORAGE_KEY = "recentlyViewed";
const MAX_ITEMS = 5;

export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecentlyViewedItem[];
  } catch {
    return [];
  }
}

export function addToRecentlyViewed(speciesId: string): void {
  if (typeof window === "undefined") return;

  try {
    let items = getRecentlyViewed();
    items = items.filter((item) => item.speciesId !== speciesId);
    items.unshift({
      speciesId,
      timestamp: Date.now(),
    });
    items = items.slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // no-op for storage failures
  }
}

export function clearRecentlyViewed(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op for storage failures
  }
}
