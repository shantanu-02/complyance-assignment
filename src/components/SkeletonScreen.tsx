import React from 'react'

const SkeletonScreen = () => {

    const SkeletonDiv = () => (
    <div className="h-60 bg-gray-200 p-4 animate-pulse flex flex-col justify-center items-center rounded-lg">
        <div className="mb-4 bg-gray-300 w-20 h-20 rounded-full" />
        <div className="h-4 bg-gray-300 w-32 mb-2 rounded" />
        <div className="h-4 bg-gray-300 w-24 rounded" />
      </div>)

  return (
<> 
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
    <SkeletonDiv />
  </>
      );
}

export default SkeletonScreen