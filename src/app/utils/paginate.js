export function paginate(array, pageNumber, pageSize) {
    const firstIndex = (pageNumber - 1) * pageSize
    return array.slice(firstIndex, firstIndex + pageSize)
}
