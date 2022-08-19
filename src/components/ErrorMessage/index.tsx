// React
import React from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Interfaces
import { ErrorMessageProps } from '@interfaces/ErrorMessage.interface'

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  color,
  style
}: ErrorMessageProps) => {
  return (
    <div style={style} className="error-message">
      {/* Error icon */}
      <FontAwesomeIcon
        color={color}
        className="me-1"
        icon="exclamation-circle"
      />

      {/* Error message */}
      <span style={{ color: color }}>{title}</span>
    </div>
  )
}

export default React.memo(ErrorMessage)

export function renderError(
  extraProps: ErrorMessageProps
): null | React.ReactNode {
  if (!extraProps.title) return null
  return <ErrorMessage {...extraProps} />
}
