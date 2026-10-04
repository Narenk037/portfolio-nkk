/**
 * Calculates total experience years automatically from an array of experience objects with period strings.
 * E.g., period: "10/2024 – Present" or "06/2024 – 10/2024"
 */
export const calculateTotalExperienceYears = (experienceArray = []) => {
  if (!experienceArray || experienceArray.length === 0) return "1.5+";

  let totalMonths = 0;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed

  const parseMonthYear = (str) => {
    if (!str) return null;
    const clean = str.trim().toLowerCase();
    if (clean.includes('present') || clean.includes('current') || clean.includes('now')) {
      return { month: currentMonth, year: currentYear };
    }
    
    // Format MM/YYYY, MM-YYYY, MM.YYYY
    const mmYyyy = clean.match(/(\d{1,2})[\/\-\.](\d{4})/);
    if (mmYyyy) {
      const month = Math.min(12, Math.max(1, parseInt(mmYyyy[1], 10)));
      const year = parseInt(mmYyyy[2], 10);
      return { month, year };
    }

    // Format YYYY
    const yyyy = clean.match(/(\d{4})/);
    if (yyyy) {
      return { month: 1, year: parseInt(yyyy[1], 10) };
    }

    return null;
  };

  experienceArray.forEach((exp) => {
    if (!exp.period) return;
    const parts = exp.period.split(/[\–\—\-]| to /i);
    if (parts.length >= 1) {
      const start = parseMonthYear(parts[0]);
      const end = parts.length > 1 ? parseMonthYear(parts[1]) : { month: currentMonth, year: currentYear };

      if (start && end) {
        const startTotalMonths = start.year * 12 + (start.month - 1);
        const endTotalMonths = end.year * 12 + (end.month - 1);
        const diff = endTotalMonths - startTotalMonths;
        if (diff > 0) {
          totalMonths += diff;
        }
      }
    }
  });

  if (totalMonths <= 0) return "1.5+";
  const years = (totalMonths / 12).toFixed(1);
  return `${years}+`;
};
