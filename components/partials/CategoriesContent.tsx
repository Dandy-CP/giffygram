import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Categories } from '@/types/category.types';

interface ContentProps {
  content: Categories;
}

const CategoriesContent = ({ content }: ContentProps) => {
  const router = useRouter();
  const { name_encoded, name, gif } = content;
  const { images } = gif;
  const { downsized } = images;
  const { url } = downsized;

  return (
    <button
      className="relative w-[300px] h-[150px] cursor-pointer"
      onClick={() => {
        router.push({
          query: {
            cat: name_encoded,
          },
        });
      }}
    >
      <div className="bg-black opacity-50 absolute w-full h-full"></div>

      <div className="absolute flex items-center justify-center w-full h-full">
        <p className="font-semibold text-xl text-white">{name}</p>
      </div>

      <Image
        src={url}
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className="object-cover w-full h-full"
        unoptimized
      />
    </button>
  );
};

export default CategoriesContent;
