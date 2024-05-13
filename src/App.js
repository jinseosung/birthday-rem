import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/main.css";
import Home from "./pages/Home";
import QuizMain from "./pages/QuizMain";
import Quiz from "./pages/Quiz";
import QuizThx from "./pages/QuizThx";
import QuizResult from "./pages/QuizResult";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  { path: `/`, element: <Home /> },
  { path: `/quizmain`, element: <QuizMain /> },
  {
    path: `/quiz/:name`,
    element: <Quiz />,
  },
  { path: `/quizthx`, element: <QuizThx /> },
  { path: `/result`, element: <QuizResult /> },
  { path: `/admin`, element: <Admin /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
