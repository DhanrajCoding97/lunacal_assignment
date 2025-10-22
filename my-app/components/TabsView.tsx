import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
const TabsView = () => {
  return (
    <div className="px-3 py-[18px] bg-[#363C43] rounded-[18.89px] flex gap-5 w-full">
        <div className="flex flex-col gap-[105px] pt-2">
            <Image src="/helpIcon.svg" alt="help Icon" height={24} width={24}/>
            <Image src="/gridIcon.svg" alt="6 boxes icon" height={30.69} width={20}/>
        </div>
        <Tabs defaultValue="about" className="flex-1 max-w-[605px]">
            <TabsList>
                <TabsTrigger value="about">About Me</TabsTrigger>
                <TabsTrigger value="experiences">Experiences</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="max-h-[175px] overflow-auto">
                <p className="text-[#969696] text-xl mb-2">Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome company for 3 years now.</p>
                <p className="text-[#969696] text-xl">I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a... Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora dignissimos doloremque doloribus est asperiores ab atque, distinctio odit corporis dolores!</p>
            </TabsContent>
            <TabsContent value="experiences" className="max-h-[175px] overflow-auto">
                <p className="text-[#969696] text-xl mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, voluptates?</p>
                <p className="text-[#969696] text-xl">I was born and raised in Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae nisi rerum sed facilis iusto repellendus vero possimus ratione, natus illum eveniet quidem quaerat commodi at dolorum. Molestias deleniti culpa, voluptatum reiciendis minus voluptate cupiditate rerum. Incidunt consectetur totam eum illo, aut nesciunt optio quis natus repellat inventore, corrupti odio laboriosam.</p>
            </TabsContent>
            <TabsContent value="recommended" className="max-h-[175px] overflow-auto">
                <p className="text-[#969696] text-xl mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque cum, exercitationem quo provident delectus.</p>
                <p className="text-[#969696] text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias saepe blanditiis ipsum quos cupiditate expedita dolor distinctio beatae hic nihil, est ab, autem qui aspernatur asperiores, fuga fugiat ratione. Inventore, quasi! Corporis incidunt tempore non vel quos rerum provident illum sunt quia ad, iste fugit excepturi nemo labore, sit, quibusdam doloremque laudantium consectetur animi numquam beatae odio quidem ipsam! Eius amet maiores similique quidem explicabo tempora vel vero cum dolorum!</p>
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    </div>
  )
}

export default TabsView
