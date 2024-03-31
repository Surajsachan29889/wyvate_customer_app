const convertTo12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(':');
  
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
  
    const formattedHours = (date.getHours() % 12) || 12; // If the hour is 0, change it to 12
    const formattedMinutes = date.getMinutes();
    
    const period = date.getHours() < 12 ? 'AM' : 'PM';
  
    const formattedTime = `${formattedHours}:${formattedMinutes < 10 ? '0' : ''}${formattedMinutes} ${period}`;
  
    return formattedTime;
  }

const timeToTimestamp = (timeString) => {
    // Split the time string into hours, minutes, and AM/PM parts
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
  
    // // Convert hours to 24-hour format if needed
    let hour24 = parseInt(hours, 10);
    if (period === "PM" && hour24 < 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    // Create a new Date object with the current date and the extracted time
    const date = new Date();
    date.setHours(hour24, parseInt(minutes, 10), 0, 0);
  
    // // Get the timestamp in seconds
    const timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
  };
  
  const trimDate = (date) => {
    const trimmedDate = date.split("T")[0];
    const dateStringWithSlashes = trimmedDate.replace(/-/g, "/");
    return dateStringWithSlashes;
  };
  
  const trimTime = (time) => {
    const timePart = time.split("T")[1];
    const [hour, minute] = timePart.split(":");
    let indianHour = parseInt(hour) + 5; // Adding 5 hours
    let indianMinute = parseInt(minute) + 30; // Adding 30 minutes
  
    // Handling cases where minutes exceed 60
    if (indianMinute >= 60) {
      indianHour += 1;
      indianMinute -= 60;
    }
    // Handling cases where hours exceed 24
    indianHour %= 24;
    // Formatting the time in 12-hour format
    const timeZone = convertTo12HourFormat(`${indianHour}:${indianMinute}`);
    return timeZone;
  };


  export {timeToTimestamp, trimDate, trimTime, convertTo12HourFormat}