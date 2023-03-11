import CreateLevelInfo from "./quiz-level-info";
import createLevelsBloc from "./levels-module";

function createQuizPage(data, level, score) {

    const quizPage = document.createElement('section');

    quizPage.classList.add('quiz');
    quizPage.id = 'quiz-page'

    const [levels, scoreElement] = createLevelsBloc(level, score);

    quizPage.append(levels)
    quizPage.append(new CreateLevelInfo(data, level, scoreElement).render())

    return quizPage;
}

export default createQuizPage;