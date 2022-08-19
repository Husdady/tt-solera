// Hooks
import useLocalStorage from '@hooks/useLocalStorage'

// Utils
import { DEFAULT_SERVICE } from '@utils/statics'

const initialState = {
  id: '',
  serviceName: '',
  serviceDescription: '',
  serviceCategories: [] as string[]
}

export default function useService() {
  const [service, setService] = useLocalStorage(DEFAULT_SERVICE, initialState)

  return {
    service: service,
    setService: setService
  }
}
