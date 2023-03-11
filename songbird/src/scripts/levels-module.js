import {choseLanguage, categoryData} from "./alternative-language";

function createLevelsBloc (currenLevel, score) {
    const quizInfo = document.createElement('div');
    const quizScore = document.createElement('p');
    const quizScoreCounter = document.createElement('span');
    const levels = document.createElement('ul');
    const level = document.createElement('li');

    quizInfo.classList.add('quiz__info');
    quizScore.classList.add('quiz__score');
    quizScoreCounter.id = 'score';
    levels.classList.add('quiz__levels-list');
    level.classList.add('quiz__level');

    quizScore.textContent = choseLanguage('Счёт: ', 'Score: ');
    quizScoreCounter.textContent = score;
    quizScore.append(quizScoreCounter);

    choseLanguage(categoryData.ru, categoryData.en).forEach((item, key) => {
        const li = level.cloneNode(true);
        li.textContent = item;

        if(key < currenLevel){
            li.classList.add('_complete')
        }
        if(key === currenLevel){
            li.classList.add('_current')
        }

        levels.append(li);
    })

    quizInfo.append(levels);
    quizInfo.append(quizScore);

    return [quizInfo, quizScoreCounter];
}

export default createLevelsBloc;