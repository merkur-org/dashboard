import React, { useEffect, useState, useCallback, useRef } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'

import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogProps
} from '@material-ui/core'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropModalProps extends DialogProps {
  open: boolean
  onClose(): void
  onSave(): void
}

interface ImageCropProps {
  selectedImage: File
  onSave({ file: File, preview: string }): void
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
  open,
  onClose,
  onSave,
  children
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Arraste para selecionar a região da foto</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => onSave()} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const PIXEL_RATIO = 4
const ImageCrop: React.FC<ImageCropProps> = ({ selectedImage, onSave }) => {
  const [crop, setCrop] = useState<Crop>({
    height: 352,
    width: 440,
    x: 0,
    y: 0,
    unit: 'px'
  })

  const [src, setSrc] = useState('')
  const [completedCrop, setCompletedCrop] = useState(crop)
  const [openModal, setOpenModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [croppedFile, setCroppedFile] = useState<File>()

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result + ''))
      reader.readAsDataURL(selectedImage)

      setOpenModal(true)
    }
  }, [selectedImage])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * PIXEL_RATIO
    canvas.height = crop.height * PIXEL_RATIO

    ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    canvas.toBlob(blob => {
      const previewUrl = URL.createObjectURL(blob)
      const newFile = new File([blob], selectedImage.name)

      setPreview(previewUrl)
      setCroppedFile(newFile)
    }, 'image/jpg')
  }, [completedCrop])

  return (
    <>
      <ImageCropModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={() => {
          onSave({ file: croppedFile, preview })
          setOpenModal(false)
        }}
      >
        <ReactCrop
          src={src}
          crop={crop}
          locked
          onChange={(crop, percentCrop) => setCrop(percentCrop)}
          onComplete={c => setCompletedCrop(c)}
          onImageLoaded={onLoad}
        />
      </ImageCropModal>

      <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
    </>
  )
}

export default ImageCrop
