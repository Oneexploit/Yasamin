import type { Product, Offer, Stock } from '../types';
import { toCard } from '../catalog/pricing';
import ProductCard from './ProductCard';
type ProductGridProps = { products: Product[]; offers: Offer[]; stock: Stock };
export default function ProductGrid({ products, offers, stock }: ProductGridProps) {
    return products.length > 0 ? <div className="product-grid">
        {products.map(product => <ProductCard key={product.id}
            product={toCard(product, offers, stock)} anchor={'plp-' + product.id} />)}
    </div> : <p className="load-status">کالایی در این فهرست وجود ندارد.</p>;
}
