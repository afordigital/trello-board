import { useContext } from "react"
import { KanbanContext } from "../../store/KanbanProvider"
import { Card } from "../../../types"
import { handleReaderResponse } from "../../../utils/handleReader"

export const useCard = (card: Card) => {
  const {  addCardImage,editCardTitle, editCardDescription, editCardIsCover, deleteCard } = useContext(KanbanContext)


  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, card.id)
  }

  const handleDescriptionChange = (newDescription: string) => {
    editCardDescription(newDescription, card.id)
  }

  const handleImgIsCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    editCardIsCover(e.target.checked, card.id)
  }

  const handleUploadImage = async (files: FileList) => {
    const file = files[0]

    if (file.size > 1000000) {
      alert('Image size is too big')
      return
    }

    const srcImg = await handleReaderResponse(file)

    if (srcImg) {
      if (!srcImg) return
      addCardImage(srcImg as string,card.id)
    } else {
      alert('Image type is not valid')
    }
  }


  const deleteImage = () => {
    if (card.srcImage === '') return
    addCardImage('', card.id)
  }
  const handleDeleteCard = () => {
    deleteCard(card.id)
  }

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleImgIsCover,
    deleteImage,
    handleUploadImage,
    handleDeleteCard,
  }
}