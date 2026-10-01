/**
 * ComingSoonPage — placeholder for customer tabs that are not built yet
 * (messages, profile, notifications ...).
 */
import { Link } from 'react-router-dom';

import Button from '../components/Common/Button';
import EmptyState from '../components/Common/EmptyState';
import PageHeader from '../components/Layout/PageHeader';

const ComingSoonPage = ({ title = 'به‌زودی' }) => (
  <>
    <PageHeader title={title} />
    <EmptyState
      icon="clock"
      title="به‌زودی"
      message="این بخش در مرحله‌های بعدی پروژه پیاده‌سازی می‌شود."
      action={
        <Button as={Link} to="/" size="md" variant="outline">
          بازگشت به خانه
        </Button>
      }
    />
  </>
);

export default ComingSoonPage;
