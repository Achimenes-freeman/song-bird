import Birdlogo from '../assets/icons/bird-logo.svg';
import AudioPlayer from './audio-player';

class Bird {
    constructor([data, mainAudio = null], isHide = false){
        this.data = data;
        this.name = data.name;
        this.species = data.species;
        this.image = data.image;
        this.audio = data.audio;
        this.mainAudio = mainAudio;
        this.description = data.description;
        this.isHide = isHide;
    }

    render(){
        const bird = document.createElement('div');
        const birdPicture = document.createElement('div');
        const birdImg = document.createElement('img');
        const birdInfo = document.createElement('div');
        const birdInfoName = document.createElement('h1');
        const birdDescription = document.createElement('p');

        bird.classList.add('quiz__bird');
        birdPicture.classList.add('quiz__bird-picture');
        birdImg.classList.add('quiz__bird-img');
        birdInfo.classList.add('quiz__bird-info');
        birdInfoName.classList.add('quiz__bird-info_name');
        birdDescription.classList.add('quiz__bird-description');

        if(this.isHide){
            birdInfoName.textContent = '*** ***';
            birdImg.src = Birdlogo;
        } else{
            birdInfoName.textContent = this.name;
            birdImg.src = this.image;

            const birdInfoSpecies = document.createElement('p');

            birdInfoSpecies.classList.add('quiz__bird-info_species');

            birdDescription.textContent = this.description;
            birdInfoSpecies.textContent = this.species;

            birdInfo.append(birdInfoSpecies)
        }

        birdInfo.prepend(birdInfoName);

        const [player, audio, pauseBtn] = new AudioPlayer(this.audio).render()

        if(!this.isHide && this.mainAudio){
            audio.addEventListener('play', ()=> {
                this.mainAudio.pause();
            })
        }

        birdInfo.append(player)

        birdPicture.append(birdImg);

        bird.append(birdPicture, birdInfo);

        if (this.isHide){
            return [bird, audio, pauseBtn, birdImg, birdInfoName, birdDescription];
        } else {
            return [bird, birdDescription, audio];
        }
    }
}

export default Bird;