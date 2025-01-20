import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogLandingPage from './components/BlogLandingPage/BlogLandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
