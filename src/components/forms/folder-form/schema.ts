import { z } from 'zod'

export const folderSchema = z.object({
  name: z.string().min(1, { message: 'Folder name cannot be empty' }),
})