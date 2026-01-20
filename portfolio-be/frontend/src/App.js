import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TerminalPage from './pages/TerminalPage';
import Project1Page from './pages/Project1Page';
import ChatWithAIPage from './pages/ChatWithAIPage';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavigationBar />
        <main style={{ flex: 1, margin: 0, padding: 0, width: '100%' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terminal" element={
              <div style={{ width: '100%', height: '100%' }}>
                <TerminalPage />
              </div>
            } />
            <Route path="/project1" element={<Project1Page />} />
            <Route path="/chat" element={<ChatWithAIPage />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
