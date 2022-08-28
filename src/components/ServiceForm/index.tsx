// React
import React from 'react'

// Components
import Button from '@components/Button'
import MultiLangText from '@components/MultiLangText'
import { renderError } from '@components/ErrorMessage'

// Librarys
import { v4 as uuidv4 } from 'uuid'
import Select, { StylesConfig } from 'react-select'

// Hooks
import useForm from '@hooks/useForm'
import useService from '@hooks/useService'
import useServices from '@hooks/useServices'
import useMounted from '@hooks/useMounted'

// Types
import { ServiceType } from '%types%/services.type'
import { CategoryType } from '%types%/categories.type'
import { FormDataType, ValuesType } from '%types%/useForm.type'

// Interfaces
import { OptionType, ServiceFormProps } from '@interfaces/ServiceForm.interface'

// Utils
import Helper from '@utils/Helper'
import { ServiceFormSchema } from '@utils/schemas'

const categories: CategoryType[] = require('@data/categories.json')

// Define style for Select options
const styles: StylesConfig<any, true> = {
  multiValue: (base) => {
    return { ...base, justifyContent: 'space-between' }
  }
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  activeCategory
}: ServiceFormProps) => {
  const { service } = useService()
  const { services, updateServices } = useServices(activeCategory)
  const {
    values,
    setFieldValue,
    multipleSetField,
    errors,
    handleSubmit,
    resetForm,
    language,
    dictionary
  } = useForm({
    validationSchema: ServiceFormSchema,
    initialValues: {
      isNew: true,
      serviceName: '',
      serviceDescription: '',
      serviceCategories: []
    },
    onSubmit: (formData: FormDataType) => {
      const { values, extraData } = formData

      // Define the new Service
      const newService: ServiceType = {
        id: extraData.serviceId as string, // Service id
        name: values.serviceName as string, // Service name
        description: values.serviceDescription as string, // Service description
        categories: values.serviceCategories as string[] // Service categories
      }

      // Add new service when save changes
      if (Array.isArray(extraData.currentServices)) {
        // Check if Service already exists
        const serviceAlreadyExists = extraData.currentServices.some(
          (currentService: ServiceType) => {
            return currentService.id === extraData.serviceId
          }
        )

        // Service exists and Its do not in mode 'isNew', update current service
        if (serviceAlreadyExists && !values.isNew) {
          // Get service index
          const i = extraData.currentServices.findIndex(
            (currentService: ServiceType) => {
              return currentService.id === extraData.serviceId // Filter by id
            }
          )

          // Create Service copy without reference
          const copyServices =
            extraData.currentServices.slice() as ServiceType[]
          copyServices[i] = newService // Update Service
          updateServices(copyServices)
          return false
        }

        newService.id = uuidv4() // Define new id to Service and update
        updateServices([...extraData.currentServices, newService])
        formData.resetForm() // Reset form values
      }
    }
  })

  // Select Options
  const options = React.useMemo(() => {
    return categories
      .map((category) => ({
        value: category.id,
        label:
          typeof category.name === 'string'
            ? category.name
            : category.name[language as keyof typeof category.name] // Get name by lang
      }))
      .filter((category) => category.value !== categories[0].id) // Exclude 'All' category
  }, [language])

  // Event 'click' on Save button, Update form field
  const handleChangeField = React.useCallback(
    (field: string) => {
      return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue(field, e.target.value)
      }
    },
    [language]
  )

  // Event 'onChange' on Select componete, Update Service categories
  const handleAddCategory = React.useCallback((options: unknown) => {
    if (Array.isArray(options)) {
      const ctgs = options.map((option: OptionType) => option.value)
      setFieldValue('serviceCategories', ctgs)
    }
  }, [])

  // Event 'click' on Cancel button, Clean form
  const handleCancel = React.useCallback((values: ValuesType) => {
    return () => {
      const { serviceName, serviceDescription } = values
      if (serviceName === '' && serviceDescription === '') return false
      resetForm()
      setFieldValue('isNew', true)
    }
  }, [])

  // Update form values when click on Edit button
  useMounted(() => {
    if (service.id !== '') {
      multipleSetField({
        isNew: false,
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        serviceCategories: service.serviceCategories
      })
    }
  }, [service.id])

  return (
    <form
      className="service-form"
      onSubmit={handleSubmit({
        serviceId: service.id,
        currentServices: services
      })}
    >
      <div className="wrapper">
        <h1>
          <MultiLangText dictionaryKey="form-dk12s7" />
        </h1>

        <div className="field-name">
          <h3>
            <MultiLangText dictionaryKey="form-dk12s8" />
          </h3>
          <input
            type="text"
            id="service-name"
            className="w-100"
            onChange={handleChangeField('serviceName')}
            value={
              typeof values.serviceName === 'string' ? values.serviceName : ''
            }
          />

          {/* Render error in 'serviceName' field */}
          {renderError({ title: errors.serviceName })}
        </div>

        <div className="field-description">
          <h3>
            <MultiLangText dictionaryKey="form-dk12s9" />
          </h3>
          <textarea
            rows={8}
            className="w-100"
            onChange={handleChangeField('serviceDescription')}
            value={
              typeof values.serviceDescription === 'string'
                ? values.serviceDescription
                : ''
            }
          />

          {/* Render error in 'serviceDescription' field */}
          {renderError({ title: errors.serviceDescription })}
        </div>

        <div className="field-categories">
          <h3>
            <MultiLangText dictionaryKey="form-dk12s6" />:
          </h3>
          <Select
            isMulti
            styles={styles}
            options={options}
            closeMenuOnSelect={false}
            className="select-categories"
            placeholder={`${dictionary['form-dk12s5']}...`}
            onChange={handleAddCategory}
            value={Helper.getSelectValues(
              language,
              values.serviceCategories as string[]
            )}
          />
        </div>
      </div>

      <div className="service-actions">
        <Button
          type="submit"
          icon="save"
          className="save"
          title={dictionary['form-dk12s3']}
        />

        <Button
          type="button"
          icon="power-off"
          className="cancel"
          onAction={handleCancel(values)}
          title={dictionary['form-dk12s4']}
        />
      </div>
    </form>
  )
}

export default React.memo(ServiceForm)
