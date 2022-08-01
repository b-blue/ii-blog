import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewArticle from "./components/NewArticle";
import Home from "./components/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Article from "./components/Article";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#282c34",
        light: "#50555e",
        dark: "#00000d",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f00",
        light: "#ff7961",
        dark: "#ba000d",
        contrastText: "#00000",
      },
      white: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/new" element={<NewArticle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
