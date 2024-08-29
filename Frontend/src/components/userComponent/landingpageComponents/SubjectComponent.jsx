import React from 'react';
import { motion } from 'framer-motion';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Card from '@mui/material/Card'; // Ensure you import the Card component from MUI if you're using it

const subjects = [
  {
    id: 1,
    name: 'Physics',
    rank: '1234',
    icon: <LibraryBooksIcon className="w-6 h-6 text-blue-600" />
  },
  {
    id: 2,
    name: 'Chemistry',
    rank: '2345',
    icon: <LibraryBooksIcon className="w-6 h-6 text-blue-600" />
  },
  {
    id: 3,
    name: 'Mathematics',
    rank: '3456',
    icon: <LibraryBooksIcon className="w-6 h-6 text-blue-600" />
  }
];

const Subject = () => {
  return (
    <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <motion.div
          key={subject.id}
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: subject.id * 0.1 }}
        >
          <Card
            className="bg-white p-6 flex flex-col items-center gap-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg"
          >
            <div className="flex items-center gap-2">
              {subject.icon}
              <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
            </div>
            <div className="text-blue-600 font-bold text-sm">All India Rank: {subject.rank}</div>
          </Card>
        </motion.div>
      ))}
    </section>
  );
};

export default Subject;
