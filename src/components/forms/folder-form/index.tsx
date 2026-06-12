'use client'

import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useCreateFolder } from '@/hooks/useCreateFolders'
import React from 'react'

type Props = {
  workspaceId: string
}

const FolderForm = ({ workspaceId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useCreateFolder(workspaceId)
  
  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col gap-y-3"
    >
      <FormGenerator
        register={register}
        name="name"
        placeholder={'Folder Name'}
        label="Name"
        errors={errors}
        inputType="input"
        type="text"
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Folder</Loader>
      </Button>
    </form>
  )
}

export default FolderForm
