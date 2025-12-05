/**
 * Network Visualization for Slovenia Human Rights System
 * Interactive connection web showing relationships between themes, countries, ministries
 */

class HumanRightsNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nodes = [];
        this.edges = [];
        this.network = null;
        this.selectedNode = null;
    }

    init() {
        this.buildNodes();
        this.buildEdges();
        this.render();
        this.setupEvents();
    }

    buildNodes() {
        // Theme nodes
        UPR_DATA.themes.forEach(theme => {
            this.nodes.push({
                id: `theme_${theme.id}`,
                label: `${theme.icon} ${theme.name}`,
                group: 'theme',
                title: `${theme.name}\n${theme.totalRecs} priporočil`,
                value: theme.totalRecs,
                color: { background: theme.color, border: theme.color }
            });
        });

        // Ministry nodes
        UPR_DATA.ministries.forEach(ministry => {
            this.nodes.push({
                id: `ministry_${ministry.id}`,
                label: `${ministry.icon} ${ministry.shortName}`,
                group: 'ministry',
                title: `${ministry.name}\n${ministry.recommendations} priporočil`,
                value: ministry.recommendations / 2,
                color: { background: '#10b981', border: '#059669' }
            });
        });

        // Treaty body nodes
        UPR_DATA.treatyBodies.filter(t => t.ratification).forEach(treaty => {
            this.nodes.push({
                id: `treaty_${treaty.id}`,
                label: treaty.id.toUpperCase(),
                group: 'treaty',
                title: `${treaty.name}\nRatifikacija: ${treaty.ratification}`,
                value: 20,
                color: { background: '#f59e0b', border: '#d97706' }
            });
        });

        // Cycle nodes
        UPR_DATA.cycles.forEach(cycle => {
            this.nodes.push({
                id: `cycle_${cycle.cycle}`,
                label: `UPR ${cycle.year}`,
                group: 'cycle',
                title: `${cycle.cycle}. cikel UPR\n${cycle.totalRecommendations} priporočil`,
                value: cycle.totalRecommendations / 5,
                color: { background: '#3b82f6', border: '#1d4ed8' }
            });
        });

        // Top recommending countries
        UPR_DATA.topRecommendingCountries.slice(0, 8).forEach(country => {
            this.nodes.push({
                id: `country_${country.country.toLowerCase().replace(/\s/g, '_')}`,
                label: country.country,
                group: 'country',
                title: `${country.country}\n${country.total} priporočil`,
                value: country.total,
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
                this.edges.push({
                    from: `theme_${theme}`,
                    to: `ministry_${ministry}`,
                    color: { color: '#94a3b8', opacity: 0.6 },
                    width: 2
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
                this.edges.push({
                    from: `theme_${theme}`,
                    to: `treaty_${treaty}`,
                    color: { color: '#f59e0b', opacity: 0.4 },
                    width: 1,
                    dashes: true
                });
            });
        });

        // Connect cycles to themes based on recommendations per cycle
        UPR_DATA.themes.forEach(theme => {
            Object.entries(theme.cycles).forEach(([cycle, count]) => {
                if (count > 5) {
                    this.edges.push({
                        from: `cycle_${cycle}`,
                        to: `theme_${theme.id}`,
                        color: { color: '#3b82f6', opacity: 0.3 },
                        width: Math.max(1, count / 5)
                    });
                }
            });
        });

        // Connect countries to cycles
        UPR_DATA.topRecommendingCountries.slice(0, 8).forEach(country => {
            const countryId = `country_${country.country.toLowerCase().replace(/\s/g, '_')}`;
            Object.entries(country.cycles).forEach(([cycle, count]) => {
                if (count > 3) {
                    this.edges.push({
                        from: countryId,
                        to: `cycle_${cycle}`,
                        color: { color: '#8b5cf6', opacity: 0.3 },
                        width: count / 2
                    });
                }
            });
        });
    }

    render() {
        const data = {
            nodes: new vis.DataSet(this.nodes),
            edges: new vis.DataSet(this.edges)
        };

        const options = {
            nodes: {
                shape: 'dot',
                font: { size: 12, face: 'Segoe UI', color: '#1e293b' },
                borderWidth: 2,
                shadow: true,
                scaling: { min: 10, max: 50 }
            },
            edges: {
                smooth: { type: 'continuous' },
                arrows: { to: { enabled: false } }
            },
            physics: {
                stabilization: { iterations: 100 },
                barnesHut: {
                    gravitationalConstant: -3000,
                    springLength: 150,
                    springConstant: 0.04
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 100,
                hideEdgesOnDrag: true
            },
            groups: {
                theme: { color: { background: '#3b82f6' }, shape: 'dot' },
                ministry: { color: { background: '#10b981' }, shape: 'diamond' },
                treaty: { color: { background: '#f59e0b' }, shape: 'triangle' },
                cycle: { color: { background: '#6366f1' }, shape: 'square' },
                country: { color: { background: '#8b5cf6' }, shape: 'star' }
            }
        };

        this.network = new vis.Network(this.container, data, options);
    }

    setupEvents() {
        this.network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                this.showNodeDetails(nodeId);
            }
        });

        this.network.on('doubleClick', (params) => {
            if (params.nodes.length > 0) {
                this.network.focus(params.nodes[0], {
                    scale: 1.5,
                    animation: true
                });
            }
        });
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
            this.network.setData({
                nodes: new vis.DataSet(this.nodes),
                edges: new vis.DataSet(this.edges)
            });
            return;
        }

        const filteredNodes = this.nodes.filter(n => n.group === group);
        const nodeIds = filteredNodes.map(n => n.id);
        const filteredEdges = this.edges.filter(e => 
            nodeIds.includes(e.from) || nodeIds.includes(e.to)
        );

        this.network.setData({
            nodes: new vis.DataSet(filteredNodes),
            edges: new vis.DataSet(filteredEdges)
        });
    }

    focusOnTheme(themeId) {
        const nodeId = `theme_${themeId}`;
        this.network.focus(nodeId, { scale: 1.2, animation: true });
        this.network.selectNodes([nodeId]);
        this.showNodeDetails(nodeId);
    }

    resetView() {
        this.network.fit({ animation: true });
    }
}

// Initialize when DOM is ready
let humanRightsNetwork = null;

function initNetwork() {
    if (document.getElementById('networkCanvas')) {
        humanRightsNetwork = new HumanRightsNetwork('networkCanvas');
        humanRightsNetwork.init();
    }
}

// Export
window.HumanRightsNetwork = HumanRightsNetwork;
window.initNetwork = initNetwork;
