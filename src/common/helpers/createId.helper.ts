export const createNewId = async () => {
    const length = 15;
    return Math.random().toString(36).substr(2, length)
}