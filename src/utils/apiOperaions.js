function apiOperations({ queryLink, fields, filter, sortBy, page, perPage }) {
    let query = queryLink;

    //Fields
    if (Array.isArray(fields)) {
        let fieldsQuery = "fields=";

        fields.forEach((el, index) => {
            fieldsQuery += `${index !== 0 ? "," : ""}${el}`;
        });

        query += `${query.includes("?") ? "&" : "?"}${fieldsQuery}`;
    } else if (fields) {
        let fieldsQuery = `fields=${fields}`;

        query += `${query.includes("?") ? "&" : "?"}${fieldsQuery}`;
    }

    // Filter

    if (Array.isArray(filter)) {
        let filterQuery = "";

        filter.forEach((el, index) => {
            filterQuery += `${index !== 0 ? "&" : ""}filter[${el.field}]=${el.value}`;
        });

        query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
    } else if (filter) {
        let filterQuery = `filter[${filter.field}]=${filter.value}`;

        query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
    }

    // Sorting
    if (Array.isArray(sortBy)) {
        let sortQuery = "";

        sortBy.forEach((el, index) => {
            const direction = el.direction === "asc" ? "" : "-";
            sortQuery += `${index !== 0 ? "," : ""}${direction}${el.field}`;
        });

        query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
    } else if (sortBy) {
        let sortQuery = `${sortBy.direction === "asc" ? "" : "-"}${sortBy.field}`;

        query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
    }

    // Pagination
    if (page !== 0 && page >= 1) {
        query += `${query.includes("?") ? "&" : "?"}page=${page}${perPage ? "&perPage=" : ""}${perPage}`;
    }

    return query;
}

export default apiOperations;
