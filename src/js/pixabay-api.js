
export const fetchPhotosByQuery = searchedQuery => {
  return fetch(
    `https://pixabay.com/api/?key=48231881-acbb1e4446b49c7b538272001&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};