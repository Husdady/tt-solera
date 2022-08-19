// React
import React from 'react'

// Types
import {
  ValueType,
  ValuesType,
  ErrorsType,
  UseFormProps,
  UseFormReturnType,
  ExtraDataType,
  SchemaRuleType,
  RunValidationSubmitType,
  RunValidationSchemaRulesType
} from '%types%/useForm.type'

// Hook
import useMounted from './useMounted'
import useLanguages from './useLanguages'

// Utils
import Helper from '@utils/Helper'
import Validations from '@utils/Validations'

export default function useForm({
  onSubmit,
  initialValues,
  validationSchema,
  validateOnChange = true
}: UseFormProps): UseFormReturnType {
  const { lang, dictionary } = useLanguages()
  const [errors, setErrors] = React.useState<ErrorsType>({})
  const [values, setValues] = React.useState<ValuesType>(initialValues)
  const [isValidForm, setValidForm] = React.useState<boolean>(false)
  const [formHasBeenEdited, setFormHasBeenEdited] =
    React.useState<boolean>(false)

  // Obtenemos las propiedades y sus valores del esquema
  const schema = React.useMemo(() => {
    return {
      values: Object.values(validationSchema),
      fields: Object.getOwnPropertyNames(validationSchema)
    }
  }, [])

  // Validar las reglas del esquema
  const runValidationSchemaRules = React.useCallback(
    ({ field, value, currentLang }: RunValidationSchemaRulesType) => {
      // Obtener un valor de una regla del esquema (required, min, max, etc)
      const fieldRules =
        validationSchema[field as keyof typeof validationSchema]

      // Reglas del esquema
      const rules: SchemaRuleType = {
        value: value,
        field: field,
        ...fieldRules
      }

      // Validar campos del esquema
      const schemaErrors = Validations.validateSchemaRules({
        rules: rules,
        lang: currentLang
      })

      // Retornar errores encontrados en un campo
      return schemaErrors
    },
    []
  )

  // Validar errores en los campos del esquema
  const runValidationErrors = React.useCallback(
    (field: string, newErrors: ErrorsType) => {
      // Si no existen errores, limpiar errores
      if (Validations.isEmptyObject(newErrors)) {
        const checkEmptyErrors = (currentErrors: ErrorsType) => {
          return (
            Validations.isEmptyObject(newErrors) &&
            Validations.isEmptyObject(currentErrors)
          )
        }

        return setErrors((currentState) => {
          const withOutErrors = checkEmptyErrors(currentState)
          if (withOutErrors) return currentState

          const copyErrors = Helper.copyObject(currentState)
          delete copyErrors[field]
          return copyErrors
        })
      }

      // Setear errores
      return setErrors((currentErrors) => ({
        ...currentErrors,
        ...newErrors
      }))
    },
    [lang]
  )

  // Setear un campo
  const setFieldValue = React.useCallback(
    (field: string, value: ValueType) => {
      // Si no está habilitada la función "validateOnChange", finalizar función
      if (!validateOnChange) return false

      // Si el formulario no ha sido editado
      if (!formHasBeenEdited) {
        setFormHasBeenEdited(true)
      }

      // Obtener errores de la validación del esquema
      const newErrors = runValidationSchemaRules({
        field: field,
        value: value,
        currentLang: lang
      })

      // Validar errores
      runValidationErrors(field, newErrors)

      // Actualizar estado
      setValues((currentState) => ({
        ...currentState,
        [field]: value
      }))
    },
    [lang]
  )

  // Setear múltiples campos
  const multipleSetField = React.useCallback(
    (fields: ValuesType) => {
      // Si no es un objeto el parámetro 'fields'
      if (!Validations.isObject(fields)) return false

      // Setear estado del formulario a "editado"
      setFormHasBeenEdited(true)

      const keys = Object.keys(fields)

      keys.forEach((key) => {
        // Obtener errores de la validación del esquema
        const newErrors = runValidationSchemaRules({
          field: key,
          value: fields[key],
          currentLang: lang
        })

        // Validar errores
        runValidationErrors(key, newErrors)
      })

      // Setear nuevos campos
      setValues((currentState) => ({ ...currentState, ...fields }))
    },
    [lang]
  )

  // Validar todos los campos
  const runValidateAllFields = React.useCallback(
    (formValues: ValuesType) => {
      return schema.values.reduce((acc: ErrorsType, _: unknown, i: number) => {
        // Obtener cada campo del esquema
        const field = schema.fields[i]

        // Validar reglas del esquema
        const newErrors = runValidationSchemaRules({
          field: field,
          currentLang: lang,
          value: formValues[field]
        })
        return { ...acc, ...newErrors }
      }, {})
    },
    [lang]
  )

  // Ejecutar validación en el evento 'onSubmit' del formulario para saber si existen errores
  const runValidationSubmit = React.useCallback(
    ({ formValues, schemaErrors, extraData = {} }: RunValidationSubmitType) => {
      // Setear errores
      setErrors(schemaErrors)

      // Si no existen errores en el formulario
      if (Validations.isEmptyObject(schemaErrors)) {
        // Setear formulario válido
        setValidForm(true)
        setFormHasBeenEdited(true)

        // Setear datos adiciobnales a 'extraData'
        Object.assign(extraData, {
          setFormStatus: setFormHasBeenEdited,
          formHasBeenEdited: formHasBeenEdited
        })

        // Ejecutar evento onSubmit
        if (Validations.isFunction(onSubmit)) {
          onSubmit({
            values: formValues,
            resetForm: resetForm,
            extraData: extraData,
            setErrors: setErrors
          })
        }
      }
    },
    []
  )

  // Método que se ejecuta cuando el formulario es válido
  const handleSubmit = React.useCallback(
    (extraData: ExtraDataType = {}) => {
      return (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Validations.isEmptyArray(schema.fields)) return false
        const schemaErrors = runValidateAllFields(values)

        // Validar evento submit
        return runValidationSubmit({
          formValues: values,
          extraData: extraData,
          schemaErrors: schemaErrors
        })
      }
    },
    [values]
  )

  // Verificar si es formulario válido
  const verifyIfIsValidForm = React.useCallback(() => {
    // Recorrer las propiedades del esquema, retornar true si el formulario tiene valores válidos y false cuando tiene información vacía
    const formHaveValues: boolean = Object.keys(validationSchema).every(
      (property) => values[property]
    )

    setValidForm((currentState) => {
      return (
        Validations.isEmptyObject(errors) && formHaveValues && !currentState
      )
    })
  }, [])

  // Actualizar un error cuando el lenguaje se actualiza
  const updateErrorLang = React.useCallback((currentLang: string) => {
    setErrors((currentState) => {
      const copyErrors: ErrorsType = Helper.copyObject(currentState)
      const errorKeys = Object.keys(copyErrors)

      for (const errorKey of errorKeys) {
        const schemaErrors = runValidationSchemaRules({
          field: errorKey,
          value: values[errorKey],
          currentLang: currentLang
        })

        copyErrors[errorKey] = schemaErrors[errorKey]
      }

      return copyErrors
    })
  }, [])

  // Resetear formulario
  const resetForm = React.useCallback(() => {
    setErrors({})
    setValidForm(false)
    setFormHasBeenEdited(false)
    setValues(initialValues)
  }, [])

  useMounted(() => {
    verifyIfIsValidForm()
  }, [])

  useMounted(() => {
    updateErrorLang(lang)
  }, [lang])

  return {
    values: values,
    errors: errors,
    setErrors: setErrors,
    setFieldValue: setFieldValue,
    multipleSetField: multipleSetField,
    handleSubmit: handleSubmit,
    resetForm: resetForm,
    isValidForm: isValidForm,
    formHasBeenEdited: formHasBeenEdited,
    language: lang,
    dictionary: dictionary
  }
}
