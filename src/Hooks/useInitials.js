// hooks/useInitials.js
const useInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    // Single word - first two letters
    return words[0].slice(0, 2).toUpperCase();
  }

  // Multiple words - first letter of first two words
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default useInitials;
