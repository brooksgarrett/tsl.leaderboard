import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import fetch from 'node-fetch';

export const getLeaderboard = async (cookie: string) => {
  const url = 'https://strenuouslife.co/wp-admin/admin-ajax.php';
  const contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  const referer = 'https://strenuouslife.co/groups/class-052/leaderboard/';
  const headers = { 'content-type': contentType, referer, cookie };
  const body = 'start=1&length=200&action=leaderboard_paging';
  const response = await fetch(url, { method: 'POST', headers, body });
  const text = await response.text();
  const json = JSON.parse(text);
  const data = map(json.data, ({ members, checkins, badges, challenges }) => ({ name: members, checkins: parseInt(checkins), badges, agons: challenges }));
  return orderBy(data, ['name']);
};
