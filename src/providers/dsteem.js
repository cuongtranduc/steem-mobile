import { Client } from 'dsteem';
const client = new Client('https://api.steemit.com');

export function getPosts({tag, limit, category}) {
  return client.database.getDiscussions(category, {tag, limit, truncate_body: 1 });
}

export default client;