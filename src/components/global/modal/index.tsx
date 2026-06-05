
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  className?: string
}

const Modal = ({ children, description, title, trigger, className }: Props) => {
  return (
    <Dialog>
      {/* Humne ui/dialog.tsx mein iska patch laga diya hai, 
          ab asChild lagane se automatic Base UI ki render system active ho jayegi */}
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal