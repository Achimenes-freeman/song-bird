import WinSound from '../assets/sounds/win-sound.mp3';
import LoseSound from '../assets/sounds/lose-sound.mp3';

import createAboutBirdElement from './about-bird-module';

class Answers{
    constructor([data, index, btn, scoreElement, audio, pauseBtn, birdImage, birdName, aboutBirdElement, level]){
        this.data = data;
        this.id = index + 1;
        this.btn = btn;
        this.scoreElement = scoreElement;
        this.aboutBirdElement = aboutBirdElement;
        this.audio = audio;
        this.pauseBtn = pauseBtn;
        this.birdImage = birdImage;
        this.birdName = birdName;
        this.currentLevel = level;
        this.score = 5;
        this.isWon = false;
    }

    render(){
        const answers = document.createElement('div');
        const answersList = document.createElement('ul');
        const answer = document.createElement('li');
        const winSound = new Audio(WinSound);
        const loseSound = new Audio(LoseSound);

        answers.classList.add('quiz__answers');
        answersList.classList.add('quiz__answers-list');
        answer.classList.add('quiz__answer');

        this.data.forEach(bird => {
            const li = answer.cloneNode(true);
            li.textContent = bird.name;
            li.id = bird.id;
            li.dataset.clicked = false;

            answersList.append(li);
        })

        answers.append(answersList)

        answers.addEventListener('click', (e)=> {

            let target = e.target.closest('.quiz__answer')

            if(target){

                const birdData = this.data[+target.id - 1];

                if(+target.id === this.id){

                    if (!JSON.parse(target.dataset.clicked)){
                        this.isWon = true;
                        this.btn.classList.remove('_disable');
                        this.scoreElement.textContent = +this.scoreElement.textContent + this.score;
                        this.audio.pause();
                        this.pauseBtn.classList.remove('_pause');
                        target.dataset.clicked = true;
                        target.classList.add('_correct');
                        winSound.play()

                        this.birdImage.src = birdData.image;
                        this.birdName.textContent = birdData.name;

                        localStorage.setItem('next-level-number', this.currentLevel < 5 ? this.currentLevel + 1 : 0);
                        localStorage.setItem('current-score-number', this.currentLevel < 5 ? this.scoreElement.textContent : 0)
                    }
                } else {
                    if(!this.isWon){
                        if (!JSON.parse(target.dataset.clicked)){
                            this.score--;
                            target.dataset.clicked = true;
                            target.classList.add('_wrong')
                            loseSound.play()
                            setTimeout(()=> {
                                loseSound.pause();
                                loseSound.currentTime = 0;
                            },100)
                        }
                    }
                }

                this.aboutBirdElement.firstElementChild.remove();

                this.aboutBirdElement.append(createAboutBirdElement([birdData, this.audio]))
            }
        })

        return answers;
    }
}

export default Answers;