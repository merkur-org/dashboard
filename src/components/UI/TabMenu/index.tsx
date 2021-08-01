import { useEffect, useCallback, ChangeEvent } from 'react'

import TabsButton from '../../../components/UI/TabsButton'

import { TabContainer } from './styles'

interface ButtonProps {
  name: string
  label: string
  isSelected: boolean
  setIsSelected(select: boolean): void
}

interface ButtonsProps {
  buttons: ButtonProps[]
}

const TabMenu: React.FC<ButtonsProps> = ({ buttons }) => {
  useEffect(() => {
    const hasOneSelected = buttons.find(button => button.isSelected === true)

    if (!hasOneSelected) {
      buttons[0].setIsSelected(true)
    }
  }, [buttons])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    buttons.forEach(button => button.setIsSelected(false))
    const selectedOne = buttons.find(
      button => button.name === event.target.name
    )
    if (selectedOne) selectedOne.setIsSelected(true)
  }, [])

  return (
    <TabContainer>
      {buttons.map(button => (
        <TabsButton
          key={button.name}
          setIsSelected={button.setIsSelected}
          isSelected={button.isSelected}
          name={button.name}
          label={button.label}
          onChange={handleChange}
        />
      ))}
    </TabContainer>
  )
}

export default TabMenu
