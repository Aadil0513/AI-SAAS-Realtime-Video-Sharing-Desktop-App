import { moveVideoSchema } from '@/components/forms/change-video-location/schema'
import { getWorkspaceFolders, getWorkSpaces, moveVideoLocation } from '@/actions/workspace'
import { useMutationData } from '@/hooks/useMutationData'
import { useQueryData } from '@/hooks/useQueryData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useMoveVideos = (videoId: string, currentWorkSpaceId: string) => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<z.infer<typeof moveVideoSchema>>({
    resolver: zodResolver(moveVideoSchema),
    defaultValues: {
      workspace_id: currentWorkSpaceId,
    },
  })

  const watchedWorkspaceId = watch('workspace_id')

  // Fetch workspaces
  const { data: workspacesData } = useQueryData(['user-workspaces'], getWorkSpaces)
  const workspaces = (workspacesData as any)?.data?.workspace || []

  // Fetch folders for selected workspace
  const { data: foldersData, isFetching } = useQueryData(
    ['workspace-folders', watchedWorkspaceId],
    () => getWorkspaceFolders(watchedWorkspaceId),
    !!watchedWorkspaceId
  )

  const isFolders = (foldersData as any)?.data || []

  // Fetch folders for current workspace (to map folders)
  const { data: currentWorkspaceFolders } = useQueryData(
    ['workspace-folders', currentWorkSpaceId],
    () => getWorkspaceFolders(currentWorkSpaceId),
    !!currentWorkSpaceId
  )
  const folders = (currentWorkspaceFolders as any)?.data || []

  // Mutation to move video
  const { mutate, isPending } = useMutationData(
    ['move-video'],
    (data: { workspace_id: string; folder_id?: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.folder_id || null),
    'user-videos'
  )

  const onFormSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  }
}
