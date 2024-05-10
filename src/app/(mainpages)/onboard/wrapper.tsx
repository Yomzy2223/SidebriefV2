"use client"
import { OnboardPanel } from '@/components/cards/onboardPanel'
import React, { ReactNode} from 'react'

const OnboardBusinessWrapper = ({
    children,
}: {
    children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-h-[calc(100vh-81px)] overflow-auto md:flex-row md:gap-10 lg:gap-16">
      <div className="flex-1 py-6 h-max px-1 md:pt-16 md:pb-20 max-w-[80%]">{children}</div>
        <div className="flex-[0.6] xl:ml-auto hidden sticky top-0 overflow-auto lg:block">
          <OnboardPanel />
        </div>
    </div>
  )
}

export default OnboardBusinessWrapper