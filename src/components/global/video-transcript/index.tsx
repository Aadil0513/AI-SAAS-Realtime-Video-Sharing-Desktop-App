'use client'
import React from 'react'

type Props = {
  transcript: string
}

const VideoTranscript = ({ transcript }: Props) => {
  return (
    <div className="p-6 bg-[#171717] border border-neutral-800 rounded-2xl flex flex-col gap-y-4">
      <h3 className="text-white font-semibold text-lg">Transcript</h3>
      {transcript ? (
        <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
          {transcript}
        </p>
      ) : (
        <p className="text-neutral-500 text-sm italic">
          No transcript available yet. Click "Generate" in the AI Suite tab to transcribe this video.
        </p>
      )}
    </div>
  )
}

export default VideoTranscript
