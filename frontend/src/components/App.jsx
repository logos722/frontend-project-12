import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import NF from './NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route element={<NF />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
