import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import LineChartComponent from './components/LineChartComponent';
import StudentsTable from './components/StudentsTable';
import { studentsData, monthlyPerformance } from './data/students';

function App() {
  const [students, setStudents] = useState(studentsData);
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate KPI metrics
  const calculateMetrics = () => {
    const totalStudents = students.length;
    const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
    const avgMarks = students.reduce((sum, s) => sum + s.marks, 0) / totalStudents;
    const passCount = students.filter(s => s.status === 'Pass').length;
    const failCount = students.filter(s => s.status === 'Fail').length;

    return {
      avgAttendance: avgAttendance.toFixed(1),
      avgMarks: avgMarks.toFixed(1),
      passCount,
      failCount
    };
  };

  const metrics = calculateMetrics();

  // Prepare data for charts
  const barChartData = students.map(student => ({
    name: student.name.split(' ')[0], // First name only for better display
    marks: student.marks
  }));

  const pieChartData = [
    { name: 'Pass', value: metrics.passCount },
    { name: 'Fail', value: metrics.failCount }
  ];

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar onSearch={handleSearch} />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard
              title="Average Attendance"
              value={`${metrics.avgAttendance}%`}
              subtitle="Overall class attendance"
              icon="📊"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
            />
            <SummaryCard
              title="Average Marks"
              value={metrics.avgMarks}
              subtitle="Class average performance"
              icon="📈"
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
            />
            <SummaryCard
              title="Pass / Fail"
              value={`${metrics.passCount} / ${metrics.failCount}`}
              subtitle="Student status breakdown"
              icon="✅"
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BarChartComponent data={barChartData} />
            <PieChartComponent data={pieChartData} />
          </div>

          <div className="mb-6">
            <LineChartComponent data={monthlyPerformance} />
          </div>

          {/* Students Table */}
          <StudentsTable students={filteredStudents} />
        </main>
      </div>
    </div>
  );
}

export default App;

