import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Switch, useNavigate} from "react-router-dom";
import Home from './pages/home';
import List from './pages/list';
import Trip from './pages/trip';
import Login from './pages/login';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import Ticket from './pages/ticket';
import Bill from './pages/bill';
import Contacts from './pages/contacts';
import About from './pages/about';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/trips" element={<List />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/trip/:id" element={<Trip />}></Route>
                    <Route path="/profile/:action" element={<Profile />}></Route>
                    <Route path="/schedule" element={<Schedule />}></Route>
                    <Route path="/ticket" element={<Ticket />}></Route>
                    <Route path="/bill" element={<Bill />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contacts" element={<Contacts />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
