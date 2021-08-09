import React from 'react'
import { TitleProps } from 'ra-ui-materialui'
import { Record } from 'react-admin'

interface CrudTitleProps extends TitleProps {
  contentWithRecord?: (record: Record) => string
  content?: string
}

const CrudTitle: React.FC<CrudTitleProps> = ({
  content,
  record,
  contentWithRecord
}) => {
  return <span>{contentWithRecord ? contentWithRecord(record) : content}</span>
}

export default CrudTitle
