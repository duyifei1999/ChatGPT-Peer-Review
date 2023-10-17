import React, { useEffect, useState } from 'react';
import TimeTablePage from 'src/components/TimeTable/TimeTable';

async function fetchUserData() {
  return localStorage.getItem('role');
}

function TimeTablepage() {
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUserData()
      .then((userData) => {
        setRole(userData || '');
      });
  });
  return (
    <div>
      {role === 'student' && <TimeTablePage />}
    </div>
  );
}

export default TimeTablepage;
