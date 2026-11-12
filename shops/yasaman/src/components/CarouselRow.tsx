import { Link } from '@tanstack/react-router';
import type { Carousel, Offer, Product, Stock } from '../types';
import { toCard, formatNumber } from '../catalog/pricing';
import ProductCard from './ProductCard';
type CarouselRowProps = { carousel: Carousel; products: Product[]; offers: Offer[]; stock: Stock };
export default function CarouselRow({ carousel, products, offers, stock }: CarouselRowProps) {
    const move = (end: boolean): void => {
        const row = document.getElementById('row-' + carousel.id);
        row?.scrollTo({ left: end ? -row.scrollWidth : 0, behavior: 'smooth' });
    };
    return <section className="shop-section" aria-labelledby={carousel.id + '-title'}>
        <div className="section-heading">
            <h2 id={carousel.id + '-title'}>{carousel.emoji} {carousel.title}</h2>
            <Link to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
                مشاهده همه ({formatNumber(products.length)})
            </Link>
        </div>
        {products.length > 0 ? <>
            <div className="carousel-controls">
                <button type="button" onClick={() => move(false)}>رفتن به ابتدا</button>
                <button type="button" onClick={() => move(true)}>رفتن به انتها</button>
            </div>
            <section id={'row-' + carousel.id} className="carousel" tabIndex={0} aria-label={carousel.title}>
                {products.slice(0, 6).map(product => <ProductCard key={product.id}
                    product={toCard(product, offers, stock)} anchor={carousel.id + '-' + product.id} />)}
                <span className="carousel-end" aria-hidden="true" />
            </section>
        </> : <p>کالایی در این فهرست وجود ندارد.</p>}
    </section>;
}
