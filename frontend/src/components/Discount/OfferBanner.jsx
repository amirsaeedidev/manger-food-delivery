/**
 * OfferBanner — the green "special offer" banner (e.g. "30% off chicken burger").
 *
 * Reference metrics (430px frame): 370 × 193, 32px radius, brand green with a lighter diagonal
 * wedge in the lower corner, a 74px bold percentage, two 30px lines, and the dish picture at the
 * opposite end. The decoration is mirrored in RTL together with the layout.
 * The picture comes from src/assets/banners/<offer id>.* or the food picture in src/assets/foods/
 * (see src/assets/index.js); a translucent plate with an icon is drawn until it exists.
 */
import { Link } from 'react-router-dom';

import { bannerImages, foodImages } from '../../assets';
import Icon from '../Common/Icon';
import { formatPercent } from '../../utils/formatters';

const OfferBanner = ({ offer, className = '' }) => {
  const src = bannerImages[offer.id] || foodImages[offer.foodId];

  return (
    <Link
      to={`/food/${offer.foodId}`}
      aria-label={`${formatPercent(offer.percent)} ${offer.headline} ${offer.title}`}
      className={`relative block h-[193px] overflow-hidden rounded-[32px] bg-ui-accent text-white ${className}`}
    >
      {/* Lighter diagonal wedge (decorative) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-white/40 [clip-path:polygon(0_62%,100%_6%,100%_100%,0_100%)] rtl:-scale-x-100"
      />

      <div className="relative ps-7 pt-5">
        <p className="text-[74px] font-extrabold leading-[74px]">{formatPercent(offer.percent)}</p>
        <p className="mt-[18px] text-[30px] font-semibold leading-[30px]">{offer.headline}</p>
        <p className="text-[30px] font-semibold leading-[30px]">{offer.title}</p>
      </div>

      <div className="absolute end-0 top-[19px] grid h-[155px] w-[150px] place-items-center">
        {src ? (
          <img src={src} alt="" draggable="false" className="h-full w-full object-contain" />
        ) : (
          <span className="grid h-[140px] w-[140px] place-items-center rounded-full bg-white/25 text-white">
            <Icon name="burger" size={72} strokeWidth={1.3} />
          </span>
        )}
      </div>
    </Link>
  );
};

export default OfferBanner;
