import { currentDate } from "./currentDate.helper";
import { currentTime } from "./currentTime.helper"

export const getCurrentDateTime = async () => {
    const date = await currentDate();
    const time = await currentTime();
    return `${date} ${time}`;
}