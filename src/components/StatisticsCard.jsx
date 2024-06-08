function StatisticsCard({
    img,
    title,
    imgClassName,
    titleClassName,
    number,
    width = "xl:w-1/3",
}) {
    return (
        <div
            className={`flex flex-wrap items-center justify-center w-full gap-8 px-5 py-5 bg-white rounded-lg ${width}`}
        >
            <div className="w-36">
                <div
                    className={`${imgClassName} border-b-2 rounded-full h-fit `}
                >
                    <img src={img} className="w-full" alt="" />
                </div>
            </div>
            <div className="w-1/2">
                <div className={`${titleClassName} `}>
                    <p className="w-full text-xl font-extrabold text-nowrap">
                        {title}
                    </p>
                    <span className="text-xl font-extrabold text-blue-color-light">
                        {number}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StatisticsCard;
