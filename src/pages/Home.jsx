import { Link } from "react-router-dom";
import BtnTransparent from "../components/BtnTransparent";

const Home = () => {
  const homeBtnList = [
    { to: `/quizmain`, prop: ["Quizz 🔍", "(une participation par personne)"] },
    { to: `/result`, prop: ["Trophée 🏆"] },
    { to: `/admin`, prop: ["Résultat 📝"] },
  ];

  return (
    <div className="home">
      <h1 className="title">30 ANS ET DU COUSCOUS</h1>
      {homeBtnList.map((el, index) => (
        <Link key={index} to={el.to}>
          <BtnTransparent prop={el.prop[0]} prop2={el.prop[1]} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
