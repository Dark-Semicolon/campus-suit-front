import HeroLinks from './HeroLinks';

function DashboardHeader({ pageName, pages, className }) {
  return (
    <div className={className}>
      <p className="pb-4 font-semibold text-blue-color-primary">{pageName}</p>
      <HeroLinks pages={pages} />
    </div>
  );
}

export default DashboardHeader;
