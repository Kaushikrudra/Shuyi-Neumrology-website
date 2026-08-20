/**
 * Numerology Calculation Engine (Standard Pythagorean Method)
 * Supports Life Path, Expression (Destiny), and Soul Urge (Heart's Desire) calculations.
 * Preserves Master Numbers (11, 22, 33).
 */

export interface NumerologyMeaning {
  number: number;
  archetype: string;
  title: string;
  traits: string;
  description: string;
  icon: string;
}

export interface NumerologyResult {
  lifePath: {
    number: number;
    meaning: NumerologyMeaning;
  };
  expression: {
    number: number;
    meaning: NumerologyMeaning;
  };
  soulUrge: {
    number: number;
    meaning: NumerologyMeaning;
  };
}

// Standard Pythagorean Letter Values Chart (1 to 9)
const PYTHAGOREAN_LETTER_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// Master Numbers that should not be reduced further
const MASTER_NUMBERS = new Set([11, 22, 33]);

/**
 * Reduces a number to a single digit (1-9) or a master number (11, 22, 33).
 */
export function reduceNumber(num: number): number {
  if (num <= 0 || isNaN(num)) return 0;

  // Master numbers are preserved
  if (MASTER_NUMBERS.has(num)) {
    return num;
  }

  while (num > 9 && !MASTER_NUMBERS.has(num)) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }

  return num;
}

/**
 * Calculates the Life Path Number from a date of birth string (e.g. "YYYY-MM-DD").
 * Uses the traditional 3-component reduction method (Month + Day + Year).
 */
export function calculateLifePathNumber(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;

  // Extract clean year, month, day components
  const parts = dateOfBirth.split(/[-/.]/);

  if (parts.length === 3) {
    let year: number;
    let month: number;
    let day: number;

    // Handle both YYYY-MM-DD and MM-DD-YYYY / DD-MM-YYYY
    if (parts[0].length === 4) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return 0;
    }

    const reducedMonth = reduceNumber(month);
    const reducedDay = reduceNumber(day);
    const reducedYear = reduceNumber(year);

    return reduceNumber(reducedMonth + reducedDay + reducedYear);
  }

  // Fallback for single numeric strings: sum all numeric characters
  const digitsOnly = dateOfBirth.replace(/\D/g, '');
  if (!digitsOnly) return 0;

  const total = digitsOnly
    .split('')
    .reduce((sum, d) => sum + parseInt(d, 10), 0);

  return reduceNumber(total);
}

/**
 * Calculates the Expression (Destiny) Number from a full name.
 * Uses all alphabetic letters with Pythagorean numerical values.
 */
export function calculateExpressionNumber(fullName: string): number {
  if (!fullName) return 0;

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return 0;

  const totalSum = cleanName
    .split('')
    .reduce((sum, char) => sum + (PYTHAGOREAN_LETTER_VALUES[char] || 0), 0);

  return reduceNumber(totalSum);
}

/**
 * Calculates the Soul Urge (Heart's Desire) Number from a full name.
 * Uses only vowels (A, E, I, O, U) with Pythagorean numerical values.
 */
export function calculateSoulUrgeNumber(fullName: string): number {
  if (!fullName) return 0;

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) return 0;

  const vowelSum = cleanName
    .split('')
    .filter((char) => VOWELS.has(char))
    .reduce((sum, char) => sum + (PYTHAGOREAN_LETTER_VALUES[char] || 0), 0);

  return reduceNumber(vowelSum);
}

/**
 * Archetypal Meanings & Trait Descriptions Lookup Table.
 */
export const NUMEROLOGY_MEANINGS: Record<number, NumerologyMeaning> = {
  1: {
    number: 1,
    archetype: 'The Pioneer',
    title: 'Genesis & Initiative',
    traits: 'Independence, Leadership, Originality',
    description:
      'Carries the foundational energy of new beginnings, pioneering ambition, and self-determined leadership.',
    icon: '🎯',
  },
  2: {
    number: 2,
    archetype: 'The Peacemaker',
    title: 'Harmony & Partnership',
    traits: 'Diplomacy, Cooperation, Empathy',
    description:
      'Thrives in collaborative spaces, intuitive connection, and bringing balanced unity to differing perspectives.',
    icon: '🤝',
  },
  3: {
    number: 3,
    archetype: 'The Expresser',
    title: 'Creation & Inspiration',
    traits: 'Artistry, Optimism, Communication',
    description:
      'Radiates creative expression, charisma, and joyful communication that uplifts those around them.',
    icon: '🎨',
  },
  4: {
    number: 4,
    archetype: 'The Builder',
    title: 'Order & Foundation',
    traits: 'Stability, Discipline, Practicality',
    description:
      'Excels at grounded organization, persistent dedication, and transforming ideas into durable systems.',
    icon: '💎',
  },
  5: {
    number: 5,
    archetype: 'The Explorer',
    title: 'Freedom & Adventure',
    traits: 'Adaptability, Curiosity, Dynamic Evolution',
    description:
      'Energized by progressive change, diverse worldly experiences, and versatile intellectual agility.',
    icon: '🧭',
  },
  6: {
    number: 6,
    archetype: 'The Nurturer',
    title: 'Harmony & Care',
    traits: 'Compassion, Balance, Healing',
    description:
      'Embodies protective grace, selfless support, and creating harmonious, supportive environments for others.',
    icon: '🌿',
  },
  7: {
    number: 7,
    archetype: 'The Seeker',
    title: 'Wisdom & Introspection',
    traits: 'Wisdom, Truth & Intuition',
    description:
      'A deep analytical thinker and contemplative researcher drawn to spiritual mysteries and metaphysical insight.',
    icon: '🌍',
  },
  8: {
    number: 8,
    archetype: 'The Achiever',
    title: 'Infinity & Mastery',
    traits: 'Authority, Abundance, Strategic Focus',
    description:
      'Possesses commanding visionary focus, material mastery, and the ability to manifest grand accomplishments.',
    icon: '👑',
  },
  9: {
    number: 9,
    archetype: 'The Humanitarian',
    title: 'Universal Compassion',
    traits: 'Idealism, Generosity, Transformation',
    description:
      'Embraces the global perspective, unconditional kindness, and dedicated service to human elevation.',
    icon: '🌍',
  },
  11: {
    number: 11,
    archetype: 'The Master Intuitive',
    title: 'Illumination & Insight',
    traits: 'Spiritual Catalyst, Visionary Awareness',
    description:
      'A high-frequency Master Number bridging conscious awareness with extraordinary spiritual insight and empathy.',
    icon: '🔮',
  },
  22: {
    number: 22,
    archetype: 'The Master Architect',
    title: 'Visionary Manifestation',
    traits: 'Practical Genius, Grand Scale Impact',
    description:
      'A Master Number capable of converting grand spiritual ideals into tangible, world-changing structures.',
    icon: '✨',
  },
  33: {
    number: 33,
    archetype: 'The Master Teacher',
    title: 'Universal Upliftment',
    traits: 'Enlightened Guidance, Devotional Healing',
    description:
      'The highest vibrational Master Number of compassionate wisdom, universal love, and spiritual teaching.',
    icon: '✨',
  },
};

/**
 * Helper to retrieve meaning for a given number with safe fallback.
 */
export function getNumerologyMeaning(num: number): NumerologyMeaning {
  if (NUMEROLOGY_MEANINGS[num]) {
    return NUMEROLOGY_MEANINGS[num];
  }
  return {
    number: num,
    archetype: `Archetype ${num}`,
    title: 'Vibrational Blueprint',
    traits: 'Clarity, Potential, Resonance',
    description: 'Unique archetypal pattern reflecting personal energy and spiritual resonance.',
    icon: '✨',
  };
}

/**
 * Calculates all three numerology numbers and returns structured meanings.
 */
export function calculateFullProfile(fullName: string, dateOfBirth: string): NumerologyResult {
  const lpNum = calculateLifePathNumber(dateOfBirth);
  const expNum = calculateExpressionNumber(fullName);
  const soulNum = calculateSoulUrgeNumber(fullName);

  return {
    lifePath: {
      number: lpNum,
      meaning: getNumerologyMeaning(lpNum),
    },
    expression: {
      number: expNum,
      meaning: getNumerologyMeaning(expNum),
    },
    soulUrge: {
      number: soulNum,
      meaning: getNumerologyMeaning(soulNum),
    },
  };
}
