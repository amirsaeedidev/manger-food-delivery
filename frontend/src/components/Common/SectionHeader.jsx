/**
 * SectionHeader — a section title with a green "see more" link at the opposite end
 * ("special Offers — See more…", "Weekly Special — See all" in the reference).
 *
 * `size="sm"` is the 15px title used above the offers banner; the default is the 17px title.
 */
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, linkLabel, to, size = 'md', className = '' }) => (
  <div className={`flex items-center justify-between ps-5 pe-6 ${className}`}>
    <h2 className={`font-medium ${size === 'sm' ? 'text-[15px] leading-[22px]' : 'text-[17px] leading-6'}`}>
      {title}
    </h2>
    {linkLabel && to && (
      <Link to={to} className="text-sm text-ui-link">
        {linkLabel}
      </Link>
    )}
  </div>
);

export default SectionHeader;
