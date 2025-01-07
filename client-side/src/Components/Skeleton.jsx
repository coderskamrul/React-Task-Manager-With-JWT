import React from 'react';

const SkeletonItem = () => (
  <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full bg-slate-100"></div>
    <div className="skeleton h-4 w-full bg-slate-100"></div>
    <div className="skeleton h-4 w-full bg-slate-100"></div>
    <div className="skeleton h-4 w-full bg-slate-100"></div>
  </div>
);

const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex w-full items-center justify-center mt-8 gap-6 sm:flex-row">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Skeleton;