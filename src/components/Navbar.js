/**
 * PRAVAHA - Navigation & Operations Status Header
 */

export function renderNavbar(activeTab, onTabChange) {
  const tabs = [
    { id: "overview", label: "PS Overview", icon: "clipboard-list" },
    { id: "physics", label: "Atmospheric Physics", icon: "activity" },
    { id: "architecture", label: "System Architecture", icon: "layers" },
    { id: "explorer", label: "72h GIS Explorer", icon: "map-pin" },
    { id: "lab", label: "Trapping & Feedback Lab", icon: "sliders" },
    { id: "grap", label: "Stubble & GRAP Hub", icon: "shield-alert" },
    { id: "team", label: "6-Person Team Roles", icon: "users" },
    { id: "defense", label: "58 Judge Defense Q&As", icon: "award" }
  ];

  const navHtml = `
    <header style="position: sticky; top: 0; z-index: 100; margin-bottom: 24px; padding-top: 14px;">
      <!-- Operational Status Bar -->
      <div class="glass-panel" style="padding: 10px 20px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; border-color: rgba(6, 182, 212, 0.25);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="pulse-dot pulse-dot-emerald"></span>
            <span class="font-mono" style="font-size: 0.8rem; color: var(--text-secondary);">OPERATIONAL PIPELINE: ACTIVE</span>
          </div>
          <span style="color: var(--border-medium);">|</span>
          <span class="font-mono" style="font-size: 0.8rem; color: #38bdf8;">SIH 2026 • PS ID: SIH26082</span>
          <span style="color: var(--border-medium);">|</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Ministry of Earth Sciences (MoES) / NCMRWF</span>
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-rose" style="font-size: 0.72rem;">
              <span class="pulse-dot pulse-dot-rose" style="width: 6px; height: 6px;"></span>
              NCR REGIONAL AQI: 374 (VERY POOR)
            </span>
            <span class="badge badge-amber" style="font-size: 0.72rem;">
              INVERSION LID: 4.1°C (HIGH TRAPPING)
            </span>
          </div>
          <div class="font-mono" id="nav-clock" style="font-size: 0.78rem; color: var(--text-secondary); background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            IST --:--:--
          </div>
        </div>
      </div>

      <!-- Main Navigation Hub -->
      <nav class="glass-panel" style="padding: 8px 16px; display: flex; align-items: center; justify-content: space-between; overflow-x: auto;">
        <div style="display: flex; align-items: center; gap: 12px; margin-right: 20px; cursor: pointer;" id="brand-logo">
          <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(6, 182, 212, 0.4);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
            </svg>
          </div>
          <div>
            <div style="font-family: var(--font-display); font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.1;">
              PRAVAHA <span style="font-size: 0.75rem; font-weight: 600; color: var(--accent-cyan); letter-spacing: 0.08em;">SIH 2026</span>
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 500;">
              Delhi-NCR Coupled Atmospheric Operations
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;" id="nav-tabs-container">
          ${tabs.map(tab => `
            <button class="nav-tab-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
              <span>${tab.label}</span>
            </button>
          `).join('')}
        </div>
      </nav>
    </header>
  `;

  return navHtml;
}

export function initNavbarEvents(onTabChange) {
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) onTabChange(tabId);
    });
  });

  const brand = document.getElementById('brand-logo');
  if (brand) {
    brand.addEventListener('click', () => onTabChange('overview'));
  }

  // Update real-time clock
  const updateClock = () => {
    const clockEl = document.getElementById('nav-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = 'IST ' + now.toLocaleTimeString('en-IN', { hour12: false }) + ' | UTC ' + now.toISOString().substring(11, 19);
    }
  };
  updateClock();
  setInterval(updateClock, 1000);
}
