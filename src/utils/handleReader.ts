export const handleReader = (e: React.DragEvent<HTMLElement>, file: File) => {
  if (file?.type.match('image.*')) {
    return handleReaderResponse(file)
  }

  return file
}

export const handleReaderResponse = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = error => {
      reject(error)
    }
  })
}
