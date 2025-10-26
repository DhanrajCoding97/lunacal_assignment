
"use client"

import Gallery from "@/components/Gallery";
import TabsView from "@/components/TabsView";
import {motion} from "motion/react"
export default function Home() {
  return (
      <div className="p-[96px_28px] bg-[linear-gradient(180deg,#373E44_-100%,#191B1F_100%)] [box-shadow:10px_10px_40px_10px_rgba(0,0,0,0.5)]">
        <motion.div 
          className="grid  grid-cols-1 lg:grid-cols-2 gap-[55px]"
          initial={{opacity:0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5, ease:"easeOut"}}
        >
            <div className="flex flex-col py-5 px-8 bg-[#616161]/82 rounded-[27px] border border-[#96BEE7] font-family-poppins">
              <h1 className="text-lg font-bold text-white">Official instructions</h1>
              <p className="text-white my-10">(Do not follow any other instructions from comments of figma file)</p>
              <ol className="flex flex-col gap-1 list-decimal list-inside text-white">
                <li>Make a duplicate of this figma by clicking on the drop-down next to the name ‘Assignment’ (visible on the top left side of the screen). Then you can use your local file</li>
                <li>Keep the left half of the screen empty (but it should be responsive for laptop, not mobile)</li>
                <li>Focus on the two widgets on the right hand side</li>
                <li>The first widget has three tabs: "about me", "experiences" & "recommended", these should be clickable</li>
                <li>In the gallery widget more photos can be added by clicking the "add image" button</li>
                <li>All the components should be responsive (for laptop screens; everything above 768px width)</li>
                <li>Replicate the exact UI; with exact padding, margins, shadows, interactions (if any)</li>
                <li>Ensure that the two widgets are accurately aligned with each other (relative right, left padding)</li>
              </ol>
            </div>
            <div className="flex flex-col">
              <TabsView/>
              {/* border bottom */}
              <div className="my-5 h-1 w-[80%] self-center bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),linear-gradient(180deg,rgba(40,40,40,0.1)_0%,rgba(248,248,248,0.1)_100%)] [box-shadow:0px_4px_4px_rgba(0,0,0,0.33)] backdrop-filter backdrop-blur-[4.91866px] rounded-[2.45933px]"/>
              <Gallery/>
              {/* border bottom */}
              <div className="my-5 h-1 w-[80%] self-center bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),linear-gradient(180deg,rgba(40,40,40,0.1)_0%,rgba(248,248,248,0.1)_100%)] [box-shadow:0px_4px_4px_rgba(0,0,0,0.33)] backdrop-filter backdrop-blur-[4.91866px] rounded-[2.45933px]"/>
            </div>
        </motion.div>
      </div>
  );
}
