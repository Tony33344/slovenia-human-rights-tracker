/**
 * Spiderweb of Accountability - Sankey-style Diagram
 * Shows connections: Documents → Issues → Ministries
 * Based on real UPR data
 */

class SpiderwebDiagram {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = 1100;
        this.height = 750;
        this.selectedNode = null;
        
        // Data structure
        this.documents = [
            { id: 'national_report', name: 'National Report (A/...)', type: 'govt', color: '#3b82f6', x: 50, recs: 0 },
            { id: 'un_compilation', name: 'UN Compilation (A/...)', type: 'un', color: '#10b981', x: 50, recs: 0 },
            { id: 'stakeholder_summary', name: 'Stakeholder Summary', type: 'ngo', color: '#f59e0b', x: 50, recs: 0 },
            { id: 'working_group_report', name: 'Working Group Report', type: 'un', color: '#10b981', x: 50, recs: 254 },
            { id: 'ombudsman_report', name: 'Human Rights Ombudsman', type: 'nhri', color: '#8b5cf6', x: 50, recs: 0 },
            { id: 'coe_report', name: 'Council of Europe', type: 'coe', color: '#06b6d4', x: 50, recs: 0 }
        ];
        
        this.issues = [
            { id: 'roma', name: 'Roma Rights & Living...', recs: 17, color: '#ef4444' },
            { id: 'erased', name: 'Rights of "The Eras...', recs: 4, color: '#ef4444' },
            { id: 'trafficking', name: 'Trafficking in Huma...', recs: 25, color: '#ef4444' },
            { id: 'hate_speech', name: 'Hate Speech & Disc...', recs: 20, color: '#ef4444' },
            { id: 'prison', name: 'Prison Overcrowding', recs: 6, color: '#ef4444' },
            { id: 'disability', name: 'Disability Rights & D...', recs: 15, color: '#ef4444' },
            { id: 'gender', name: 'Gender-Based Viole...', recs: 22, color: '#ef4444' },
            { id: 'migration', name: 'Migration & Asylum', recs: 13, color: '#ef4444' }
        ];
        
        this.ministries = [
            { id: 'mddsz', name: 'MDDSZ', fullName: 'Ministry of Labour, Family, Social Affairs', color: '#3b82f6' },
            { id: 'mnz', name: 'MNZ', fullName: 'Ministry of the Interior', color: '#ef4444' },
            { id: 'mp', name: 'MP', fullName: 'Ministry of Justice', color: '#a855f7' },
            { id: 'mop', name: 'MOP', fullName: 'Ministry of Environment', color: '#f97316' },
            { id: 'mz', name: 'MZ', fullName: 'Ministry of Health', color: '#22c55e' },
            { id: 'mk', name: 'MK', fullName: 'Ministry of Culture', color: '#eab308' }
        ];
        
        // Connections: [docIndex, issueIndex, strength]
        this.docToIssue = [
            [0, 0, 2], [0, 1, 1], [0, 2, 2], [0, 3, 2], [0, 4, 1], [0, 6, 2], [0, 7, 2],
            [1, 0, 3], [1, 2, 3], [1, 3, 3], [1, 5, 2], [1, 6, 3], [1, 7, 2],
            [2, 0, 2], [2, 1, 2], [2, 2, 2], [2, 3, 3], [2, 5, 2], [2, 6, 2],
            [3, 0, 3], [3, 1, 2], [3, 2, 3], [3, 3, 3], [3, 4, 2], [3, 5, 3], [3, 6, 3], [3, 7, 3],
            [4, 0, 2], [4, 3, 2], [4, 4, 2], [4, 5, 2],
            [5, 0, 1], [5, 3, 2], [5, 7, 1]
        ];
        
        // Connections: [issueIndex, ministryIndex, strength]
        this.issueToMinistry = [
            [0, 0, 3], [0, 2, 1], // Roma -> MDDSZ, MP
            [1, 1, 3], [1, 2, 2], // Erased -> MNZ, MP
            [2, 1, 3], [2, 2, 2], // Trafficking -> MNZ, MP
            [3, 2, 3], [3, 1, 2], // Hate Speech -> MP, MNZ
            [4, 2, 3], // Prison -> MP
            [5, 0, 3], [5, 4, 2], // Disability -> MDDSZ, MZ
            [6, 0, 3], [6, 2, 2], // Gender -> MDDSZ, MP
            [7, 1, 3], [7, 0, 2] // Migration -> MNZ, MDDSZ
        ];
    }
    
    init() {
        this.render();
        this.setupEvents();
    }
    
    render() {
        const docX = 120;
        const issueX = this.width / 2;
        const ministryX = this.width - 100;
        
        const docStartY = 100;
        const docSpacing = 95;
        
        const issueStartY = 80;
        const issueSpacing = 80;
        
        const ministryStartY = 140;
        const ministrySpacing = 95;
        
        // Calculate positions
        this.documents.forEach((d, i) => { d.y = docStartY + i * docSpacing; d.x = docX; });
        this.issues.forEach((iss, i) => { iss.y = issueStartY + i * issueSpacing; iss.x = issueX; });
        this.ministries.forEach((m, i) => { m.y = ministryStartY + i * ministrySpacing; m.x = ministryX; });
        
        this.container.innerHTML = `
            <svg id="spiderwebSvg" width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}" class="spiderweb-svg">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <linearGradient id="criticalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#ef4444"/>
                        <stop offset="100%" style="stop-color:#f97316"/>
                    </linearGradient>
                    <linearGradient id="highGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#8b5cf6"/>
                        <stop offset="100%" style="stop-color:#6366f1"/>
                    </linearGradient>
                </defs>
                
                <!-- Background -->
                <rect width="100%" height="100%" fill="#0f172a"/>
                
                <!-- Title -->
                <text x="${this.width/2}" y="35" text-anchor="middle" fill="white" font-size="20" font-weight="bold">
                    The Spiderweb of Accountability
                </text>
                <text x="${this.width/2}" y="55" text-anchor="middle" fill="#94a3b8" font-size="12">
                    Click any node to highlight its connections. This visualization shows how documents (inputs) connect to human rights issues (problems) and ministries (duty-bearers).
                </text>
                
                <!-- Legend -->
                <g transform="translate(30, 65)">
                    <rect width="12" height="12" fill="#3b82f6" rx="2"/>
                    <text x="18" y="10" fill="#94a3b8" font-size="10">Government</text>
                    
                    <rect x="100" width="12" height="12" fill="#f59e0b" rx="2"/>
                    <text x="118" y="10" fill="#94a3b8" font-size="10">NGO/Civil Society</text>
                    
                    <rect x="220" width="12" height="12" fill="#8b5cf6" rx="2"/>
                    <text x="238" y="10" fill="#94a3b8" font-size="10">NHRI</text>
                    
                    <rect x="290" width="12" height="12" fill="#10b981" rx="2"/>
                    <text x="308" y="10" fill="#94a3b8" font-size="10">UN Bodies</text>
                    
                    <line x1="380" y1="6" x2="420" y2="6" stroke="#ef4444" stroke-width="2"/>
                    <text x="428" y="10" fill="#94a3b8" font-size="10">Critical</text>
                    
                    <line x1="480" y1="6" x2="520" y2="6" stroke="#8b5cf6" stroke-width="2"/>
                    <text x="528" y="10" fill="#94a3b8" font-size="10">High Priority</text>
                </g>
                
                <!-- Column headers -->
                <text x="${docX}" y="90" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">DOCUMENTS</text>
                <text x="${issueX}" y="90" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">ISSUES</text>
                <text x="${ministryX}" y="90" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">MINISTRIES</text>
                
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
            </svg>
        `;
    }
    
    renderDocNode(doc, idx) {
        const typeColors = {
            govt: '#3b82f6',
            un: '#10b981',
            ngo: '#f59e0b',
            nhri: '#8b5cf6',
            coe: '#06b6d4'
        };
        const color = typeColors[doc.type] || '#64748b';
        const typeLabels = { govt: 'GOVT', un: 'UN', ngo: 'NGO', nhri: 'NHRI', coe: 'COE' };
        
        return `
            <g class="node doc-node clickable" data-type="document" data-id="${doc.id}" data-idx="${idx}" transform="translate(${doc.x - 80}, ${doc.y})">
                <rect width="160" height="45" rx="6" fill="${color}" class="node-rect" opacity="0.9"/>
                <text x="80" y="20" text-anchor="middle" fill="white" font-size="11" font-weight="500">${doc.name}</text>
                <text x="80" y="35" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">${typeLabels[doc.type]}</text>
            </g>
        `;
    }
    
    renderIssueNode(issue, idx) {
        return `
            <g class="node issue-node clickable" data-type="issue" data-id="${issue.id}" data-idx="${idx}" transform="translate(${issue.x - 85}, ${issue.y})">
                <rect width="170" height="50" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2" class="node-rect"/>
                <text x="85" y="22" text-anchor="middle" fill="white" font-size="11" font-weight="500">${issue.name}</text>
                <text x="85" y="38" text-anchor="middle" fill="#94a3b8" font-size="10">${issue.recs} recs</text>
            </g>
        `;
    }
    
    renderMinistryNode(ministry, idx) {
        return `
            <g class="node ministry-node clickable" data-type="ministry" data-id="${ministry.id}" data-idx="${idx}" transform="translate(${ministry.x - 55}, ${ministry.y})">
                <rect width="110" height="40" rx="4" fill="${ministry.color}" class="node-rect"/>
                <text x="55" y="25" text-anchor="middle" fill="white" font-size="13" font-weight="bold">${ministry.name}</text>
            </g>
        `;
    }
    
    renderDocToIssueConnections() {
        return this.docToIssue.map(([docIdx, issueIdx, strength]) => {
            const doc = this.documents[docIdx];
            const issue = this.issues[issueIdx];
            const color = strength >= 3 ? '#ef4444' : '#8b5cf6';
            const opacity = strength >= 3 ? 0.6 : 0.4;
            const width = strength >= 3 ? 2 : 1.5;
            
            return `
                <path d="M ${doc.x + 80} ${doc.y + 22} 
                         C ${doc.x + 150} ${doc.y + 22}, 
                           ${issue.x - 150} ${issue.y + 25}, 
                           ${issue.x - 85} ${issue.y + 25}"
                      stroke="${color}" stroke-width="${width}" fill="none" opacity="${opacity}"
                      class="connection" data-from="doc_${docIdx}" data-to="issue_${issueIdx}"/>
            `;
        }).join('');
    }
    
    renderIssueToMinistryConnections() {
        return this.issueToMinistry.map(([issueIdx, ministryIdx, strength]) => {
            const issue = this.issues[issueIdx];
            const ministry = this.ministries[ministryIdx];
            const color = strength >= 3 ? '#ef4444' : '#8b5cf6';
            const opacity = strength >= 3 ? 0.6 : 0.4;
            const width = strength >= 3 ? 2 : 1.5;
            
            return `
                <path d="M ${issue.x + 85} ${issue.y + 25}
                         C ${issue.x + 150} ${issue.y + 25},
                           ${ministry.x - 120} ${ministry.y + 20},
                           ${ministry.x - 55} ${ministry.y + 20}"
                      stroke="${color}" stroke-width="${width}" fill="none" opacity="${opacity}"
                      class="connection" data-from="issue_${issueIdx}" data-to="ministry_${ministryIdx}"/>
            `;
        }).join('');
    }
    
    setupEvents() {
        const clickableNodes = this.container.querySelectorAll('.clickable');
        
        clickableNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                const type = node.dataset.type;
                const idx = parseInt(node.dataset.idx);
                this.highlightConnections(type, idx);
            });
            
            node.style.cursor = 'pointer';
        });
        
        // Click on background to reset
        this.container.querySelector('svg').addEventListener('click', (e) => {
            if (e.target.tagName === 'svg' || e.target.tagName === 'rect' && e.target.classList.length === 0) {
                this.resetHighlight();
            }
        });
    }
    
    highlightConnections(type, idx) {
        const connections = this.container.querySelectorAll('.connection');
        const nodes = this.container.querySelectorAll('.node');
        
        // Dim all first
        connections.forEach(c => c.style.opacity = '0.1');
        nodes.forEach(n => n.style.opacity = '0.3');
        
        // Highlight connected
        if (type === 'document') {
            // Highlight this doc
            this.container.querySelector(`[data-type="document"][data-idx="${idx}"]`).style.opacity = '1';
            
            // Find connected issues
            this.docToIssue.filter(([d]) => d === idx).forEach(([_, issueIdx]) => {
                this.container.querySelector(`[data-type="issue"][data-idx="${issueIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="doc_${idx}"][data-to="issue_${issueIdx}"]`).forEach(c => c.style.opacity = '0.8');
            });
        } else if (type === 'issue') {
            // Highlight this issue
            this.container.querySelector(`[data-type="issue"][data-idx="${idx}"]`).style.opacity = '1';
            
            // Find connected docs
            this.docToIssue.filter(([_, i]) => i === idx).forEach(([docIdx]) => {
                this.container.querySelector(`[data-type="document"][data-idx="${docIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="doc_${docIdx}"][data-to="issue_${idx}"]`).forEach(c => c.style.opacity = '0.8');
            });
            
            // Find connected ministries
            this.issueToMinistry.filter(([i]) => i === idx).forEach(([_, ministryIdx]) => {
                this.container.querySelector(`[data-type="ministry"][data-idx="${ministryIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="issue_${idx}"][data-to="ministry_${ministryIdx}"]`).forEach(c => c.style.opacity = '0.8');
            });
        } else if (type === 'ministry') {
            // Highlight this ministry
            this.container.querySelector(`[data-type="ministry"][data-idx="${idx}"]`).style.opacity = '1';
            
            // Find connected issues
            this.issueToMinistry.filter(([_, m]) => m === idx).forEach(([issueIdx]) => {
                this.container.querySelector(`[data-type="issue"][data-idx="${issueIdx}"]`).style.opacity = '1';
                this.container.querySelectorAll(`[data-from="issue_${issueIdx}"][data-to="ministry_${idx}"]`).forEach(c => c.style.opacity = '0.8');
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
let spiderwebDiagram = null;

function initSpiderweb() {
    const canvas = document.getElementById('spiderwebCanvas');
    if (!canvas) {
        console.error('Spiderweb canvas not found');
        return;
    }
    
    // Clear any existing content
    canvas.innerHTML = '';
    
    try {
        spiderwebDiagram = new SpiderwebDiagram('spiderwebCanvas');
        spiderwebDiagram.init();
        console.log('Spiderweb initialized successfully');
        
        // Force a re-render after a short delay to ensure visibility
        setTimeout(() => {
            const svg = canvas.querySelector('svg');
            if (svg) {
                svg.style.display = 'block';
                svg.style.width = '100%';
                svg.style.height = '750px';
            }
        }, 50);
    } catch (e) {
        console.error('Spiderweb initialization error:', e);
        canvas.innerHTML = '<p style="color: white; padding: 2rem;">Error loading visualization. Please refresh the page.</p>';
    }
}

window.SpiderwebDiagram = SpiderwebDiagram;
window.initSpiderweb = initSpiderweb;
