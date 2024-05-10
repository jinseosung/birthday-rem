import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import questions from "../datas/quiz.json";
import BtnRose from "../components/BtnRose";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [selectedAnswerList, setSelectedAnswerList] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const name = params.name;

  const saveScore = async (num, answer) => {
    try {
      await addDoc(collection(db, "score"), {
        name: name,
        score: score + num,
        answerList: [...selectedAnswerList, answer],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    setSelectedAnswerList([...selectedAnswerList, selectedAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        saveScore(1, selectedAnswer);
      } else {
        saveScore(0, selectedAnswer);
      }

      navigate(`/quizthx`);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <h1 className="quiz__qustion">{currentQuestion.question}</h1>
      <ul className="quiz__answers">
        {currentQuestion.answer.map((answer, index) => (
          <li
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            className={
              selectedAnswer === answer
                ? `quiz__answer selected`
                : `quiz__answer`
            }
          >
            {answer}
          </li>
        ))}
      </ul>
      {selectedAnswer && (
        <BtnRose onclick={handleNextQuestion} prop={`👉`} style={`quiz__btn`} />
      )}
    </div>
  );
};

export default Quiz;
