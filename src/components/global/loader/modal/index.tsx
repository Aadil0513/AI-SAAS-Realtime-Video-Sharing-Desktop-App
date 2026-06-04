// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import React from 'react'

// type Props = {
//   trigger: React.ReactNode
//   children: React.ReactNode
//   title: string
//   description: string
//   className?: string
// }

// const Modal = ({ children, description, title, trigger, className }: Props) => {
//   return (
//     <Dialog>
//       <DialogTrigger className={className} asChild>
//          <span>{trigger}</span>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         {children}
//       </DialogContent>
//     </Dialog>
//   )

  
// }

// export default Modal



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
      {/* Base UI mein asChild ki jagah render={trigger} likha jata hai */}
      <DialogTrigger className={className} render={trigger} />
      
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