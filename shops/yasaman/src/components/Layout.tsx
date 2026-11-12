import { Outlet, Link } from '@tanstack/react-router';
import { useThemeStore } from '../hooks/useThemeStore';
import Header from './Header';
import Footer from './Footer';
export default function Layout() {
    const theme = useThemeStore(state => state.theme);
    return <div className="app" data-theme={theme}>
        <Link className="skip-link" to="." hash="main">پرش به محتوای اصلی</Link>
        <div className="announcement">هر روز تازه، هر روز نزدیک شما</div>
        <Header />
        <main id="main" tabIndex={-1}><Outlet /></main>
        <Footer />
    </div>;
}
