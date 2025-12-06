/**
 * Slovenia Human Rights Tracking System - Application Logic
 */

// Use full recommendations if available
const ALL_RECOMMENDATIONS = (typeof FULL_RECOMMENDATIONS !== 'undefined') 
    ? FULL_RECOMMENDATIONS 
    : UPR_DATA.recommendations;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initOverview();
    initCycles();
    initRecommendations();
    initThemes();
    initMinistries();
    initTreaties();
    initDocuments();
});

// Navigation
function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    let networkInitialized = false;
    let flowchartInitialized = false;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // Initialize network on first view
            if (tabId === 'network' && !networkInitialized) {
                setTimeout(() => {
                    if (typeof initNetwork === 'function') {
                        initNetwork();
                        networkInitialized = true;
                    }
                }, 100);
            }
            
            // Initialize flowchart on first view
            if (tabId === 'flowchart' && !flowchartInitialized) {
                setTimeout(() => {
                    if (typeof initFlowchart === 'function') {
                        initFlowchart();
                        flowchartInitialized = true;
                    }
                }, 100);
            }
            
            // Initialize spiderweb on first view
            if (tabId === 'spiderweb' && !window.spiderwebInitialized) {
                setTimeout(() => {
                    if (typeof initSpiderweb === 'function') {
                        initSpiderweb();
                        window.spiderwebInitialized = true;
                    }
                }, 100);
            }
        });
    });
}

// Overview Tab
function initOverview() {
    renderStats();
    renderCyclesChart();
    renderStatusChart();
    renderThemesChart();
    renderCountriesChart();
}

function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    const totalRecs = UPR_DATA.cycles.reduce((sum, c) => sum + c.totalRecommendations, 0);
    const totalAccepted = UPR_DATA.cycles.filter(c => c.accepted).reduce((sum, c) => sum + c.accepted, 0);
    
    const stats = [
        { number: totalRecs, label: 'Skupaj priporočil', sublabel: 'Vsi 4 cikli (2010-2025)' },
        { number: totalAccepted, label: 'Sprejetih priporočil', sublabel: `${((totalAccepted / (totalRecs - 254)) * 100).toFixed(1)}% (1.-3. cikel)` },
        { number: UPR_DATA.themes.length, label: 'Tematskih področij', sublabel: 'Glavne kategorije' },
        { number: UPR_DATA.treatyBodies.length, label: 'Pogodbenih teles', sublabel: 'UN konvencij' },
        { number: UPR_DATA.ministries.length, label: 'Pristojnih organov', sublabel: 'Ministrstva in institucije' },
        { number: 4, label: 'UPR ciklov', sublabel: '2010, 2014, 2019, 2025' }
    ];
    
    statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
            <div class="stat-sublabel">${stat.sublabel}</div>
        </div>
    `).join('');
}

function renderCyclesChart() {
    const ctx = document.getElementById('cyclesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: UPR_DATA.cycles.map(c => `${c.cycle}. cikel (${c.year})`),
            datasets: [
                {
                    label: 'Sprejeto',
                    data: UPR_DATA.cycles.map(c => c.accepted || 0),
                    backgroundColor: '#10b981'
                },
                {
                    label: 'Notirano',
                    data: UPR_DATA.cycles.map(c => c.noted || 0),
                    backgroundColor: '#f59e0b'
                },
                {
                    label: 'V obravnavi',
                    data: UPR_DATA.cycles.map(c => c.status === 'pending' ? c.totalRecommendations : 0),
                    backgroundColor: '#6b7280'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}

function renderStatusChart() {
    const ctx = document.getElementById('statusChart').getContext('2d');
    
    // Calculate implementation status from recommendations
    const implemented = ALL_RECOMMENDATIONS.filter(r => r.implementation === 'implemented').length;
    const partial = ALL_RECOMMENDATIONS.filter(r => r.implementation === 'partial').length;
    const notImpl = ALL_RECOMMENDATIONS.filter(r => r.implementation === 'not-implemented').length;
    const pending = ALL_RECOMMENDATIONS.filter(r => r.status === 'pending').length;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Implementirano', 'Delno implementirano', 'Neimplementirano', 'V obravnavi'],
            datasets: [{
                data: [implemented, partial, notImpl, pending],
                backgroundColor: ['#059669', '#d97706', '#dc2626', '#6b7280']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function renderThemesChart() {
    const ctx = document.getElementById('themesChart').getContext('2d');
    const sortedThemes = [...UPR_DATA.themes].sort((a, b) => b.totalRecs - a.totalRecs).slice(0, 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedThemes.map(t => t.name),
            datasets: [{
                label: 'Število priporočil',
                data: sortedThemes.map(t => t.totalRecs),
                backgroundColor: sortedThemes.map(t => t.color)
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function renderCountriesChart() {
    const ctx = document.getElementById('countriesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: UPR_DATA.topRecommendingCountries.map(c => c.country),
            datasets: [{
                label: 'Število priporočil',
                data: UPR_DATA.topRecommendingCountries.map(c => c.total),
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Cycles Tab
function initCycles() {
    const timeline = document.getElementById('cycleTimeline');
    
    timeline.innerHTML = UPR_DATA.cycles.map(cycle => `
        <div class="cycle-point" data-cycle="${cycle.cycle}" onclick="showCycleDetails(${cycle.cycle})">
            <div class="cycle-dot">${cycle.cycle}</div>
            <div class="cycle-year">${cycle.year}</div>
            <div class="cycle-info">${cycle.session}. seja · ${cycle.totalRecommendations} priporočil</div>
        </div>
    `).join('');
}

function showCycleDetails(cycleNum) {
    const cycle = UPR_DATA.cycles.find(c => c.cycle === cycleNum);
    const cycleDetails = document.getElementById('cycleDetails');
    
    // Update active state
    document.querySelectorAll('.cycle-point').forEach(p => p.classList.remove('active'));
    document.querySelector(`.cycle-point[data-cycle="${cycleNum}"]`).classList.add('active');
    
    const cycleThemes = UPR_DATA.themes.map(t => ({
        name: t.name,
        count: t.cycles[cycleNum] || 0
    })).filter(t => t.count > 0).sort((a, b) => b.count - a.count);
    
    const cycleRecs = ALL_RECOMMENDATIONS.filter(r => r.cycle === cycleNum);
    
    cycleDetails.innerHTML = `
        <div class="cycle-detail-header">
            <h3>${cycle.cycle}. Cikel UPR - ${cycle.date} (${cycle.session}. seja)</h3>
            <span>Dokument: ${cycle.documentRef}</span>
        </div>
        
        <div class="cycle-stats">
            <div class="cycle-stat received">
                <strong>${cycle.totalRecommendations}</strong><br>
                <span>Prejetih priporočil</span>
            </div>
            ${cycle.accepted !== null ? `
                <div class="cycle-stat accepted">
                    <strong>${cycle.accepted} (${cycle.acceptanceRate}%)</strong><br>
                    <span>Sprejetih</span>
                </div>
                <div class="cycle-stat noted">
                    <strong>${cycle.noted}</strong><br>
                    <span>Notiranih</span>
                </div>
            ` : `
                <div class="cycle-stat pending">
                    <strong>V obravnavi</strong><br>
                    <span>Rok za odgovor: Junij 2025</span>
                </div>
            `}
        </div>
        
        <h4 style="margin: 1.5rem 0 1rem;">Tematska področja v tem ciklu:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${cycleThemes.slice(0, 10).map(t => `
                <span style="background: #e0f2fe; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    ${t.name}: <strong>${t.count}</strong>
                </span>
            `).join('')}
        </div>
        
        <h4 style="margin-bottom: 1rem;">Izbrana priporočila:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${cycleRecs.slice(0, 5).map(r => `
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid ${getThemeColor(r.theme)};">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>${r.country}</strong>
                        <span class="status-badge ${r.status}">${getStatusLabel(r.status)}</span>
                    </div>
                    <p style="color: #475569;">${r.text}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Recommendations Tab
function initRecommendations() {
    // Populate theme filter
    const filterTheme = document.getElementById('filterTheme');
    UPR_DATA.themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = theme.name;
        filterTheme.appendChild(option);
    });
    
    // Add event listeners
    ['filterCycle', 'filterTheme', 'filterStatus', 'filterSearch'].forEach(id => {
        document.getElementById(id).addEventListener('input', filterRecommendations);
    });
    
    // Initial render
    renderRecommendations(ALL_RECOMMENDATIONS);
}

function filterRecommendations() {
    const cycle = document.getElementById('filterCycle').value;
    const theme = document.getElementById('filterTheme').value;
    const status = document.getElementById('filterStatus').value;
    const search = document.getElementById('filterSearch').value.toLowerCase();
    
    let filtered = ALL_RECOMMENDATIONS;
    
    if (cycle) filtered = filtered.filter(r => r.cycle === parseInt(cycle));
    if (theme) filtered = filtered.filter(r => r.theme === theme);
    if (status) filtered = filtered.filter(r => r.status === status);
    if (search) filtered = filtered.filter(r => 
        r.text.toLowerCase().includes(search) || 
        r.country.toLowerCase().includes(search)
    );
    
    renderRecommendations(filtered);
}

function renderRecommendations(recs) {
    const body = document.getElementById('recommendationsBody');
    const count = document.getElementById('resultsCount');
    
    count.textContent = recs.length;
    
    body.innerHTML = recs.map((r, i) => `
        <div class="table-row clickable-row" data-rec-id="${r.id}" onclick="showRecDetail('${r.id}')">
            <div>${i + 1}</div>
            <div>${r.text}</div>
            <div>${r.country}</div>
            <div>${r.cycle}.</div>
            <div>${getThemeName(r.theme)}</div>
            <div>${getMinistryShort(r.ministry)}</div>
            <div><span class="status-badge ${r.status}">${getStatusLabel(r.status)}</span></div>
        </div>
    `).join('');
}

// Show recommendation detail modal
function showRecDetail(recId) {
    const rec = ALL_RECOMMENDATIONS.find(r => r.id === recId);
    if (!rec) return;
    
    const modal = document.createElement('div');
    modal.className = 'rec-modal';
    modal.innerHTML = `
        <div class="rec-modal-content">
            <button class="rec-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h3>📋 Priporočilo ${rec.id}</h3>
            
            <div class="rec-detail-grid">
                <div class="rec-detail-item">
                    <strong>🌍 Država:</strong>
                    <span>${rec.country}</span>
                </div>
                <div class="rec-detail-item">
                    <strong>🔄 Cikel:</strong>
                    <span>${rec.cycle}. cikel UPR</span>
                </div>
                <div class="rec-detail-item">
                    <strong>🎯 Tema:</strong>
                    <span>${getThemeName(rec.theme)}</span>
                </div>
                <div class="rec-detail-item">
                    <strong>🏛️ Ministrstvo:</strong>
                    <span>${getMinistryFull(rec.ministry)}</span>
                </div>
                <div class="rec-detail-item">
                    <strong>📊 Status:</strong>
                    <span class="status-badge ${rec.status}">${getStatusLabel(rec.status)}</span>
                </div>
                <div class="rec-detail-item">
                    <strong>✅ Implementacija:</strong>
                    <span class="impl-badge ${rec.implementation}">${getImplLabel(rec.implementation)}</span>
                </div>
            </div>
            
            <div class="rec-text-section">
                <h4>📝 Besedilo priporočila (SL):</h4>
                <p class="rec-text">${rec.text}</p>
            </div>
            
            ${rec.citation ? `
            <div class="rec-citation-section">
                <h4>📄 Izvirni citat (EN):</h4>
                <blockquote class="rec-citation">"${rec.citation}"</blockquote>
            </div>
            ` : ''}
            
            ${rec.docRef ? `
            <div class="rec-source-section">
                <h4>📚 Vir:</h4>
                <p>
                    <strong>Dokument:</strong> ${rec.docRef}<br>
                    ${rec.paragraph ? `<strong>Odstavek:</strong> ${rec.paragraph}<br>` : ''}
                    <a href="https://documents-dds-ny.un.org/doc/UNDOC/GEN/${getDocPath(rec.docRef)}" target="_blank" class="doc-link">
                        🔗 Odpri dokument na UN
                    </a>
                </p>
            </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function getMinistryFull(ministryId) {
    const ministry = UPR_DATA.ministries.find(m => m.id === ministryId);
    return ministry ? ministry.name : '-';
}

function getImplLabel(impl) {
    const labels = {
        'implemented': 'Implementirano',
        'partial': 'Delno implementirano',
        'not-implemented': 'Neimplementirano',
        'pending': 'V obravnavi'
    };
    return labels[impl] || impl;
}

function getDocPath(docRef) {
    // Convert document reference to UN document path
    const paths = {
        'A/HRC/14/15': 'G10/124/89/PDF/G1012489.pdf',
        'A/HRC/28/15': 'G14/232/26/PDF/G1423226.pdf',
        'A/HRC/43/15': 'G19/348/54/PDF/G1934854.pdf'
    };
    return paths[docRef] || '';
}

function getMinistryShort(ministryId) {
    const ministry = UPR_DATA.ministries.find(m => m.id === ministryId);
    return ministry ? ministry.shortName : '-';
}

// Themes Tab
function initThemes() {
    const grid = document.getElementById('themesGrid');
    
    grid.innerHTML = UPR_DATA.themes.map(theme => {
        const total = theme.totalRecs;
        const cycleData = Object.entries(theme.cycles).map(([c, v]) => `${c}. cikel: ${v}`).join(', ');
        
        return `
            <div class="theme-card">
                <div class="theme-header" style="background: linear-gradient(135deg, ${theme.color}, ${adjustColor(theme.color, 30)});">
                    ${theme.icon} ${theme.name}
                </div>
                <div class="theme-body">
                    <div class="theme-stat">
                        <span>Skupaj priporočil:</span>
                        <strong>${total}</strong>
                    </div>
                    <div class="theme-stat">
                        <span>Po ciklih:</span>
                        <span style="font-size: 0.85rem;">${cycleData}</span>
                    </div>
                    <div style="margin-top: 1rem;">
                        <strong style="font-size: 0.9rem;">Ključna vprašanja:</strong>
                        <ul style="margin: 0.5rem 0 0 1.25rem; color: #64748b; font-size: 0.9rem;">
                            ${theme.keyIssues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Ministries Tab
function initMinistries() {
    const grid = document.getElementById('ministryGrid');
    
    grid.innerHTML = UPR_DATA.ministries.map(ministry => {
        const total = ministry.recommendations;
        const implRate = ((ministry.implemented + ministry.partial) / total * 100).toFixed(0);
        
        return `
            <div class="ministry-card">
                <div class="ministry-header ${ministry.id}">
                    ${ministry.icon} ${ministry.name}
                </div>
                <div class="ministry-body">
                    <div class="ministry-stat">
                        <span>Skupaj priporočil:</span>
                        <strong>${total}</strong>
                    </div>
                    <div class="ministry-stat">
                        <span>Implementiranih:</span>
                        <strong>${ministry.implemented} (${(ministry.implemented/total*100).toFixed(0)}%)</strong>
                    </div>
                    <div class="ministry-stat">
                        <span>Delno impl.:</span>
                        <strong>${ministry.partial} (${(ministry.partial/total*100).toFixed(0)}%)</strong>
                    </div>
                    <div class="ministry-stat">
                        <span>Neimplementiranih:</span>
                        <strong>${ministry.notImplemented} (${(ministry.notImplemented/total*100).toFixed(0)}%)</strong>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${implRate}%; background: linear-gradient(90deg, #059669 ${ministry.implemented/total*100}%, #d97706 ${ministry.implemented/total*100}%);"></div>
                    </div>
                    ${ministry.specialStatus ? `<p style="margin-top: 0.75rem; color: #059669; font-weight: 500;">${ministry.specialStatus}</p>` : ''}
                    <p class="ministry-description">
                        <strong>Ključna področja:</strong> ${ministry.responsibilities.join(', ')}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Treaties Tab
function initTreaties() {
    const container = document.getElementById('treatiesContainer');
    
    container.innerHTML = UPR_DATA.treatyBodies.map(treaty => `
        <div class="treaty-card">
            <div class="treaty-header" onclick="this.parentElement.classList.toggle('open')">
                <span><strong>${treaty.id.toUpperCase()}</strong> - ${treaty.name}</span>
                <span class="arrow">▼</span>
            </div>
            <div class="treaty-content">
                ${treaty.status === 'not-ratified' ? `
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
                        <strong>⚠️ Status:</strong> ${treaty.note}
                    </div>
                ` : `
                    <div class="treaty-stats">
                        <div class="treaty-stat" style="background: ${treaty.color}20;">
                            <strong>Ratifikacija:</strong> ${treaty.ratification}
                        </div>
                        <div class="treaty-stat" style="background: ${treaty.color}20;">
                            <strong>Zadnje poročilo:</strong> ${treaty.lastReport}
                        </div>
                        <div class="treaty-stat" style="background: ${treaty.color}20;">
                            <strong>Naslednji pregled:</strong> ${treaty.nextReview}
                        </div>
                    </div>
                    <div class="treaty-recommendations">
                        <h5>Ključna priporočila:</h5>
                        <ul>
                            ${treaty.keyRecommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                    <a href="${treaty.link}" target="_blank" class="treaty-link">
                        🔗 Vsi dokumenti za Slovenijo
                    </a>
                `}
            </div>
        </div>
    `).join('');
}

// Documents Tab
function initDocuments() {
    renderDocuments('uprDocuments', UPR_DATA.documents.upr);
    renderDocuments('nationalDocuments', UPR_DATA.documents.national);
    renderDocuments('civilSocietyDocuments', UPR_DATA.documents.civilSociety);
}

function renderDocuments(containerId, docs) {
    const container = document.getElementById(containerId);
    
    container.innerHTML = docs.map(doc => `
        <div class="document-card">
            <div class="document-icon">${doc.icon}</div>
            <div class="document-title">${doc.title}</div>
            <div class="document-meta">${doc.source} · ${doc.date} · ${doc.language}</div>
            <a href="${doc.url}" target="_blank" class="document-link">
                ${doc.url.endsWith('.pdf') || doc.url.endsWith('.docx') ? '📥 Prenesi dokument' : '🔗 Odpri stran'} →
            </a>
        </div>
    `).join('');
}

// Utility Functions
function getThemeName(themeId) {
    const theme = UPR_DATA.themes.find(t => t.id === themeId);
    return theme ? theme.name : themeId;
}

function getThemeColor(themeId) {
    const theme = UPR_DATA.themes.find(t => t.id === themeId);
    return theme ? theme.color : '#6b7280';
}

function getStatusLabel(status) {
    const labels = {
        'accepted': 'Sprejeto',
        'noted': 'Notirano',
        'pending': 'V obravnavi',
        'implemented': 'Implementirano',
        'partial': 'Delno impl.',
        'not-implemented': 'Neimpl.'
    };
    return labels[status] || status;
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Make showCycleDetails globally available
window.showCycleDetails = showCycleDetails;
