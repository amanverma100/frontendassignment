import React from 'react';
import './Card.css';
import { ReactComponent as UrgentPriority } from '../assets/SVG - Urgent Priority grey.svg';
import { ReactComponent as HighPriority } from '../assets/Img - High Priority.svg';
import { ReactComponent as MediumPriority } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as LowPriority} from '../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriority} from '../assets/No-priority.svg';

import { ReactComponent as Todo } from '../assets/To-do.svg';
import { ReactComponent as Progress } from '../assets/in-progress.svg';
import { ReactComponent as Done } from '../assets/Done.svg';
import { ReactComponent as Cancelled } from '../assets/Cancelled.svg';
import { ReactComponent as Backlog } from '../assets/Backlog.svg';

const priIcons = {
  4: UrgentPriority,
  3: HighPriority,
  2: MediumPriority,
  1: LowPriority,
  0: NoPriority,
};

const statIcons = {
  'Todo': Todo,
  'In progress': Progress,
  'Done': Done,
  'Cancelled': Cancelled,
  'Backlog': Backlog,
};

const Card = ({ ticket, user, grouping }) => {
  const Priority = priIcons[ticket.priority];
  const Status = statIcons[ticket.status];

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
            <span className={`status-indicator ${user.available ? 'available' : ''}`}></span>
          </div>
        )}
      </div>
      <div className="card-title-container">
        {grouping !== 'status' && <Status className="status-icon" />}
        <h3 className="card-title">{ticket.title}</h3>
      </div>
      <div className="card-tags">
        {grouping !== 'priority' && (
          <div className="tag priority-tag">
            <Priority />
          </div>
        )}
        {ticket.tag.map((tag, index) => (
          <div key={index} className="tag feature-tag">
            <div className="feature-icon"/>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;