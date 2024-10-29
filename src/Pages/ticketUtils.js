export const groupingOrderTickets = (tickets, grouping, users) => {
  switch (grouping) {
      case 'status':
          return byStatusGrouping(tickets);
      case 'user':
          return byUserGrouping(tickets, users);
      case 'priority':
          return byPriorityGrouping(tickets);
      default:
          return byStatusGrouping(tickets);
  }
};

const byStatusGrouping = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
    return acc;
  }, {});
};

const byUserGrouping = (tickets, users) => {
  return tickets.reduce((acc, ticket) => {
    const user = users.find(user => user.id === ticket.userId);
    (acc[user.name] = acc[user.name] || []).push(ticket);
    return acc;
  }, {});
};

const byPriorityGrouping = (tickets) => {
  const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  return tickets.reduce((acc, ticket) => {
    (acc[priorityNames[ticket.priority]] = acc[priorityNames[ticket.priority]] || []).push(ticket);
    return acc;
  }, {});
};
const titleSort = (a, b) => b.priority - a.priority;

const prioritySort = (a, b) => a.title.localeCompare(b.title);
export const sortingOrderTickets = (groupedTickets, ordering) => {
  const sortFun = ordering === 'title' ? titleSort : prioritySort;

  return Object.fromEntries(
    Object.entries(groupedTickets).map(([group, tickets]) => [
      group,
      tickets.sort(sortFun)
    ])
  );
};

