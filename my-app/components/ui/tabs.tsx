"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

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
  const [tabWidth, setTabWidth] = React.useState(195)
  const [gap, setGap] = React.useState(3)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!listRef.current) return

    const updateIndicator = () => {
      const activeTab = listRef.current?.querySelector('[data-state="active"]') as HTMLElement | null
      const tabs = Array.from(
        listRef.current?.querySelectorAll('[data-slot="tabs-trigger"]') || []
      )
      const index = tabs.indexOf(activeTab as Element)

      if (activeTab && tabs.length > 0) {
        setActiveIndex(index)
        setTabWidth(activeTab.clientWidth)
        
        // Calculate actual gap between tabs
        if (tabs.length > 1 && index < tabs.length - 1) {
          const currentTab = tabs[index] as HTMLElement
          const nextTab = tabs[index + 1] as HTMLElement
          const calculatedGap = nextTab.offsetLeft - (currentTab.offsetLeft + currentTab.clientWidth)
          setGap(calculatedGap)
        }
      }
    }

    updateIndicator()

    const resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(listRef.current)

    const mutationObserver = new MutationObserver(updateIndicator)
    mutationObserver.observe(listRef.current, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    })

    window.addEventListener('resize', updateIndicator)

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [])

  // Calculate transform based on accumulated widths and gaps
  const calculateTransform = () => {
    if (!listRef.current) return 0
    
    const tabs = Array.from(
      listRef.current.querySelectorAll('[data-slot="tabs-trigger"]')
    ) as HTMLElement[]
    
    let offset = 0
    for (let i = 0; i < activeIndex; i++) {
      if (tabs[i]) {
        offset += tabs[i].clientWidth + gap
      }
    }
    
    return offset
  }

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-start rounded-[23px] bg-[#171717] p-1.5 gap-1",
        "[box-shadow:inset_0px_4.96001px_12.4px_2.48px_rgba(0,0,0,0.25)]",
        "relative overflow-x-auto scrollbar-hide",
        className
      )}
      {...props}
    >
      {/* Sliding active indicator */}
      <div
        className="absolute top-1.5 left-1.5 h-[49px] rounded-2xl bg-[#28292F] border border-[#1E1F24]
        [box-shadow:-8.43333px_-16.8667px_50.6px_-16.8667px_#485B71,13.4933px_16.8667px_67.4667px_8.43333px_#0A0A0A]
        transition-transform duration-500 ease-out pointer-events-none"
        style={{
          width: `${tabWidth}px`,
          transform: `translateX(${calculateTransform()}px)`,
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
        "h-[49px] flex-1 font-family-poppins",
        "shrink-0 inline-flex items-center justify-center gap-1.5 rounded-2xl border border-transparent",
        "text-sm text-[#A3ADB2] font-medium whitespace-nowrap select-none relative overflow-hidden isolate z-10",
        "transition-colors duration-200",
        "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(39,39,40,0.1176)_0%,rgba(150,190,231,0.0576)_100%)] before:-translate-x-[101%] before:rounded-[16px] before:transition-none before:duration-1000 before:ease-out before:z-[-1] before:pointer-events-none before:opacity-0",
        "hover:before:transition-transform hover:before:opacity-100 hover:text-white hover:before:translate-x-0",
        "data-[state=active]:text-white",
        "data-[state=active]:before:opacity-0 data-[state=active]:before:-translate-x-[101%]",
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