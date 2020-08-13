import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import split from 'lodash/split';
import trim from 'lodash/trim';
import { getFitnessCheckinStats } from './getFitnessCheckinStats';
import { getGoodDeedCheckinStats } from './getGoodDeedCheckinStats';
import { members } from './members';

export const formatDecimal = (value = 0) => (value ?? 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const getAllStats = async (cookie: string, leaderboard: any) => {
  // const promises = map(
  //   members,
  //   ({ firstName, lastName, memberProfileUrl }) =>
  //     new Promise((resolve, reject) => {
  //       const getStats = async () => {
  //         const { badges, agons } = find(leaderboard, ({ name }) => name === `${lastName}, ${firstName}`) ?? { badges: 0, agons: 0 };
  //         const username = split(memberProfileUrl, '/')[4];
  //         const goodDeeds = await getGoodDeedCheckinStats(cookie, username);
  //         const fitness = await getFitnessCheckinStats(cookie, username);
  //         const daysEnrolled = Math.max(goodDeeds.daysEnrolled, fitness.daysEnrolled);
  //         const goodDeedCheckins = goodDeeds.daysComplete;
  //         const goodDeedPercentage = formatDecimal((goodDeedCheckins / daysEnrolled) * 100);
  //         const fitnessCheckins = fitness.daysComplete;
  //         const fitnessPercentage = formatDecimal((fitnessCheckins / daysEnrolled) * 100);
  //         return { firstName, lastName, username, memberProfileUrl, daysEnrolled, badges, agons, goodDeedCheckins, goodDeedPercentage, fitnessCheckins, fitnessPercentage };
  //       };
  //       getStats().then((stats) => resolve(stats)).catch(err => reject(err));
  //     })
  // );

  // const stats = await Promise.all(promises);

  const stats = [];
  for (let i = 0; i < members.length; i++) {
    console.log(`getting stats for member ${i + 1} of ${members.length}`);
    const { firstName, lastName, memberProfileUrl } = members[i];
    const { badges, agons } = find(leaderboard, ({ name }) => name === trim(`${firstName ?? ''} ${lastName ?? ''}`)) ?? { badges: -1, agons: -1 };
    const username = split(memberProfileUrl, '/')[4];
    const goodDeeds = await getGoodDeedCheckinStats(cookie, username);
    const fitness = await getFitnessCheckinStats(cookie, username);
    const daysEnrolled = Math.max(goodDeeds.daysEnrolled, fitness.daysEnrolled);
    const goodDeedCheckins = goodDeeds.daysComplete;
    const goodDeedPercentage = formatDecimal((goodDeedCheckins / daysEnrolled) * 100);
    const fitnessCheckins = fitness.daysComplete;
    const fitnessPercentage = formatDecimal((fitnessCheckins / daysEnrolled) * 100);
    stats.push({
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
    });
  }

  return orderBy(stats, ['lastName', 'firstName']);
};
