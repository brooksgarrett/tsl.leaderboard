import * as fs from 'fs';
import { minify } from 'html-minifier';
import template from 'lodash/template';
import * as path from 'path';
import { getLeaderboard } from './getLeaderboard';
import { indexTemplate } from './indexTemplate';

const run = async () => {
  const cookie = process.env.TSL_COOKIE;
  const data = await getLeaderboard(cookie);
  const compiled = template(indexTemplate);
  const htmlRaw = compiled({ data });
  const minified = minify(htmlRaw, { minifyCSS: true, collapseWhitespace: true });
  fs.writeFileSync(path.resolve(__dirname, '..', 'index.html'), minified);
};

run();
