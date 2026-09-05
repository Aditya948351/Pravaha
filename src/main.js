/**
 * PRAVAHA - Main Application Bootstrapper & Routing Controller
 */

import { renderNavbar, initNavbarEvents } from './components/Navbar.js';
import { renderProblemStatement } from './components/ProblemStatement.js';
import { renderScienceExplainer } from './components/ScienceExplainer.js';
import { renderArchitectureView } from './components/ArchitectureView.js';
import { renderGisForecastExplorer, initGisForecastExplorer } from './components/GisForecastExplorer.js';
import { renderPhysicsLab, initPhysicsLab } from './components/PhysicsLab.js';
import { renderStubbleGrapHub, initStubbleGrapHub } from './components/StubbleGrapHub.js';
import { renderTeamMatrix, initTeamMatrix } from './components/TeamMatrix.js';
import { renderJudgeDefense, initJudgeDefense } from './components/JudgeDefense.js';
import { initAtmosphericCanvas } from './components/AtmosphericStreamlines.js';

let activeTab = 'overview';

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Render HTML structure
  app.innerHTML = `
    <div class="app-container">
      ${renderNavbar(activeTab, handleTabChange)}

      <main id="tab-content-area" style="min-height: 600px;">
        ${getTabContent(activeTab)}
      </main>

      <!-- Footer -->
      <footer class="glass-panel" style="margin-top: 48px; padding: 24px; text-align: center; border-color: var(--border-subtle);">
        <div style="font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; margin-bottom: 6px;">
          PRAVAHA <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">SIH 2026 EDITION</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); max-width: 650px; margin: 0 auto 12px auto;">
          Physics-informed Resilient Atmospheric Ventilation & Air-quality Hybrid Architecture for Delhi-NCR 72-hour Coupled Forecasting.
          Built for Smart India Hackathon 2026 • Ministry of Earth Sciences (MoES) / NCMRWF • Problem ID: SIH26082.
        </p>
        <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <span>License: Open Access (MIT / CC-BY-4.0)</span>
          <span>•</span>
          <span>Data Sources: CPCB, ECMWF ERA5, NOAA GFS, NASA FIRMS</span>
          <span>•</span>
          <span>WRF-Chem v4.5.1 Coupled Reference</span>
        </div>
      </footer>
    </div>
  `;

  // Attach navbar events
  initNavbarEvents(handleTabChange);

  // Initialize active tab interactive logic
  initActiveTab(activeTab);
}

function getTabContent(tab) {
  switch (tab) {
    case 'overview':
      return renderProblemStatement();
    case 'physics':
      return renderScienceExplainer();
    case 'architecture':
      return renderArchitectureView();
    case 'explorer':
      return renderGisForecastExplorer();
    case 'lab':
      return renderPhysicsLab();
    case 'grap':
      return renderStubbleGrapHub();
    case 'team':
      return renderTeamMatrix();
    case 'defense':
      return renderJudgeDefense();
    default:
      return renderProblemStatement();
  }
}

function initActiveTab(tab) {
  if (tab === 'explorer') {
    initGisForecastExplorer();
  } else if (tab === 'lab') {
    initPhysicsLab();
  } else if (tab === 'grap') {
    initStubbleGrapHub(renderApp);
  } else if (tab === 'team') {
    initTeamMatrix(renderApp);
  } else if (tab === 'defense') {
    initJudgeDefense(renderApp);
  }
}

function handleTabChange(newTab) {
  activeTab = newTab;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

// Initial mount on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  setTimeout(() => {
    initAtmosphericCanvas('app');
  }, 100);
});
