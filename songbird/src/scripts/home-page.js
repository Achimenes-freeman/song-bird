import Birdlogo from '../assets/icons/bird-logo.svg';
import homePageVideo from '../assets/video/video.mp4';
import VideoPlaceholder from '../assets/img/VideoPlaceholder.png'

import {choseLanguage, homePageData} from "./alternative-language";

function createHomePage(){

    const page = document.createElement('section');
    const pageContent = document.createElement('div');
    const pagePicture = document.createElement('div');
    const pageImg = document.createElement('img');
    const pageBtn = document.createElement('button');
    const pageVideo = document.createElement('div');
    const pageVideoPlaceholder = document.createElement('div');
    const pageVideoMedia = document.createElement('video');
    const pageVideoMask = document.createElement('div');
    const pageTitle = document.createElement('h1');
    const pageText = document.createElement('p');
    const pageTitleSpan = document.createElement('span');

    page.classList.add('home');
    page.id = 'home-page';
    pageContent.classList.add('home__content');
    pagePicture.classList.add('home__picture');

    pageImg.classList.add('home__img');
    pageImg.alt = 'bird';
    pageImg.src = Birdlogo;

    pageBtn.className = 'btn btn--home';
    pageBtn.dataset.btn = 'quiz';
    pageBtn.textContent = choseLanguage(homePageData.ru.btn, homePageData.en.btn);

    pageTitle.classList.add('home__title');
    pageTitleSpan.classList.add('home__title_pacifico');
    pageText.classList.add('home__text');

    pageTitleSpan.innerHTML = 'Song&nbsp;Bird';
    pageTitle.innerHTML = choseLanguage(homePageData.ru.title, homePageData.en.title);

    pageTitle.append(pageTitleSpan);

    pageText.textContent = choseLanguage(homePageData.ru.text, homePageData.en.text)

    pageContent.append(pageTitle, pageText);
    pageVideo.classList.add('video');
    pageVideoMedia.classList.add('video__media');
    pageVideoMask.classList.add('video__mask');
    pageVideoPlaceholder.classList.add('video__placeholder');
    pageVideoPlaceholder.style.background = `url('${VideoPlaceholder}') no-repeat top / cover`;

    pageVideoMedia.src = homePageVideo;
    pageVideoMedia.autoplay = true;
    pageVideoMedia.muted = true;
    pageVideoMedia.loop = true;

    pageVideo.append(pageVideoMedia);
    pageVideo.append(pageVideoMask);
    pageVideo.append(pageVideoPlaceholder);

    pagePicture.append(pageImg);
    pagePicture.append(pageBtn);

    page.append(pageVideo);
    page.append(pageContent);
    page.append(pagePicture);

    return [page, pageBtn];
}

export default createHomePage;