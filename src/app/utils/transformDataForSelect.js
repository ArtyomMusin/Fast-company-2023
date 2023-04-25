export default function transformData(data) {
    if (!Object.keys(data).length) return []
    return Object.keys(data).map((key) => ({
        value: data[key]._id,
        label: data[key].name
    }))
}
