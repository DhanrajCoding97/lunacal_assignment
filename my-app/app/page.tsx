import TabsView from "@/components/TabsView";

export default function Home() {
  return (
      <div className="p-[103px_28px] bg-[linear-gradient(180deg,#373E44_0%,#191B1F_100%)] h-screen w-full">
        <div className="grid grid-cols-2 gap-[55px]">
            <div className="flex flex-col justify-center p-[45px_32px] bg-[#616161]/82 rounded-[27px] border border-[#96BEE7]">
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
            </div>
        </div>
      </div>
  );
}
