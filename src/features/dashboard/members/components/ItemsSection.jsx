import Item from "./Item"


function ItemsSection({ lectureItems }) {
    return <section className="flex flex-wrap items-center pt-16 pb-10 justify-evenly gap-y-8 gap-x-3">
        {lectureItems?.relationships?.items?.map((item, index) => < Item key={index} data={item} />)}
    </section>
}

export default ItemsSection