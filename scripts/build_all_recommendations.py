#!/usr/bin/env python3
"""
Build comprehensive recommendations database from ALL original UN documents
This creates a complete, verified dataset for the Slovenia UPR tracker
"""

import re
import json
import os

# Theme classification keywords
THEME_KEYWORDS = {
    'roma': ['roma', 'romsk', 'romani'],
    'izbrisani': ['erased', 'izbris', 'erasure', 'permanent resident', 'residency status'],
    'discrimination': ['discriminat', 'diskriminac', 'equality', 'enakost', 'racial'],
    'hate_speech': ['hate speech', 'sovražni govor', 'racist', 'xenophob', 'hate crime', 'hatred'],
    'lgbti': ['lgbti', 'lgbt', 'same-sex', 'sexual orientation', 'gender identity', 'istospoln'],
    'gender': ['women', 'gender', 'žensk', 'domestic violence', 'nasilje nad žensk', 'gender-based', 'femicide'],
    'migration': ['migra', 'asylum', 'azil', 'refugee', 'begunec', 'border'],
    'disability': ['disabilit', 'invalid', 'persons with disabilities'],
    'children': ['child', 'otrok', 'minor', 'juvenile', 'youth'],
    'trafficking': ['trafficking', 'trgovin'],
    'torture': ['torture', 'mučenj', 'prison', 'detention', 'zapor', 'ill-treatment', 'police'],
    'media': ['media', 'journalist', 'press', 'medij', 'novinar', 'freedom of expression'],
    'nhri': ['ombudsman', 'varuh', 'nhri', 'national human rights institution'],
    'elderly': ['elder', 'older person', 'starejš', 'ageing', 'aged'],
    'environment': ['environment', 'climate', 'okolj', 'podnebn'],
    'treaties': ['ratif', 'convention', 'protocol', 'treaty', 'accede', 'sign']
}

# Ministry classification
MINISTRY_MAP = {
    'mddsz': ['social', 'labour', 'family', 'child', 'women', 'gender', 'disability', 'roma', 'elder', 'lgbti', 'equality', 'discrimination'],
    'mnz': ['police', 'interior', 'migra', 'asylum', 'border', 'erased', 'izbris', 'residence', 'citizenship', 'trafficking'],
    'mp': ['justice', 'court', 'judicial', 'legal', 'prison', 'hate speech', 'ombudsman', 'torture'],
    'mizs': ['education', 'school', 'izobražev', 'university'],
    'mz': ['health', 'zdravstv', 'medical'],
    'mk': ['culture', 'media', 'cultural', 'journalist'],
    'mzez': ['foreign', 'international', 'treaty', 'convention', 'ratif', 'climate', 'environment']
}

def classify_theme(text):
    text_lower = text.lower()
    for theme, keywords in THEME_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                return theme
    return 'general'

def classify_ministry(text, theme):
    text_lower = text.lower()
    for ministry, keywords in MINISTRY_MAP.items():
        for kw in keywords:
            if kw in text_lower:
                return ministry
    # Default based on theme
    theme_ministry = {
        'roma': 'mddsz', 'gender': 'mddsz', 'children': 'mddsz', 'disability': 'mddsz',
        'lgbti': 'mddsz', 'elderly': 'mddsz', 'trafficking': 'mnz', 'discrimination': 'mddsz',
        'migration': 'mnz', 'izbrisani': 'mnz', 'hate_speech': 'mp', 'torture': 'mp',
        'nhri': 'mp', 'media': 'mk', 'environment': 'mzez', 'treaties': 'mzez'
    }
    return theme_ministry.get(theme, 'mddsz')

def extract_country(text):
    # Try multiple patterns
    patterns = [
        r'\(([A-Za-z][A-Za-z\s]+(?:of\s+[A-Za-z\s]+)?)\)\s*;?\s*$',  # (Country);
        r'\(([A-Za-z][A-Za-z\s]+)\)',  # Any (Country)
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            country = match.group(1).strip()
            # Clean up common issues
            if country and len(country) > 2 and country[0].isupper():
                return country
    return 'Unknown'

def parse_cycle1_working_group():
    """Parse Cycle 1 recommendations from A/HRC/14/15"""
    recs = []
    filepath = 'docs/cycle1/extracted/g1012049.txt'
    
    if not os.path.exists(filepath):
        print(f"Warning: {filepath} not found")
        return recs
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find the recommendations section (after "111. The recommendations")
    start_marker = "111. The recommendations formulated"
    end_marker = "112. All conclusions"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("Warning: Could not find recommendation section markers in cycle 1")
        return recs
    
    rec_section = content[start_idx:end_idx]
    
    # Parse numbered recommendations
    # Pattern: number followed by period and text
    lines = rec_section.split('\n')
    current_rec_num = None
    current_text = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check for new recommendation number
        match = re.match(r'^(\d+)\.\s+(.+)', line)
        if match:
            # Save previous recommendation
            if current_rec_num and current_text:
                country = extract_country(current_text)
                theme = classify_theme(current_text)
                ministry = classify_ministry(current_text, theme)
                recs.append({
                    'id': f'111.{current_rec_num}',
                    'cycle': 1,
                    'country': country,
                    'theme': theme,
                    'text': current_text.strip()[:600],
                    'status': 'accepted',
                    'ministry': ministry
                })
            
            current_rec_num = int(match.group(1))
            current_text = match.group(2)
        elif current_rec_num:
            # Continue previous recommendation
            current_text += ' ' + line
    
    # Don't forget last recommendation
    if current_rec_num and current_text:
        country = extract_country(current_text)
        theme = classify_theme(current_text)
        ministry = classify_ministry(current_text, theme)
        recs.append({
            'id': f'111.{current_rec_num}',
            'cycle': 1,
            'country': country,
            'theme': theme,
            'text': current_text.strip()[:600],
            'status': 'accepted',
            'ministry': ministry
        })
    
    return recs

def parse_thematic_list(filepath, cycle, prefix_pattern):
    """Parse thematic list files for cycles 2, 3, 4"""
    recs = []
    
    if not os.path.exists(filepath):
        print(f"Warning: {filepath} not found")
        return recs
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        match = re.match(rf'^({prefix_pattern}\.\d+)\s+(.+)', line)
        if match:
            rec_id = match.group(1)
            text = match.group(2)
            country = extract_country(text)
            theme = classify_theme(text)
            ministry = classify_ministry(text, theme)
            status = 'pending' if cycle == 4 else 'supported'
            
            recs.append({
                'id': rec_id,
                'cycle': cycle,
                'country': country,
                'theme': theme,
                'text': text[:600],
                'status': status,
                'ministry': ministry
            })
    
    return recs

def generate_js_file(all_recs):
    """Generate the JavaScript recommendations file"""
    
    # Count by cycle
    by_cycle = {}
    for r in all_recs:
        c = r['cycle']
        by_cycle[c] = by_cycle.get(c, 0) + 1
    
    # Count by theme
    by_theme = {}
    for r in all_recs:
        t = r['theme']
        by_theme[t] = by_theme.get(t, 0) + 1
    
    # Count by country
    by_country = {}
    for r in all_recs:
        c = r['country']
        by_country[c] = by_country.get(c, 0) + 1
    
    # Count by ministry
    by_ministry = {}
    for r in all_recs:
        m = r['ministry']
        by_ministry[m] = by_ministry.get(m, 0) + 1
    
    js_content = f'''/**
 * Complete UPR Recommendations Database - Slovenia
 * Auto-generated from original UN documents
 * 
 * Cycles: 1 (2010), 2 (2014), 3 (2019), 4 (2025)
 * Total: {len(all_recs)} recommendations
 * 
 * By Cycle: C1={by_cycle.get(1,0)}, C2={by_cycle.get(2,0)}, C3={by_cycle.get(3,0)}, C4={by_cycle.get(4,0)}
 */

const FULL_RECOMMENDATIONS = [
'''
    
    for rec in all_recs:
        text_escaped = rec['text'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '')
        country_escaped = rec['country'].replace('"', '\\"')
        js_content += f'    {{ id: "{rec["id"]}", cycle: {rec["cycle"]}, country: "{country_escaped}", theme: "{rec["theme"]}", text: "{text_escaped}", status: "{rec["status"]}", ministry: "{rec["ministry"]}" }},\n'
    
    js_content += '''];

// Make available globally
if (typeof window !== 'undefined') {
    window.FULL_RECOMMENDATIONS = FULL_RECOMMENDATIONS;
}

// Utility functions for live data computation
function computeStatsByTheme() {
    const stats = {};
    FULL_RECOMMENDATIONS.forEach(r => {
        if (!stats[r.theme]) {
            stats[r.theme] = { total: 0, byCycle: {1: 0, 2: 0, 3: 0, 4: 0} };
        }
        stats[r.theme].total++;
        stats[r.theme].byCycle[r.cycle]++;
    });
    return stats;
}

function computeStatsByCountry() {
    const stats = {};
    FULL_RECOMMENDATIONS.forEach(r => {
        stats[r.country] = (stats[r.country] || 0) + 1;
    });
    return stats;
}

function computeStatsByMinistry() {
    const stats = {};
    FULL_RECOMMENDATIONS.forEach(r => {
        if (!stats[r.ministry]) {
            stats[r.ministry] = { total: 0, byCycle: {1: 0, 2: 0, 3: 0, 4: 0}, byTheme: {} };
        }
        stats[r.ministry].total++;
        stats[r.ministry].byCycle[r.cycle]++;
        stats[r.ministry].byTheme[r.theme] = (stats[r.ministry].byTheme[r.theme] || 0) + 1;
    });
    return stats;
}

function computeStatsByCycle() {
    const stats = {1: 0, 2: 0, 3: 0, 4: 0};
    FULL_RECOMMENDATIONS.forEach(r => {
        stats[r.cycle]++;
    });
    return stats;
}

function getTopCountries(limit = 20) {
    const stats = computeStatsByCountry();
    return Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([country, count]) => ({ country, count }));
}

function getAllCountries() {
    const stats = computeStatsByCountry();
    return Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .map(([country, count]) => ({ country, count }));
}

function getThemeStats() {
    return computeStatsByTheme();
}

function getMinistryStats() {
    return computeStatsByMinistry();
}

// Export functions
if (typeof window !== 'undefined') {
    window.computeStatsByTheme = computeStatsByTheme;
    window.computeStatsByCountry = computeStatsByCountry;
    window.computeStatsByMinistry = computeStatsByMinistry;
    window.computeStatsByCycle = computeStatsByCycle;
    window.getTopCountries = getTopCountries;
    window.getAllCountries = getAllCountries;
    window.getThemeStats = getThemeStats;
    window.getMinistryStats = getMinistryStats;
}

console.log('Loaded', FULL_RECOMMENDATIONS.length, 'recommendations from original UN documents');
'''
    
    return js_content

def main():
    print("=" * 60)
    print("Building Complete UPR Recommendations Database")
    print("=" * 60)
    
    all_recs = []
    
    # Cycle 1 - Working Group Report A/HRC/14/15
    print("\n[1/4] Parsing Cycle 1 (A/HRC/14/15)...")
    c1_recs = parse_cycle1_working_group()
    print(f"      Found {len(c1_recs)} recommendations")
    all_recs.extend(c1_recs)
    
    # Cycle 2 - Thematic List
    print("\n[2/4] Parsing Cycle 2 (Thematic List)...")
    c2_recs = parse_thematic_list(
        'docs/cycle2/extracted/UPR20__Slovenia_ThematicListRecommendations_E.txt',
        2, r'11[56]'
    )
    print(f"      Found {len(c2_recs)} recommendations")
    all_recs.extend(c2_recs)
    
    # Cycle 3 - Thematic List
    print("\n[3/4] Parsing Cycle 3 (Thematic List)...")
    c3_recs = parse_thematic_list(
        'docs/cycle3/extracted/UPR34_Slovenia_Thematic_list_of_Recommendations.txt',
        3, r'12[12]'
    )
    print(f"      Found {len(c3_recs)} recommendations")
    all_recs.extend(c3_recs)
    
    # Cycle 4 - Thematic List
    print("\n[4/4] Parsing Cycle 4 (Thematic List)...")
    c4_recs = parse_thematic_list(
        'docs/cycle4/extracted/upr48-slovenia-thematic-list-of-recommendatio.txt',
        4, r'140'
    )
    print(f"      Found {len(c4_recs)} recommendations")
    all_recs.extend(c4_recs)
    
    print("\n" + "=" * 60)
    print(f"TOTAL: {len(all_recs)} recommendations")
    print("=" * 60)
    
    # Generate JS file
    js_content = generate_js_file(all_recs)
    
    output_path = 'js/recommendations-full.js'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\nGenerated: {output_path}")
    print(f"File size: {len(js_content):,} bytes")
    
    # Print summary stats
    print("\n--- Theme Distribution ---")
    theme_counts = {}
    for r in all_recs:
        theme_counts[r['theme']] = theme_counts.get(r['theme'], 0) + 1
    for theme, count in sorted(theme_counts.items(), key=lambda x: -x[1]):
        print(f"  {theme}: {count}")
    
    print("\n--- Top 15 Countries ---")
    country_counts = {}
    for r in all_recs:
        country_counts[r['country']] = country_counts.get(r['country'], 0) + 1
    for country, count in sorted(country_counts.items(), key=lambda x: -x[1])[:15]:
        print(f"  {country}: {count}")

if __name__ == '__main__':
    main()
