import first from 'lodash/first';
import parseInt from 'lodash/parseInt';
import split from 'lodash/split';

export const sanitiseLeaderboardItem = (members: string, checkins: string, badges: string, agons: string) => {
  const rawName = first(split(members, '<'));
  const rawNameTokens = split(rawName, ' ');
  const name = rawNameTokens.length === 2 ? `${rawNameTokens[1]}, ${rawNameTokens[0]}` : rawName;
  return { name, checkins: parseInt(checkins), badges, agons };
};
