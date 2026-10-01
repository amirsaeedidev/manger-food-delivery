/**
 * MenuList — two-column grid of food cards.
 *
 * Reference metrics (430px frame): 23px side padding, 30px between columns, 16px between a card
 * and the picture of the next row (each card wrapper also holds the 35px its picture sticks out).
 */
import EmptyState from '../Common/EmptyState';

import MenuItem from './MenuItem';

const MenuList = ({ items, emptyMessage = 'غذایی پیدا نشد.' }) => {
  if (items.length === 0) {
    return <EmptyState icon="search" title={emptyMessage} message="عبارت دیگری را جستجو کنید یا دسته‌بندی را عوض کنید." />;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-[30px] gap-y-4 px-[23px]">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MenuList;
