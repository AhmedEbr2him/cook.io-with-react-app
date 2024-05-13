export const ACCESS_POINT = 'https://api.edamam.com/api/recipes/v2';
export const TYPE = 'public';
export const APP_ID = '2c3ed4f3';
export const API_KEY = '2a46cf711e6e6b45f0c6a562e6325199';

export const cardQueries = [
  ['field', 'uri'],
  ['field', 'label'],
  ['field', 'image'],
  ['field', 'totalTime'],
  ['field', 'cuisineType'],
];

export const fetchRecipes = async (queries, successCallback) => {
  const query = queries?.join('&').replace(/,/g, '=').replace(/ /g, '20%').replace(/\+/g, '%2B');

  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
    queries ? `&${query}` : ''
  }`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
};
