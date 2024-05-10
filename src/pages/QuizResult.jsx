import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect, useMemo } from "react";
import BtnRose from "../components/BtnRose";

const QuizResult = () => {
  const [classementLists, setClassementLists] = useState({
    score15ClassmentList: [],
    score14ClassmentList: [],
    score13ClassmentList: [],
    score12ClassmentList: [],
    score11ClassmentList: [],
    score10ClassmentList: [],
    score9ClassmentList: [],
    score8ClassmentList: [],
    score7ClassmentList: [],
    score6ClassmentList: [],
    score5ClassmentList: [],
    score4ClassmentList: [],
    score3ClassmentList: [],
    score2ClassmentList: [],
    score1ClassmentList: [],
    score0ClassmentList: [],
  });

  const createScoreQuery = (score) =>
    query(collection(db, "score"), where("score", "==", score));

  const scoreQueries = Array.from({ length: 16 }, (a, index) =>
    createScoreQuery(15 - index)
  );

  const listObj = useMemo(
    () => [
      { title: "🥇 15 points", key: "score15ClassmentList" },
      { title: "🥈 14 points", key: "score14ClassmentList" },
      { title: "🥉 13 points", key: "score13ClassmentList" },
      { title: "🏅 12 points", key: "score12ClassmentList" },
      { title: "🎖 11 point", key: "score11ClassmentList" },
      { title: "10 point", key: "score10ClassmentList" },
      { title: "9 points", key: "score9ClassmentList" },
      { title: "8 points", key: "score8ClassmentList" },
      { title: "7 points", key: "score7ClassmentList" },
      { title: "6 points", key: "score6ClassmentList" },
      { title: "5 points", key: "score5ClassmentList" },
      { title: "4 points", key: "score4ClassmentList" },
      { title: "3 points", key: "score3ClassmentList" },
      { title: "2 points", key: "score2ClassmentList" },
      { title: "1 points", key: "score1ClassmentList" },
      { title: "😅 0 points", key: "score0ClassmentList" },
    ],
    []
  );

  const fetchClassement = (score, classmentList) => {
    onSnapshot(score, (querySnapshot) => {
      const classements = [];
      querySnapshot.forEach((doc) => {
        classements.push(doc.data());
        setClassementLists((prevLists) => ({
          ...prevLists,
          [classmentList]: classements,
        }));
      });
    });
  };

  useEffect(() => {
    listObj.forEach((el, index) => {
      fetchClassement(scoreQueries[index], el.key);
    });
  }, [listObj, scoreQueries]);

  return (
    <div className="quizresult">
      <div className="quizresult__link">
        <Link to={`/`}>
          <BtnRose
            prop={<FontAwesomeIcon icon={faHouse} />}
            style={`quizresult__btn`}
          />
        </Link>
      </div>
      <h1 className="title">30 ANS ET DU COUSCOUS</h1>
      <ul className="quizresult__classement">
        {listObj.map((el, index) => (
          <li key={index} className="quizresult__li">
            <span className="quizresult__title">{el.title}</span>
            {classementLists[el.key].map((classement, index) => (
              <div key={index} className="quizresult__class">
                <span>{classement.name}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResult;
