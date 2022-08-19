// Types
import { ServiceType } from './services.type'
import { SetValue } from './useLocalStorage.type'

export type UseServicesType = {
  services: ServiceType[]
  filteredServices: ServiceType[]
  updateServices: SetValue<any>
}
