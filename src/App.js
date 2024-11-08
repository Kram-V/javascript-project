import React, { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import axios from "axios";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuestionsContext } from "./contexts/QuestionsContext";

const App = () => {
  const { state, dispatch } = useQuestionsContext();

  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const totalQuestions = questions.length;
  const currentQuestion = questions[index];
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/questions")
      .then((res) => dispatch({ type: "dataReceived", payload: res.data }))
      .catch((e) => dispatch({ type: "dataFailed" }));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen totalQuestions={totalQuestions} />}

        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              totalQuestions={totalQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />

            <Question currentQuestion={currentQuestion} answer={answer} />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} />

              {answer !== null && index < questions.length - 1 && (
                <Button dispatch={() => dispatch({ type: "nextQuestion" })}>
                  Next
                </Button>
              )}

              {answer !== null && index === 14 && (
                <Button dispatch={() => dispatch({ type: "finishQuiz" })}>
                  Finish
                </Button>
              )}
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
