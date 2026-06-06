// import React from 'react'


// import { Input } from '@/components/ui/input'
// import { useSearch } from '@/hooks/useSearch'
// type Props = {
//   workspaceId: string
// }

// const Search = ({ workspaceId }: Props) => {
//   const { query, onSearchQuery, isFetching, onUsers } = useSearch(
//     'get-users',
//     'USERS' 
//   )

  

//   ////WIP:Wire up sending invitations
//   // const { mutate, isPending } = useMutationData(
//   //   ['invite-member'],
//   //   (data: { receiverId: string; email: string }) => {

//   //   }
//   // )

//   return (
//     <div className="flex flex-col gap-y-5">
//       <Input
//         onChange={onSearchQuery}
//         value={query}
//         className="bg-transparent border-2 outline-none"
//         placeholder='Search for your user...'
//         type = "text"
//       />
//     </div>
//   )
// }

// export default Search




"use client"

import { useSearch } from '@/hooks/useSearch'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
// import { Loader } from '' // Ya jahan aapka custom loader hai

import Loader from "../loader/index"
import { User } from 'lucide-react'
import React from 'react'

type Props = {
  workspaceId: string
}

const Search = ({ workspaceId }: Props) => {
  // Custom hook se states aur functions nikalna
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    'get-users',
    'USERS'
  )

  // WIP: Wire up sending invitations (Abhi isko temporary comment rakhein jab tak action na bane)
  // const { mutate, isPending } = useMutationData(...)

  return (
    <div className="flex flex-col gap-y-5">
      {/* 1. Search Input Field */}
      <Input
        onChange={onSearchQuery}
        value={query}
        className="bg-transparent border-2 outline-none"
        placeholder="Search for your user..."
        type="text"
      />

      {/* 2. Dynamic Search Results Mapping */}
      {onUsers && onUsers.length > 0 && (
        <div className="flex flex-col gap-y-3">
          {onUsers.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              {/* User Avatar Section */}
              <Avatar>
                <AvatarImage src={user.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>

              {/* User Info Section */}
              <div className="flex flex-col items-start">
                <h3 className="text-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan}
                </p>
              </div>

              {/* Invite Action Button Section */}
              <div className="flex-1 flex justify-end items-center">
                <Button
                  onClick={() => {}}
                  variant="default"
                  className="w-5/12 font-bold"
                >
                  {/* IsPending check lagne par loader state active hogi */}
                  <Loader state={false} color="#000">
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

  {/* 3. Loading Skeleton State */}
      {isFetching && (
        <div className="flex flex-col gap-y-2 mt-3">
          {/* Agar skeleton file nahi hai, toh direct dynamic div lagayein */}
          <div className="w-full h-12 rounded-xl bg-neutral-800/50 animate-pulse" />
        </div>
      )}

      {/* 4. No Users Found State (Sahi Condition) */}
      {(!onUsers || onUsers.length === 0) && !isFetching && query && (
        <p className="text-center text-sm text-[#a4a4a4] mt-5">No Users Found</p>
      )}
    </div>
  )
}

export default Search