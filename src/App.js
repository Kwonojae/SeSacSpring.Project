
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from './navigator/Navigator';
import HomePage from './homePage/HomePage';
import Footer from './footer/Footer';
import SummonerPage from './homePage/SummonerPage';
import RegisterPage from './homePage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Navigator></Navigator>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/summoner/" element={<SummonerPage />} />
        <Route path="/register/" element={<RegisterPage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;