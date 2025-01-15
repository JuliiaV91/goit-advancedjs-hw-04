
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const loaderEl = document.querySelector('.js-loader');


const onSearchFormSubmit = event => {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.user_query.value.trim();

    if (!inputValue || inputValue === '') {

        iziToast.error({
                title: "❌",
                message: `Please enter your query!`,
                position: "topRight",
                icon: "",
            });

    return; 
    }
    
    loaderEl.classList.remove('is-hidden');

    fetchPhotosByQuery(inputValue)
        .finally(() => {
            loaderEl.classList.add('is-hidden');
        })
    .then(data => {
        if (data.total === 0) {
            iziToast.error({
                title: "❌",
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topRight",
                icon: "",
            });

        galleryEl.innerHTML = '';

        return;
      }

        galleryEl.innerHTML = createGalleryCardTemplate(data.hits);
        lightbox.refresh();
    })
    .catch(err => {
        console.log(err);
        event.currentTarget.reset(); 
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
