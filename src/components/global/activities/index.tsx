'use client'
import React, { useState } from 'react'
import CommentForm from '@/components/forms/comment-form'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'

type Props = {
  author: string
  videoId: string
}

const Activities = ({ author, videoId }: Props) => {
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    { id: '1', user: author, text: 'Welcome to this shared video space! Please leave your feedback here.', time: 'Just now' }
  ])

  return (
    <div className="p-6 bg-[#171717] border border-neutral-800 rounded-2xl flex flex-col gap-y-6">
      <h3 className="text-white font-semibold text-lg">Activity & Comments</h3>

      {/* Comment Form */}
      <div className="flex gap-x-3 items-start">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-neutral-800 text-white text-xs">
            <User size={14} />
          </AvatarFallback>
        </Avatar>
        <CommentForm
          videoId={videoId}
          author={author}
        />
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-y-4 mt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-x-3 items-start border-t border-neutral-800/50 pt-4">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-neutral-800 text-white text-xs">
                {comment.user.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                <span className="text-white text-xs font-semibold">{comment.user}</span>
                <span className="text-neutral-500 text-[10px]">{comment.time}</span>
              </div>
              <p className="text-neutral-300 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities
