

 export const createGalleryCardTemplate = imgArr => {
  return imgArr
    .map(
      el => `
      <li class="gallery-card">
        <a class="gallery-link" href="${el.largeImageURL}">
          <img class="gallery-img" src="${el.webformatURL}" alt="${el.tags}" />
        </a>
        <div class="gallery-info">
          <p class="info-item"><strong>Likes</strong> ${el.likes}</p>
          <p class="info-item"><strong>Views</strong> ${el.views}</p>
          <p class="info-item"><strong>Comments</strong> ${el.comments}</p>
          <p class="info-item"><strong>Downloads</strong> ${el.downloads}</p>
        </div>
      </li>
      `
    )
    .join('');
};
