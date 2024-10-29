import React, { useState, useEffect } from 'react';
import Header from './Pages/Header';
import Board from './Pages/Board';
import './App.css';

function App() {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  useEffect(() => {
    const findState = localStorage.getItem('OrderGroupState');
    if (findState) {
      const { grouping, ordering } = JSON.parse(findState);
      setGrouping(grouping);
      setOrdering(ordering);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('OrderGroupState', JSON.stringify({ grouping, ordering }));
  }, [grouping, ordering]);

  return (
    <div className="App">
      <Header 
        group={grouping}
        order={ordering}
        onGroupChange={setGrouping}
        onOrderChange={setOrdering}
      />
      <Board grouping={grouping} ordering={ordering} />
    </div>
  );
}

export default App;