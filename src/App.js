import React, { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuestionsContext } from "./contexts/QuestionsContext";

const allQuestions = [
  {
    question: "What is the correct way to declare a JavaScript variable?",
    options: [
      "var myVariable",
      "variable myVariable",
      "v myVariable",
      "declare myVariable",
    ],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "Which method is used to remove the last element from an array in JavaScript?",
    options: ["shift()", "pop()", "slice()", "splice()"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "What will the typeof operator return for the value null?",
    options: ["null", "undefined", "object", "number"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["let", "const", "var", "constant"],
    correctOption: 3,
    points: 10,
  },
  {
    question:
      "Which built-in function can be used to convert a string to an integer in JavaScript?",
    options: ["parseInt()", "toInteger()", "convert()", "int()"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What will happen if you try to access a variable declared with let before it is initialized??",
    options: ["undefined", "null", "A ReferenceError", "An empty string"],
    correctOption: 2,
    points: 30,
  },
  {
    question: "What does the Array.prototype.map() method return?",
    options: [
      "A new array with modified elements",
      "The length of the original array",
      "A single value",
      "The original array, modified in place",
    ],
    correctOption: 0,
    points: 20,
  },
  {
    question:
      "Which of the following statements is true about JavaScript's 'this' keyword?",
    options: [
      "'this' refers to the global object in all cases.",
      "'this' refers to the object that calls the function in a method.",
      "'this' always refers to the function itself.",
      "'this' is undefined in all strict mode functions.",
    ],
    correctOption: 1,
    points: 20,
  },
  {
    question:
      "What is the result of the following expression in JavaScript: [] + []?",
    options: ["[]", "null", "'' (empty string)", "0"],
    correctOption: 2,
    points: 30,
  },
  {
    question: "What does the bind() method do in JavaScript?",
    options: [
      "It invokes a function immediately.",
      "It sets the value of this for a function and returns a new function.",
      "It creates a new instance of a function.",
      "It prevents the function from being called.",
    ],
    correctOption: 1,
    points: 30,
  },
  {
    question: "What is the purpose of the async keyword in JavaScript?",
    options: [
      "To define a function that runs synchronously.",
      "To define a function that returns a promise.",
      "To indicate that a function cannot contain await.",
      "To automatically handle errors in the function.",
    ],
    correctOption: 1,
    points: 20,
  },
  {
    question:
      "What is the result of using the call() method on a function in JavaScript?",
    options: [
      "It creates a new function.",
      "It invokes the function immediately and allows setting the value of this inside the function.",
      "It prevents the function from being executed.",
      "It binds the function to the object, but does not invoke it.",
    ],
    correctOption: 1,
    points: 30,
  },
  {
    question:
      "What will happen if you use setTimeout() inside a loop without using let or const to declare the loop variable?",
    options: [
      "The loop will execute as expected, with each setTimeout() call using the correct value of the loop variable.",
      "The loop will execute as expected, but the value of the loop variable will not be accessible inside setTimeout().",
      "All setTimeout() calls will use the final value of the loop variable.",
      "An error will occur due to the setTimeout() call inside the loop.",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "What does the Promise.all() method do in JavaScript?",
    options: [
      "It runs multiple promises in parallel and resolves when all promises are settled.",
      "It runs multiple promises in sequence and resolves when the last one is settled.",
      "It only resolves the first promise and ignores the others.",
      "It waits for each promise to resolve before starting the next one.",
    ],
    correctOption: 0,
    points: 30,
  },
];

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
    dispatch({ type: "dataReceived", payload: allQuestions });
  }, [dispatch, questions]);

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
