import React, { useEffect, useState } from "react";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const [results, setResults] = useState([]);

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
  }, []);

  return (
    <div className="result-container">
      {results.map((result, index) => (
        <div key={index} className="btnTransparent">
          <div className="top">
            <div>{result.name}</div>
            <div>{result.score}</div>
          </div>
          <ul className="result-ul">
            {result.answerList.map((answer, index) => (
              <li key={index}>{`${index + 1} : ${answer}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Admin;
