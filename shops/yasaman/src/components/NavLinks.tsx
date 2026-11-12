import { Link } from '@tanstack/react-router';
export default function NavLinks() {
    return <>
        <Link onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')} to="/">خانه و دسته‌بندی‌ها</Link>
        <Link onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')} to="/plp/$carouselId" params={{ carouselId: 'offers' }}>پیشنهاد ویژه امروز</Link>
        <Link onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')} to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link>
    </>;
}
