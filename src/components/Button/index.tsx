// React
import React from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Hooks
import Helper from '@utils/Helper'

// Interfaces
import { ButtonProps } from '@interfaces/Button.interface'

const Button: React.FC<ButtonProps> = ({
  type,
  icon,
  title,
  style,
  className,
  attributes,
  backgroundColor,
  onAction
}: ButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    ...style,
    backgroundColor: backgroundColor
  }

  const buttonClassName = Helper.classnames(['btn cursor-pointer', className])

  // Renderizar ícono del botón
  const Icon = React.useCallback(() => {
    if (typeof icon === 'undefined') {
      return null
    }

    if (
      (typeof icon === 'object' && 'name' in icon) ||
      (typeof icon === 'object' && 'size' in icon) ||
      (typeof icon === 'object' && 'color' in icon)
    ) {
      return (
        <FontAwesomeIcon size={icon.size} icon={icon.name} color={icon.color} />
      )
    }

    return <FontAwesomeIcon icon={icon} />
  }, [icon])

  // Renderizar contenido del botón
  const Content = React.useCallback(() => {
    return (
      <React.Fragment>
        {/* Ícono del botón */}
        <Icon />

        {/* Titulo del botón */}
        <span>{title}</span>
      </React.Fragment>
    )
  }, [icon, title])

  return (
    <button
      type={type}
      onClick={onAction}
      className={buttonClassName}
      style={buttonStyle}
      {...attributes}
    >
      <Content />
    </button>
  )
}

export default React.memo(Button)
