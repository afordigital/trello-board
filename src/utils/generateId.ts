import {ulid} from "ulid";

/**
 * The id will be a ULID(Universally unique Lexicographically sortable IDentifiers).
 *
 * This strategy will avoid id collisions contrary to the previous one using numbers.
 *
 * see https://victoryosayi.medium.com/ulid-universally-unique-lexicographically-sortable-identifier-d75c253bc6a8
 * see https://blog.bitsrc.io/ulid-vs-uuid-sortable-random-id-generators-for-javascript-183400ef862c
 */
export const generateId = () => {
  return ulid();
}
