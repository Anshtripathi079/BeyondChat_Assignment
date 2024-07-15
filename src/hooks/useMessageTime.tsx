function useMessageTime(): (dt: string, onlyTime: boolean) => string {
  const getMessageTime = (dt: string, onlyTime: boolean): string => {
    const date = new Date(dt);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    if (diffInHours < 24 || onlyTime) {
      let hours: number = date.getUTCHours();
      let minutes: number = date.getUTCMinutes();
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 === 0 ? 12 : hours % 12;
      const timeString =
        hours.toString() + ":" + minutes.toString() + "" + period;
      return timeString;
    } else {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayString = daysOfWeek[date.getUTCDay()];
      return dayString;
    }
  };

  return getMessageTime;
}

export default useMessageTime;
