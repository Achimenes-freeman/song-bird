import Bird from './bird-info-module';
import Answers from './answers-module';
import createAboutBirdElement from './about-bird-module';
import createQuizPage from './quiz-page';
import createResultPage from './results-page';

import choseLanguage from "./alternative-language";

class CreateLevelInfo {
    constructor(data, level, scoreElement){
        this.data = data;
        this.level = level;
        this.scoreElement = scoreElement;
    }

    render(){

        const actualLanguageData = choseLanguage(this.data.ru, this.data.en)

        const levelInfo = document.createElement('div');
        const btnNext = document.createElement('button');

        levelInfo.classList.add('quiz__level-info');

        btnNext.className = 'btn btn--quiz _disable';

        if(this.level < actualLanguageData.length - 1){

            btnNext.textContent = choseLanguage('Следующий уровень','Next level');
            btnNext.addEventListener('click', ()=>{
                if(!btnNext.classList.contains('_disable')){

                    const main = document.querySelector('.main');
                    main.firstElementChild.remove();

                    main.append(createQuizPage(this.data, +localStorage.getItem('next-level-number'), this.scoreElement.textContent))
                }
            })

        } else{
            btnNext.textContent = choseLanguage('Завершить игру!', 'Finish game!');
            btnNext.addEventListener('click', ()=>{

                const main = document.querySelector('.main');
                main.firstElementChild.remove();

                localStorage.setItem('current-page', 'results');
                main.append(createResultPage(this.scoreElement.textContent));
            })

        }

        const randomBirdIndex = Math.floor(Math.random() * 6);
        const aboutBird = createAboutBirdElement();

        const birdData = [ actualLanguageData[this.level][randomBirdIndex] ]
        const [bird, audio, pauseBtn, birdImage, birdName] = new Bird(birdData, true).render();

        audio.addEventListener('play', ()=> {
            const aboutAudio = aboutBird.getElementsByTagName('audio');

            if(aboutAudio.length > 0) {
                aboutAudio[0].pause()
            }
        })

        const answersData = [actualLanguageData[this.level], randomBirdIndex, btnNext, this.scoreElement, audio, pauseBtn, birdImage, birdName, aboutBird, this.level]
        const answers = new Answers(answersData).render();

        levelInfo.append(bird);
        levelInfo.append(btnNext);
        levelInfo.append(answers);
        levelInfo.append(aboutBird);

        return levelInfo;
    }
}

export default CreateLevelInfo;