import Bird from "./bird-info-module";
import {choseLanguage, categoryData} from "./alternative-language";

function createGalleryPage(data) {
    const actualLanguageData = choseLanguage(data.ru, data.en);
    const page = document.createElement('section');
    const pageTitle = document.createElement('h1');
    const pageSubtitle = document.createElement('p');
    const pageGallery = document.createElement('div');
    const pageGalleryItem =  document.createElement('div');

    page.classList.add('gallery');
    pageTitle.classList.add('gallery__title');
    pageSubtitle.classList.add('gallery__subtitle');
    pageGallery.classList.add('gallery__inner');
    pageGalleryItem.classList.add('gallery__inner-item');

    pageTitle.textContent = choseLanguage('Галерея птиц', 'Bird gallery');

    actualLanguageData.forEach((array, key) => {

        const subtitle = pageSubtitle.cloneNode(true);
        subtitle.textContent = choseLanguage(categoryData.ru[key], categoryData.en[key]);
        pageGallery.append(subtitle);

        array.forEach(bird => {

            const birdCard = pageGalleryItem.cloneNode(true);

            const [birdElement, descriptionElement] = new Bird([bird]).render();
            birdCard.append(birdElement, descriptionElement);
            pageGallery.append(birdCard);
        })

    })

    page.append(pageTitle, pageGallery);

    return page;
}

export default createGalleryPage;