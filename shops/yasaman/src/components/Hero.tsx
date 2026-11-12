import { Link } from '@tanstack/react-router';
export default function Hero() {
    return (<>
<section className="hero" aria-labelledby="hero-title">
            <div>
                <p>به فروشگاه محلهٔ خودت خوش آمدی</p>
                <h1 id="hero-title">یک سبد تازگی،<br />برای هر روز زندگی</h1>
                <p>از صبحانه تا شام، همراه سفرهٔ شما هستیم.</p><Link className="primary-link" to="/plp/$carouselId" params={{ carouselId: 'offers' }}>دیدن پیشنهادهای
                    امروز</Link>
            </div>
            <span className="hero-icon" aria-hidden="true">🛒</span>
        </section>
    </>);
}
