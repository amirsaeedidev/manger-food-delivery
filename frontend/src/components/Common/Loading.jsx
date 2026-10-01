/**
 * Loading — centered spinner (with an accessible label).
 */
const Loading = ({ label = 'در حال بارگذاری...', className = 'py-16' }) => (
  <div role="status" className={`grid place-items-center ${className}`}>
    <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-ui-line border-t-ui-accent" />
    <span className="sr-only">{label}</span>
  </div>
);

export default Loading;
