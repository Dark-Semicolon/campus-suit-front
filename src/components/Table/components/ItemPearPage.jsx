function ItemPearPage({ rowsNumber, onChange }) {
    return (
        <label className="flex items-center font-semibold text-blue-color-primary text-md">
            Item Per Page
            <select
                className="font-semibold bg-transparent outline-none text-blue-color-primary text-md"
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