import { nanoid } from 'nanoid';

/**
 * The id will be a nanoId (A tiny, secure, URL-friendly, unique string ID generator for JavaScript).
 *
 * This strategy will avoid id collisions contrary to the previous one using numbers.
 *
 * see https://www.npmjs.com/package/nanoid
 */
export const generateId = () => {
  return nanoid();
}
