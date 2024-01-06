import { describe, expect, it } from 'vitest'

import { createColumn } from '../../utils/createColumn'

describe('create new column', () => {
  it.each([
    { columnNumber: 2, expectedTitle: 'Column 2', expectedId: 834 },
    { columnNumber: 1, expectedTitle: 'Column 1', expectedId: 834 },
    { columnNumber: -5, expectedTitle: 'Column -5', expectedId: 834 },
    { columnNumber: 2.4, expectedTitle: 'Column 2.4', expectedId: 834 }
  ])(
    'createColumn("$columnNumber") -> $expectedTitle, $expectedId',
    ({ columnNumber, expectedTitle }) => {
      const column = createColumn(columnNumber)
      expect(column.title).toBe(expectedTitle)
      expect(typeof column.id).toBe('string')
      // This id is a UUID randomly generated using crypto. Its length is 36.
      expect(column.id.toString().length).toBeLessThanOrEqual(36)
    }
  )
})
