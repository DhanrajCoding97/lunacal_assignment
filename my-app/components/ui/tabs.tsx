"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-[42px]", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!listRef.current) return

    const updateIndicator = () => {
      const activeTab = listRef.current?.querySelector('[data-state="active"]')
      if (activeTab) {
        const tabs = Array.from(listRef.current?.querySelectorAll('[data-slot="tabs-trigger"]') || [])
        const index = tabs.indexOf(activeTab)
        setActiveIndex(index)
      }
    }

    updateIndicator()
    
    const observer = new MutationObserver(updateIndicator)
    observer.observe(listRef.current, {
      attributes: true,
      attributeFilter: ['data-state'],
      subtree: true
    })

    return () => observer.disconnect()
  }, [])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-start rounded-[23px] bg-[#171717] p-[6px] gap-1 [box-shadow:inset_0px_4.96001px_12.4px_2.48px_rgba(0,0,0,0.25)] relative",
        className
      )}
      {...props}
    >
      {/* Sliding active indicator */}
      <div
        className="absolute top-[6px] left-[6px] h-[49px] w-[195px] rounded-[16px] bg-[#28292F] border border-[#1E1F24] [box-shadow:-8.43333px_-16.8667px_50.6px_-16.8667px_#485B71,13.4933px_16.8667px_67.4667px_8.43333px_#0A0A0A] transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translateX(${activeIndex * 198}px)`
        }}
      />
      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "h-[49px] w-[195px] shrink-0 inline-flex items-center justify-center gap-1.5 rounded-[16px] border border-transparent text-sm text-[#A3ADB2] font-medium whitespace-nowrap select-none relative overflow-hidden isolate z-10",
        "transition-colors duration-200",
        "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(39,39,40,0.1176)_0%,rgba(150,190,231,0.0576)_100%)] before:-translate-x-full before:rounded-[16px] before:transition-transform before:duration-1000 before:ease-out before:z-[-1]",
        "hover:text-white hover:before:translate-x-0",
        "data-[state=active]:text-white",
        "data-[state=active]:before:hidden",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }