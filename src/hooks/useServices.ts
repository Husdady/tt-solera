// React
import React from 'react'

// Hooks
import useLocalStorage from '@hooks/useLocalStorage'

// Types
import { ServiceType } from '%types%/services.type'
import { CategoryType } from '%types%/categories.type'
import { UseServicesType } from '%types%/useServices.type'

// Utils
import { SERVICES } from '@utils/statics'
import Validations from '@utils/Validations'

const defaultServices: ServiceType[] = require('@data/services.json')
const allCategories: CategoryType[] = require('@data/categories.json')

export default function useServices(activeCategory: string): UseServicesType {
  const [services, setServices] = useLocalStorage(SERVICES, defaultServices)

  const result: UseServicesType = {
    services: services,
    filteredServices: [],
    updateServices: setServices
  }

  if (activeCategory === allCategories[0].id) {
    result.filteredServices = services
  } else {
    const filterServices: ServiceType[] = services.filter(
      (serviceCard: ServiceType) =>
        serviceCard.categories.indexOf(activeCategory) !== -1
    )

    const isEmptyServices = Validations.isEmptyArray(filterServices)

    if (!isEmptyServices) {
      result.filteredServices = filterServices
    }
  }

  return result
}
