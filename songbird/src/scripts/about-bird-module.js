import Bird from './bird-info-module';
import {choseLanguage, aboutData} from './alternative-language';

function createAboutBirdElement(data) {

    const about = document.createElement('div');

    if(!data){
        const aboutPlaceholder = document.createElement('p');

        about.classList.add('quiz__about');
        aboutPlaceholder.classList.add('quiz__about-placeholder');

        aboutPlaceholder.innerHTML = choseLanguage(aboutData.ru.placeholder, aboutData.en.placeholder)
        about.append(aboutPlaceholder)
    } else {
        about.classList.add('about__box');

        const [bird, birdDescription] = new Bird(data).render();

        about.append(bird, birdDescription);
    }

    return about;
}

export default createAboutBirdElement;