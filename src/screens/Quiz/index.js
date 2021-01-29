import React from 'react';
//import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../..components/QuizContainer';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm'
import BackLinkArrow from '../../components/BackLinkArrow'

function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
          Goblins trabalhando...
        </Widget.Header>
  
        <Widget.Content>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src= {"https://i.gifer.com/9Dho.gif"}
        />
        
        </Widget.Content>
      </Widget>
    );
  }

  function ResultWidget({results}) {
    return (
      <Widget>
        <Widget.Header>
          Resultado
        </Widget.Header>
          
        <Widget.Content>
          <p>
            Você fez
            {' '}
            {results.filter((x) => x).length * 10}
            {' '} 
            pontos
          </p>
          <ul>
            {/*results.map((result, index) => (
            <li key ={`result__${result}`}>
              #{index + 1}
              {''}
              Resultado: 
              {result === true ? 'Acertou' : 'Errou'}
            </li> 
             ) )*/}
             Obrigado por fazer este quiz, lembre-se de passar nos outros quizzes desta imersão react da Alura de 2021
          </ul>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src= {"https://64.media.tumblr.com/12a3b1e0f2c9cb9d093e46100dbf1c44/tumblr_mtd7bcXE201qkiyi1o1_400.gifv"}
        />
        
        </Widget.Content>
      </Widget>
    );
  }

  function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    addResult,
  }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;
    return (
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
  
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
  
          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => { 
                addResult(isCorrect);
                setIsQuestionSubmited(false);
                onSubmit();
                setSelectedAlternative(undefined);
              }, 1 * 1500);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  key = {alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onClick = {() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
  
            {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
            {/*isQuestionSubmited && isCorrect && <p>Correto</p>*/}
            {/*isQuestionSubmited && !isCorrect && <p>Errado</p>*/}
            
          </AlternativesForm>
        </Widget.Content>
      </Widget>
    );
  }
  
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };
  export default function QuizPage({externalQuestions, externalBg}) {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = externalQuestions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const [results, setResults] = React.useState([]);
    const bg = externalBg;

    function addResult(result){
      setResults([
        ...results,
        result,
      ]);
    }

    // [React chama de: Efeitos || Effects]
    // React.useEffect
    // atualizado === willUpdate
    // morre === willUnmount
    // nasce === didMount
    React.useEffect(() => {
      // fetch() ...
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 2 * 1000);    
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult = {addResult}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
  
          {screenState === screenStates.RESULT && <ResultWidget results ={results} />}
        </QuizContainer>
      </QuizBackground>
    );
  }