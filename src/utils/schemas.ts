// Types
import { ValidationSchemaType } from '%types%/useForm.type'

export const ServiceFormSchema: ValidationSchemaType = {
  serviceName: {
    required: {
      es: 'Por favor ingresa el nombre del servicio',
      en: 'Please enter the name of the service'
    },
    min: {
      limit: 8,
      message: (limit: number) => ({
        es: `El nombre del servicio debe tener ${limit} carácteres como mínimo`,
        en: `The service name must have at least ${limit} characters`
      })
    },
    max: {
      limit: 30,
      message: (limit: number) => ({
        es: `El nombre del servicio ha superado el límite de ${limit} carácteres como máximo`,
        en: `The name of the service has exceeded the limit of ${limit} characters at most`
      })
    }
  },
  serviceDescription: {
    required: {
      es: 'Por favor ingresa la descripción del servicio',
      en: 'Please enter the description of the service'
    },
    min: {
      limit: 100,
      message: (limit: number) => ({
        es: `La descripción del servicio debe tener ${limit} carácteres como mínimo`,
        en: `The service description must have at least ${limit} characters`
      })
    },
    max: {
      limit: 300,
      message: (limit: number) => ({
        es: `La descripción debe tener ${limit} carácteres como máximo`,
        en: `The description must have ${limit} characters at most`
      })
    }
  }
}
