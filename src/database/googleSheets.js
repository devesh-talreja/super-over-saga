const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export async function saveScore(name, score, onFetched) {
  try {
    if (!SCRIPT_URL || SCRIPT_URL === 'REPLACE_ME') throw new Error('No Google Sheets URL configured');
    
    // We send Content-Type: text/plain to bypass the CORS Preflight (OPTIONS) request,
    // which Google Apps Script does not support natively for application/json.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ name: name.toUpperCase().slice(0, 8), score }),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
    
    // Refresh leaderboard after saving
    const fresh = await getLeaderboard();
    if (onFetched) onFetched(fresh);
  } catch (e) {
    console.warn('saveScore failed, falling back to localStorage:', e.message);
    const local = JSON.parse(localStorage.getItem('super_over_scores') || '[]');
    local.push({ id: Date.now().toString(), name: name.toUpperCase().slice(0, 8), score });
    local.sort((a, b) => b.score - a.score);
    const sliced = local.slice(0, 10);
    localStorage.setItem('super_over_scores', JSON.stringify(sliced));
    if (onFetched) onFetched(sliced);
  }
}

export async function getLeaderboard() {
  try {
    if (!SCRIPT_URL || SCRIPT_URL === 'REPLACE_ME') throw new Error('No Google Sheets URL configured');
    const res = await fetch(SCRIPT_URL);
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('getLeaderboard failed, falling back to localStorage:', e.message);
    return JSON.parse(localStorage.getItem('super_over_scores') || '[]');
  }
}
