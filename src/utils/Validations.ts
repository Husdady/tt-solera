// Types
import { ErrorsType, GetMessageLimitRuleType } from '%types%/useForm.type'
import {
  IsLessThanType,
  IsGreatherThanType,
  ValidateSchemaRulesType
} from '%types%/Validations.type'

export default class Validations {
  /**
   * Comprobar si es un string vacío
   * @param {str: string}
   * @return {boolean}
   */
  static isEmptyString(str: string): boolean {
    return str.length === 0
  }

  /**
   * Comprobar si es un arreglo vacío
   * @param {arr: unknown[]}
   * @return {boolean}
   */
  static isEmptyArray(arr: unknown[]): boolean {
    return arr.length === 0
  }

  /**
   * Comprobar si es un objeto
   * @param {obj: Object}
   * @return {boolean}
   */
  static isObject(obj: Object): boolean {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
  }

  /**
   * Comprobar si es un objeto vacío
   * @param {obj: Object}
   * @return {boolean}
   */
  static isEmptyObject(obj: Object): boolean {
    return Validations.isObject(obj) && Object.keys(obj).length === 0
  }

  /**
   * Comprobar si es una función
   * @param {func: Function}
   * @return {boolean}
   */
  static isFunction(func: Function): boolean {
    return func && {}.toString.call(func) === '[object Function]'
  }

  /**
   * Comprobar si el valor es menor al mínimo establecido
   * @param {min: number, value: IsLessThanType}
   * @return {boolean}
   */
  static isLessThan({ min, value }: IsLessThanType): boolean {
    return value.length < min
  }

  /**
   * Comprobar si el valor es menor al mínimo establecido
   * @param {max: number, value: Object}
   * @return {boolean}
   */
  static isGreaterThan({ max, min, value }: IsGreatherThanType): boolean {
    return value.length > min && value.length > max
  }

  /**
   * Comprobar si es un correo electrónico válido
   * @param {email: string}
   * @return {boolean}
   */
  static isEmail(email: string): boolean {
    const verifyEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (verifyEmail.test(email)) return true

    return false
  }

  /**
   * Validar reglas del esquema, comprobando si es un campo de formulario válido
   * @param {rules: SchemaRuleType}
   * @return {string}
   */
  static getMessageLimitRule({
    lang,
    limit,
    message
  }: GetMessageLimitRuleType) {
    if (typeof message === 'string') {
      return message
    }

    if (typeof message === 'function') {
      const result = message(limit)

      if (typeof result === 'object' && 'es' in result && 'en' in result) {
        return result[lang as keyof typeof message]
      }

      return result
    }

    if (typeof message === 'object' && 'es' in message && 'en' in message) {
      return message[lang as keyof typeof message]
    }

    return ''
  }

  /**
   * Validar reglas del esquema, comprobando si es un campo de formulario válido
   * @param {rules: SchemaRuleType}
   * @return {boolean}
   */
  static validateSchemaRules({
    lang,
    rules
  }: ValidateSchemaRulesType): ErrorsType {
    // Errores de la validación
    const errors: ErrorsType = {}
    const { field, value, required, message, isEmail, min, max } = rules
    const valueStr = typeof value === 'string'

    // Comprobar si 'required' es de tipo string y no existe un valor
    if (typeof required === 'string' && !value) {
      errors[field] = required
      return errors
    }

    // Comprobar si 'required' tiene las propiedades 'es' y 'en' y no existe un valor
    if (
      typeof required === 'object' &&
      'es' in required &&
      'en' in required &&
      !value
    ) {
      const msg: string = required[lang as keyof typeof required]
      errors[field] = msg
      return errors
    }

    // Comprobar si existe la propiedad 'isEmail'
    if (typeof isEmail === 'boolean') {
      // Comprobar si es un email no válido
      if (valueStr && !Validations.isEmail(value)) {
        // Propiedad 'message' es un string
        if (typeof message === 'string') {
          errors[field] = message
          return errors
        }

        // Propiedad 'message' es un objeto
        if (
          typeof message === 'object' &&
          'es' in message &&
          'en' in message &&
          valueStr
        ) {
          const msg: string = message[lang as keyof typeof required]
          errors[field] = msg
          return errors
        }
      }
    }

    // Comprobar si existe la propiedad 'min'
    if (typeof min === 'object' && 'limit' in min && 'message' in min) {
      // Validar regla 'min' del esquema
      const minValidation = Validations.isLessThan({
        min: min.limit,
        value: valueStr ? value : ''
      })

      if (minValidation) {
        const minRule = {
          message: '',
          limit: min.limit
        }

        // Obtener el mensaje de la regla 'min'
        const message = Validations.getMessageLimitRule({
          ...min,
          lang: lang
        })

        minRule.message = message
        errors[field] = minRule.message
      }
    }

    // Comprobar si existe la propiedad 'max'
    if (typeof max === 'object' && 'limit' in max && 'message' in max) {
      // Validar regla 'max' del esquema
      const maxValidation = Validations.isGreaterThan({
        max: max.limit,
        min: typeof min === 'object' ? min.limit : 0,
        value: valueStr ? value : ''
      })

      if (!maxValidation) return errors

      const maxRule = {
        message: '',
        limit: max.limit
      }

      // Obtener el mensaje de la regla 'max'
      const message = Validations.getMessageLimitRule({
        ...max,
        lang: lang
      })

      maxRule.message = message
      errors[field] = maxRule.message
    }

    return errors
  }
}
