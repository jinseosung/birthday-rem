import React, { useEffect, useState } from "react";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import quizAnswer from "../datas/quiz.json";

function Admin() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const correctAnswer = quizAnswer.map((quiz) => quiz.correctAnswer);

  const q = query(collection(db, "score"));
  const fetchResults = () => {
    onSnapshot(q, (querySnapshot) => {
      const answerList = [];
      querySnapshot.forEach((doc) => {
        answerList.push(doc.data());
      });
      const sortedAnswerList = answerList.sort((a, b) => b.score - a.score);
      setResults(sortedAnswerList);
    });
  };

  useEffect(() => {
    fetchResults();
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderResult = (result, index) => (
    <div key={index} className="btnTransparent">
      <div className="top">
        <div>{result.name}</div>
        <div>{result.score}</div>
      </div>
      <ul className="result-ul">
        {result.answerList.map((answer, answerIndex) => (
          <li
            key={answerIndex}
            className={
              answer !== correctAnswer[answerIndex] ? "incorrect-answer" : ""
            }
          >{`${answerIndex + 1} : ${answer}`}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="result-container">
      <input
        className="result-input"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Trouvez par votre nom"
      />
      {searchTerm === ""
        ? results.map(renderResult)
        : filteredResults.map(renderResult)}
    </div>
  );
}

export default Admin;
