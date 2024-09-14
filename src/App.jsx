import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadlineHub from './components/HeadlineHub';
import SeeNewsPage from './components/SeeNewsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeadlineHub />} />
      <Route path="/news/:id" element={<SeeNewsPage />} />
    </Routes>
  );
}

export default App;