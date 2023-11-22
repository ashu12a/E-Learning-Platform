import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Header from './components/Navbar/Header';
import Courses from './components/Courses/Courses';

function App() {
  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/courses' Component={Courses}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
