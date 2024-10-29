import React, { useState, useEffect,useRef } from 'react';
import { fetchData } from './fetchurl';
import Column from './Col';
import './Board.css';
import { sortingOrderTickets, groupingOrderTickets } from './ticketUtils';
const Board = ({ grouping, ordering }) => {
  const [groupedTickets, setGroupedTickets] = useState({});
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const boardRef = useRef(null); 
  useEffect(() => {
    const dataLoaded = async () => {
      const data = await fetchData();
      if (data) {
        setTickets(data.tickets);
        setUsers(data.users);
      }
    };
    dataLoaded();
  }, []);

  useEffect(() => {
    const grouped = groupingOrderTickets(tickets, grouping, users);
    const sortedGroupedTicket = sortingOrderTickets(grouped, ordering);
    setGroupedTickets(sortedGroupedTicket);
  }, [grouping, ordering, tickets, users]);

   
   const mouseDownHandler = (e) => {
    const startX = e.pageX - boardRef.current.offsetLeft;
    const scrollLeft = boardRef.current.scrollLeft;

    const mouseMoveHandler = (e) => {
      const x = e.pageX - boardRef.current.offsetLeft;
      const walk = (x - startX) * 2; 
      boardRef.current.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      boardRef.current.removeEventListener('mousemove', mouseMoveHandler);
      boardRef.current.removeEventListener('mouseup', mouseUpHandler);
      boardRef.current.removeEventListener('mouseleave', mouseUpHandler);
      boardRef.current.classList.remove('dragging');
    };

    boardRef.current.addEventListener('mousemove', mouseMoveHandler);
    boardRef.current.addEventListener('mouseup', mouseUpHandler);
    boardRef.current.addEventListener('mouseleave', mouseUpHandler);
    boardRef.current.classList.add('dragging');
  };


  return (
    <div className="board" ref={boardRef} onMouseDown={mouseDownHandler}>
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <Column key={group} title={group} tickets={tickets} users={users} grouping={grouping} />
      ))}
    </div>
  );
};

export default Board;