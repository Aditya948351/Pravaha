/**
 * PRAVAHA - Section 7: 6-Person Team Breakdown & Execution Matrix
 * Direct mapping of Sections 36 & 37 from the SIH26082 Build Blueprint.
 */

import { teamRoles, hackathonMilestones } from '../data/teamRoles.js';

let activeRoleId = 'P1';

export function renderTeamMatrix() {
  const activeRole = teamRoles.find(r => r.roleId === activeRoleId) || teamRoles[0];

  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Section Intro -->
      <div class="glass-panel" style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-purple">HACKATHON EXECUTION BLUEPRINT</span>
          <span class="badge badge-cyan">6-PERSON SPECIALIZATION</span>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">
          6-Person Work Breakdown Structure & <span class="gradient-text-purple">Role Specialization</span>
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 900px;">
          To build a winning SIH solution, no team member should work in isolation. 
          Every member has a crisp mandate, clear dependencies, specific deliverables, and designated judge defense topics.
        </p>
      </div>

      <!-- 6-Person Navigation Selector -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;" id="role-selector-grid">
        ${teamRoles.map(role => `
          <div class="glass-card role-select-card ${activeRoleId === role.roleId ? 'active-role-card' : ''}" data-role-id="${role.roleId}" style="padding: 16px; cursor: pointer; border-color: ${activeRoleId === role.roleId ? role.avatarColor : 'var(--border-subtle)'}; background: ${activeRoleId === role.roleId ? 'rgba(255,255,255,0.06)' : 'var(--bg-glass-card)'};">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: ${role.avatarColor};"></span>
              <span class="badge" style="background: ${role.avatarColor}22; color: ${role.avatarColor}; font-size: 0.7rem;">${role.roleId}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #fff; margin-bottom: 2px;">${role.title.split(':')[1] || role.title}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${role.badge}</div>
          </div>
        `).join('')}
      </div>

      <!-- Active Role Detail Command Center -->
      <div class="glass-panel" style="padding: 32px; border-color: ${activeRole.avatarColor}55;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <span class="badge" style="background: ${activeRole.avatarColor}22; color: ${activeRole.avatarColor}; border: 1px solid ${activeRole.avatarColor};">
                ${activeRole.roleId} SPECIALIZATION
              </span>
              <span class="badge badge-cyan">${activeRole.badge}</span>
            </div>
            <h3 style="font-size: 1.6rem; color: #fff;">${activeRole.title}</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 800px; margin-top: 6px;">
              ${activeRole.primaryMandate}
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px 18px; border-radius: 10px; border: 1px solid var(--border-subtle); max-width: 380px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Pipeline Dependency</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              ${activeRole.dependencies}
            </div>
          </div>
        </div>

        <!-- Role Core Deliverables Grid -->
        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: #38bdf8; display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Must-Ship Deliverables for Hackathon Evaluation
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;">
            ${activeRole.coreDeliverables.map(deliv => `
              <div style="background: rgba(255,255,255,0.02); padding: 14px 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.86rem; color: #f8fafc; line-height: 1.5; border-left: 3px solid ${activeRole.avatarColor};">
                ${deliv}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tech Stack & Tools Pills -->
        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: #a855f7;">Prescribed Technology Stack & Tools</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${activeRole.techStack.map(tech => `
              <span class="badge" style="background: rgba(255,255,255,0.05); color: #e2e8f0; font-family: var(--font-mono); padding: 6px 12px; border: 1px solid var(--border-subtle);">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Hour-by-Hour 36-Hour Sprint Schedule for this Person -->
        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1.05rem; margin-bottom: 14px; color: #f59e0b;">36-Hour Hackathon Execution Timeline</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">DAY 1: MORNING</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${activeRole.sprintTimeline.day1Morning}</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.72rem; color: #10b981; font-weight: 700;">DAY 1: AFTERNOON</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${activeRole.sprintTimeline.day1Afternoon}</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.72rem; color: #a855f7; font-weight: 700;">DAY 1: NIGHT</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${activeRole.sprintTimeline.day1Night}</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.72rem; color: #f59e0b; font-weight: 700;">DAY 2: MORNING</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${activeRole.sprintTimeline.day2Morning}</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.72rem; color: #f43f5e; font-weight: 700;">DAY 2: EVALUATION</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${activeRole.sprintTimeline.day2Afternoon}</p>
            </div>
          </div>
        </div>

        <!-- Designated Evaluator Questions Defended -->
        <div style="background: rgba(244, 63, 94, 0.06); padding: 20px; border-radius: 12px; border: 1px solid rgba(244, 63, 94, 0.2);">
          <div style="font-size: 0.85rem; font-weight: 700; color: #fb7185; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Evaluator Trap Questions This Member Must Defend
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${activeRole.evaluatorQuestionsDefended.map(q => `
              <div style="font-size: 0.84rem; color: var(--text-secondary);">• <strong>${q}</strong></div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Master Hackathon 36-Hour Sprint Progression Overview -->
      <div class="glass-panel" style="padding: 28px;">
        <h3 style="font-size: 1.25rem; margin-bottom: 16px;">Overall Hackathon 36-Hour Sprint Milestones</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          ${hackathonMilestones.map(ms => `
            <div style="background: rgba(255,255,255,0.02); padding: 14px 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="font-mono" style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">${ms.time}</div>
              <div style="font-weight: 700; font-size: 0.95rem; color: #fff; margin: 4px 0;">${ms.title}</div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">${ms.focus}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initTeamMatrix(onRerender) {
  document.querySelectorAll('.role-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const roleId = card.getAttribute('data-role-id');
      if (roleId) {
        activeRoleId = roleId;
        if (onRerender) onRerender();
      }
    });
  });
}
