import { Link } from '@tanstack/react-router';
export default function Banners() {
    return (<>
<aside className="banners" aria-label="پیشنهادهای فروشگاه">
            <div>
                <h2>صبحانه با طعم تازگی</h2>
                <p>لبنیات تازه برای شروع یک روز خوب</p><Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>دیدن لبنیات</Link>
            </div>
            <div>
                <h2>رنگ‌های تازهٔ طبیعت</h2>
                <p>میوه و سبزی برای سفرهٔ خانواده</p><Link to="/">دیدن دستهٔ میوه</Link>
            </div>
        </aside>
    </>);
}
