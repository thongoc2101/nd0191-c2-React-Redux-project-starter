import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRouter from './components/PrivateRouter';
import Header from './components/Header';
import New from './components/subTab/New';
import Home from './components/subTab/Home';
import Leaderboard from './components/subTab/Leaderboard';
import PollPage from './components/subTab/PollPage';
import NotFound from './components/404';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" exact element={<Login />} />

        <Route path="/add" element={<PrivateRouter>
          <Header />
          <New />
        </PrivateRouter>} />

        <Route path="/" element={<PrivateRouter>
          <Header />
          <Home />
        </PrivateRouter>} />

        <Route path="/leaderboard" element={<PrivateRouter>
          <Header />
          <Leaderboard />
        </PrivateRouter>} />

        <Route path="/questions/:id" element={<PrivateRouter>
          <Header />
          <PollPage />
        </PrivateRouter>} />

        <Route path="/404" element={<PrivateRouter>
          <Header />
          <NotFound />
        </PrivateRouter>} />
      </Routes>
    </div>
  );
}

export default App;
