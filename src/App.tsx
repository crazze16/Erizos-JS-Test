import React from 'react';
import './styles/styles.css';
import {Disk} from "./components/Disk";

function App() {
  return (
    <div className="App">
      <Disk expanded={['/Common7', '/SDK/Bootstrapper']}/>
    </div>
  );
}

export default App;
