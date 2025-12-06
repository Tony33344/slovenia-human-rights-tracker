/**
 * Network Visualization for Slovenia Human Rights System
 * Interactive connection web with step-by-step filtering
 * Click any node to see ONLY its direct connections
 */

class HumanRightsNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.allNodes = [];
        this.allEdges = [];
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.selectedNode = null;
        this.isFiltered = false;
    }

    init() {
        this.buildNodes();
        this.buildEdges();
        this.render();
        this.setupEvents();
        this.updateInstructions();
    }
    
    updateInstructions() {
        const panel = document.getElementById('networkDetails');
        if (panel && !this.isFiltered) {
            panel.innerHTML = `
                <h4>📍 Navodila za uporabo</h4>
                <p><strong>Kliknite na katerokoli vozlišče</strong> da vidite samo njegove povezave.</p>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e2e8f0;">
                <p><strong>Vrste vozlišč:</strong></p>
                <ul>
                    <li><span style="color:#3b82f6">●</span> <strong>Teme</strong> - Tematska področja</li>
                    <li><span style="color:#10b981">◆</span> <strong>Ministrstva</strong> - Pristojni organi</li>
                    <li><span style="color:#f59e0b">▲</span> <strong>Konvencije</strong> - Pogodbena telesa ZN</li>
                    <li><span style="color:#6366f1">■</span> <strong>UPR Cikli</strong> - 2010, 2014, 2019, 2025</li>
                    <li><span style="color:#8b5cf6">★</span> <strong>Države</strong> - Države s priporočili</li>
                </ul>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e2e8f0;">
                <p><strong>Uporabite gumbe zgoraj</strong> za filtriranje po vrsti.</p>
            `;
        }
    }

    buildNodes() {
        // Get live data from FULL_RECOMMENDATIONS
        const recs = typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : [];
        
        // Compute theme stats from live data
        const themeStats = {};
        const ministryStats = {};
        const countryStats = {};
        const cycleStats = {1: 0, 2: 0, 3: 0, 4: 0};
        
        recs.forEach(r => {
            themeStats[r.theme] = (themeStats[r.theme] || 0) + 1;
            ministryStats[r.ministry] = (ministryStats[r.ministry] || 0) + 1;
            countryStats[r.country] = (countryStats[r.country] || 0) + 1;
            cycleStats[r.cycle]++;
        });
        
        // Theme name/icon mapping
        const themeInfo = {
            'roma': { name: 'Pravice Romov', icon: '🏠', color: '#8b5cf6' },
            'izbrisani': { name: 'Izbrisani', icon: '📋', color: '#f59e0b' },
            'discrimination': { name: 'Diskriminacija', icon: '⚖️', color: '#3b82f6' },
            'hate_speech': { name: 'Sovražni govor', icon: '🗣️', color: '#ef4444' },
            'lgbti': { name: 'LGBTI+ pravice', icon: '🏳️‍🌈', color: '#ec4899' },
            'gender': { name: 'Enakost spolov', icon: '♀️', color: '#f472b6' },
            'migration': { name: 'Migracije in azil', icon: '🌍', color: '#06b6d4' },
            'disability': { name: 'Pravice invalidov', icon: '♿', color: '#10b981' },
            'children': { name: 'Pravice otrok', icon: '👶', color: '#14b8a6' },
            'trafficking': { name: 'Trgovina z ljudmi', icon: '⛓️', color: '#7c3aed' },
            'torture': { name: 'Prepoved mučenja', icon: '🛡️', color: '#dc2626' },
            'media': { name: 'Svoboda medijev', icon: '📰', color: '#6366f1' },
            'nhri': { name: 'NHRI / Varuh', icon: '🏛️', color: '#0ea5e9' },
            'elderly': { name: 'Pravice starejših', icon: '👴', color: '#84cc16' },
            'environment': { name: 'Okolje in podnebje', icon: '🌱', color: '#22c55e' },
            'treaties': { name: 'Mednarodne pogodbe', icon: '📜', color: '#0891b2' },
            'general': { name: 'Splošno', icon: '📄', color: '#64748b' }
        };
        
        // Theme nodes from live data
        Object.entries(themeStats).forEach(([themeId, count]) => {
            const info = themeInfo[themeId] || { name: themeId, icon: '📌', color: '#64748b' };
            this.allNodes.push({
                id: `theme_${themeId}`,
                label: `${info.icon} ${info.name}`,
                group: 'theme',
                title: `${info.name}\n${count} priporočil`,
                value: count,
                color: { background: info.color, border: info.color }
            });
        });

        // Ministry info mapping
        const ministryInfo = {
            'mddsz': { name: 'Ministrstvo za delo, družino in socialne zadeve', short: 'MDDSZ', icon: '👥' },
            'mnz': { name: 'Ministrstvo za notranje zadeve', short: 'MNZ', icon: '🛡️' },
            'mp': { name: 'Ministrstvo za pravosodje', short: 'MP', icon: '⚖️' },
            'mizs': { name: 'Ministrstvo za izobraževanje', short: 'MIZŠ', icon: '📚' },
            'mz': { name: 'Ministrstvo za zdravje', short: 'MZ', icon: '🏥' },
            'mk': { name: 'Ministrstvo za kulturo', short: 'MK', icon: '🎭' },
            'mzez': { name: 'Ministrstvo za zunanje zadeve', short: 'MZEZ', icon: '🌐' }
        };
        
        // Ministry nodes from live data
        Object.entries(ministryStats).forEach(([ministryId, count]) => {
            const info = ministryInfo[ministryId] || { name: ministryId, short: ministryId.toUpperCase(), icon: '🏛️' };
            this.allNodes.push({
                id: `ministry_${ministryId}`,
                label: `${info.icon} ${info.short}`,
                group: 'ministry',
                title: `${info.name}\n${count} priporočil`,
                value: count / 2,
                color: { background: '#10b981', border: '#059669' }
            });
        });

        // Treaty body nodes (keep from UPR_DATA as these are static)
        if (typeof UPR_DATA !== 'undefined' && UPR_DATA.treatyBodies) {
            UPR_DATA.treatyBodies.filter(t => t.ratification).forEach(treaty => {
                this.allNodes.push({
                    id: `treaty_${treaty.id}`,
                    label: treaty.id.toUpperCase(),
                    group: 'treaty',
                    title: `${treaty.name}\nRatifikacija: ${treaty.ratification}`,
                    value: 20,
                    color: { background: '#f59e0b', border: '#d97706' }
                });
            });
        }

        // Cycle nodes from live data
        const cycleYears = {1: 2010, 2: 2014, 3: 2019, 4: 2025};
        Object.entries(cycleStats).forEach(([cycle, count]) => {
            if (count > 0) {
                this.allNodes.push({
                    id: `cycle_${cycle}`,
                    label: `UPR ${cycleYears[cycle]}`,
                    group: 'cycle',
                    title: `${cycle}. cikel UPR\n${count} priporočil`,
                    value: count / 5,
                    color: { background: '#3b82f6', border: '#1d4ed8' }
                });
            }
        });

        // Top recommending countries from live data (top 15)
        const topCountries = Object.entries(countryStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15);
        
        topCountries.forEach(([country, count]) => {
            this.allNodes.push({
                id: `country_${country.toLowerCase().replace(/\s/g, '_')}`,
                label: country,
                group: 'country',
                title: `${country}\n${count} priporočil`,
                value: count,
                color: { background: '#8b5cf6', border: '#7c3aed' }
            });
        });
    }

    buildEdges() {
        // Connect themes to ministries based on responsibility
        const themeMinistryMap = {
            'discrimination': ['mddsz', 'mp'],
            'roma': ['mddsz', 'mizs', 'mnz', 'mz'],
            'hate-speech': ['mp', 'mk'],
            'lgbti': ['mddsz', 'mz', 'mp'],
            'gender': ['mddsz'],
            'migrants': ['mnz', 'mddsz'],
            'izbrisani': ['mnz', 'mp'],
            'disability': ['mddsz', 'mizs', 'mp'],
            'children': ['mddsz', 'mizs', 'mz'],
            'media': ['mk', 'mp'],
            'torture': ['mp', 'mnz'],
            'trafficking': ['mnz', 'mp', 'mddsz'],
            'nhri': ['mp', 'varuh'],
            'elderly': ['mddsz', 'mz'],
            'environment': ['mzez']
        };

        Object.entries(themeMinistryMap).forEach(([theme, ministries]) => {
            ministries.forEach(ministry => {
                this.allEdges.push({
                    from: `theme_${theme}`,
                    to: `ministry_${ministry}`,
                    color: { color: '#10b981', opacity: 0.7 },
                    width: 3,
                    title: 'Tema → Ministrstvo'
                });
            });
        });

        // Connect themes to treaty bodies
        const themeTreatyMap = {
            'discrimination': ['ccpr', 'cerd', 'cedaw'],
            'roma': ['cerd', 'cescr'],
            'hate-speech': ['ccpr', 'cerd'],
            'lgbti': ['ccpr', 'cedaw'],
            'gender': ['cedaw', 'cescr'],
            'migrants': ['ccpr', 'cat'],
            'disability': ['crpd'],
            'children': ['crc'],
            'torture': ['cat'],
            'elderly': ['cescr'],
            'trafficking': ['cedaw', 'crc']
        };

        Object.entries(themeTreatyMap).forEach(([theme, treaties]) => {
            treaties.forEach(treaty => {
                this.allEdges.push({
                    from: `theme_${theme}`,
                    to: `treaty_${treaty}`,
                    color: { color: '#f59e0b', opacity: 0.6 },
                    width: 2,
                    dashes: true,
                    title: 'Tema → Konvencija'
                });
            });
        });

        // Connect cycles to themes based on LIVE data
        const recs = typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : [];
        const cycleThemeStats = {};
        const countryByCycle = {};
        
        recs.forEach(r => {
            const ctKey = `${r.cycle}_${r.theme}`;
            cycleThemeStats[ctKey] = (cycleThemeStats[ctKey] || 0) + 1;
            
            const ccKey = `${r.country.toLowerCase().replace(/\s/g, '_')}_${r.cycle}`;
            countryByCycle[ccKey] = (countryByCycle[ccKey] || 0) + 1;
        });
        
        Object.entries(cycleThemeStats).forEach(([key, count]) => {
            if (count > 3) {
                const [cycle, theme] = key.split('_');
                this.allEdges.push({
                    from: `cycle_${cycle}`,
                    to: `theme_${theme}`,
                    color: { color: '#3b82f6', opacity: 0.5 },
                    width: Math.max(2, count / 4),
                    title: `${count} priporočil`
                });
            }
        });

        // Connect countries to cycles from LIVE data
        Object.entries(countryByCycle).forEach(([key, count]) => {
            if (count > 2) {
                const parts = key.split('_');
                const cycle = parts.pop();
                const country = parts.join('_');
                
                // Check if country node exists
                const countryNode = this.allNodes.find(n => n.id === `country_${country}`);
                if (countryNode) {
                    this.allEdges.push({
                        from: `country_${country}`,
                        to: `cycle_${cycle}`,
                        color: { color: '#8b5cf6', opacity: 0.5 },
                        width: Math.max(1, count / 2),
                        title: `${count} priporočil`
                    });
                }
            }
        });
        
        // Connect countries to themes they recommended most
        const countryThemes = {};
        recs.forEach(r => {
            const key = `${r.country.toLowerCase().replace(/\s/g, '_')}_${r.theme}`;
            countryThemes[key] = (countryThemes[key] || 0) + 1;
        });
        
        Object.entries(countryThemes).forEach(([key, count]) => {
            if (count >= 2) {
                const [country, theme] = key.split('_').reduce((acc, part, i, arr) => {
                    if (i === arr.length - 1) {
                        acc[1] = part;
                    } else {
                        acc[0] = acc[0] ? acc[0] + '_' + part : part;
                    }
                    return acc;
                }, ['', '']);
                
                // Check if nodes exist
                const countryNode = this.allNodes.find(n => n.id === `country_${country}`);
                const themeNode = this.allNodes.find(n => n.id === `theme_${theme}`);
                
                if (countryNode && themeNode) {
                    this.allEdges.push({
                        from: `country_${country}`,
                        to: `theme_${theme}`,
                        color: { color: '#ec4899', opacity: 0.4 },
                        width: count,
                        dashes: [5, 5],
                        title: `${count} priporočil`
                    });
                }
            }
        });
    }

    render() {
        this.nodes = new vis.DataSet(this.allNodes);
        this.edges = new vis.DataSet(this.allEdges);
        
        const data = {
            nodes: this.nodes,
            edges: this.edges
        };

        const options = {
            nodes: {
                shape: 'dot',
                font: { 
                    size: 13, 
                    face: 'Segoe UI, Arial, sans-serif', 
                    color: '#1e293b', 
                    strokeWidth: 3, 
                    strokeColor: '#ffffff',
                    bold: { color: '#1e293b', size: 14 }
                },
                borderWidth: 4,
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,0.2)',
                    size: 10,
                    x: 3,
                    y: 3
                },
                scaling: { 
                    min: 20, 
                    max: 70,
                    label: { enabled: true, min: 12, max: 16 }
                },
                chosen: {
                    node: function(values, id, selected, hovering) {
                        values.borderWidth = 6;
                        values.shadow = true;
                        values.shadowSize = 15;
                    }
                }
            },
            edges: {
                smooth: { 
                    type: 'curvedCW', 
                    roundness: 0.2,
                    forceDirection: 'none'
                },
                arrows: { to: { enabled: false } },
                selectionWidth: 4,
                hoverWidth: 3,
                color: {
                    inherit: 'both',
                    opacity: 0.7
                }
            },
            physics: {
                enabled: true,
                stabilization: { 
                    enabled: true,
                    iterations: 200,
                    updateInterval: 25
                },
                barnesHut: {
                    gravitationalConstant: -5000,
                    centralGravity: 0.3,
                    springLength: 180,
                    springConstant: 0.04,
                    damping: 0.4,
                    avoidOverlap: 0.5
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 50,
                hideEdgesOnDrag: false,
                multiselect: false,
                navigationButtons: true,
                keyboard: true,
                zoomView: true
            },
            groups: {
                theme: { 
                    color: { background: '#3b82f6', border: '#1d4ed8', highlight: { background: '#60a5fa', border: '#2563eb' } }, 
                    shape: 'dot',
                    borderWidth: 4
                },
                ministry: { 
                    color: { background: '#10b981', border: '#047857', highlight: { background: '#34d399', border: '#059669' } }, 
                    shape: 'dot',
                    borderWidth: 4
                },
                treaty: { 
                    color: { background: '#f59e0b', border: '#b45309', highlight: { background: '#fbbf24', border: '#d97706' } }, 
                    shape: 'dot',
                    borderWidth: 4
                },
                cycle: { 
                    color: { background: '#6366f1', border: '#4338ca', highlight: { background: '#818cf8', border: '#4f46e5' } }, 
                    shape: 'dot',
                    borderWidth: 5
                },
                country: { 
                    color: { background: '#ec4899', border: '#be185d', highlight: { background: '#f472b6', border: '#db2777' } }, 
                    shape: 'dot',
                    borderWidth: 4
                }
            }
        };

        this.network = new vis.Network(this.container, data, options);
    }

    setupEvents() {
        // Single click - filter to show only connected nodes
        this.network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                this.focusOnNode(nodeId);
            } else if (params.nodes.length === 0 && params.edges.length === 0) {
                // Click on empty space - reset view
                this.showAll();
            }
        });

        this.network.on('doubleClick', (params) => {
            if (params.nodes.length > 0) {
                this.network.focus(params.nodes[0], {
                    scale: 1.8,
                    animation: { duration: 500, easingFunction: 'easeInOutQuad' }
                });
            }
        });
    }
    
    // Focus on a single node and show only its connections
    focusOnNode(nodeId) {
        this.selectedNode = nodeId;
        this.isFiltered = true;
        
        // Find all connected nodes
        const connectedEdges = this.allEdges.filter(e => e.from === nodeId || e.to === nodeId);
        const connectedNodeIds = new Set([nodeId]);
        
        connectedEdges.forEach(e => {
            connectedNodeIds.add(e.from);
            connectedNodeIds.add(e.to);
        });
        
        // Update nodes - highlight connected, fade others
        const updatedNodes = this.allNodes.map(n => {
            if (connectedNodeIds.has(n.id)) {
                return { ...n, opacity: 1, hidden: false };
            } else {
                return { ...n, opacity: 0.1, hidden: true };
            }
        });
        
        // Filter to only show connected
        const visibleNodes = updatedNodes.filter(n => !n.hidden);
        
        this.nodes.clear();
        this.nodes.add(visibleNodes);
        this.edges.clear();
        this.edges.add(connectedEdges);
        
        // Focus on the selected node
        setTimeout(() => {
            this.network.fit({
                nodes: Array.from(connectedNodeIds),
                animation: { duration: 500, easingFunction: 'easeInOutQuad' }
            });
        }, 100);
        
        // Show details
        this.showNodeDetails(nodeId);
    }
    
    // Show all nodes again
    showAll() {
        this.selectedNode = null;
        this.isFiltered = false;
        
        this.nodes.clear();
        this.nodes.add(this.allNodes);
        this.edges.clear();
        this.edges.add(this.allEdges);
        
        this.network.fit({ animation: true });
        this.updateInstructions();
    }

    showNodeDetails(nodeId) {
        const detailsPanel = document.getElementById('networkDetails');
        if (!detailsPanel) return;

        const [type, id] = nodeId.split('_');
        let content = '';

        switch (type) {
            case 'theme':
                const theme = UPR_DATA.themes.find(t => t.id === id);
                if (theme) {
                    const recs = (typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : UPR_DATA.recommendations)
                        .filter(r => r.theme === id).slice(0, 5);
                    content = `
                        <h4>${theme.icon} ${theme.name}</h4>
                        <p><strong>Skupaj priporočil:</strong> ${theme.totalRecs}</p>
                        <p><strong>Po ciklih:</strong> ${Object.entries(theme.cycles).map(([c, v]) => `${c}. cikel: ${v}`).join(', ')}</p>
                        <h5>Ključna vprašanja:</h5>
                        <ul>${theme.keyIssues.map(i => `<li>${i}</li>`).join('')}</ul>
                        <h5>Primeri priporočil:</h5>
                        <ul>${recs.map(r => `<li><em>${r.country}:</em> ${r.text.substring(0, 100)}...</li>`).join('')}</ul>
                    `;
                }
                break;

            case 'ministry':
                const ministry = UPR_DATA.ministries.find(m => m.id === id);
                if (ministry) {
                    content = `
                        <h4>${ministry.icon} ${ministry.name}</h4>
                        <p><strong>Priporočil:</strong> ${ministry.recommendations}</p>
                        <p><strong>Implementiranih:</strong> ${ministry.implemented} (${(ministry.implemented/ministry.recommendations*100).toFixed(0)}%)</p>
                        <p><strong>Delno impl.:</strong> ${ministry.partial} (${(ministry.partial/ministry.recommendations*100).toFixed(0)}%)</p>
                        <h5>Pristojnosti:</h5>
                        <ul>${ministry.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                    `;
                }
                break;

            case 'treaty':
                const treaty = UPR_DATA.treatyBodies.find(t => t.id === id);
                if (treaty) {
                    content = `
                        <h4>${treaty.name}</h4>
                        <p><strong>Konvencija:</strong> ${treaty.treaty}</p>
                        <p><strong>Ratifikacija:</strong> ${treaty.ratification}</p>
                        <p><strong>Zadnje poročilo:</strong> ${treaty.lastReport}</p>
                        <h5>Ključna priporočila:</h5>
                        <ul>${treaty.keyRecommendations.map(r => `<li>${r}</li>`).join('')}</ul>
                        <a href="${treaty.link}" target="_blank">🔗 Dokumenti</a>
                    `;
                }
                break;

            case 'cycle':
                const cycle = UPR_DATA.cycles.find(c => c.cycle === parseInt(id));
                if (cycle) {
                    content = `
                        <h4>UPR ${cycle.cycle}. cikel (${cycle.year})</h4>
                        <p><strong>Seja:</strong> ${cycle.session}. seja</p>
                        <p><strong>Priporočil:</strong> ${cycle.totalRecommendations}</p>
                        ${cycle.accepted ? `<p><strong>Sprejetih:</strong> ${cycle.accepted} (${cycle.acceptanceRate}%)</p>` : '<p><strong>Status:</strong> V obravnavi</p>'}
                        <p><strong>Dokument:</strong> ${cycle.documentRef}</p>
                    `;
                }
                break;

            case 'country':
                const countryName = id.replace(/_/g, ' ');
                const country = UPR_DATA.topRecommendingCountries.find(c => 
                    c.country.toLowerCase() === countryName
                );
                if (country) {
                    const countryRecs = (typeof FULL_RECOMMENDATIONS !== 'undefined' ? FULL_RECOMMENDATIONS : UPR_DATA.recommendations)
                        .filter(r => r.country.toLowerCase() === countryName).slice(0, 5);
                    content = `
                        <h4>🌍 ${country.country}</h4>
                        <p><strong>Skupaj priporočil:</strong> ${country.total}</p>
                        <p><strong>Po ciklih:</strong> ${Object.entries(country.cycles).map(([c, v]) => `${c}. cikel: ${v}`).join(', ')}</p>
                        <h5>Primeri priporočil:</h5>
                        <ul>${countryRecs.map(r => `<li>${r.text.substring(0, 100)}...</li>`).join('')}</ul>
                    `;
                }
                break;
        }

        detailsPanel.innerHTML = content || '<p>Izberite vozlišče za prikaz podrobnosti.</p>';
    }

    filterByGroup(group) {
        if (!group) {
            this.showAll();
            return;
        }
        
        this.isFiltered = true;
        
        // Get nodes of the selected group
        const groupNodes = this.allNodes.filter(n => n.group === group);
        const groupNodeIds = groupNodes.map(n => n.id);
        
        // Get all edges connected to these nodes
        const connectedEdges = this.allEdges.filter(e => 
            groupNodeIds.includes(e.from) || groupNodeIds.includes(e.to)
        );
        
        // Get all nodes that are connected (including other groups)
        const connectedNodeIds = new Set(groupNodeIds);
        connectedEdges.forEach(e => {
            connectedNodeIds.add(e.from);
            connectedNodeIds.add(e.to);
        });
        
        const visibleNodes = this.allNodes.filter(n => connectedNodeIds.has(n.id));
        
        this.nodes.clear();
        this.nodes.add(visibleNodes);
        this.edges.clear();
        this.edges.add(connectedEdges);
        
        this.network.fit({ animation: true });
        
        // Update details panel
        const groupNames = {
            theme: 'Teme',
            ministry: 'Ministrstva', 
            treaty: 'Pogodbena telesa',
            cycle: 'UPR Cikli',
            country: 'Države'
        };
        
        const panel = document.getElementById('networkDetails');
        if (panel) {
            panel.innerHTML = `
                <h4>🔍 Filter: ${groupNames[group] || group}</h4>
                <p>Prikazanih <strong>${groupNodes.length}</strong> vozlišč tipa "${groupNames[group]}"</p>
                <p>Povezanih z <strong>${visibleNodes.length - groupNodes.length}</strong> drugimi vozlišči</p>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e2e8f0;">
                <p><strong>Kliknite na posamezno vozlišče</strong> za podrobnosti.</p>
                <p><strong>Kliknite na prazen prostor</strong> za prikaz vseh.</p>
            `;
        }
    }

    focusOnTheme(themeId) {
        const nodeId = `theme_${themeId}`;
        this.focusOnNode(nodeId);
    }

    resetView() {
        this.showAll();
    }
}

// Initialize when DOM is ready
let humanRightsNetwork = null;

function initNetwork() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) {
        console.error('Network canvas not found');
        return;
    }
    
    // Check if vis.js is loaded
    if (typeof vis === 'undefined') {
        console.error('vis.js library not loaded');
        canvas.innerHTML = '<p style="padding:2rem;color:#dc2626;">Napaka: vis.js knjižnica ni naložena. Osvežite stran.</p>';
        return;
    }
    
    try {
        humanRightsNetwork = new HumanRightsNetwork('networkCanvas');
        humanRightsNetwork.init();
        console.log('Network initialized successfully');
    } catch (e) {
        console.error('Network initialization error:', e);
        canvas.innerHTML = '<p style="padding:2rem;color:#dc2626;">Napaka pri nalaganju mreže: ' + e.message + '</p>';
    }
}

// Export
window.HumanRightsNetwork = HumanRightsNetwork;
window.initNetwork = initNetwork;
