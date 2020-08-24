export const getClassSummary = async (cookie: string, leaderboard: any) => {
  /* Object from stats
  {
    firstName,
    lastName,
    username,
    memberProfileUrl,
    daysEnrolled,
    badges,
    agons,
    goodDeedCheckins,
    goodDeedPercentage,
    fitnessCheckins,
    fitnessPercentage,
  }
  */
  const summaryStats = {
    badgesCount: 0,
    badgesPercentage: 0,
    agonsCount: 0,
    agonsPercentage: 0,
    deedsCount: 0,
    goodDeedPercentage: 0,
    fitnessCount: 0,
    fitnessPercentage: 0,
    passing: 0,
  };

  const blacklist = ['@ibrew4u', '@brettmckay', '@tntbuff', '@michael', '@brian-prahm'];

  for (const member of leaderboard) {
    if (blacklist.includes(member.username)) continue;
    summaryStats.badgesCount = member.badges > 0 ? summaryStats.badgesCount + 1 : summaryStats.badgesCount;
    summaryStats.agonsCount = member.agons > 6 ? summaryStats.agonsCount + 1 : summaryStats.agonsCount;
    summaryStats.deedsCount = member.goodDeedPercentage >= 75.0 ? summaryStats.deedsCount + 1 : summaryStats.deedsCount;
    summaryStats.fitnessCount = member.fitnessPercentage >= 75.0 ? summaryStats.fitnessCount + 1 : summaryStats.fitnessCount;
    if (member.badges > 0 && member.agons > 6 && member.goodDeedPercentage >= 75.0 && member.fitnessPercentage >= 75.0) summaryStats.passing++;
  }

  return summaryStats;
};
