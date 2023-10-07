import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,  Switch , useNavigate } from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Trip from './pages/trip/Trip';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Schedule from './pages/schedule/Schedule';
import Ticket from './pages/ticket/Ticket';
import Bill from './pages/bill/Bill';
import Contacts from './pages/contacts/Contacts';
import About from './pages/about/About';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/trips" element={<List/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/trip/:id" element={<Trip/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/schedule" element={<Schedule/>}></Route>
              <Route path="/ticket" element={<Ticket/>}></Route>
              <Route path="/bill" element={<Bill/>}></Route>
              <Route path="/about" element={<About/>}></Route>
              <Route path="/contacts" element={<Contacts/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
