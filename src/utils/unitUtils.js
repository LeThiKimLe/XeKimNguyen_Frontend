export const convertToTime = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const convertToStamp = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    if (minutes !== 0)
        return `${hours} tiếng ${minutes} phút`;
    return `${hours} tiếng`
}

export const calculateTimeInDay = (baseTime, additionalHours) => {
    const totalHours = baseTime + additionalHours;
    const result = totalHours % 24;
    const timeInDay = result < 0 ? result + 24 : result;
    return convertToTime(timeInDay);
  }
