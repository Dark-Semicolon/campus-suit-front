function ItemPearPage({ rowsNumber, onChange }) {
    return (
        <label className="flex items-center text-black text-md">
            عدد الصفوف بالصفحه:
            <select
                className="text-black bg-transparent outline-none text-md"
                value={rowsNumber}
                onChange={onChange}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </label>
    )
}

export default ItemPearPage