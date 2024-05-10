import { Link } from "react-router-dom";
import BtnRose from "../components/BtnRose";

const QuizThx = () => {
  return (
    <div className="quizthx">
      <h1 className="quizthx__title">Merci pour ta participation 💖</h1>
      <Link to={`/result`}>
        <BtnRose prop={`Trophée 🏆`} style={`quizthx__btn`} />
      </Link>
      <Link to={`/`}>
        <BtnRose prop={`Page d'accueil 🎈`} style={`quizthx__btn-2`} />
      </Link>
    </div>
  );
};

export default QuizThx;