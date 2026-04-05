// strings.js — String utilities

export function words(str) { return str.replace(/([a-z])([A-Z])/g, '$1 $2').match(/[a-zA-Z0-9]+/g) || []; }
export function camelCase(str) { return words(str).map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''); }
export function snakeCase(str) { return words(str).map(w => w.toLowerCase()).join('_'); }
export function kebabCase(str) { return words(str).map(w => w.toLowerCase()).join('-'); }
export function titleCase(str) { return words(str).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' '); }
export function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
export function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
export function truncate(str, maxLen, suffix = '...') { if (str.length <= maxLen) return str; return str.slice(0, maxLen - suffix.length) + suffix; }
export function padStart(str, len, ch = ' ') { while (str.length < len) str = ch + str; return str; }
export function padEnd(str, len, ch = ' ') { while (str.length < len) str += ch; return str; }
export function padCenter(str, len, ch = ' ') { const pad = len - str.length; const left = Math.floor(pad / 2); return ch.repeat(left) + str + ch.repeat(pad - left); }
export function repeat(str, n) { let r = ''; for (let i = 0; i < n; i++) r += str; return r; }
export function reverse(str) { return [...str].reverse().join(''); }
export function isPalindrome(str) { const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ''); return cleaned === reverse(cleaned); }
export function wordWrap(str, width) { const words_ = str.split(' '); const lines = []; let line = ''; for (const w of words_) { if (line && (line + ' ' + w).length > width) { lines.push(line); line = w; } else { line = line ? line + ' ' + w : w; } } if (line) lines.push(line); return lines.join('\n'); }
export function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
export function unescapeHtml(str) { return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"); }
export function template(str, data) { return str.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? ''); }
export function countOccurrences(str, sub) { let count = 0, pos = 0; while ((pos = str.indexOf(sub, pos)) !== -1) { count++; pos += sub.length; } return count; }
export function pluralize(word, count) { if (count === 1) return word; if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z') || word.endsWith('ch') || word.endsWith('sh')) return word + 'es'; if (word.endsWith('y') && !/[aeiou]y$/.test(word)) return word.slice(0, -1) + 'ies'; return word + 's'; }
export function similarity(a, b) { if (a === b) return 1; const longer = a.length > b.length ? a : b; if (longer.length === 0) return 1; const shorter = a.length > b.length ? b : a; return (longer.length - editDistance(longer, shorter)) / longer.length; }
function editDistance(a, b) { const m = a.length, n = b.length; const dp = Array.from({ length: m + 1 }, (_, i) => i); for (let j = 1; j <= n; j++) { let prev = dp[0]; dp[0] = j; for (let i = 1; i <= m; i++) { const tmp = dp[i]; dp[i] = a[i-1] === b[j-1] ? prev : Math.min(prev, dp[i-1], dp[i]) + 1; prev = tmp; } } return dp[m]; }
