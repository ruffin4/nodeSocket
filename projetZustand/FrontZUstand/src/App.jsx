import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";
import ZustandPage from "./pages/ZustandPage";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/zustandPage" element={<ZustandPage/>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
