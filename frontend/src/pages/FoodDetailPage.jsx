/**
 * FoodDetailPage — one food: picture, price, quantity, description and the order buttons
 * (the light "Food detail" reference, mirrored for RTL, measured at its 375px frame).
 *
 * Vertical rhythm (px, from the middle of the header row):
 *   title +119 · price label +164 · price +189 · "choose quantity" +235 · stepper +303
 *   hero picture 266px from +70 (sticks out 53px past the end edge) · white sheet starts at +369
 * Inside the sheet: 47 → title row → 17 → text → 17 → two 52px buttons (16px gap, 40px sides).
 */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Badge from '../components/Common/Badge';
import Button from '../components/Common/Button';
import EmptyState from '../components/Common/EmptyState';
import FoodImage from '../components/Common/FoodImage';
import Icon from '../components/Common/Icon';
import Loading from '../components/Common/Loading';
import QuantityStepper from '../components/Common/QuantityStepper';
import useFetch from '../hooks/useFetch';
import menuService from '../services/menuService';
import useCartStore, { selectCartCount } from '../store/cartStore';
import { CURRENCY_LABEL, formatNumber, formatPrice } from '../utils/formatters';

const FoodDetail = ({ id }) => {
  const navigate = useNavigate();
  const { data: food, loading } = useFetch(() => menuService.getItem(id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  const addToCart = useCartStore((state) => state.add);
  const cartCount = useCartStore(selectCartCount);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Back to where the user came from; fall back to the home page when the page was opened directly.
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'));

  if (loading && !food) return <Loading className="min-h-dvh" />;

  if (!food) {
    return (
      <EmptyState
        icon="search"
        title="این غذا پیدا نشد"
        message="ممکن است از منو حذف شده باشد."
        action={
          <Button as={Link} to="/" size="md">
            بازگشت به خانه
          </Button>
        }
      />
    );
  }

  const handleAdd = () => {
    addToCart(food.id, quantity);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  const handleOrder = () => {
    addToCart(food.id, quantity);
    navigate('/cart');
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header: back arrow and the cart with its counter */}
      <header className="px-4 pt-3">
        <div className="flex h-12 items-center justify-between">
          <button
            type="button"
            aria-label="بازگشت"
            onClick={goBack}
            className="relative grid h-6 w-6 place-items-center before:absolute before:-inset-3 before:content-['']"
          >
            <Icon name="back" size={24} />
          </button>

          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative grid h-6 w-6 place-items-center before:absolute before:-inset-3 before:content-['']"
          >
            <Icon name="bag" size={20} />
            <Badge count={cartCount} className="absolute start-[11px] top-[13px]" />
          </Link>
        </div>
      </header>

      {/* Title, price, quantity and the big picture */}
      <div className="relative min-h-[345px]">
        <FoodImage
          name={food.id}
          alt={food.name}
          shadow
          className="absolute -end-[53px] top-[46px] h-[266px] w-[266px]"
        />

        <div className="relative w-[calc(100%-213px)] ps-9 pt-[79px]">
          <h1 className="text-[23px] font-semibold leading-8">{food.title || food.name}</h1>

          <p className="mt-5 text-xs leading-[18px] text-ui-muted">قیمت</p>
          <p className="mt-1 text-base font-bold leading-6">
            {formatPrice(food.price)}
            <span className="ms-1 text-xs font-medium text-ui-muted">{CURRENCY_LABEL}</span>
          </p>

          <p className="mt-6 text-sm leading-5 text-ui-muted">انتخاب تعداد</p>
          <QuantityStepper className="mt-[14px]" value={quantity} onChange={setQuantity} />
        </div>
      </div>

      {/* White sheet: description and actions */}
      <section className="flex-1 rounded-t-[31px] bg-ui-sheet px-9 pb-8 pt-[47px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold leading-6">توضیحات</h2>
          <p
            aria-label={`امتیاز ${formatNumber(food.rating)}`}
            className="relative -top-[3px] me-5 flex items-center gap-1 text-sm font-bold text-ui-rating"
          >
            <Icon name="star" size={14} filled strokeWidth={1.5} />
            {formatNumber(food.rating)}
          </p>
        </div>

        <p className="mt-[17px] text-sm leading-6">{food.description}</p>

        {/* Two equal columns (a flex row would make the outlined button wider because of its border) */}
        <div className="mt-[17px] grid grid-cols-2 gap-4 px-1">
          <Button onClick={handleOrder}>سفارش بده</Button>
          <Button variant="outline" onClick={handleAdd}>
            {added ? 'اضافه شد ✓' : 'افزودن به سبد'}
          </Button>
        </div>

        <p role="status" className="sr-only">
          {added ? 'به سبد خرید اضافه شد' : ''}
        </p>
      </section>
    </div>
  );
};

// Re-mounting per food id resets the quantity when the user moves from one food to another.
const FoodDetailPage = () => {
  const { id } = useParams();
  return <FoodDetail key={id} id={id} />;
};

export default FoodDetailPage;
