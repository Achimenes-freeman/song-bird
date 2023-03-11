export function choseLanguage(ruText, enText){
    if(localStorage.getItem('song-bird-language-modificator') === 'ru'){
        return ruText;
    } else  {
        return enText;
    }
}

export const homePageData = {
    ru: {
        btn: 'Начать игру',
        title: 'Добро пожаловать в<br>',
        text: 'Викторина в которой вам нужно отгадывать птиц по их звучанию. Она включает в себя 6 заданий, в каждом их которых вам потребуется прослушать звуковую запись птицы и выбрать один из предложенных вариантов ответа.'
    },
    en: {
        btn: 'Start game',
        title: 'Welcome to<br>',
        text: 'A quiz in which you have to guess the birds by their sound. It includes 6 tasks, in each of which you will need to listen to a sound recording of a bird and choose one of the suggested answers.'
    }
}

export const headerData = {
    ru: ['Главная','Викторина','Галерея'],
    en: ['Home','Quiz','Gallery']
};

export const categoryData = {
    ru:['Разминка','Воробьиные','Лесные птицы','Певчие птицы','Хищные птицы','Морские птицы'],
    en:['Trial','Passerines','Forest birds','Songbirds','Predator birds','Sea birds']
};

export const aboutData = {
    ru: {
        placeholder: 'Прослушайте плеер.<br>Выберите птицу из списка.'
    },
    en: {
        placeholder: 'Listen to the player.<br>Select a bird from the list'
    }
}

export default choseLanguage;