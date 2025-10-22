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
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-start rounded-[23px] bg-[#171717] p-[6px] gap-1 [box-shadow:inset_0px_4.96001px_12.4px_2.48px_rgba(0,0,0,0.25)]",
        className
      )}
      {...props}
    />
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
        "h-[49px] w-[195px] shrink-0 inline-flex items-center justify-center gap-1.5 rounded-2xl border border-transparent text-sm text-[#A3ADB2] font-medium whitespace-nowrap transition-colors duration-200 select-none",
        "data-[state=active]:text-white data-[state=active]:border-[#1E1F24] data-[state=active]:bg-[#28292F] data-[state=active]:[box-shadow:-8.43333px_-16.8667px_50.6px_-16.8667px_#485B71,13.4933px_16.8667px_67.4667px_8.43333px_#0A0A0A]",
        "text-gray-400 hover:text-gray-200",
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
