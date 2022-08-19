// React
import React from 'react'

// Components
import Button from '@components/Button'

// Hooks
import useLanguages from '@hooks/useLanguages'

// Interfaces
import { ServiceCardProps } from '@interfaces/ServiceCard.interface'

// Utils
import Helper from '@utils/Helper'

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  onEditService,
  onDeleteService
}: ServiceCardProps) => {
  const { lang, dictionary } = useLanguages()
  const serviceName =
    typeof name === 'string' ? name : name[lang as keyof typeof name]

  return (
    <article className="service">
      <div className="service-wrapper">
        <h1 className="service-name">{serviceName}</h1>
        <p className="service-description">
          {Helper.truncate(description, 60)}
        </p>
      </div>

      <div className="service-actions">
        <Button
          icon="edit"
          className="edit"
          backgroundColor="#c7d34b"
          onAction={onEditService}
          title={dictionary['service-edit-op192d']}
        />

        <Button
          icon="trash-alt"
          className="delete"
          backgroundColor="#d34b4b"
          onAction={onDeleteService}
          title={dictionary['service-delete-op192d']}
        />
      </div>
    </article>
  )
}

export default React.memo(ServiceCard)
