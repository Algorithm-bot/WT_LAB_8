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
  const [activeSection, setActiveSection] = useState('dashboard');

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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Render Dashboard View
  const renderDashboard = () => (
    <>
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
    </>
  );

  // Render Students View
  const renderStudents = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Students Management</h2>
        <p className="text-gray-600">View and manage all student records</p>
      </div>
      <StudentsTable students={filteredStudents} />
    </div>
  );

  // Render Reports View
  const renderReports = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Performance Reports</h2>
        <p className="text-gray-600">Detailed analytics and visualizations</p>
      </div>
      
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
    </div>
  );

  // Render Settings View
  const renderSettings = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Configure dashboard preferences</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-700">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email updates about student performance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-700">Auto Refresh</p>
                  <p className="text-sm text-gray-500">Automatically refresh data every 5 minutes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Display Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default View
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Dashboard</option>
                  <option>Students</option>
                  <option>Reports</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items Per Page
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'students':
        return renderStudents();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar onSearch={handleSearch} />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;

