// "use client"

// import Image from "next/image"
// import { Button } from "./ui/button"
// import { useState } from "react"

// const Gallery = () => {

// 	const [images, setImages] = useState([
// 			{ src: "/gallery1.jpg", alt: "building 1" },
// 			{ src: "/gallery2.jpg", alt: "building 2" },
// 			{ src: "/gallery3.jpg", alt: "building 3" },
// 			{ src: "/gallery4.jpg", alt: "building 4" },
// 			{ src: "/gallery5.jpg", alt: "building 5" },
// 			{ src: "/gallery6.jpg", alt: "building 6" },
// 	]);
 
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const imagesPerView = 3

// 	const handleNext = () => {
// 		if(currentIndex + imagesPerView < images.length) {
// 			setCurrentIndex(prev => prev + 1)
// 		}
// 	}

// 	const handlePrev = () => {
// 		if(currentIndex > 0) {
// 			setCurrentIndex(prev => prev - 1)
// 		}
// 	}

// 	const handleAddImage = () => {
// 		const newImage = {
// 			src: `/gallery${images.length +1}.jpg`,
// 			alt: `building${images.length +1 }`
// 		}

// 		setImages([...images, newImage])

// 		if(currentIndex + imagesPerView >= images.length) {
// 			setCurrentIndex(images.length - imagesPerView + 1)
// 		}
// 	}

// 	const visibleImages = images.slice(currentIndex, currentIndex + imagesPerView)
// 	const canGoPrev = currentIndex > 0
// 	const canGoNext = currentIndex + imagesPerView < images.length

//   return (
//     <div className="px-3 py-[18px] bg-[#363C43] rounded-[18.89px] flex gap-5 w-full">
//       <div className="flex flex-col gap-[105px] pt-2">
//         <Image src="/helpIcon.svg" alt="help Icon" height={24} width={24}/>
//         <Image src="/gridIcon.svg" alt="6 boxes icon" height={30.69} width={20}/>
//       </div>
//       <div className="flex flex-col gap-[55px]">
//         <div className="flex-1 flex justify-between">
//           <div className='h-[62px] w-[149px] py-4 px-[39px] bg-black rounded-[20px] text-xl font-medium text-white'>Gallery</div>
//             <div className="flex gap-[34.68]">
//               <Button 
// 								onClick={handleAddImage}
// 								className="h-[46px] w-[131px] flex gap-[5.16px] items-center justify-center py-5 bg-[rgba(255,255,255,0.03)] [box-shadow:-0.5px_-0.5px_6.9px_rgba(255,255,255,0.25),9px_10px_7.1px_rgba(0,0,0,0.4),inset_0px_0px_48.9064px_rgba(255,255,255,0.05),inset_0px_3.26043px_3.26043px_rgba(255,255,255,0.15)] backdrop-filter backdrop-blur-[52.28px] rounded-full"
// 							>
//                 <Image src="/plusIcon.svg" alt="add Icon" height={12.1} width={12.1} className="mt-1"/>
//                 Add Image
//               </Button>
//               <div className="flex gap-[18px]">
//                 <Button 
// 									onClick={handlePrev}
// 									disabled={!canGoPrev}
// 									className="h-[45px] w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] [box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213]"
// 								>
//                   <Image src="/leftArrow.svg" alt="left arrow" height={12} width={12}/>
//                 </Button>
//                 <Button 
// 									onClick={handleNext}
// 									disabled={!canGoNext}
// 									className="h-[45px] w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] [box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213]"
// 								>
//                   <Image src="/rightArrow.svg" alt="right arrow" height={12} width={12}/>
//                 </Button>
//               </div>
//             </div>
//         </div>
// 				<div className="relative overflow-hidden">
// 					<div 
// 						className="flex gap-[21px] transition-transform duration-500 ease-out"
// 						style={{ transform: `translateX(-${currentIndex * (190 + 21)}px)` }}
// 					>
// 						{images.map((image, index) => (
// 							<figure
// 								key={index}
// 								className="relative h-[179px] w-[190px] shrink-0 overflow-hidden rounded-[24px] hover:scale-105 transition-transform duration-300"
// 							>
// 								<Image
// 									src={image.src}
// 									alt={image.alt}
// 									fill
// 									className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
// 									sizes="190px"
// 								/>
// 							</figure>
// 							))}
// 						</div>
// 				</div>
//       </div>
//     </div>
//   )
// }

// export default Gallery

"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { useState, useRef, ChangeEvent  } from "react"
import { toast } from "sonner"
import {motion} from "motion/react"
interface ImageType {
  src: string
  alt: string
}

const Gallery = () => {
  const [images, setImages] = useState<ImageType[]>([
    { src: "/gallery1.jpg", alt: "building 1" },
    { src: "/gallery2.jpg", alt: "building 2" },
    { src: "/gallery3.jpg", alt: "building 3" },
    { src: "/gallery4.jpg", alt: "building 4" },
    { src: "/gallery5.jpg", alt: "building 5" },
    { src: "/gallery6.jpg", alt: "building 6" },
  ])
  
  const [currentIndex, setCurrentIndex] = useState(0)
	const fileInputRef = useRef<HTMLInputElement>(null)
  const imagesPerView = 3

  const handleNext = () => {
    if (currentIndex + imagesPerView < images.length) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

 const handleAddImageClick = () => {
    fileInputRef.current?.click()
  }

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          const newImage: ImageType = {
            src: event.target.result,
            alt: `building ${images.length + 1}`
          }
          setImages([...images, newImage])
          toast.success('Image added successfully!')
          // Scroll to show the new image
          if (currentIndex + imagesPerView >= images.length) {
            setCurrentIndex(images.length - imagesPerView + 1)
          }
        }
      }
      reader.readAsDataURL(file)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const visibleImages = images.slice(currentIndex, currentIndex + imagesPerView)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex + imagesPerView < images.length

  return (
    <div className="px-3 py-[18px] bg-[#363C43] rounded-[18.89px] flex gap-5 w-full">
      <div className="flex flex-col gap-[105px] pt-2">
        <Image src="/helpIcon.svg" alt="help Icon" height={24} width={24}/>
        <Image src="/gridIcon.svg" alt="6 boxes icon" height={30.69} width={20}/>
      </div>
      
      <div className="flex flex-col gap-[55px] flex-1">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className='h-[62px] w-[149px] py-4 px-[39px] bg-black rounded-[20px] text-xl font-medium text-white flex items-center justify-center'>
            Gallery
          </div>
          
          <div className="flex gap-[34px] items-center">
						{/* hidden file input */}
							<input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            {/* Add Image Button */}
            <Button 
              onClick={handleAddImageClick}
              className="h-[46px] w-[131px] flex gap-[5px] items-center justify-center text-xs font-semibold text-white bg-[rgba(255,255,255,0.03)] [box-shadow:-0.5px_-0.5px_6.9px_rgba(255,255,255,0.25),9px_10px_7.1px_rgba(0,0,0,0.4),inset_0px_0px_48px_rgba(255,255,255,0.05),inset_0px_3px_3px_rgba(255,255,255,0.15)] backdrop-blur-[52px] rounded-full hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1V12M1 6.5H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              ADD IMAGE
            </Button>
            
            {/* Navigation Arrows */}
            <div className="flex gap-[18px]">
							{/* <Button 
								onClick={handlePrev}
								disabled={!canGoPrev}
								className="group grid place-content-center relative h-[45px] w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] [box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.3),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[linear-gradient(139.14deg,#1E252D_12.4%,#161718_94.96%)] active:bg-[linear-gradient(139.14deg,#95BCE9_12.4%,#161718_94.96%)] active:[box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] transition-all text-[#6F787C]! active:text-white!"
							>
								<Image 
									src="/leftArrow.svg" 
									alt="left arrow" 
									height={12} 
									width={12}
									className="transition-colors text-[#6F787C]! group-active:text-white!"
								/>
							</Button> */}
              <Button 
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="group grid place-content-center relative h-[45px] w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] [box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.3),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[linear-gradient(139.14deg,#1E252D_12.4%,#161718_94.96%)] active:bg-[linear-gradient(139.14deg,#95BCE9_12.4%,#161718_94.96%)] active:[box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] transition-all text-[#6F787C] active:text-white"
              >
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 17 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors"
                >
                  <path d="M1 7.99999H15.1944" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 15L1 8L8 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
              
              {/* <button 
                onClick={handleNext}
                disabled={!canGoNext}
                className="grid place-content-center relative h-[45px] w-[45px] rounded-full bg-linear-to-br from-[#303439] via-[#232629] to-[#161718] shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.3),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.5),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] transition-all"
              >
								<Image src="/rightArrow.svg" alt="right arrow"  height={12} width={12}/>
              </button> */}
							
              <button 
                onClick={handleNext}
                disabled={!canGoNext}
                className="group grid place-content-center relative h-[45px] w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] [box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[linear-gradient(139.14deg,#1E252D_12.4%,#161718_94.96%)] active:bg-[linear-gradient(139.14deg,#95BCE9_12.4%,#161718_94.96%)] active:[box-shadow:-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_5px_#101213] transition-all text-[#6F787C] active:text-white"
              >
								<svg 
                  width="17" 
                  height="16" 
                  viewBox="0 0 17 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors"
                >
                  <path d="M15.1945 8.00001L1.00001 8.00001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.19446 1L15.1945 8L8.19446 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Image Slider */}
        <div className=" max-w-[612px]">
<div className="relative w-full"> {/* Add overflow-hidden here */}
  <div 
    className="flex gap-[21px] transition-transform duration-500 ease-out"
    style={{ transform: `translateX(-${currentIndex * (190 + 21)}px)` }}
  >
    {images.map((image, index) => (
      <div
        key={index}
        className="relative h-[179px] w-[190px] shrink-0"
        style={{ zIndex: 1 }}
      >
        {/* Motion wrapper - scales and rotates the entire card */}
        <motion.div
          className="relative h-full w-full rounded-3xl shadow-xl origin-bottom"
          whileHover={{
            scaleX: 1.095,
            scaleY: 1.095,
            rotateZ: -2,
            zIndex: 10,
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 20,
          }}
          style={{
            transformOrigin: 'bottom center',
          }}
        >
          {/* Base grayscale image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="220px"
              className="object-cover"
              style={{
                filter: 'grayscale(100%)',
              }}
            />
          </div>
          
          {/* Color overlay that fades in on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="220px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default Gallery