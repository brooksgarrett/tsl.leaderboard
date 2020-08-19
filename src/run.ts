import * as fs from 'fs';
import { minify } from 'html-minifier';
import template from 'lodash/template';
import * as path from 'path';
import { getAllStats } from './getAllStats';
import { getClassSummary } from './getClassSummary';
import { getLeaderboard } from './getLeaderboard';
import { indexTemplate } from './indexTemplate';

export const run = async () => {
  const data = {
    leaderboard: null,
    class: null,
  };
  const cookie = process.env.TSL_COOKIE;
  const leaderboard = await getLeaderboard(cookie);
  data.leaderboard = await getAllStats(cookie, leaderboard);
  data.class = await getClassSummary(cookie, data.leaderboard);
  if (process.env.SAVE_RAW_DATA != undefined) {
    fs.writeFileSync(path.resolve(__dirname, '..', 'data.json'), JSON.stringify(data));
  }
  const compiled = template(indexTemplate);
  const htmlRaw = compiled({ data });
  const minified = minify(htmlRaw, { minifyCSS: true, collapseWhitespace: true });
  fs.writeFileSync(path.resolve(__dirname, '..', 'new.html'), minified);
};
