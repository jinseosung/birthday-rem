import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnRose from "../components/BtnRose";

const QuizMain = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = () => {
    if (!name) {
      return;
    }
    navigate(`/quiz/${name}`);
  };

  return (
    <div className="quizmain">
      <h1 className="title">30 ANS ET DU COUSCOUS</h1>
      <h2 className="quizmain__title">Ton prénom ?</h2>
      <input
        className="quizmain__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <BtnRose
        onclick={handleNameSubmit}
        prop={`Start Quiz 🔍`}
        style={name ? `opacity-1` : `opacity-0`}
      />
    </div>
  );
};

export default QuizMain;
