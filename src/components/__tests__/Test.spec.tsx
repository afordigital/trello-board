import { describe, expect, it } from 'vitest'

const isTitleValid = (title: string) => {
  return title.trim().length > 3 // Added trim to handle whitespace
}

describe('Is title valid', () => {
  it.each([
    { title: '', expected: false },
    { title: '      ', expected: false },
    { title: 'a', expected: false },
    { title: 'ab', expected: false },
    { title: 'abc', expected: false },
    { title: 'abcd', expected: true }
  ])('isTitleValid("$title") -> $expected', ({ title, expected }) => {
    expect(isTitleValid(title)).toBe(expected)
  })
})
