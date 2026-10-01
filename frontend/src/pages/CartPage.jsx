/**
 * CartPage — the shopping cart tab.
 *
 * There is no reference design for this screen yet, so it is built from the same components and
 * tokens (cards, stepper, buttons). Replace it with the Figma design when it is available.
 * Placing the order is not implemented yet: the button stays disabled.
 */
import { Link } from 'react-router-dom';

import Button from '../components/Common/Button';
import EmptyState from '../components/Common/EmptyState';
import FoodImage from '../components/Common/FoodImage';
import Icon from '../components/Common/Icon';
import Loading from '../components/Common/Loading';
import QuantityStepper from '../components/Common/QuantityStepper';
import PageHeader from '../components/Layout/PageHeader';
import useFetch from '../hooks/useFetch';
import menuService from '../services/menuService';
import useCartStore from '../store/cartStore';
import { formatCurrency } from '../utils/formatters';

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);

  const ids = items.map((item) => item.id);
  const { data: foods } = useFetch(() => menuService.getItems(ids), [ids.join('|')]);

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="سبد خرید" />
        <EmptyState
          icon="bag"
          title="سبد خرید خالی است"
          message="غذای مورد علاقه‌ات را انتخاب کن و به سبد اضافه کن."
          action={
            <Button as={Link} to="/" size="md">
              مشاهده‌ی منو
            </Button>
          }
        />
      </>
    );
  }

  if (!foods) {
    return (
      <>
        <PageHeader title="سبد خرید" />
        <Loading />
      </>
    );
  }

  // Join the stored quantities with the current menu data (unknown foods are dropped).
  const rows = items
    .map((item) => ({ ...item, food: foods.find((food) => food.id === item.id) }))
    .filter((row) => row.food);
  const total = rows.reduce((sum, row) => sum + row.food.price * row.quantity, 0);

  return (
    <>
      <PageHeader title="سبد خرید" />

      <ul className="space-y-3 px-6">
        {rows.map(({ food, quantity }) => (
          <li key={food.id} className="flex items-center gap-3 rounded-2xl bg-ui-sheet p-3 shadow-soft">
            <FoodImage name={food.id} alt="" shadow="sm" className="h-16 w-16" />

            <div className="min-w-0 flex-1">
              <Link to={`/food/${food.id}`} className="block truncate text-[15px] font-semibold">
                {food.name}
              </Link>
              <p className="mt-0.5 text-xs text-ui-muted">{formatCurrency(food.price)}</p>
              <QuantityStepper
                className="mt-2"
                value={quantity}
                onChange={(next) => setQuantity(food.id, next)}
              />
            </div>

            <button
              type="button"
              aria-label={`حذف ${food.name}`}
              onClick={() => remove(food.id)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ui-muted transition active:scale-95"
            >
              <Icon name="trash" size={20} />
            </button>
          </li>
        ))}
      </ul>

      <section className="mx-6 mt-5 rounded-2xl bg-ui-sheet p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-[15px] text-ui-muted">جمع کل</span>
          <span data-testid="cart-total" className="text-lg font-bold text-ui-price">
            {formatCurrency(total)}
          </span>
        </div>

        <Button fullWidth className="mt-4" disabled>
          ثبت سفارش
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-ui-muted">
          ثبت سفارش در مرحله‌ی بعدی پروژه فعال می‌شود.
        </p>
      </section>
    </>
  );
};

export default CartPage;
