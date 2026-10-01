/**
 * CustomerNotFoundPage — 404 page of the customer app (themed, shown inside CustomerLayout).
 * The admin panel has its own light 404 page: NotFoundPage.
 */
import { Link } from 'react-router-dom';

import Button from '../components/Common/Button';
import EmptyState from '../components/Common/EmptyState';

const CustomerNotFoundPage = () => (
  <EmptyState
    icon="search"
    title="۴۰۴ — صفحه پیدا نشد"
    message="صفحه‌ای که دنبال آن بودید وجود ندارد یا جابه‌جا شده است."
    action={
      <Button as={Link} to="/" size="md">
        بازگشت به خانه
      </Button>
    }
  />
);

export default CustomerNotFoundPage;
