export const getTime = minute => {
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 60);

  const time = day || hour || minute;
  const unitIndex = [day, hour, minute].lastIndexOf(time);
  const timeUnit = ['days', 'hours', 'minutes'][unitIndex];

  return { time, timeUnit };
};

export const storeInLocalStorage = (data, itemName) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};
export const fetchFromLocalStorage = itemName => {
  let recipe = localStorage.getItem(itemName);

  if (recipe) {
    return JSON.parse(localStorage.getItem(itemName));
  } else {
    return [];
  }
};
