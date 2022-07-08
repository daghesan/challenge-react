import './App.scss';
import { Routes, Route} from "react-router-dom"
import Homepage from './pages/Homepage';
import Character from "./pages/Character";
import House from './pages/House';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/challenge-react" element={<Homepage></Homepage>}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
        <Route path="/house/:id" element={<House />}></Route>
      </Routes>
    </div>
  );
}

export default App;
