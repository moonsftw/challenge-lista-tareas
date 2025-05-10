import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<FormPage />} />
        <Route path="/edit/:id" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;