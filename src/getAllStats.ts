import find from 'lodash/find';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import split from 'lodash/split';
import { getFitnessCheckinStats } from './getFitnessCheckinStats';
import { getGoodDeedCheckinStats } from './getGoodDeedCheckinStats';
import { members } from './members';

export const formatDecimal = (value = 0) => (value ?? 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const getAllStats = async (cookie: string, leaderboard: any) => {
  const promises = map(
    members,
    ({ firstName, lastName, memberProfileUrl }) =>
      new Promise((resolve) => {
        const getStats = async () => {
          const { badges, agons } = find(leaderboard, ({ name }) => name === `${lastName}, ${firstName}`) ?? { badges: 0, agons: 0 };
          const username = split(memberProfileUrl, '/')[4];
          const goodDeeds = await getGoodDeedCheckinStats(cookie, username);
          const fitness = await getFitnessCheckinStats(cookie, username);
          const daysEnrolled = Math.max(goodDeeds.daysEnrolled, fitness.daysEnrolled);
          const goodDeedCheckins = goodDeeds.daysComplete;
          const goodDeedPercentage = formatDecimal((goodDeedCheckins / daysEnrolled) * 100);
          const fitnessCheckins = fitness.daysComplete;
          const fitnessPercentage = formatDecimal((fitnessCheckins / daysEnrolled) * 100);
          return { firstName, lastName, username, daysEnrolled, badges, agons, goodDeedCheckins, goodDeedPercentage, fitnessCheckins, fitnessPercentage };
        };
        getStats().then((stats) => resolve(stats));
      })
  );

  const stats = await Promise.all(promises);
  return orderBy(stats, ['lastName', 'firstName']);
};
