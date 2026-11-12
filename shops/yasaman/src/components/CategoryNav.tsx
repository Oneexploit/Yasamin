import { Link } from '@tanstack/react-router';
import type { Category } from '../types';
type CategoryNavProps = { categories: Category[] };
export default function CategoryNav({ categories }: CategoryNavProps) {
    return <section id="categories" className="categories" aria-labelledby="categories-title">
        <h2 id="categories-title">چه چیزی لازم داری؟</h2>
        <div className="category-list">
            {categories.map(category => <Link key={category.id} to="/plp/$carouselId"
                params={{ carouselId: category.slug }}>
                <span aria-hidden="true">{category.emoji}</span>{category.name}
            </Link>)}
        </div>
    </section>;
}
