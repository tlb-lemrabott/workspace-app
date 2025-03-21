import React from 'react';

const UpcomingEvents = () => {
  const data = [
    { event: 'Team Meeting', date: '2024-10-01', location: 'Zoom' },
    { event: 'Product Launch', date: '2024-10-10', location: 'Office HQ' },
    // Add more rows as needed
  ];

  return (
    <div className="mb-6 text-left">
      <h3 className="text-2xl font-semibold mb-4">
        <span className="bg-green-500 text-white px-2 py-1 rounded">Soon Upcoming Events</span>
      </h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Event</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{item.event}</td>
              <td className="py-2 px-4 border-b">{item.date}</td>
              <td className="py-2 px-4 border-b">{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEvents;
