const calculateStats = fasts => {
  const result = {
    shortest: null,
    longest: null,
    average: null,
  };
  let totalTime = 0,
    fastLength = fasts.length;
  for (let i = 0; i < fastLength; i++) {
    const fast = fasts[i];
    totalTime += fast.duration || 0;
    if (result.shortest == null || fast.duration < result.shortest)
      result.shortest = fast.duration;
    if (result.longest == null || fast.duration > result.longest)
      result.longest = fast.duration;
  }
  if (fastLength > 0) result.average = totalTime / fastLength;
  return result;
};

export default calculateStats;
