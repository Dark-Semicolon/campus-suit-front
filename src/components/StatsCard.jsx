function StatsCard({ title, data, icon }) {
  return (
    <div className="border-3 rounded-xl py-10 w-52 md:w-80 max-w-[350px] bg-white flex flex-col gap-5 justify-center items-center">
      <h4 className="font-semibold text-md md:text-2xl text-gray-color-primary">
        {title}
      </h4>
      <span className="text-5xl text-gray-color-primary">

        {icon}
      </span>
      <p className="text-sm font-medium md:text-lg text-blue-color-light">
        {data}
      </p>
    </div>
  );
}

export default StatsCard;
