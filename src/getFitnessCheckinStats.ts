import cheerio from 'cheerio';
import { getPage } from './getPage';

export const getFitnessCheckinStats = async (cookie: string, username: string) => {
  const html = await getPage(`https://strenuouslife.co/members/${username}/checkins/`, cookie);
  const $html = cheerio.load(html);
  const tableRows = $html('tbody tr');
  let daysEnrolled = 0;
  let daysComplete = 0;
  for (let i = 0; i < tableRows.length; i++) {
    const cells = tableRows.eq(i).children('td');
    daysEnrolled++;
    if (cells.eq(1).html() === 'Yes') {
      daysComplete++;
    }
  }

  return { daysEnrolled, daysComplete };
};
