'use client'
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone'
import { Button } from '@/components/ui/button'
import React from 'react'
import Modal from '../modal'
import FolderForm from '@/components/forms/folder-form'

type Props = { workspaceId: string }

const CreateForlders = ({ workspaceId }: Props) => {
  return (
    <Modal
      title="Create a folder"
      description="Folders help you organize your videos. Create a folder to group related videos together."
      trigger={
        <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
          <FolderPlusDuotine />
          Create A folder
        </Button>
      }
    >
      <FolderForm workspaceId={workspaceId} />
    </Modal>
  )
}

export default CreateForlders