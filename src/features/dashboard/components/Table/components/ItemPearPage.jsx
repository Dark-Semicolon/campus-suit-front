function ItemPearPage({ rowsNumber, onChange }) {
    return (
        <label className="flex items-center font-medium text-blue-color-primary text-md">
            items per page:
            <select
                className="font-medium bg-transparent outline-none text-blue-color-primary text-md"
                value={rowsNumber}
                onChange={onChange}
            >
                <option value="5" className="text-blue-color-primary">5</option>
                <option value="10" className="text-blue-color-primary">10</option>
                <option value="15" className="text-blue-color-primary">15</option>
            </select>
        </label>
    )
}

export default ItemPearPage