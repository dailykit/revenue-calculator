import React from 'react';
import { useSelector } from 'react-redux';

import { Calculator, Mail, Report } from './components';

const App = () => {

  const stage = useSelector(state => state.stage);

  const resolveScreen = () => {
    switch(stage) {
      case 0:
        return <Calculator />;
      case 1:
        return <Report />;
      case 2:
        return <Mail />;
      default:
        return <Calculator />;
    }
  }

  return (
    <div className="App">
      { resolveScreen() }
    </div>
  );
}

export default App;