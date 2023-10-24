import PlayersList from './Components/PlayersList';
import './App.css';
import { Outlet,RouterProvider } from "react-router-dom";
import { FilterSearchProvider } from './Utility/FilterSearchContext';
import About from './Components/AboutCricketer';

function App() {
  return (
    <div className="App">
    
      <PlayersList/>
      {/* <About/> */}
    
      
    
    </div>
  );
}


export default App;
