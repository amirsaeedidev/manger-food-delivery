/**
 * General helper functions.
 */

// Makes Persian text comparable for searching: the Arabic letters "ي" and "ك" become the Persian
// "ی" and "ک", and the zero-width non-joiner, diacritics, extra spaces and letter case are dropped.
export const normalizeFa = (text) =>
  String(text || '')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u200c\u064b-\u065f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
