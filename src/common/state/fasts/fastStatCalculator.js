const calculateStats = fasts => {
  const result = {
    shortest: null,
    longest: null,
    average: null,
  };
  let totalTime = 0,
    completedFasts = fasts.filter(f => (f.duration || 0) > 0);
  const completedFastCount = completedFasts.length;
  for (let i = 0; i < completedFastCount; i++) {
    const fast = completedFasts[i],
      duration = fast.duration;
    totalTime += duration;
    if (result.shortest == null || duration < result.shortest)
      result.shortest = duration;
    if (result.longest == null || duration > result.longest)
      result.longest = duration;
  }
  if (completedFastCount > 0) result.average = totalTime / completedFastCount;
  return result;
};

export default calculateStats;
