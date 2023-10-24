export const currentDate = async () => {
    const dateTime = new Date();
    const date = dateTime.getUTCDate();
    const month = await formatMonth(dateTime.getUTCMonth());
    const year = dateTime.getUTCFullYear();
    return `${date}-${month}-${year}`
}

const formatMonth = async (month: number) => {
    month = month + 1;
    if (month.toString().length === 1) {
        return "0" + (month)
    } else {
        return (month).toString();
    }
}