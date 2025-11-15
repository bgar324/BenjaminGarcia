import React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const PastVersions = () => {
  const versions = [
    {
      link: "https://v1.bentgarcia.com",
      favicon: "/static/previous favicons/faviconv1.webp",
      version: 1,
    },
    {
      link: "https://v2.bentgarcia.com",
      favicon: "/static/previous favicons/faviconv2.webp",
      version: 2,
    },
    {
      link: "https://v3.bentgarcia.com",
      favicon: "/static/previous favicons/faviconv3.webp",
      version: 3,
    },
  ]

  return (
    <div className="w-full grid grid-cols-2 gap-1">
      {versions.slice(0, 2).map((item, index) => (
        <a
          key={index}
          title={`View v${item.version}`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-x-2 
            text-gray-900 dark:text-slate-100 
            hover:bg-[#f6f7f7] dark:hover:bg-slate-900 
            transition-colors duration-300 
            bg-white dark:bg-black
            border border-gray-200 dark:border-gray-600 
            rounded-lg px-4 py-2 cursor-pointer touch-manipulation w-full
          "
          onClick={(e) => {
            window.open(item.link, "_blank", "noopener,noreferrer")
          }}
        >
          <span className="flex items-center">
            <Image
              src={item.favicon}
              alt={`v${item.version} favicon`}
              width={16}
              height={16}
              className="mr-2"
            />
            v{item.version}
          </span>
          <ArrowUpRight strokeWidth="1" size={16} absoluteStrokeWidth />
        </a>
      ))}

      <a
        href={versions[2].link}
        title="View v3"
        target="_blank"
        rel="noopener noreferrer"
        className="
          col-span-2 flex items-center justify-center gap-x-2 
          text-gray-900 dark:text-slate-100 
          hover:bg-[#f6f7f7] dark:hover:bg-slate-900 
          transition-colors duration-300 
          bg-white dark:bg-black
          border border-gray-200 dark:border-gray-600 
          rounded-lg px-4 py-2 cursor-pointer touch-manipulation w-full
        "
        onClick={(e) => {
          window.open(versions[2].link, "_blank", "noopener,noreferrer")
        }}
      >
        <span className="flex items-center">
          <Image
            src={versions[2].favicon}
            alt={`v${versions[2].version} favicon`}
            width={16}
            height={16}
            className="mr-2"
          />
          v{versions[2].version}
        </span>
        <ArrowUpRight strokeWidth="1" size={16} absoluteStrokeWidth />
      </a>
    </div>
  )
}

export default PastVersions
