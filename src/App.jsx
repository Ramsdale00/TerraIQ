import React, { useEffect } from 'react';
import AtlasView from './components/AtlasView.jsx';
import CaseStudyView from './components/CaseStudyView.jsx';
import ChecklistDrawer from './components/ChecklistDrawer.jsx';
import './app-logic.js';

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.initAtlasApp === 'function') {
      window.initAtlasApp();
    }
  }, []);

  return (
    <>
      <AtlasView />
      <CaseStudyView />
      <ChecklistDrawer />
    </>
  );
}
