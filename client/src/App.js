import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogLandingPage from './components/BlogLandingPage/BlogLandingPage';
import BlogPost from './components/BlogPost/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLandingPage />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
