/**
 * MenuCategory — horizontally scrollable category row ("Vegetarian, Cake, Beer, Others, Burger ...").
 *
 * Reference metrics (430px frame): 36px icons, 7px gap to the 12px label, 28px between items,
 * 28px padding at the start. The row keeps scrolling past the edge so the last visible item is
 * cut off, exactly like in the design. Icons come from src/assets/categories/<id>.* (see
 * src/assets/index.js) and fall back to a line icon.
 *
 * `active` is the selected category id (or null); clicking it again clears the selection.
 */
import { categoryIcons } from '../../assets';
import Icon from '../Common/Icon';

const MenuCategory = ({ categories, active = null, onSelect }) => (
  <nav aria-label="دسته‌بندی‌ها">
    <ul className="flex gap-7 overflow-x-auto ps-7 pe-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const selected = category.id === active;
        const src = categoryIcons[category.id];

        return (
          <li key={category.id} className="shrink-0">
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(selected ? null : category.id)}
              className="flex flex-col items-center gap-[7px]"
            >
              <span className="grid h-9 w-9 place-items-center">
                {src ? (
                  <img src={src} alt="" draggable="false" className="h-9 w-9 object-contain" />
                ) : (
                  <Icon
                    name={category.icon}
                    size={30}
                    strokeWidth={1.7}
                    className={selected ? 'text-ui-link' : 'text-ui-accent'}
                  />
                )}
              </span>
              <span
                className={`max-w-[64px] truncate text-xs leading-4 ${
                  selected ? 'font-bold text-ui-link' : 'text-ui-fg'
                }`}
              >
                {category.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default MenuCategory;
