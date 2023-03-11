import VolumeHigh from '../assets/icons/volume-high-solid.svg';
import VolumeXmark from '../assets/icons/volume-xmark-solid.svg';

class AudioPlayer{
    constructor(audioSrc){
        this.audioSrc = audioSrc;
    }

    render(){
        function changeTimeBar(){
            playerTimePassed.textContent = `${getCorrectTime(audio.currentTime)}`
            playerTimeBar.value = audio.currentTime;
        }

        function getCorrectTime(time){
            let seconds = Math.round(time % 60).toString();
            seconds = seconds < 10 ? '0' + seconds : seconds;

            let minutes = Math.floor(time / 60 % 60).toString();
            minutes = minutes < 10 ? '0' + minutes : minutes;

            return `${minutes}:${seconds}`
        }

        const player = document.createElement('div');
        const audio = document.createElement('audio');
        const playerPause = document.createElement('div');
        const playerInfo = document.createElement('div');
        const playerTimeBar = document.createElement('input');
        const playerTimePassed = document.createElement('span');
        const playerTimeFull= document.createElement('span');
        const playerInfoControls = document.createElement('div');
        const playerVolume = document.createElement('div');
        const playerVolumeIcon = document.createElement('img');
        const playerVolumeBar = document.createElement('input');

        player.classList.add('player');
        audio.classList.add('audio');
        playerPause.classList.add('player__pause');
        playerInfo.classList.add('player__info');
        playerTimeBar.classList.add('player__time-bar');
        playerTimePassed.classList.add('player__time-passed');
        playerTimeFull.classList.add('player__time-full');
        playerInfoControls.classList.add('player__info-controls');
        playerInfoControls.classList.add('player__info-controls');
        playerVolume.classList.add('player__volume');
        playerVolumeIcon.classList.add('player__volume-icon');
        playerVolumeBar.classList.add('player__volume-bar');

        audio.src = this.audioSrc;

        audio.addEventListener('canplay', ()=> {
            playerTimeBar.max = Math.round(audio.duration);
            playerTimeFull.textContent = `${getCorrectTime(audio.duration)}`;
            playerTimePassed.textContent = `${getCorrectTime(audio.currentTime)}`;

            playerVolumeBar.value = audio.volume;

            audio.addEventListener('pause', ()=> {
                playerPause.classList.remove('_pause');
            })
            audio.addEventListener('play', ()=> {
                playerPause.classList.add('_pause')
            })

            playerTimeBar.addEventListener('pointerdown', ()=> {
                audio.removeEventListener('timeupdate', changeTimeBar);
                audio.pause();
            })

            playerTimeBar.addEventListener('pointerup', ()=> {
                audio.addEventListener('timeupdate', changeTimeBar);
                audio.play();
            })

            playerTimeBar.addEventListener('input', ()=> {
                audio.currentTime = playerTimeBar.value;
            })

            playerVolumeBar.addEventListener('input', ()=> {
                audio.volume = playerVolumeBar.value;

                if (+playerVolumeBar.value === 0){
                    if(playerVolumeIcon.src != VolumeXmark){
                        playerVolumeIcon.src = VolumeXmark;
                    }
                } else {
                    if(playerVolumeIcon.src != VolumeHigh){
                        playerVolumeIcon.src = VolumeHigh;
                    }
                }
            })
        })

        audio.addEventListener('timeupdate', changeTimeBar)

        playerPause.addEventListener('click', ()=> {
            if(audio.paused){
                audio.play();
            } else {
                audio.pause()
            }
        })

        playerVolumeIcon.addEventListener('click', ()=> {
            if(playerVolumeIcon.src === VolumeHigh){
                playerVolumeIcon.src = VolumeXmark;
                playerVolumeBar.value = 0;
            } else {
                playerVolumeIcon.src = VolumeHigh;
                playerVolumeBar.value = 0.5;
            }

            audio.volume = playerVolumeBar.value;
        })

        playerTimeBar.value = 0;
        playerTimeBar.type = 'range';
        playerVolumeBar.type = 'range';
        playerVolumeBar.step = 0.01;
        playerVolumeBar.value = 1;
        playerVolumeBar.max = 1;
        playerVolumeIcon.src = VolumeHigh;

        playerTimePassed.textContent = '00:00';
        playerTimeFull.textContent = '00:00';

        playerVolume.append(playerVolumeIcon);
        playerVolume.append(playerVolumeBar);

        playerInfoControls.append(playerTimePassed);
        playerInfoControls.append(playerVolume);
        playerInfoControls.append(playerTimeFull);

        playerInfo.append(playerTimeBar);
        playerInfo.append(playerInfoControls);

        player.append(audio)
        player.append(playerPause);
        player.append(playerInfo);

        return [player, audio, playerPause];
    }
}

export default AudioPlayer;