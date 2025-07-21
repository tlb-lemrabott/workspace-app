import React from 'react';

const UrgentToCall = () => {
  const data = [
    { name: 'John Doe', phone: '555-123-9094', status: 'Urgent' },
    { name: 'Jane Smith hhhhhh ', phone: '555-567-8098', status: 'Urgent' },
    { name: 'Kale Day ', phone: '299-567-8098', status: 'Urgent' },
    // Add more rows as needed
  ];

  return (
    <div className="mb-6 text-left">
      <h3 className="text-2xl font-semibold mb-4">
        <span className="bg-red-500 text-white px-2 py-1 rounded">Urgent to Call List</span>
      </h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.phone}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrgentToCall;