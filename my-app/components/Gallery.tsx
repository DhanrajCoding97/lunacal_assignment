"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { useState, useRef, ChangeEvent, useEffect } from "react"
import { toast } from "sonner"
import { motion } from "motion/react"

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
  const [imagesPerView, setImagesPerView] = useState(3)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateImagesPerView = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      
      // Account for padding (px-2 = 8px on each side = 16px total)
      const availableWidth = containerWidth - 16
      
      // Each image: 190px width + 21px gap
      const imageWidth = 190
      const gapWidth = 21
      
      // Calculate with a small buffer (reduce threshold by 20px for safety)
      const buffer = 20
      
      if (availableWidth >= imageWidth * 4 + gapWidth * 3 - buffer) {
        setImagesPerView(4)
      } else if (availableWidth >= imageWidth * 3 + gapWidth * 2 - buffer) {
        setImagesPerView(3)
      } else if (availableWidth >= imageWidth * 2 + gapWidth * 1 - buffer) {
        setImagesPerView(2)
      } else {
        setImagesPerView(1)
      }
    }

    updateImagesPerView()
    const resizeObserver = new ResizeObserver(updateImagesPerView)
    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const maxIndex = Math.max(0, images.length - imagesPerView)
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [imagesPerView, currentIndex, images.length])

  // Calculate boundaries
  const totalImages = images.length
  const maxIndex = totalImages <= imagesPerView ? 0 : totalImages - imagesPerView
  
  const handleNext = () => {    
    if (currentIndex < maxIndex) {
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
          const newImages = [...images, newImage]
          setImages(newImages)
          toast.success('Image added successfully!')

          const newMaxIndex = newImages.length <= imagesPerView ? 0 : newImages.length - imagesPerView
          if (currentIndex >= maxIndex) {
            setCurrentIndex(newMaxIndex)
          }
        }
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  return (
    <div className="pl-3 bg-[#363C43] rounded-[18.89px] flex gap-6 sm:gap-5 w-full overflow-hidden">
      <div className="pt-[18px] flex flex-col items-center gap-[105px] shrink-0">
        <Image src="/helpIcon.svg" alt="help Icon" height={24} width={24} />
        <Image src="/gridIcon.svg" alt="6 boxes icon" height={30} width={20} style={{ width: 'auto', height: 'auto' }}/>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden pr-4 pt-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6">
          <div className="h-[50px] sm:h-[62px] min-w-[120px] sm:min-w-[149px] px-6 sm:px-[39px] bg-black rounded-[20px] text-lg sm:text-xl font-medium font-family-poppins text-white flex items-center justify-center text-center sm:text-left">
            Gallery
          </div>
          <div className="flex flex-wrap items-center gap-8 w-full sm:w-auto width-adjust">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={handleAddImageClick}
              className="h-[42px] w-[131px] px-4 sm:px-5 text-xs font-extrabold text-white bg-[rgba(255,255,255,0.03)] [box-shadow:-0.5px_-0.5px_6.9px_rgba(255,255,255,0.25),9px_10px_7.1px_rgba(0,0,0,0.4),inset_0px_0px_48px_rgba(255,255,255,0.05),inset_0px_3px_3px_rgba(255,255,255,0.15)] backdrop-blur-[52px] rounded-full hover:bg-[rgba(255,255,255,0.08)] transition-colors flex items-center gap-[5px] font-family-jakarta"
            >
              <Image src="/plusIcon.svg" alt="plus icon" height={16} width={16} />
              ADD IMAGE
            </Button>
            <div className="flex gap-3 sm:gap-[18px]">
              <Button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="group grid place-content-center h-10 sm:h-[45px] w-10 sm:w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.3),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_2px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[linear-gradient(139.14deg,#1E252D_12.4%,#161718_94.96%)] active:bg-[linear-gradient(139.14deg,#95BCE9_12.4%,#161718_94.96%)] transition-all text-[#6F787C] active:text-white disabled:hover:bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)]"
              >
                <svg width="12" height="12" viewBox="0 0 17 16" fill="none">
                  <path d="M1 8H15.1944" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 15L1 8L8 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className="group grid place-content-center h-10 sm:h-[45px] w-10 sm:w-[45px] rounded-full bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)] shadow-[inset_-2px_-2px_8px_rgba(150,190,231,0.3),-5px_-3px_30px_-10px_#96BEE7,4px_5px_30px_2px_#101213] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[linear-gradient(139.14deg,#1E252D_12.4%,#161718_94.96%)] active:bg-[linear-gradient(139.14deg,#95BCE9_12.4%,#161718_94.96%)] transition-all text-[#6F787C] active:text-white disabled:hover:bg-[linear-gradient(139.14deg,#303439_12.4%,#161718_94.96%)]"
              >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M15.1945 8L1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.19446 1L15.1945 8L8.19446 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden pt-[47px] pb-4"
        >
          <div 
            className="flex gap-[21px] transition-transform duration-500 ease-out px-2"
            style={{
              transform: `translateX(-${currentIndex * (190 + 21)}px)`
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[179px] w-[190px] shrink-0"
              >
                <motion.div
                  className="relative h-full w-full rounded-3xl"
                  whileHover={{
                    scale: 1.09,
                    rotateZ: -2,
                    zIndex: 50,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 20,
                  }}
                  style={{
                    transformOrigin: 'bottom left',
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
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
                  
                  <motion.div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl"
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
  )
}

export default Gallery