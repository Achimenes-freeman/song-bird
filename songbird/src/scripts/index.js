// Styles imports -------------------------------------------

import '../styles/vars.scss';
import '../styles/btns.scss';
import '../styles/container.scss';
import '../styles/header.scss';
import '../styles/nav.scss';
import '../styles/video.scss';
import '../styles/main.scss';
import '../styles/home.scss';
import '../styles/quiz.scss';
import '../styles/results.scss';
import '../styles/gallery.scss';
import '../styles/player.scss';
import '../styles/footer.scss';
import '../styles/style.scss';

// Image imports -------------------------------------------

import RSSchoolLogo from'../assets/icons/rs_school_js.svg';
import GitHubLogo from '../assets/img/GitHub-Mark-64px.png';
import Birdlogo from '../assets/icons/bird-logo.svg';

// Scripts imports -------------------------------------------

import createQuizPage from './quiz-page';
import createHomePage from './home-page';
import createGalleryPage from './gallery-page';
import createResultPage from './results-page';
import birdsData from './birds-data';
import {choseLanguage, headerData} from "./alternative-language";

// Functions declarations -------------------------------------------

function changePage(btnsToHide, btnToShow,pageToRemove, callback, data, level, score){

    btnsToHide.forEach(item => {
        item.classList.remove('_active');
    })

    btnToShow.classList.add('_active');

    pageToRemove.remove();

    return callback(data, level, score)
}

function createPage(){
    const [startPage, startGameBtn] = createHomePage();
    startGameBtn.addEventListener('click', function(){
        main.append(changePage(navBtns, quizPageBtn, main.firstElementChild, createQuizPage,  birdsData, localStorage.getItem('next-level-number'), localStorage.getItem('current-score-number')));
        localStorage.setItem('current-page', this.dataset.btn);
    })
    return startPage;
}

function addNavTex(nav, currentPage, data){
    nav.forEach((item, key) => {
        item.textContent = choseLanguage(data.ru[key], data.en[key]);
        if(item.dataset.btn === currentPage){
            item.classList.add('_active');
        }
    })
}

// MainCode -------------------------------------------

const modificatorName = 'song-bird-language-modificator';

if (!localStorage.getItem(modificatorName)){

    localStorage.setItem(modificatorName, 'ru');
}

localStorage.setItem('current-page', 'home');

const main = document.querySelector('.main');

const homePageBtn = document.querySelector('[data-btn=home]');
const quizPageBtn = document.querySelector('[data-btn=quiz]');
const galleryPageBtn = document.querySelector('[data-btn=gallery]');
const navBtns = document.querySelectorAll('.nav__list-item');
const languageElement = document.querySelector('.header__language');
const nav = document.querySelector('.nav__list');
const burger = document.querySelector('.header__burger');
const burgerMask = burger.querySelector('.header__burger-mask');
const burgerCloseBtn = burger.querySelector('.header__burger-close-btn');

localStorage.setItem('next-level-number', 0);
localStorage.setItem('current-score-number', 0);

main.append(createPage());

const logoImage = document.querySelector('.header__logo-image');
const gitHubImage = document.querySelector('#github-link');
const rsSchoolImage = document.querySelector('#rsschool-link');
const homeImage = document.querySelector('.home__img');

logoImage.src = Birdlogo;
gitHubImage.src = GitHubLogo;
rsSchoolImage.src = RSSchoolLogo;
homeImage.src = Birdlogo;

addNavTex(navBtns, 'home', headerData);

languageElement.textContent = localStorage.getItem(modificatorName);

languageElement.addEventListener('click', ()=> {
    if(localStorage.getItem(modificatorName) === 'en') {
        localStorage.setItem(modificatorName, 'ru');
    } else{
        localStorage.setItem(modificatorName, 'en');
    }

    languageElement.textContent = localStorage.getItem(modificatorName);

    addNavTex(navBtns, localStorage.getItem('current-page'), headerData);
    main.firstElementChild.remove();
    switch(localStorage.getItem('current-page')){
        case 'home':
            main.append(createPage());
            break;
        case 'quiz':
            main.append(createQuizPage(birdsData, +localStorage.getItem('next-level-number'), +localStorage.getItem('current-score-number')));
            break;
        case 'gallery':
            main.append(createGalleryPage(birdsData));
            break;
        case 'results':
            main.append(createResultPage(localStorage.getItem('current-score-number')))
    }
})

homePageBtn.addEventListener('click', function(){
    main.append(changePage(navBtns, homePageBtn, main.firstElementChild, createPage))
    localStorage.setItem('current-page', this.dataset.btn);
})

quizPageBtn.addEventListener('click', function(){
    main.append(changePage(navBtns, quizPageBtn, main.firstElementChild, createQuizPage,  birdsData, +localStorage.getItem('next-level-number'), localStorage.getItem('current-score-number')))
    localStorage.setItem('current-page', this.dataset.btn);
})

galleryPageBtn.addEventListener('click', function(){
    main.append(changePage(navBtns, galleryPageBtn, main.firstElementChild, createGalleryPage, birdsData))
    localStorage.setItem('current-page', this.dataset.btn);
})

burger.addEventListener('click', (e)=> {
    nav.style.transform = 'translateY(100%)';
    burgerMask.style.display = 'block'
    burgerCloseBtn.style.display = 'block'
    burgerCloseBtn.style.transform = 'translateY(110%)'
    document.documentElement.style.overflow = 'hidden';

    if (e.target === burgerMask || e.target === burgerCloseBtn){
        nav.style.transform = '';
        burgerMask.style.display = ''
        burgerCloseBtn.style.transform = ''
        document.documentElement.style.overflow = '';
    }
})