import { createFolder } from '@/actions/workspace'
import { useMutationData } from '@/hooks/useMutationData'

export const useCreateFolders = (workspaceId: string) => {
  const { mutate, isPending } = useMutationData(
    ['create-folder'],
    () => createFolder(workspaceId),
    'workspace-folders'
  )

  const onCreateNewFolder = () => {
    mutate({ name: 'Untitled Folder', id: 'optimistic' })
  }

  return { onCreateNewFolder, isPending }
}
