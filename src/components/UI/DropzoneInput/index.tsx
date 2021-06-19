import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Field } from 'react-final-form'

import { RootRef } from '@material-ui/core'

import { DropzoneContainer } from './styles'

import ImageCrop from '../ImageCrop'

const DropzoneInput: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState<File>()
  const [preview, setPreview] = useState('')
  const [percent, setPercent] = useState(0)
  const [downloadUri, setDownloadUri] = useState()
  const [selectedImageFile, setSelectedImageFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileDropped = acceptedFiles[0]

    if (fileDropped['type'].split('/')[0] === 'image') {
      setSelectedImageFile(fileDropped)
      return
    }

    setFile(fileDropped)
  }, [])

  const onCropSave = ({ file, preview }) => {
    setPreview(preview)
    setFile(file)

    console.log(preview)
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop
  })

  const { ref, ...rootProps } = getRootProps()

  return (
    <>
      <RootRef rootRef={ref}>
        <DropzoneContainer {...rootProps} elevation={0}>
          <label>
            <input {...getInputProps} type="file" />
          </label>
          {file && (
            <img onLoad={() => URL.revokeObjectURL(preview)} src={preview} />
          )}
          <p>Clique ou arraste a foto do produto</p>
        </DropzoneContainer>
      </RootRef>
      <ImageCrop onSave={onCropSave} selectedImage={selectedImageFile} />
    </>
  )
}

export default DropzoneInput
