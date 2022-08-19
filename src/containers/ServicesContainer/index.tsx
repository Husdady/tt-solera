// React
import React from 'react'

// Components
import ServiceCard from '@components/ServiceCard'

// Hooks
import useService from '@hooks/useService'
import useServices from '@hooks/useServices'
import useLanguages from '@hooks/useLanguages'

// Interfaces
import { ServicesContainerProps } from '@interfaces/ServicesContainer.interface'

// Types
import { ServiceType } from '%types%/services.type'

const ServicesContainer: React.FC<ServicesContainerProps> = ({
  activeCategory
}: ServicesContainerProps) => {
  const { lang, dictionary } = useLanguages()
  const { service, setService } = useService()
  const { services, filteredServices, updateServices } =
    useServices(activeCategory)

  // Edit service
  const handleEdit = React.useCallback(
    (serviceId: string, serviceItem: ServiceType) => {
      return () => {
        if (serviceId === serviceItem.id) return false
        const { name } = serviceItem
        const serviceName =
          typeof name === 'string' ? name : name[lang as keyof typeof name]
        setService({
          id: serviceItem.id,
          serviceName: serviceName,
          serviceDescription: serviceItem.description,
          serviceCategories: serviceItem.categories
        })

        document.getElementById('service-name')?.focus()
      }
    },
    [lang]
  )

  // Delete service
  const handleDelete = React.useCallback(
    (serviceItem: ServiceType) => {
      return () => {
        const { name } = serviceItem
        const serviceName =
          typeof name === 'string' ? name : name[lang as keyof typeof name]

        const accept = window.confirm(`${dictionary.f0a7o2} "${serviceName}"?`)

        if (!accept) return false

        // Filter services without current service id
        const filterServices = services.filter(
          (service: ServiceType) => service.id !== serviceItem.id
        )

        updateServices(filterServices)
      }
    },
    [services]
  )

  return (
    <div className="services">
      {filteredServices.map((filteredService: ServiceType) => (
        <ServiceCard
          key={filteredService.id}
          onDeleteService={handleDelete(filteredService)}
          onEditService={handleEdit(service.id, filteredService)}
          {...filteredService}
        />
      ))}
    </div>
  )
}

export default React.memo(ServicesContainer)
