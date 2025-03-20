import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ContentData } from '@/types/contentData.types';

interface ContentProps {
  content: ContentData;
  path?: string;
}

const ContentBox = ({ content, path = 'explore' }: ContentProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const { images, alt_text, id } = content;
  const { downsized_still } = images;
  const { url } = downsized_still;

  return (
    <Link
      href={`/${path}/?content=${id}`}
      as={`/c/${id}`}
      scroll={false}
      className="w-[316px] h-[316px] cursor-pointer relative phone:w-[150px] phone:h-[150px]"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      {isHovering && (
        <div className="w-full h-full bg-gray-500 opacity-50 absolute top-0"></div>
      )}

      <Image
        src={url}
        alt={alt_text}
        width="0"
        height="0"
        sizes="100vw"
        className="object-contain w-full h-full"
        unoptimized
      />
    </Link>
  );
};

export default ContentBox;
