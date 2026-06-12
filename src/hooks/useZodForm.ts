// import { UseMutateFunction } from '@tanstack/react-query'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import z, { ZodSchema } from 'zod'

// const useZodForm = (
//   schema: ZodSchema,
//   mutation: UseMutateFunction,
//   defaultValues?: any
// ) => {
//   const {
//     register,
//     watch,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues: { ...defaultValues },
//   })

//   const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }))

//   return { register, watch, reset, onFormSubmit, errors }
// }
// export default useZodForm


import { UseMutateFunction } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, DefaultValues } from 'react-hook-form'
import z from 'zod'

// Any Zod object wrapper ko handle karne ke liye direct type extraction
const useZodForm = <T extends ReturnType<typeof z.object>>(
  schema: T,
  mutation: UseMutateFunction<any, any, z.infer<T>, any>,
  defaultValues?: DefaultValues<z.infer<T>>
) => {
  type FormTypes = z.infer<T>

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as any, // Dono side safe rakhne ke liye
  })

  const onFormSubmit = handleSubmit((values) => {
    mutation(values as FormTypes)
  })

  return { register, watch, reset, onFormSubmit, errors }
}

export default useZodForm