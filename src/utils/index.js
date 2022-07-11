export const formattedDate = (apiData) => {
    if (!apiData.length) return null;
    const [date, time] = apiData.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minutes] = time.split(':');
    return {
        date: `${day}-${month}-${year}`,
        hour: `${hour}:${minutes}`
    }
}