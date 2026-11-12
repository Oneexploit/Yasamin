import { useCatalog } from '../../hooks/useCatalog';
import { carouselProducts } from '../../catalog/carousels';
import Hero from '../Hero';
import CategoryNav from '../CategoryNav';
import CarouselRow from '../CarouselRow';
import Banners from '../Banners';
import Status from '../Status';
import CartPanel from '../CartPanel';
export default function HomePage() {
    const state = useCatalog();
    return <>
        <Hero />
        <Status state={state} />
        {state.status === 'success' && <>
            <CategoryNav categories={state.data.categories} />
            {state.data.home.carousels.map(carousel => <CarouselRow key={carousel.id} carousel={carousel}
                products={carouselProducts(state.data, carousel.id) ?? []}
                offers={state.data.offers} stock={state.data.stock} />)}
            <Banners />
            <CartPanel products={state.data.products} offers={state.data.offers} />
        </>}
    </>;
}
