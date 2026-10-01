/**
 * CustomerHeader — top bar of the home screen: avatar + role + name, notifications and search.
 *
 * Metrics from the "Home" reference (430px frame, mirrored for RTL): 50px avatar, 22px side padding,
 * 12px role label over a 17px semibold name with a small solid caret, 27px bell and 30px search
 * icons 20px apart. The caret marks the (future) account switcher.
 */
import { Link } from 'react-router-dom';

import Avatar from '../Common/Avatar';
import Icon from '../Common/Icon';

const CustomerHeader = ({ name, role, avatar = 'default', onSearchClick }) => (
  <header className="flex items-center justify-between ps-[22px] pe-[26px] pt-4">
    <div className="flex items-center gap-[6px]">
      <Avatar name={avatar} size={50} alt={name} />

      <div>
        <p className="h-4 text-xs leading-4 text-ui-fg">{role}</p>
        <p className="mt-[3px] flex h-6 items-center gap-2 text-[17px] font-semibold leading-6">
          {name}
          <span
            aria-hidden="true"
            className="inline-block h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-current"
          />
        </p>
      </div>
    </div>

    <div className="flex items-center gap-5">
      <Link to="/notifications" aria-label="اعلان‌ها">
        <Icon name="bell" size={27} strokeWidth={1.8} />
      </Link>
      <button type="button" aria-label="جستجو" onClick={onSearchClick}>
        <Icon name="search" size={30} strokeWidth={1.8} />
      </button>
    </div>
  </header>
);

export default CustomerHeader;
