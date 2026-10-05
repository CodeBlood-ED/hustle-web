import { computed, effect, Injectable, signal } from '@angular/core';
import {
  getModelLabel,
  parsePrice,
  resolveCatalogModel,
} from '../../features/components/landing/category/product-data';

export interface CartProduct {
  id: number;
  name: string;
  price: string;
  accent: string;
}

export interface CartEntry extends CartProduct {
  model: string;
  modelLabel: string;
  quantity: number;
  unitPrice: number;
}

const STORAGE_KEY = 'hustle-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly entriesState = signal<CartEntry[]>(this.readStoredEntries());
  readonly entries = this.entriesState.asReadonly();
  readonly itemCount = computed(() =>
    this.entriesState().reduce((count, entry) => count + entry.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.entriesState().reduce((total, entry) => total + entry.unitPrice * entry.quantity, 0),
  );

  constructor() {
    effect(() => {
      this.writeStoredEntries(this.entriesState());
    });
  }

  addProduct(product: CartProduct, model: string): void {
    const slug = resolveCatalogModel(model) ?? model.trim().toLowerCase();
    const key = this.getKey(product.id, slug);

    this.entriesState.update((entries) => {
      const existing = entries.find((entry) => this.getKey(entry.id, entry.model) === key);
      if (existing) {
        return entries.map((entry) =>
          this.getKey(entry.id, entry.model) === key
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }

      return [
        ...entries,
        {
          ...product,
          model: slug,
          modelLabel: getModelLabel(slug),
          quantity: 1,
          unitPrice: parsePrice(product.price),
        },
      ];
    });
  }

  decrement(productId: number, model: string): void {
    const key = this.getKey(productId, model);
    this.entriesState.update((entries) =>
      entries
        .map((entry) =>
          this.getKey(entry.id, entry.model) === key
            ? { ...entry, quantity: entry.quantity - 1 }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }

  increment(productId: number, model: string): void {
    const key = this.getKey(productId, model);
    this.entriesState.update((entries) =>
      entries.map((entry) =>
        this.getKey(entry.id, entry.model) === key
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry,
      ),
    );
  }

  remove(productId: number, model: string): void {
    const key = this.getKey(productId, model);
    this.entriesState.update((entries) =>
      entries.filter((entry) => this.getKey(entry.id, entry.model) !== key),
    );
  }

  clear(): void {
    this.entriesState.set([]);
  }

  private getKey(productId: number, model: string): string {
    return `${resolveCatalogModel(model) ?? model}:${productId}`;
  }

  private readStoredEntries(): CartEntry[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((entry) => this.normalizeEntry(entry))
        .filter((entry): entry is CartEntry => entry !== null);
    } catch {
      return [];
    }
  }

  private writeStoredEntries(entries: CartEntry[]): void {
    if (typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage quota / private-mode failures.
    }
  }

  private normalizeEntry(value: unknown): CartEntry | null {
    if (!value || typeof value !== 'object') return null;

    const entry = value as Partial<CartEntry>;
    const id = Number(entry.id);
    const quantity = Number(entry.quantity);
    const model = resolveCatalogModel(entry.model) ?? String(entry.model ?? '').trim().toLowerCase();

    if (!Number.isFinite(id) || !model || !entry.name || quantity < 1) return null;

    return {
      id,
      name: String(entry.name),
      price: String(entry.price ?? ''),
      accent: String(entry.accent ?? '#0d917e'),
      model,
      modelLabel: getModelLabel(model),
      quantity: Math.floor(quantity),
      unitPrice: Number(entry.unitPrice) || parsePrice(String(entry.price ?? '')),
    };
  }
}
