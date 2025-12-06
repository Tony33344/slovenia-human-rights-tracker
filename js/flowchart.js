/**
 * Flowchart/Hierarchy Visualization for Slovenia Human Rights System
 * Shows structured relationships in a clear tree-like diagram
 */

class HumanRightsFlowchart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.svg = null;
        this.width = 1200;
        this.height = 800;
        this.selectedItem = null;
    }

    init() {
        this.render();
        this.setupEvents();
    }

    render() {
        // Create SVG container
        this.container.innerHTML = `
            <svg id="flowchartSvg" width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}">
                <defs>
                    <!-- Gradients for nodes -->
                    <linearGradient id="uprGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="themeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#6d28d9;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="ministryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="countryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
                    </linearGradient>
                    
                    <!-- Arrow marker -->
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                    
                    <!-- Shadow filter -->
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.2"/>
                    </filter>
                </defs>
                
                <!-- Background grid -->
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5"/>
                
                <!-- Title -->
                <text x="${this.width/2}" y="40" text-anchor="middle" class="flowchart-title">
                    Sistem za Spremljanje Človekovih Pravic v Sloveniji
                </text>
                <text x="${this.width/2}" y="65" text-anchor="middle" class="flowchart-subtitle">
                    Univerzalni Periodični Pregled (UPR) - Hierarhični prikaz
                </text>
                
                <!-- Main UPR Node -->
                <g class="node-group" data-type="main" transform="translate(${this.width/2 - 80}, 90)">
                    <rect width="160" height="60" rx="8" fill="url(#uprGradient)" filter="url(#shadow)"/>
                    <text x="80" y="28" text-anchor="middle" fill="white" class="node-label">🇺🇳 UPR</text>
                    <text x="80" y="48" text-anchor="middle" fill="rgba(255,255,255,0.8)" class="node-sublabel">Slovenija</text>
                </g>
                
                <!-- Cycle connections -->
                ${this.renderCycleConnections()}
                
                <!-- UPR Cycles Row -->
                ${this.renderCycles()}
                
                <!-- Theme connections -->
                ${this.renderThemeConnections()}
                
                <!-- Themes Row -->
                ${this.renderThemes()}
                
                <!-- Ministry connections -->
                ${this.renderMinistryConnections()}
                
                <!-- Ministries Row -->
                ${this.renderMinistries()}
                
                <!-- Legend -->
                ${this.renderLegend()}
            </svg>
        `;
        
        this.svg = document.getElementById('flowchartSvg');
    }
    
    renderCycles() {
        // Get cycle counts from LIVE data
        const recs = typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : [];
        const cycleStats = {1: 0, 2: 0, 3: 0, 4: 0};
        recs.forEach(r => cycleStats[r.cycle]++);
        
        const cycles = [
            { num: 1, year: 2010, recs: cycleStats[1] },
            { num: 2, year: 2014, recs: cycleStats[2] },
            { num: 3, year: 2019, recs: cycleStats[3] },
            { num: 4, year: 2025, recs: cycleStats[4] }
        ];
        
        const startX = 150;
        const spacing = 250;
        const y = 200;
        
        return cycles.map((c, i) => `
            <g class="node-group clickable" data-type="cycle" data-id="${c.num}" transform="translate(${startX + i * spacing}, ${y})">
                <rect width="140" height="55" rx="6" fill="url(#uprGradient)" filter="url(#shadow)" class="node-rect"/>
                <text x="70" y="25" text-anchor="middle" fill="white" class="node-label">${c.num}. Cikel</text>
                <text x="70" y="42" text-anchor="middle" fill="rgba(255,255,255,0.8)" class="node-sublabel">${c.year} • ${c.recs} prip.</text>
            </g>
        `).join('');
    }
    
    renderCycleConnections() {
        const centerX = this.width / 2;
        const startY = 150;
        const endY = 200;
        
        const positions = [220, 470, 720, 970];
        
        return positions.map(x => `
            <path d="M ${centerX} ${startY} Q ${centerX} ${startY + 25} ${x} ${endY}" 
                  stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        `).join('');
    }
    
    renderThemes() {
        // Get top 6 themes from LIVE data
        const recs = typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : [];
        const themeStats = {};
        recs.forEach(r => themeStats[r.theme] = (themeStats[r.theme] || 0) + 1);
        
        const themeInfo = {
            'roma': { icon: '🏠', name: 'Romi', color: '#ef4444' },
            'discrimination': { icon: '⚖️', name: 'Diskriminacija', color: '#f59e0b' },
            'trafficking': { icon: '⛓️', name: 'Trgovina', color: '#ec4899' },
            'gender': { icon: '♀️', name: 'Enakost spolov', color: '#8b5cf6' },
            'children': { icon: '👶', name: 'Otroci', color: '#06b6d4' },
            'migration': { icon: '🌍', name: 'Migracije', color: '#10b981' },
            'hate_speech': { icon: '🗣️', name: 'Sovražni govor', color: '#dc2626' },
            'general': { icon: '📄', name: 'Splošno', color: '#64748b' }
        };
        
        const topThemes = Object.entries(themeStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([id, count]) => ({
                id,
                count,
                ...(themeInfo[id] || { icon: '📌', name: id, color: '#64748b' })
            }));
        
        const startX = 80;
        const spacing = 180;
        const y = 350;
        
        return topThemes.map((t, i) => `
            <g class="node-group clickable" data-type="theme" data-id="${t.id}" transform="translate(${startX + i * spacing}, ${y})">
                <rect width="150" height="50" rx="25" fill="${t.color}" filter="url(#shadow)" class="node-rect"/>
                <text x="75" y="25" text-anchor="middle" fill="white" class="node-label">${t.icon} ${t.name}</text>
                <text x="75" y="42" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="11">${t.count} prip.</text>
            </g>
        `).join('');
    }
    
    renderThemeConnections() {
        const cyclePositions = [290, 540, 790, 1040];
        const themePositions = [155, 335, 515, 695, 875, 1055];
        const cycleY = 255;
        const themeY = 350;
        
        let paths = '';
        
        // Connect each cycle to multiple themes
        cyclePositions.forEach((cx, ci) => {
            // Each cycle connects to different themes
            const connectedThemes = ci === 0 ? [0, 1, 4] : 
                                    ci === 1 ? [0, 1, 2, 3] : 
                                    ci === 2 ? [0, 1, 2, 3, 4, 5] : 
                                    [0, 1, 2, 3, 4, 5];
            
            connectedThemes.forEach(ti => {
                paths += `<path d="M ${cx} ${cycleY} Q ${cx} ${(cycleY + themeY)/2} ${themePositions[ti]} ${themeY}" 
                          stroke="#cbd5e1" stroke-width="1.5" fill="none" opacity="0.6"/>`;
            });
        });
        
        return paths;
    }
    
    renderMinistries() {
        const ministries = [
            { id: 'mddsz', name: 'MDDSZ', full: 'Delo, družina, socialne zadeve' },
            { id: 'mnz', name: 'MNZ', full: 'Notranje zadeve' },
            { id: 'mp', name: 'MP', full: 'Pravosodje' },
            { id: 'mizs', name: 'MIZŠ', full: 'Izobraževanje' },
            { id: 'mz', name: 'MZ', full: 'Zdravje' }
        ];
        
        const startX = 130;
        const spacing = 210;
        const y = 500;
        
        return ministries.map((m, i) => `
            <g class="node-group clickable" data-type="ministry" data-id="${m.id}" transform="translate(${startX + i * spacing}, ${y})">
                <rect width="160" height="55" rx="6" fill="url(#ministryGradient)" filter="url(#shadow)" class="node-rect"/>
                <text x="80" y="25" text-anchor="middle" fill="white" class="node-label">🏛️ ${m.name}</text>
                <text x="80" y="42" text-anchor="middle" fill="rgba(255,255,255,0.7)" class="node-sublabel-sm">${m.full}</text>
            </g>
        `).join('');
    }
    
    renderMinistryConnections() {
        const themePositions = [155, 335, 515, 695, 875, 1055];
        const ministryPositions = [210, 420, 630, 840, 1050];
        const themeY = 400;
        const ministryY = 500;
        
        // Theme to Ministry mapping
        const connections = [
            [0, 0], [0, 3], // Roma -> MDDSZ, MIZŠ
            [1, 0], [1, 2], // Discrimination -> MDDSZ, MP
            [2, 1], [2, 2], // Trafficking -> MNZ, MP
            [3, 0], // Gender -> MDDSZ
            [4, 0], [4, 3], // Children -> MDDSZ, MIZŠ
            [5, 1], [5, 0] // Migrants -> MNZ, MDDSZ
        ];
        
        return connections.map(([ti, mi]) => `
            <path d="M ${themePositions[ti]} ${themeY} L ${ministryPositions[mi]} ${ministryY}" 
                  stroke="#10b981" stroke-width="2" fill="none" opacity="0.5" stroke-dasharray="5,5"/>
        `).join('');
    }
    
    renderLegend() {
        const y = 620;
        return `
            <g transform="translate(50, ${y})">
                <rect width="${this.width - 100}" height="140" rx="10" fill="white" stroke="#e2e8f0" stroke-width="1"/>
                <text x="20" y="30" class="legend-title">📊 Legenda</text>
                
                <g transform="translate(20, 50)">
                    <rect width="100" height="30" rx="4" fill="url(#uprGradient)"/>
                    <text x="110" y="20" class="legend-text">UPR Cikli (2010-2025)</text>
                </g>
                
                <g transform="translate(280, 50)">
                    <rect width="100" height="30" rx="15" fill="#ef4444"/>
                    <text x="110" y="20" class="legend-text">Tematska področja</text>
                </g>
                
                <g transform="translate(540, 50)">
                    <rect width="100" height="30" rx="4" fill="url(#ministryGradient)"/>
                    <text x="110" y="20" class="legend-text">Pristojna ministrstva</text>
                </g>
                
                <g transform="translate(800, 50)">
                    <line x1="0" y1="15" x2="50" y2="15" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <text x="60" y="20" class="legend-text">Povezava/vpliv</text>
                </g>
                
                <text x="20" y="110" class="legend-help">
                    💡 Kliknite na posamezni element za podrobnosti. Črte prikazujejo povezave med elementi.
                </text>
            </g>
        `;
    }

    setupEvents() {
        const clickableNodes = this.container.querySelectorAll('.clickable');
        
        clickableNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                const type = node.dataset.type;
                const id = node.dataset.id;
                this.showDetails(type, id);
                
                // Highlight selected
                clickableNodes.forEach(n => n.classList.remove('selected'));
                node.classList.add('selected');
            });
            
            node.addEventListener('mouseenter', () => {
                node.querySelector('.node-rect').style.transform = 'scale(1.05)';
                node.style.cursor = 'pointer';
            });
            
            node.addEventListener('mouseleave', () => {
                node.querySelector('.node-rect').style.transform = 'scale(1)';
            });
        });
    }
    
    showDetails(type, id) {
        const detailsPanel = document.getElementById('flowchartDetails');
        if (!detailsPanel) return;
        
        let content = '';
        
        if (type === 'cycle') {
            const cycleData = {
                1: { year: 2010, recs: 63, doc: 'A/HRC/14/15', session: '7. seja' },
                2: { year: 2014, recs: 155, doc: 'A/HRC/28/15', session: '20. seja' },
                3: { year: 2019, recs: 184, doc: 'A/HRC/43/15', session: '34. seja' },
                4: { year: 2025, recs: 254, doc: 'A/HRC/59/15', session: '48. seja' }
            };
            const c = cycleData[id];
            content = `
                <h4>🔄 ${id}. Cikel UPR (${c.year})</h4>
                <p><strong>Seja:</strong> ${c.session}</p>
                <p><strong>Priporočil:</strong> ${c.recs}</p>
                <p><strong>Dokument:</strong> ${c.doc}</p>
                <a href="docs/cycle${id}/recommendations.md" class="detail-link">📄 Odpri priporočila</a>
            `;
        } else if (type === 'theme') {
            const themeData = UPR_DATA.themes.find(t => t.id === id);
            if (themeData) {
                content = `
                    <h4>${themeData.icon} ${themeData.name}</h4>
                    <p><strong>Skupaj priporočil:</strong> ${themeData.totalRecs}</p>
                    <h5>Ključna vprašanja:</h5>
                    <ul>${themeData.keyIssues.map(i => `<li>${i}</li>`).join('')}</ul>
                `;
            }
        } else if (type === 'ministry') {
            const ministryData = UPR_DATA.ministries.find(m => m.id === id);
            if (ministryData) {
                content = `
                    <h4>🏛️ ${ministryData.name}</h4>
                    <p><strong>Priporočil:</strong> ${ministryData.recommendations}</p>
                    <p><strong>Implementiranih:</strong> ${ministryData.implemented} (${Math.round(ministryData.implemented/ministryData.recommendations*100)}%)</p>
                    <h5>Pristojnosti:</h5>
                    <ul>${ministryData.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                `;
            }
        }
        
        detailsPanel.innerHTML = content || '<p>Izberite element za podrobnosti.</p>';
    }
}

// Initialize
let humanRightsFlowchart = null;

function initFlowchart() {
    const canvas = document.getElementById('flowchartCanvas');
    if (!canvas) {
        console.error('Flowchart canvas not found');
        return;
    }
    
    try {
        humanRightsFlowchart = new HumanRightsFlowchart('flowchartCanvas');
        humanRightsFlowchart.init();
        console.log('Flowchart initialized successfully');
    } catch (e) {
        console.error('Flowchart initialization error:', e);
    }
}

window.HumanRightsFlowchart = HumanRightsFlowchart;
window.initFlowchart = initFlowchart;
