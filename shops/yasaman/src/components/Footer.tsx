import { Link } from '@tanstack/react-router';
export default function Footer() {
    return (<>
<footer id="about">
        <div className="footer-content">
            <div>
                <h2>دربارهٔ سوپرمارکت یاسمن</h2><span className="target-note">اینجا هستید</span>
                <p>فروشگاه کوچک محلهٔ ما؛ همراه خریدهای روزانهٔ شما.</p>
                <address>آدرس نمونه: تهران، خیابان بهار، پلاک ۱۲<br />تلفن نمونه: <a href="tel:+982112345678"><bdi
                            dir="ltr">۰۲۱‑۱۲۳۴۵۶۷۸</bdi></a></address>
            </div>
            <div>
                <h2>دسته‌بندی‌ها</h2>
                <div className="footer-links">
                    <Link to="/plp/$carouselId" params={{ carouselId: 'offers' }}>پیشنهاد ویژه امروز</Link>
                    <Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link>
                </div>
            </div>
            <div>
                <h2>ساعت کاری</h2>
                <p>هر روز از ۸ صبح تا ۱۰ شب</p>
                <Link to="/">بازگشت به خانه</Link>
            </div>
        </div>
        <p className="copyright">© ۱۴۰۵ سوپرمارکت یاسمن؛ همهٔ حقوق محفوظ است.</p>
    </footer>
    </>);
}
