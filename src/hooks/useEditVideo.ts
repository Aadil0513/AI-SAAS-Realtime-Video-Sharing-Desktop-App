import { editVideoInfoSchema } from '@/components/forms/edit-video/schema'
import { updateVideoInfo } from '@/actions/workspace'
import { useMutationData } from '@/hooks/useMutationData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useEditVideo = (
  videoId: string,
  title: string,
  description: string
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof editVideoInfoSchema>>({
    resolver: zodResolver(editVideoInfoSchema),
    defaultValues: {
      title,
      description,
    },
  })

  const { mutate, isPending } = useMutationData(
    ['edit-video'],
    (data: { title: string; description: string }) =>
      updateVideoInfo(videoId, data.title, data.description),
    'preview-video'
  )

  const onFormSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return { register, handleSubmit, errors, isPending, onFormSubmit }
}
