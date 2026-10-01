/**
 * NotFoundPage — 404 page, rendered for every unknown URL.
 */
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="py-16 text-center">
    <h1 className="mb-2 text-5xl font-bold text-primary">۴۰۴</h1>
    <p className="mb-6 text-slate-600">صفحه‌ای که دنبال آن بودید پیدا نشد.</p>
    <Link to="/" className="font-medium text-primary hover:text-primary-dark">
      بازگشت به صفحه اصلی
    </Link>
  </section>
);

export default NotFoundPage;
