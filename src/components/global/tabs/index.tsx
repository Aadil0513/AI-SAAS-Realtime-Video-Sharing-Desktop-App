'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  defaultValue: string
  triggers: string[]
  children: React.ReactNode
}

const TabMenu = ({ defaultValue, triggers, children }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const childrenArray = React.Children.toArray(children)

  return (
    <div className="w-full flex flex-col gap-y-6">
      {/* Tabs List */}
      <div className="flex gap-x-2 p-1 bg-[#171717] rounded-full border border-neutral-800">
        {triggers.map((trigger) => (
          <button
            type="button"
            key={trigger}
            onClick={() => setActiveTab(trigger)}
            className={cn(
              "flex-1 text-center py-2 text-sm font-medium rounded-full transition duration-200",
              activeTab === trigger
                ? "bg-white text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            )}
          >
            {trigger}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="w-full">
        {triggers.map((trigger, index) => {
          if (activeTab !== trigger) return null
          return (
            <div key={trigger} className="animate-in fade-in duration-200">
              {childrenArray[index]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TabMenu
