import React from 'react';

const UrgentTodo = () => {
  const data = [
    { task: 'Submit report', dueDate: '2024-09-28', priority: 'High' },
    { task: 'Fix bugs in project', dueDate: '2024-09-29', priority: 'High' },
    // Add more rows as needed
  ];

  return (
    <div className="mb-6 text-left">
      <h3 className="text-2xl font-semibold mb-4">
        <span className="bg-yellow-500 text-white px-2 py-1 rounded">Urgent To-Do</span>
      </h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Priority</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.task}</td>
              <td className="py-2 px-4 border-b">{item.dueDate}</td>
              <td className="py-2 px-4 border-b">{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrgentTodo;
