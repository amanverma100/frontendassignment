import React from 'react';
import './Col.css';
import Card from './Card';
import { ReactComponent as Dots } from '../assets/3 dot menu.svg';
import { ReactComponent as Done } from '../assets/Done.svg';
import { ReactComponent as Plus } from '../assets/add.svg';
import { ReactComponent as Cancelled } from '../assets/Cancelled.svg';
import { ReactComponent as Backlog } from '../assets/Backlog.svg';
import { ReactComponent as Todo } from '../assets/To-do.svg';
import { ReactComponent as Progress } from '../assets/in-progress.svg';
import { ReactComponent as MediumPriority } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as LowPriority} from '../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriority } from '../assets/No-priority.svg';
import { ReactComponent as Urgent } from '../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighPriority } from '../assets/Img - High Priority.svg';


const Title = ({ title, users }) => {
  const user = users.find(user => user.name === title);
  if (user) {
    return (
      <div className="user-avatar">
        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
        <span className={`status-indicator ${user.available ? 'available' : ''}`}></span>
      </div>
    );
  }

  switch (title) {
    case 'Todo':
      return <Todo />;
    case 'In progress':
      return <Progress />;
    case 'Done':
      return <Done />;
    case 'Cancelled':
      return <Cancelled />;
    case 'Backlog':
      return <Backlog />;
    case 'Urgent':
      return <Urgent />;
    case 'High':
      return <HighPriority />;
    case 'Medium':
      return <MediumPriority />;
    case 'Low':
      return <LowPriority />;
    case 'No priority':
      return <NoPriority />;
    default:
      return <></>;
  }
};

const Col = ({ title, tickets, users, grouping }) => {
  return (
    <div className="col">
      <div className="col-header">
        <div className="col-title">
          <span className="col-icon">
            <Title title={title} users={users} />
          </span>
          <span>{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="col-actions">
          <Plus className="icon" />
          <Dots className="icon" />
        </div>
      </div>
      <div className="col-cards">
        {tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} grouping={grouping}/>
        ))}
      </div>
    </div>
  );
};

export default Col;