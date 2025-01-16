
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = (searchedQuery, page) => {
  const requestParams = {
    key: '48231881-acbb1e4446b49c7b538272001',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };
    

  return axios.get(`https://pixabay.com/api/`, { params: requestParams });
};