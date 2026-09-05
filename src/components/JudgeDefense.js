/**
 * PRAVAHA - Section 8: The 58 Judge Defense Q&A Engine
 * Complete searchable and categorized defense playbook from Section 48 of the Blueprint.
 */

import { judgeQAs, judgeQACategories } from '../data/judgeQA.js';

let activeCategory = 'all';
let searchKeyword = '';

export function renderJudgeDefense() {
  const filteredQAs = judgeQAs.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchKeyword || 
      item.question.toLowerCase().includes(searchKeyword.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.trapToAvoid.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return `
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <!-- Section Intro -->
      <div class="glass-panel" style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-rose">EVALUATOR DEFENSE SHIELD</span>
          <span class="badge badge-cyan">58 SCIENTIFIC DEFENSES</span>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 10px;">
          The 58 Judge Defense <span class="gradient-text-fire">Q&A Knowledge Vault</span>
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 900px;">
          Hackathons are won during the 5 minutes of judge grilling. 
          Use this interactive defense playbook to master every question, trap, and edge case atmospheric scientists and MoES evaluators will throw at your team.
        </p>
      </div>

      <!-- Search & Filter Controls -->
      <div class="glass-panel" style="padding: 22px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Search Input -->
          <div style="position: relative;">
            <input 
              type="text" 
              id="qa-search-input" 
              placeholder="Search by keyword (e.g., 'coupling', 'PBL', 'leakage', 'LightGBM', 'WRF-Chem', 'trap', 'inversion')..." 
              value="${searchKeyword}"
              style="width: 100%; padding: 12px 18px 12px 42px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-medium); border-radius: 10px; color: #fff; font-size: 0.92rem; outline: none;"
            >
            <div style="position: absolute; left: 14px; top: 12px; color: var(--text-muted);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>

          <!-- Category Buttons -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="qa-category-buttons">
            ${judgeQACategories.map(cat => `
              <button class="qa-cat-btn ${activeCategory === cat.id ? 'active-qa-cat' : ''}" data-cat-id="${cat.id}" style="padding: 8px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; border: 1px solid ${activeCategory === cat.id ? 'rgba(6, 182, 212, 0.4)' : 'var(--border-subtle)'}; background: ${activeCategory === cat.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)'}; color: ${activeCategory === cat.id ? '#38bdf8' : 'var(--text-secondary)'}; cursor: pointer;">
                ${cat.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Results Count & Q&A Cards List -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; font-size: 0.85rem; color: var(--text-muted);">
          <span>Showing <strong style="color: #fff;">${filteredQAs.length}</strong> of 58 defense questions</span>
          <span>Category: <strong style="color: #38bdf8;">${judgeQACategories.find(c => c.id === activeCategory)?.name || 'All'}</strong></span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;" id="qa-cards-list">
          ${filteredQAs.map(item => `
            <div class="glass-card" style="padding: 24px; border-left: 4px solid ${item.category === 'traps' ? '#ef4444' : (item.category === 'physics' ? '#10b981' : (item.category === 'wrf' ? '#a855f7' : '#0ea5e9'))};">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="font-mono" style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; background: rgba(6, 182, 212, 0.1); padding: 2px 8px; border-radius: 4px;">
                    Q${item.id}
                  </span>
                  <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted); font-size: 0.7rem;">
                    ${item.categoryLabel}
                  </span>
                </div>
              </div>

              <!-- Question -->
              <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 12px; line-height: 1.4;">
                ${item.question}
              </h3>

              <!-- Scientific Answer -->
              <div style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 14px;">
                ${item.answer}
              </div>

              <!-- Trap to Avoid Box -->
              <div style="background: rgba(244, 63, 94, 0.08); border-left: 3px solid #f43f5e; padding: 10px 14px; border-radius: 6px; font-size: 0.82rem; color: #fb7185; line-height: 1.5;">
                <strong>⚠️ Evaluator Trap to Avoid:</strong> ${item.trapToAvoid}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initJudgeDefense(onRerender) {
  const input = document.getElementById('qa-search-input');
  if (input) {
    input.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      if (onRerender) onRerender();
    });
  }

  document.querySelectorAll('.qa-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat-id');
      if (catId) {
        activeCategory = catId;
        if (onRerender) onRerender();
      }
    });
  });
}
