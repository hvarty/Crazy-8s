//impost other files
import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Play from './play';
import Intro from './intro';

//sets the screens
function App() {
  const [isIntro, setisIntro] = useState(true);
  return (
    <div className="App">
      {!isIntro &&
        <Play />
      }
      {isIntro &&
        <Intro setisIntro={setisIntro} />
      }
    </div>
  );
}

export default App;
