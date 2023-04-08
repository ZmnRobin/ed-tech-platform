import React from 'react'
import { Link } from 'react-router-dom';

export default function Video({video}) {
    const {title,id,duration,views}=video||{};
  return (
    <div class="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
        {/* <!-- Thumbnail --> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
        {/* <!-- Description --> */}
        <div clas="flex flex-col w-full">
            <Link to={`/courseplayer/${id}`}>
                <p class="text-slate-50 text-sm font-medium">{title}</p>
            </Link>
            <div>
                <span class="text-gray-400 text-xs mt-1">{duration} Mins</span>
                <span class="text-gray-400 text-xs mt-1"> | </span>
                <span class="text-gray-400 text-xs mt-1">{views} views</span>
            </div>
        </div>
   </div>
  )
}
