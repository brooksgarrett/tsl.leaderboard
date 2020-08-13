import fetch from 'node-fetch';

export const getPage = async (url: string, cookie: string) => {
  const response = await fetch(url, { headers: { cookie } });
  const html = await response.text();
  return html;
};
