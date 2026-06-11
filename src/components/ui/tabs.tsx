'use client'

import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

type TabsContextType = {
  value: string
  onValueChange: (val: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (val: string) => void
  children: React.ReactNode
  className?: string
}) {
  const [localValue, setLocalValue] = useState(defaultValue || '')
  const activeValue = value !== undefined ? value : localValue
  const handleValueChange = onValueChange || setLocalValue

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-1 text-neutral-400 bg-neutral-900/50 border border-neutral-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isActive = context.value === value

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-neutral-800 text-white shadow-sm'
          : 'hover:text-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
