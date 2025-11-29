# Student Performance Monitoring Dashboard (LAB 8)

A comprehensive React.js dashboard for monitoring student performance with interactive charts, KPI cards, and a detailed student table.

## Features

- **Left Sidebar Navigation** - Easy navigation between different sections
- **Top Navbar** - Dashboard title and search functionality
- **KPI Summary Cards** - Three cards showing:
  - Average Attendance (%)
  - Average Marks
  - Pass/Fail Count
- **Interactive Charts** (using Recharts):
  - Bar Chart - Student-wise marks
  - Pie Chart - Pass/Fail distribution
  - Line Chart - Monthly performance trend
- **Students Table** - Complete student data with:
  - Student Name
  - Attendance (%)
  - Marks
  - Grade
  - Status (Pass/Fail)
  - Red-tinted background for failing students

## Tech Stack

- React 18.2.0
- Recharts 2.10.3
- Tailwind CSS 3.4.0
- Vite 5.0.8

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  components/
    Sidebar.jsx
    Navbar.jsx
    SummaryCard.jsx
    BarChartComponent.jsx
    PieChartComponent.jsx
    LineChartComponent.jsx
    StudentsTable.jsx
  data/
    students.js
  App.jsx
  index.jsx
  index.css
```

## Components

- **Sidebar** - Navigation sidebar with menu items
- **Navbar** - Top navigation bar with search functionality
- **SummaryCard** - Reusable KPI card component
- **BarChartComponent** - Student marks visualization
- **PieChartComponent** - Pass/Fail distribution chart
- **LineChartComponent** - Monthly performance trend
- **StudentsTable** - Student data table with conditional styling

## Data

Sample student data is stored in `src/data/students.js` with 7 students including both passing and failing cases.

