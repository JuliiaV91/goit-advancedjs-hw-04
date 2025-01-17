
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const loadMoreBtnEl = document.querySelector('.js-load-more');
const loaderEl = document.querySelector('.js-loader');
let page = 1;
let inputValue = '';
let cardHeight = 0;


const onSearchFormSubmit = async event => {
    try { 
        event.preventDefault();

        inputValue = event.currentTarget.elements.user_query.value.trim();

    if (!inputValue || inputValue === '') {

        iziToast.error({
                title: "❌",
                message: `Please enter your query!`,
                position: "topRight",
                icon: "",
            });

    return; 
    }
    
    galleryEl.innerHTML = '';
    loaderEl.classList.remove('is-hidden');
    page = 1;
    loadMoreBtnEl.classList.add('is-hidden');
    const response = await fetchPhotosByQuery(inputValue, page);
    loaderEl.classList.add('is-hidden');
    
    if (response.data.total === 0) {
            iziToast.error({
                title: "❌",
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topRight",
                icon: "",
            });

        galleryEl.innerHTML = '';
        searchFormEl.reset();

        return;
    }
        
        if (response.data.totalHits > 15) {
            loadMoreBtnEl.classList.remove('is-hidden');
            loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
    }

        galleryEl.innerHTML = createGalleryCardTemplate(response.data.hits);
        cardHeight = galleryEl.querySelector('li').getBoundingClientRect().height;
        loadMoreBtnEl.classList.remove('is-hidden');
        loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
        lightbox.refresh();
    } catch (err) {
        console.log(err);
        event.currentTarget.reset(); 
    }
  
    };
    


searchFormEl.addEventListener('submit', onSearchFormSubmit);

const onLoadMoreBtnClick = async event => {
            try {
                // Ховаємо кнопку і показуємо лоадер
                loadMoreBtnEl.classList.add('is-hidden');
                loaderEl.classList.remove('is-hidden');
                page++;
                const response = await fetchPhotosByQuery(inputValue, page);
                galleryEl.insertAdjacentHTML('beforeend', createGalleryCardTemplate(response.data.hits));
                scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });

                const totalPages = Math.ceil(response.data.totalHits / 15);
                
                if (page === totalPages) {
                    loadMoreBtnEl.classList.add('is-hidden');
                    loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
                    iziToast.error({
                        title: "❌",
                        message: `We're sorry, but you've reached the end of search results.`,
                        position: "topRight",
                        icon: "",
            });
                    loaderEl.classList.add('is-hidden'); 
                    return;
                }
                 // Показуємо кнопку після завершення завантаження
                loaderEl.classList.add('is-hidden');
                loadMoreBtnEl.classList.remove('is-hidden');
                lightbox.refresh();
                
            } catch (err) {
                console.log(err);
            }
        };