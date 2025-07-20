import React from 'react';
import UrgentToCall from '../to-call/UrgentToCall';
import UrgentTodo from '../tasks/UrgentTodo';
import UpcomingEvents from '../event/UpcomingEvents';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-semibold mb-8">Welcome to Daily Job Search Board</h2>
      <p className="text-lg text-gray-700 mb-8">
        Manage your job applications, interviews, and tasks all in one place!
      </p>
      {/* Table Components */}
      <div className="space-y-8">
        <UrgentToCall />
        <UrgentTodo />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Home;