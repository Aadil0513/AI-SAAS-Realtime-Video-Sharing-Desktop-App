import { createCommentSchema } from '@/components/forms/comment-form/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'

export const useVideoComment = (videoId: string, commentId?: string) => {
  const [isPending, setIsPending] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      comment: '',
    },
  })

  const onFormSubmit = handleSubmit(async (data) => {
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast('Success', {
        description: 'Comment submitted (mocked)',
      })
      reset()
    }, 500)
  })

  return { register, errors, isPending, onFormSubmit }
}
