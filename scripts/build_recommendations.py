#!/usr/bin/env python3
"""
Build comprehensive recommendations-full.js from original UN documents
"""

import re
import json

# Theme mapping for classification
THEME_KEYWORDS = {
    'roma': ['roma', 'romsk', 'romani'],
    'izbrisani': ['erased', 'izbris', 'erasure', 'permanent resident'],
    'discrimination': ['discriminat', 'diskriminac', 'equality', 'enakost'],
    'hate_speech': ['hate speech', 'sovražni govor', 'racist', 'xenophob', 'hate crime'],
    'lgbti': ['lgbti', 'lgbt', 'same-sex', 'sexual orientation', 'gender identity', 'istospoln'],
    'gender': ['women', 'gender', 'žensk', 'domestic violence', 'nasilje nad žensk', 'gender-based'],
    'migration': ['migra', 'asylum', 'azil', 'refugee', 'begunec'],
    'disability': ['disabilit', 'invalid', 'persons with disabilities'],
    'children': ['child', 'otrok', 'minor', 'juvenile'],
    'trafficking': ['trafficking', 'trgovin'],
    'torture': ['torture', 'mučenj', 'prison', 'detention', 'zapor', 'ill-treatment'],
    'media': ['media', 'journalist', 'press', 'medij', 'novinar'],
    'nhri': ['ombudsman', 'varuh', 'nhri', 'national human rights institution'],
    'elderly': ['elder', 'older person', 'starejš', 'ageing'],
    'environment': ['environment', 'climate', 'okolj', 'podnebn']
}

# Ministry mapping
MINISTRY_KEYWORDS = {
    'mddsz': ['social', 'labour', 'family', 'child', 'women', 'gender', 'disability', 'roma', 'elder', 'lgbti'],
    'mnz': ['police', 'interior', 'migra', 'asylum', 'border', 'erased', 'izbris', 'residence'],
    'mp': ['justice', 'court', 'judicial', 'legal', 'prison', 'hate speech', 'discrimination law'],
    'mizs': ['education', 'school', 'izobražev'],
    'mz': ['health', 'zdravstv'],
    'mk': ['culture', 'media', 'cultural'],
    'mzez': ['foreign', 'international', 'treaty', 'convention', 'climate', 'environment']
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
    # First check specific keywords
    for ministry, keywords in MINISTRY_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                return ministry
    # Default based on theme
    theme_to_ministry = {
        'roma': 'mddsz', 'gender': 'mddsz', 'children': 'mddsz', 'disability': 'mddsz',
        'lgbti': 'mddsz', 'elderly': 'mddsz', 'trafficking': 'mnz',
        'migration': 'mnz', 'izbrisani': 'mnz',
        'hate_speech': 'mp', 'torture': 'mp', 'discrimination': 'mp',
        'nhri': 'mp', 'media': 'mk', 'environment': 'mzez'
    }
    return theme_to_ministry.get(theme, 'mddsz')

def extract_country(text):
    # Try to find country in parentheses at end
    match = re.search(r'\(([A-Za-z\s]+(?:of\s+[A-Za-z\s]+)?)\)\s*;?\s*$', text)
    if match:
        return match.group(1).strip()
    return 'Unknown'

def parse_cycle1():
    """Parse Cycle 1 (2010) recommendations from Working Group Report"""
    recs = []
    try:
        with open('docs/cycle1/extracted/g1012049.txt', 'r') as f:
            content = f.read()
        
        # Find recommendations section (paragraph 111)
        # Recommendations are numbered 1-98 in this document
        lines = content.split('\n')
        in_recs = False
        current_rec = ""
        rec_num = 0
        
        for line in lines:
            line = line.strip()
            if '111. The recommendations formulated' in line:
                in_recs = True
                continue
            if '112. All conclusions' in line:
                break
            if in_recs:
                # Check if new recommendation starts
                match = re.match(r'^(\d+)\.\s+(.+)', line)
                if match:
                    if current_rec and rec_num > 0:
                        country = extract_country(current_rec)
                        theme = classify_theme(current_rec)
                        ministry = classify_ministry(current_rec, theme)
                        recs.append({
                            'id': f'111.{rec_num}',
                            'cycle': 1,
                            'country': country,
                            'theme': theme,
                            'text': current_rec[:500],
                            'status': 'accepted',
                            'ministry': ministry
                        })
                    rec_num = int(match.group(1))
                    current_rec = match.group(2)
                elif current_rec:
                    current_rec += ' ' + line
        
        # Add last rec
        if current_rec and rec_num > 0:
            country = extract_country(current_rec)
            theme = classify_theme(current_rec)
            ministry = classify_ministry(current_rec, theme)
            recs.append({
                'id': f'111.{rec_num}',
                'cycle': 1,
                'country': country,
                'theme': theme,
                'text': current_rec[:500],
                'status': 'accepted',
                'ministry': ministry
            })
    except Exception as e:
        print(f"Error parsing cycle 1: {e}")
    
    return recs

def parse_thematic_list(filepath, cycle, rec_prefix):
    """Parse thematic list files for cycles 2, 3, 4"""
    recs = []
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Find all recommendations with pattern like 115.1, 122.1, 140.1
        pattern = rf'^({rec_prefix}\.\d+)\s+(.+?)$'
        
        lines = content.split('\n')
        for line in lines:
            match = re.match(pattern, line.strip())
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
                    'text': text[:500],
                    'status': status,
                    'ministry': ministry
                })
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
    
    return recs

def main():
    all_recs = []
    
    # Cycle 1
    print("Parsing Cycle 1...")
    c1_recs = parse_cycle1()
    print(f"  Found {len(c1_recs)} recommendations")
    all_recs.extend(c1_recs)
    
    # Cycle 2
    print("Parsing Cycle 2...")
    c2_recs = parse_thematic_list(
        'docs/cycle2/extracted/UPR20__Slovenia_ThematicListRecommendations_E.txt',
        2, '11[56]'
    )
    print(f"  Found {len(c2_recs)} recommendations")
    all_recs.extend(c2_recs)
    
    # Cycle 3
    print("Parsing Cycle 3...")
    c3_recs = parse_thematic_list(
        'docs/cycle3/extracted/UPR34_Slovenia_Thematic_list_of_Recommendations.txt',
        3, '12[12]'
    )
    print(f"  Found {len(c3_recs)} recommendations")
    all_recs.extend(c3_recs)
    
    # Cycle 4
    print("Parsing Cycle 4...")
    c4_recs = parse_thematic_list(
        'docs/cycle4/extracted/upr48-slovenia-thematic-list-of-recommendatio.txt',
        4, '140'
    )
    print(f"  Found {len(c4_recs)} recommendations")
    all_recs.extend(c4_recs)
    
    print(f"\nTotal: {len(all_recs)} recommendations")
    
    # Generate JavaScript file
    js_content = '''/**
 * Complete UPR Recommendations Database - Slovenia
 * All 4 Cycles: 2010, 2014, 2019, 2025
 * Auto-generated from original UN documents
 * Total: ''' + str(len(all_recs)) + ''' recommendations
 */

const FULL_RECOMMENDATIONS = [
'''
    
    for rec in all_recs:
        text_escaped = rec['text'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        js_content += f'''    {{ id: "{rec['id']}", cycle: {rec['cycle']}, country: "{rec['country']}", theme: "{rec['theme']}", text: "{text_escaped}", status: "{rec['status']}", ministry: "{rec['ministry']}" }},
'''
    
    js_content += '''];

// Export for browser
if (typeof window !== 'undefined') {
    window.FULL_RECOMMENDATIONS = FULL_RECOMMENDATIONS;
}

// Helper functions
function getRecommendationsByCycle(cycle) {
    return FULL_RECOMMENDATIONS.filter(r => r.cycle === cycle);
}

function getRecommendationsByTheme(theme) {
    return FULL_RECOMMENDATIONS.filter(r => r.theme === theme);
}

function getRecommendationsByCountry(country) {
    return FULL_RECOMMENDATIONS.filter(r => r.country.toLowerCase().includes(country.toLowerCase()));
}

function getRecommendationsByMinistry(ministry) {
    return FULL_RECOMMENDATIONS.filter(r => r.ministry === ministry);
}

function getRecommendationStats() {
    return {
        total: FULL_RECOMMENDATIONS.length,
        byCycle: {
            1: getRecommendationsByCycle(1).length,
            2: getRecommendationsByCycle(2).length,
            3: getRecommendationsByCycle(3).length,
            4: getRecommendationsByCycle(4).length
        }
    };
}

console.log('Loaded', FULL_RECOMMENDATIONS.length, 'recommendations');
'''
    
    with open('js/recommendations-full.js', 'w') as f:
        f.write(js_content)
    
    print(f"\nGenerated js/recommendations-full.js with {len(all_recs)} recommendations")

if __name__ == '__main__':
    main()
