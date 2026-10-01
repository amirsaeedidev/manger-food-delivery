/**
 * EmptyState — centered icon, title, message and optional action.
 * Used for "coming soon", "page not found" and "the cart is empty".
 */
import Icon from './Icon';

const EmptyState = ({ icon = 'utensils', title, message, action }) => (
  <section className="flex flex-col items-center px-8 py-16 text-center">
    <span className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-ui-sheet text-ui-muted shadow-soft">
      <Icon name={icon} size={34} strokeWidth={1.6} />
    </span>
    <h2 className="mb-2 text-lg font-bold">{title}</h2>
    {message && <p className="mb-6 text-sm leading-7 text-ui-muted">{message}</p>}
    {action}
  </section>
);

export default EmptyState;
