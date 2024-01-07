export type Id = string | number

export type Column = {
  id: Id
  title: string
  cards: Card[]
}

export type Card = {
  id: Id
  title: string
  description: string
  srcImage: string
  imageCovered: boolean
}

export type ActiveCard = Card & { columnId: Id }
