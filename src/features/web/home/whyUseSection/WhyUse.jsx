import StickyNote from "./StickyNote"

function WhyUse() {
    return (
        <section className="relative py-16 md:py-32">
            <img src="/images/home/whyUseSection/whySectionWave.svg" alt="image for ui" className="absolute top-0 right-0 hidden min-[999px]:block w-[200px] xl:w-[250px]" />
            <div className="container flex flex-col items-center justify-center mx-auto">

                <header className="mb-10 text-center">
                    <h2 className="pb-3 text-3xl font-bold tracking-wide md:text-6xl text-yellow-color-primary">لماذا تختار</h2>
                    <p className="text-2xl font-semibold md:text-3xl text-blue-color-primary">مستر محمد توفيق</p>
                </header>
                <div className="flex flex-wrap items-center justify-center gap-10 pt-5">
                    <StickyNote icon='/images/home/whyUseSection/icon1.svg' title='فيديوهات شرح' description="محاضرات شرح شيقة ومتميزة واحترافية" />
                    <StickyNote icon='/images/home/whyUseSection/icon3.svg' title='تدريبات عمـــلية' description="أسئلة تغطي كافة أجزاء المنهج و جميع المستويات" />
                    <StickyNote icon='/images/home/whyUseSection/icon2.svg' title='اختبارات الـــكترونية' description="اختبارات جزئية و شاملة حسب النظام الحديث" />
                </div>
            </div>
        </section>
    )
}

export default WhyUse