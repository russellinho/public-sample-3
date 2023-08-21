/**
 * Used for TailwindCSS
 */
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Returns a string of form "abc...xyz"
 * @param {string} text string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisText = (text: string, n: number = 6): string => {
  if (!text) return "";

  return `${text.slice(0, n)}..${text.slice(text.length - n)}`;
};
