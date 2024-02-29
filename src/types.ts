export type Id = string | number

export type Column = {
  id: Id
  title: string
}

export type Card = {
  id: Id
  title: string
  description: string
  srcImage: string
  imageCovered: boolean
  columnId: Id
}

export type ActiveCard = Card & { columnId: Id }
