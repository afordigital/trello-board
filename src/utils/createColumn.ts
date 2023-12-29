export const createColumn = (length: number) => {
  return {
    id: generateId(),
    title: `Column ${length}`
  }
}

const generateId = () => {
  return Math.floor(Math.random() * 10001)
}
