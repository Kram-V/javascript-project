import { createContext, useContext, useReducer } from "react";

const initialState = {
  questions: [],
  // loading, error, ready, active and finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 20,
      };

    case "finishQuiz":
      const highScore =
        state.points > state.highScore ? state.points : state.highScore;

      return { ...state, status: "finished", highScore };

    case "restartQuiz":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * 20,
      };

    case "answer":
      const currentQuestion = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + state.questions[state.index].points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "startTimer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("Action Unknown");
  }
};

const QuestionsContext = createContext();

function QuestionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestionsContext() {
  const context = useContext(QuestionsContext);

  return context;
}

export { QuestionsProvider, useQuestionsContext };
