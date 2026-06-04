
'use client'

import { getWorkSpaces } from '@/actions/workspace'
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { userQueryData } from '@/hooks/userQueryData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { WorkspaceProps } from '@/types/index.type'
import React from 'react'
import Modal from '../loader/modal'
import { ChevronDownIcon, CheckIcon, PlusCircle } from 'lucide-react'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter()

  // React Query hook workspace data fetch karne ke liye
  const { data } = userQueryData(
    ['user-workspaces'], 
    getWorkSpaces
  ) 

  const { data: workspace } = (data || {}) as WorkspaceProps

  const onChangeActiveWorkspace = (value: string|null) => {
    if (value) {
      router.push(`/dashboard/${value}`)
    }
  }

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      
      {/* Logo Section */}
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image 
          src="/opal-logo.svg" 
          height={40} 
          width={40} 
          alt="Opal Logo" 
          priority
        />
        <p className="text-2xl font-bold text-white">Opal</p>
      </div>

 


<div className="w-full mt-16 px-2">
  <Select 
    defaultValue={activeWorkspaceId} 
    onValueChange={onChangeActiveWorkspace}
  >
    {/* Humne border ko custom styling dedi taaki background ke sath match kare */}
    <SelectTrigger className="mt-4 text-neutral-200 bg-transparent w-full border border-neutral-800 focus:border-neutral-700">
      <SelectValue>
        {/* Yeh line direct filter karegi data ko aur screen par ID ki jagah Name dikhayegi */}
        {workspace?.workspace?.find((ws) => ws.id === activeWorkspaceId)?.name ||
         workspace?.members?.find((m) => m.Workspace?.id === activeWorkspaceId)?.Workspace?.name || 
         "Select a workspace"}
      </SelectValue>
    </SelectTrigger>
    
    <SelectContent className="bg-[#111111] border border-neutral-800 text-white backdrop-blur-xl">
      <SelectGroup>
        <SelectLabel className="text-neutral-400">Workspaces</SelectLabel>
        <Separator />
        
        {/* 1. Personal Workspaces */}
        {workspace?.workspace && workspace.workspace.length > 0 && (
          workspace.workspace.map((ws) => (
            <SelectItem value={ws.id} key={ws.id}>
              {ws.name}
            </SelectItem>
          ))
        )}

        {/* 2. Shared Workspaces */}
        {workspace?.members && workspace.members.length > 0 && (
          workspace.members.map((member) => 
            member.Workspace && (
              <SelectItem value={member.Workspace.id} key={member.Workspace.id}>
                {member.Workspace.name}
              </SelectItem>
            )
          )
        )}
      </SelectGroup>
    </SelectContent>
  </Select>


  <Modal title='Invite To Workspace'
  
  trigger={
    <span className='text-sm cursor-pointer flex items-center
    bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px]
    gap-2'>
 
      <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500'/>

     <span className='text-neutral-400 font-semibold 
     text-xs'>

     </span>

    </span>
  }
  
  ></Modal>
</div>


      
    </div>
  )
}

export default Sidebar