import { describe, expect, it } from 'vitest'

import { createColumn } from '../../utils/createColumn'

describe('create new column', () => {
  it.each([
    { columnsNumber: 2, expectedTitle: 'Column 2', expectedId: 834 },
    { columnsNumber: 1, expectedTitle: 'Column 1', expectedId: 834 },
    { columnsNumber: -5, expectedTitle: 'Column -5', expectedId: 834 },
    { columnsNumber: 2.4, expectedTitle: 'Column 2.4', expectedId: 834 }
  ])(
    'createColumn("$columnsNumber") -> $expectedTitle, $expectedId',
    ({ columnsNumber, expectedTitle }) => {
      expect(createColumn(columnsNumber).title).toBe(expectedTitle)
      expect(typeof createColumn(columnsNumber).id).toBe('number')
      expect(createColumn(columnsNumber).id.toString().length).toBe(4)
    }
  )
})
