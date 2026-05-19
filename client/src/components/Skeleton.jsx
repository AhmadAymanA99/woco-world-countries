import React from 'react';

const Skeleton = ({ variant = 'text', className = '' }) => {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4 mb-4',
    subtitle: 'h-5 w-1/2 mb-2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full rounded-xl',
    'table-row': 'h-12 w-full',
    button: 'h-10 w-24 rounded-lg',
    badge: 'h-6 w-16 rounded-full',
  };

  return (
    <div
      className={`${baseClass} ${variants[variant] || variants.text} ${className}`}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard = () => (
  <div className="card space-y-4">
    <Skeleton variant="card" />
    <Skeleton variant="title" />
    <Skeleton variant="text" />
    <Skeleton variant="text" className="w-2/3" />
    <div className="flex gap-2">
      <Skeleton variant="badge" />
      <Skeleton variant="badge" />
    </div>
  </div>
);

export default Skeleton;
