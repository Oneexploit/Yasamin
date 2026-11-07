import { useState } from 'react';
import { addToCart, removeFromCart } from './cart/rules';
import type { Product, Catalog, CartLine, Sort } from './types';
import Storefront from './components/Storefront';
const SAMPLE: Product[] = [
    { id: 1, categoryId: 1, name: 'سیب قرمز', emoji: '🍎', unit: 'یک کیلوگرم', price: 85000, tags: [] },
    { id: 2, categoryId: 2, name: 'شیر تازه', emoji: '🥛', unit: 'یک لیتر', price: 45000, tags: [] },
    { id: 3, categoryId: 2, name: 'پنیر سفید', emoji: '🧀', unit: '۴۰۰ گرم', price: 75000, tags: [] }
];
const catalog: Catalog = { products: SAMPLE,
    categories: [{ id: 1, name: 'میوه', emoji: '🍎', slug: 'fruit' }, { id: 2, name: 'لبنیات', emoji: '🥛', slug: 'dairy' }],
    offers: [{ productId: 1, percent: 10, label: 'تخفیف' }], stock: { updatedAt: '', items: { 1: 5, 2: 3, 3: 0 } } };
export default function App() {
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [cart, setCart] = useState<CartLine[]>([]);
    const [sort, setSort] = useState<Sort>('default');
    return <Storefront catalog={catalog} cart={cart} selected={categoryId}
        sort={sort} onSort={setSort} onPick={setCategoryId}
        onAdd={id => setCart(previous => addToCart(previous, id, catalog.stock))}
        onRemove={id => setCart(previous => removeFromCart(previous, id))} />;
}
