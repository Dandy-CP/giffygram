import React from 'react';

const ContentSkeleton = () => {
  return (
    <div className="w-[470px] animate-pulse phone:w-full">
      <div className="mb-3 flex flex-row items-center gap-2">
        <div className="w-[42px] h-[42px] rounded-full bg-gray-300" />
        <div className="bg-gray-300 w-28 h-3" />
      </div>

      <div className="w-[468px] h-[385px] bg-gray-300 phone:w-full" />
    </div>
  );
};

export default ContentSkeleton;
