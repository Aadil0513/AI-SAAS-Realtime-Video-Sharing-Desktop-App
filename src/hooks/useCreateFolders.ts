import { createFolder } from '@/actions/workspace'
import { useMutationData } from './useMutationData'
import useZodForm from './useZodForm'
import { folderSchema } from '@/components/forms/folder-form/schema'

export const useCreateFolder = (workspaceId: string) => {
  const { mutate, isPending } = useMutationData(
    ['create-folder'],
    (data: { name: string }) => createFolder(workspaceId, data.name),
    'workspace-folders' // Query key jise refresh (invalidate) karna hai
  )

  const { errors, onFormSubmit, register } = useZodForm(folderSchema, mutate)
  
  return { errors, onFormSubmit, register, isPending }
}