import createHomePage from "./home-page";
import createQuizPage from "./quiz-page";
import birdsData from "./birds-data";
import choseLanguage from "./alternative-language";

function createResultPage(result){

    localStorage.setItem('current-score-number', 0)

    const main = document.querySelector('.main');
    const firstLevelIndex = 0;
    const startScore = 0;
    const maxScore = 30;
    const page = document.createElement('section'),
          pageContent = document.createElement('div'),
          pageTitle = document.createElement('h1'),
          pageText = document.createElement('p'),
          pageButton = document.createElement('button');

    page.classList.add('results');
    pageContent.classList.add('results__content');
    pageTitle.classList.add('results__title');
    pageText.classList.add('results__text');
    pageButton.className = 'btn btn--results';

    pageText.innerHTML = choseLanguage(`Вы набрали: ${result} баллов`, `You scored ${result} points`);

    pageTitle.textContent = choseLanguage('Ура, Вы прошли все уровни!!!','Wow, You completed all the levels!!!')

    pageContent.append(pageTitle, pageText);

    pageButton.textContent = +result === maxScore? choseLanguage('Ура!','Great!') : choseLanguage('Попробовать еще раз','Try again');

    pageButton.addEventListener('click', ()=>{

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
            startGameBtn.addEventListener('click', ()=> main.append(changePage(navBtns, quizPageBtn, main.firstElementChild, createQuizPage, birdsData,  +localStorage.getItem('next-level-number'), localStorage.getItem('current-score-number'))))
            return startPage;
        }

        const homePageBtn = document.querySelector('[data-btn=home]');
        const quizPageBtn = document.querySelector('[data-btn=quiz]');
        const navBtns = document.querySelectorAll('.nav__list-item');

        if (+result === maxScore){
            main.append(changePage(navBtns, homePageBtn, main.firstElementChild, createPage))
        } else {
            main.append(changePage(navBtns, quizPageBtn, main.firstElementChild, createQuizPage,  birdsData, +localStorage.getItem('next-level-number'), localStorage.getItem('current-score-number')))
        }
    })

    page.append(pageContent, pageButton);

    return page;
}

export default createResultPage;