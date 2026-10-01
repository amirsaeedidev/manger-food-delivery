/**
 * MenuItem — food card (customer app). Links to the food detail page.
 *
 * Reference metrics (430px frame): 177 × 186 card, 24px radius, white in both themes; the dish
 * picture is 124px and sticks out 35px above the card; the name (17px, 27px line height) sits at the
 * start-bottom with 15px padding and the green price at the end-bottom, on the same last line.
 * The wrapper <li> reserves the 35px the picture sticks out into.
 */
import { Link } from 'react-router-dom';

import { formatCurrency, formatPrice, CURRENCY_LABEL } from '../../utils/formatters';
import FoodImage from '../Common/FoodImage';

const MenuItem = ({ item }) => (
  <li className="pt-[35px]">
    <Link
      to={`/food/${item.id}`}
      aria-label={`${item.name}، ${formatCurrency(item.price)}`}
      className="relative block h-[186px] rounded-[24px] bg-ui-card text-ui-card-fg shadow-soft transition active:scale-[0.98]"
    >
      <FoodImage
        name={item.id}
        alt=""
        shadow="sm"
        className="absolute -top-[35px] left-1/2 h-[124px] w-[124px] -translate-x-1/2"
      />

      <div className="absolute inset-x-[15px] bottom-[14px] flex items-end justify-between gap-2">
        <h3 className="line-clamp-2 min-w-0 text-[17px] font-medium leading-[27px]">{item.name}</h3>
        <p className="shrink-0 whitespace-nowrap text-[16px] font-bold leading-[27px] text-ui-price">
          {formatPrice(item.price)}
          <span className="ms-1 text-[10px] font-medium text-ui-muted">{CURRENCY_LABEL}</span>
        </p>
      </div>
    </Link>
  </li>
);

export default MenuItem;
