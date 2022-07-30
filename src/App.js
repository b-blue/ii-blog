import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import NewArticle from "./components/NewArticle";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<NewArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
