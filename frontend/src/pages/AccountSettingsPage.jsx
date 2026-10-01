/**
 * AccountSettingsPage — settings tab of the customer app.
 * (The admin panel settings are in SettingsPage.)
 *
 * Today it only holds the theme switch; language and notification options will be added later.
 */
import { ThemeSwitch } from '../components/Common/ThemeToggle';
import PageHeader from '../components/Layout/PageHeader';

const AccountSettingsPage = () => (
  <>
    <PageHeader title="تنظیمات" />

    <div className="space-y-3 px-6">
      <div className="rounded-2xl bg-ui-sheet p-4 shadow-soft">
        <ThemeSwitch label="حالت تیره" />
      </div>

      <div className="rounded-2xl bg-ui-sheet p-4 opacity-60 shadow-soft">
        <div className="flex items-center justify-between text-[15px] font-medium">
          <span>زبان</span>
          <span className="text-sm text-ui-muted">فارسی (به‌زودی بیشتر)</span>
        </div>
      </div>
    </div>
  </>
);

export default AccountSettingsPage;
