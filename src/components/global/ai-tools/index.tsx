'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BrainCircuit, Sparkles, FileText, Wand2 } from 'lucide-react'

type Props = {
  videoId: string
  trial: boolean
  plan: 'FREE' | 'PRO'
}

const AiTools = ({ videoId, trial, plan }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-[#171717] border border-neutral-800 rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col gap-y-6">
          <div className="flex items-center gap-x-3">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Sparkles className="text-purple-400 w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">AI Suite</h3>
              <p className="text-neutral-400 text-xs">Power up your workflow with AI</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-x-3">
                <FileText className="text-neutral-400 w-5 h-5" />
                <div>
                  <p className="text-white text-sm font-medium">Smart Transcript</p>
                  <p className="text-neutral-500 text-xs">Accurate speech-to-text transcript</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-300">
                Generate
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-x-3">
                <BrainCircuit className="text-neutral-400 w-5 h-5" />
                <div>
                  <p className="text-white text-sm font-medium">AI Summary</p>
                  <p className="text-neutral-500 text-xs">Generate instant video summaries</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-300">
                Summarize
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-x-3">
                <Wand2 className="text-neutral-400 w-5 h-5" />
                <div>
                  <p className="text-white text-sm font-medium">Chaptering</p>
                  <p className="text-neutral-500 text-xs">Automatically structure chapters</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-300">
                Create
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AiTools
