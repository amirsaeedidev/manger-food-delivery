/**
 * HomePage — home screen of the customer app (the dark "Home" reference, mirrored for RTL).
 *
 * Order of the sections and the gaps between them follow the reference (430px frame):
 *   header → 16 → search → 15 → "special offers" → 18 → banner → 11 → categories
 *   → 27 → "weekly special" → 11 → two-column food grid
 * Typing in the search box or choosing a category replaces the weekly specials with the matching foods.
 */
import { useRef, useState } from 'react';

import Loading from '../components/Common/Loading';
import SectionHeader from '../components/Common/SectionHeader';
import OfferBanner from '../components/Discount/OfferBanner';
import CustomerHeader from '../components/Layout/CustomerHeader';
import MenuCategory from '../components/Menu/MenuCategory';
import MenuList from '../components/Menu/MenuList';
import MenuSearch from '../components/Menu/MenuSearch';
import useFetch from '../hooks/useFetch';
import menuService from '../services/menuService';
import { formatNumber } from '../utils/formatters';

// TODO: read the signed-in user from authStore once authentication is implemented.
const GUEST = { name: 'مهمان عزیز', role: 'مشتری' };

const HomePage = () => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const filtering = Boolean(query.trim() || category);

  const { data: categories } = useFetch(() => menuService.listCategories(), []);
  const { data: offers } = useFetch(() => menuService.listOffers(), []);
  // While a new request is running the previous list stays on screen (no flicker while typing).
  const { data: items } = useFetch(
    () => menuService.listItems(filtering ? { category, query } : { weekly: true }),
    [category, query]
  );

  const offer = offers?.[0];

  return (
    <>
      <CustomerHeader
        name={GUEST.name}
        role={GUEST.role}
        onSearchClick={() => searchRef.current?.focus()}
      />

      <MenuSearch ref={searchRef} value={query} onChange={setQuery} className="mx-[23px] mt-4" />

      <SectionHeader
        size="sm"
        title="پیشنهادهای ویژه"
        linkLabel="مشاهده‌ی بیشتر…"
        to="/offers"
        className="mt-[15px]"
      />
      {offer && <OfferBanner offer={offer} className="mx-[30px] mt-[18px]" />}

      {categories && (
        <div className="mt-[11px]">
          <MenuCategory categories={categories} active={category} onSelect={setCategory} />
        </div>
      )}

      {filtering ? (
        <SectionHeader
          title={`نتایج${items ? ` (${formatNumber(items.length)})` : ''}`}
          className="mt-[27px]"
        />
      ) : (
        <SectionHeader title="ویژه‌ی هفته" linkLabel="مشاهده‌ی همه" to="/menu" className="mt-[27px]" />
      )}

      <div className="mt-[11px]">{items ? <MenuList items={items} /> : <Loading />}</div>
    </>
  );
};

export default HomePage;
