import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useCartStore } from '../hooks/useCartStore';
import { cartCount } from '../cart/rules';
import { formatNumber } from '../catalog/pricing';
import ThemeToggle from './ThemeToggle';
import NavLinks from './NavLinks';
export default function Header() {
    const count = useCartStore(state => cartCount(state.lines));
    useEffect(() => {
        document.title = '🛒 ' + formatNumber(count) + ' · سوپرمارکت یاسمن';
    }, [count]);
    return <header className="header">
        <div className="header-content">
            <Link className="brand" to="/">
                <svg width="54" height="54" viewBox="0 0 64 64" role="img" aria-labelledby="logo-title">
                    <title id="logo-title">لوگوی سوپرمارکت یاسمن</title>
                    <circle cx="32" cy="32" r="30" fill="#e9f4ed" />
                    <rect x="14" y="27" width="36" height="24" rx="5" fill="#24583e" />
                    <rect x="21" y="17" width="22" height="18" rx="8" fill="none" stroke="#24583e" strokeWidth="4" />
                    <ellipse cx="31" cy="37" rx="5" ry="9" fill="#f4d77b" />
                    <ellipse cx="39" cy="33" rx="7" ry="4" fill="#f4d77b" />
                </svg>
                <span><strong>سوپرمارکت یاسمن</strong><small>تازگی، نزدیک خانهٔ شما</small></span>
            </Link>
            <ThemeToggle />
            <Link className="cart" to="/" hash="cart-panel">سبد خرید <span>{formatNumber(count)}</span></Link>
        </div>
        <nav aria-label="منوی اصلی">
            <details className="mobile-menu"><summary>☰ منوی فروشگاه</summary><div><NavLinks /></div></details>
            <div className="desktop-menu"><NavLinks /></div>
        </nav>
    </header>;
}
