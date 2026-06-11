import { workspaceSchema } from '@/components/forms/workspace-form/schema'
import { createWorkspace } from '@/actions/workspace'
import { useMutationData } from '@/hooks/useMutationData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useCreateWorkspace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResol ver(workspaceSchema),
    defaultValues: {
      name: '',
    },
  })  

  const { mutate, isPending } = useMutationData(
    ['create-workspace'],
    (data: { name: string }) => createWorkspace(data.name),
    'user-workspaces',
    () => reset()
  )

  const onFormSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return { errors, isPending, onFormSubmit, register }
}
