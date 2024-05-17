function apiOperations({
    queryLink,
    page,
    perPage,
    fields,
    filter,
    sortBy,
    searchValue,
    filterAndSortAndPageQuery,
}) {
    let query = queryLink;

    // Use provided filter, sort, and page query
    if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

    // Fields
    if (fields)
        query += `${query.includes("?") ? "&" : "?"}fields=${
            Array.isArray(fields) ? fields.join(",") : fields
        }`;

    // Search
    if (searchValue) query += `${query.includes("?") ? "&" : "?"}search=${searchValue}`;

    // Filter
    if (filter) {
        const filterQuery = Array.isArray(filter)
            ? filter.map((el) => `filter[${el.field}]=${el.value}`).join("&")
            : `filter[${filter.field}]=${filter.value}`;
        query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
    }

    // Sorting
    if (sortBy) {
        const sortQuery = Array.isArray(sortBy)
            ? sortBy.map((el) => `${el.direction === "asc" ? "" : "-"}${el.field}`).join(",")
            : `${sortBy.direction === "asc" ? "" : "-"}${sortBy.field}`;
        query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
    }

    // Pagination
    if (page >= 1)
        query += `${query.includes("?") ? "&" : "?"}page=${page}${
            perPage ? `&perPage=${perPage}` : ""
        }`;

    return query;
}

export default apiOperations;
