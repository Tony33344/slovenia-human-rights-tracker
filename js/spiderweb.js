/**
 * Dynamic Spiderweb of Accountability
 * Generates connections from LIVE FULL_RECOMMENDATIONS data
 * Shows: Documents → Issues (Themes) → Ministries
 */

class DynamicSpiderweb {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = 1200;
        this.height = 850;
        this.selectedNode = null;
        
        // Build data from FULL_RECOMMENDATIONS
        this.buildDataFromRecommendations();
    }
    
    buildDataFromRecommendations() {
        if (typeof FULL_RECOMMENDATIONS === 'undefined') {
            console.error('FULL_RECOMMENDATIONS not loaded');
            return;
        }
        
        // Documents (UPR cycles as source documents)
        this.documents = [
            { id: 'cycle1', name: '1. Cikel (2010)', type: 'cycle', color: '#3b82f6', recs: 0 },
            { id: 'cycle2', name: '2. Cikel (2014)', type: 'cycle', color: '#10b981', recs: 0 },
            { id: 'cycle3', name: '3. Cikel (2019)', type: 'cycle', color: '#f59e0b', recs: 0 },
            { id: 'cycle4', name: '4. Cikel (2025)', type: 'cycle', color: '#ef4444', recs: 0 }
        ];
        
        // Count recs per cycle
        FULL_RECOMMENDATIONS.forEach(r => {
            const docIdx = r.cycle - 1;
            if (this.documents[docIdx]) {
                this.documents[docIdx].recs++;
            }
        });
        
        // Build issues (themes) from live data
        const themeStats = {};
        FULL_RECOMMENDATIONS.forEach(r => {
            if (!themeStats[r.theme]) {
                themeStats[r.theme] = { count: 0, byCycle: {1:0, 2:0, 3:0, 4:0}, byMinistry: {} };
            }
            themeStats[r.theme].count++;
            themeStats[r.theme].byCycle[r.cycle]++;
            themeStats[r.theme].byMinistry[r.ministry] = (themeStats[r.theme].byMinistry[r.ministry] || 0) + 1;
        });
        
        // Theme name mapping
        const themeNames = {
            'roma': 'Pravice Romov',
            'izbrisani': 'Izbrisani',
            'discrimination': 'Diskriminacija',
            'hate_speech': 'Sovražni govor',
            'lgbti': 'LGBTI+ pravice',
            'gender': 'Enakost spolov',
            'migration': 'Migracije in azil',
            'disability': 'Pravice invalidov',
            'children': 'Pravice otrok',
            'trafficking': 'Trgovina z ljudmi',
            'torture': 'Prepoved mučenja',
            'media': 'Svoboda medijev',
            'nhri': 'NHRI / Varuh',
            'elderly': 'Pravice starejših',
            'environment': 'Okolje in podnebje',
            'treaties': 'Mednarodne pogodbe',
            'general': 'Splošno'
        };
        
        // Sort themes by count and take top 12
        this.issues = Object.entries(themeStats)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 12)
            .map(([id, stats], idx) => ({
                id: id,
                name: themeNames[id] || id,
                recs: stats.count,
                byCycle: stats.byCycle,
                byMinistry: stats.byMinistry,
                color: this.getThemeColor(idx)
            }));
        
        // Build ministries from live data
        const ministryStats = {};
        FULL_RECOMMENDATIONS.forEach(r => {
            if (!ministryStats[r.ministry]) {
                ministryStats[r.ministry] = { count: 0, byTheme: {} };
            }
            ministryStats[r.ministry].count++;
            ministryStats[r.ministry].byTheme[r.theme] = (ministryStats[r.ministry].byTheme[r.theme] || 0) + 1;
        });
        
        const ministryNames = {
            'mddsz': 'MDDSZ',
            'mnz': 'MNZ',
            'mp': 'MP',
            'mizs': 'MIZŠ',
            'mz': 'MZ',
            'mk': 'MK',
            'mzez': 'MZEZ'
        };
        
        const ministryFullNames = {
            'mddsz': 'Ministrstvo za delo, družino in socialne zadeve',
            'mnz': 'Ministrstvo za notranje zadeve',
            'mp': 'Ministrstvo za pravosodje',
            'mizs': 'Ministrstvo za izobraževanje',
            'mz': 'Ministrstvo za zdravje',
            'mk': 'Ministrstvo za kulturo',
            'mzez': 'Ministrstvo za zunanje zadeve'
        };
        
        const ministryColors = {
            'mddsz': '#3b82f6',
            'mnz': '#ef4444',
            'mp': '#a855f7',
            'mizs': '#f97316',
            'mz': '#22c55e',
            'mk': '#eab308',
            'mzez': '#06b6d4'
        };
        
        this.ministries = Object.entries(ministryStats)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([id, stats]) => ({
                id: id,
                name: ministryNames[id] || id.toUpperCase(),
                fullName: ministryFullNames[id] || id,
                recs: stats.count,
                byTheme: stats.byTheme,
                color: ministryColors[id] || '#64748b'
            }));
        
        // Build connections: Document (Cycle) → Issue (Theme)
        this.docToIssue = [];
        this.documents.forEach((doc, docIdx) => {
            const cycleNum = docIdx + 1;
            this.issues.forEach((issue, issueIdx) => {
                const count = issue.byCycle[cycleNum] || 0;
                if (count > 0) {
                    const strength = count >= 20 ? 3 : (count >= 10 ? 2 : 1);
                    this.docToIssue.push([docIdx, issueIdx, strength, count]);
                }
            });
        });
        
        // Build connections: Issue (Theme) → Ministry
        this.issueToMinistry = [];
        this.issues.forEach((issue, issueIdx) => {
            this.ministries.forEach((ministry, ministryIdx) => {
                const count = issue.byMinistry[ministry.id] || 0;
                if (count > 0) {
                    const strength = count >= 15 ? 3 : (count >= 5 ? 2 : 1);
                    this.issueToMinistry.push([issueIdx, ministryIdx, strength, count]);
                }
            });
        });
    }
    
    getThemeColor(idx) {
        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', 
                       '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e'];
        return colors[idx % colors.length];
    }
    
    init() {
        if (!this.documents || this.documents.length === 0) {
            this.container.innerHTML = '<p style="color: white; padding: 2rem;">Napaka: Podatki niso naloženi.</p>';
            return;
        }
        this.render();
        this.setupEvents();
    }
    
    render() {
        const docX = 100;
        const issueX = this.width / 2;
        const ministryX = this.width - 100;
        
        // Calculate positions
        const docSpacing = 140;
        const docStartY = 150;
        this.documents.forEach((d, i) => { 
            d.y = docStartY + i * docSpacing; 
            d.x = docX; 
        });
        
        const issueSpacing = 55;
        const issueStartY = 100;
        this.issues.forEach((iss, i) => { 
            iss.y = issueStartY + i * issueSpacing; 
            iss.x = issueX; 
        });
        
        const ministrySpacing = 90;
        const ministryStartY = 150;
        this.ministries.forEach((m, i) => { 
            m.y = ministryStartY + i * ministrySpacing; 
            m.x = ministryX; 
        });
        
        this.container.innerHTML = `
            <svg id="spiderwebSvg" width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}" class="spiderweb-svg">
                <!-- Background -->
                <rect width="100%" height="100%" fill="#0f172a"/>
                
                <!-- Title -->
                <text x="${this.width/2}" y="30" text-anchor="middle" fill="white" font-size="18" font-weight="bold">
                    Pajkova mreža odgovornosti - Dinamični prikaz
                </text>
                <text x="${this.width/2}" y="50" text-anchor="middle" fill="#94a3b8" font-size="11">
                    Podatki iz ${FULL_RECOMMENDATIONS.length} priporočil. Kliknite na vozlišče za prikaz povezav.
                </text>
                
                <!-- Column headers -->
                <text x="${docX}" y="85" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">UPR CIKLI</text>
                <text x="${issueX}" y="85" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">TEMATSKA PODROČJA</text>
                <text x="${ministryX}" y="85" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">MINISTRSTVA</text>
                
                <!-- Connections: Documents to Issues -->
                <g class="connections doc-to-issue">
                    ${this.renderDocToIssueConnections()}
                </g>
                
                <!-- Connections: Issues to Ministries -->
                <g class="connections issue-to-ministry">
                    ${this.renderIssueToMinistryConnections()}
                </g>
                
                <!-- Document nodes -->
                <g class="nodes documents">
                    ${this.documents.map((d, i) => this.renderDocNode(d, i)).join('')}
                </g>
                
                <!-- Issue nodes -->
                <g class="nodes issues">
                    ${this.issues.map((iss, i) => this.renderIssueNode(iss, i)).join('')}
                </g>
                
                <!-- Ministry nodes -->
                <g class="nodes ministries">
                    ${this.ministries.map((m, i) => this.renderMinistryNode(m, i)).join('')}
                </g>
                
                <!-- Legend -->
                <g transform="translate(30, ${this.height - 40})">
                    <text fill="#64748b" font-size="10">Debelina črte = število priporočil</text>
                    <line x1="200" y1="-5" x2="230" y2="-5" stroke="#ef4444" stroke-width="3"/>
                    <text x="235" fill="#94a3b8" font-size="10">Visoko (15+)</text>
                    <line x1="310" y1="-5" x2="340" y2="-5" stroke="#8b5cf6" stroke-width="2"/>
                    <text x="345" fill="#94a3b8" font-size="10">Srednje (5-14)</text>
                    <line x1="440" y1="-5" x2="470" y2="-5" stroke="#64748b" stroke-width="1"/>
                    <text x="475" fill="#94a3b8" font-size="10">Nizko (1-4)</text>
                </g>
            </svg>
        `;
    }
    
    renderDocNode(doc, idx) {
        return `
            <g class="node doc-node clickable" data-type="document" data-id="${doc.id}" data-idx="${idx}" transform="translate(${doc.x - 70}, ${doc.y})">
                <rect width="140" height="50" rx="6" fill="${doc.color}" class="node-rect" opacity="0.9"/>
                <text x="70" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="600">${doc.name}</text>
                <text x="70" y="38" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="10">${doc.recs} priporočil</text>
            </g>
        `;
    }
    
    renderIssueNode(issue, idx) {
        return `
            <g class="node issue-node clickable" data-type="issue" data-id="${issue.id}" data-idx="${idx}" transform="translate(${issue.x - 90}, ${issue.y})">
                <rect width="180" height="40" rx="5" fill="#1e293b" stroke="${issue.color}" stroke-width="2" class="node-rect"/>
                <text x="90" y="18" text-anchor="middle" fill="white" font-size="11" font-weight="500">${issue.name}</text>
                <text x="90" y="32" text-anchor="middle" fill="#94a3b8" font-size="9">${issue.recs} priporočil</text>
            </g>
        `;
    }
    
    renderMinistryNode(ministry, idx) {
        return `
            <g class="node ministry-node clickable" data-type="ministry" data-id="${ministry.id}" data-idx="${idx}" transform="translate(${ministry.x - 60}, ${ministry.y})">
                <rect width="120" height="50" rx="5" fill="${ministry.color}" class="node-rect"/>
                <text x="60" y="22" text-anchor="middle" fill="white" font-size="13" font-weight="bold">${ministry.name}</text>
                <text x="60" y="38" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="9">${ministry.recs} priporočil</text>
            </g>
        `;
    }
    
    renderDocToIssueConnections() {
        return this.docToIssue.map(([docIdx, issueIdx, strength, count]) => {
            const doc = this.documents[docIdx];
            const issue = this.issues[issueIdx];
            const color = strength >= 3 ? '#ef4444' : (strength >= 2 ? '#8b5cf6' : '#64748b');
            const opacity = strength >= 3 ? 0.7 : (strength >= 2 ? 0.5 : 0.3);
            const width = strength >= 3 ? 3 : (strength >= 2 ? 2 : 1);
            
            return `
                <path d="M ${doc.x + 70} ${doc.y + 25} 
                         C ${doc.x + 180} ${doc.y + 25}, 
                           ${issue.x - 180} ${issue.y + 20}, 
                           ${issue.x - 90} ${issue.y + 20}"
                      stroke="${color}" stroke-width="${width}" fill="none" opacity="${opacity}"
                      class="connection" data-from="doc_${docIdx}" data-to="issue_${issueIdx}" data-count="${count}"/>
            `;
        }).join('');
    }
    
    renderIssueToMinistryConnections() {
        return this.issueToMinistry.map(([issueIdx, ministryIdx, strength, count]) => {
            const issue = this.issues[issueIdx];
            const ministry = this.ministries[ministryIdx];
            const color = strength >= 3 ? '#ef4444' : (strength >= 2 ? '#8b5cf6' : '#64748b');
            const opacity = strength >= 3 ? 0.7 : (strength >= 2 ? 0.5 : 0.3);
            const width = strength >= 3 ? 3 : (strength >= 2 ? 2 : 1);
            
            return `
                <path d="M ${issue.x + 90} ${issue.y + 20}
                         C ${issue.x + 180} ${issue.y + 20},
                           ${ministry.x - 150} ${ministry.y + 25},
                           ${ministry.x - 60} ${ministry.y + 25}"
                      stroke="${color}" stroke-width="${width}" fill="none" opacity="${opacity}"
                      class="connection" data-from="issue_${issueIdx}" data-to="ministry_${ministryIdx}" data-count="${count}"/>
            `;
        }).join('');
    }
    
    setupEvents() {
        const clickableNodes = this.container.querySelectorAll('.clickable');
        
        clickableNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = node.dataset.type;
                const idx = parseInt(node.dataset.idx);
                this.highlightConnections(type, idx);
            });
            
            node.style.cursor = 'pointer';
        });
        
        // Click on background to reset
        this.container.querySelector('svg').addEventListener('click', (e) => {
            if (e.target.tagName === 'svg' || (e.target.tagName === 'rect' && !e.target.classList.contains('node-rect'))) {
                this.resetHighlight();
            }
        });
    }
    
    highlightConnections(type, idx) {
        const connections = this.container.querySelectorAll('.connection');
        const nodes = this.container.querySelectorAll('.node');
        
        // Dim all first
        connections.forEach(c => c.style.opacity = '0.05');
        nodes.forEach(n => n.style.opacity = '0.2');
        
        if (type === 'document') {
            this.container.querySelector(`[data-type="document"][data-idx="${idx}"]`).style.opacity = '1';
            
            this.docToIssue.filter(([d]) => d === idx).forEach(([_, issueIdx]) => {
                this.container.querySelector(`[data-type="issue"][data-idx="${issueIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="doc_${idx}"][data-to="issue_${issueIdx}"]`).forEach(c => c.style.opacity = '0.9');
            });
        } else if (type === 'issue') {
            this.container.querySelector(`[data-type="issue"][data-idx="${idx}"]`).style.opacity = '1';
            
            this.docToIssue.filter(([_, i]) => i === idx).forEach(([docIdx]) => {
                this.container.querySelector(`[data-type="document"][data-idx="${docIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="doc_${docIdx}"][data-to="issue_${idx}"]`).forEach(c => c.style.opacity = '0.9');
            });
            
            this.issueToMinistry.filter(([i]) => i === idx).forEach(([_, ministryIdx]) => {
                this.container.querySelector(`[data-type="ministry"][data-idx="${ministryIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="issue_${idx}"][data-to="ministry_${ministryIdx}"]`).forEach(c => c.style.opacity = '0.9');
            });
        } else if (type === 'ministry') {
            this.container.querySelector(`[data-type="ministry"][data-idx="${idx}"]`).style.opacity = '1';
            
            this.issueToMinistry.filter(([_, m]) => m === idx).forEach(([issueIdx]) => {
                this.container.querySelector(`[data-type="issue"][data-idx="${issueIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="issue_${issueIdx}"][data-to="ministry_${idx}"]`).forEach(c => c.style.opacity = '0.9');
            });
        }
    }
    
    resetHighlight() {
        const connections = this.container.querySelectorAll('.connection');
        const nodes = this.container.querySelectorAll('.node');
        
        connections.forEach(c => c.style.opacity = '');
        nodes.forEach(n => n.style.opacity = '');
    }
}

// Initialize
let dynamicSpiderweb = null;

function initSpiderweb() {
    const canvas = document.getElementById('spiderwebCanvas');
    if (!canvas) {
        console.error('Spiderweb canvas not found');
        return;
    }
    
    canvas.innerHTML = '';
    
    try {
        dynamicSpiderweb = new DynamicSpiderweb('spiderwebCanvas');
        dynamicSpiderweb.init();
        console.log('Dynamic Spiderweb initialized with', FULL_RECOMMENDATIONS.length, 'recommendations');
    } catch (e) {
        console.error('Spiderweb initialization error:', e);
        canvas.innerHTML = '<p style="color: white; padding: 2rem;">Napaka pri nalaganju vizualizacije.</p>';
    }
}

window.DynamicSpiderweb = DynamicSpiderweb;
window.initSpiderweb = initSpiderweb;
