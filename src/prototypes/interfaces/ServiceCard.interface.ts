// Types
import { MultiLangType } from '%types%/useForm.type'

export interface ServiceCardProps {
  id: string
  name: string | MultiLangType
  description: string
  onEditService: (event: React.MouseEvent<HTMLButtonElement>) => void
  onDeleteService: (event: React.MouseEvent<HTMLButtonElement>) => void
}
