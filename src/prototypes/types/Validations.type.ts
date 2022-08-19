// Types
import { SchemaRuleType } from './useForm.type'

export type IsLessThanType = {
  min: number
  value: string
}

export type IsGreatherThanType = {
  max: number
  min: number
  value: string
}

export type ValidateSchemaRulesType = {
  lang: string
  rules: SchemaRuleType
}
