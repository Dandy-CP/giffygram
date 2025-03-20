import React from 'react';
import Image from 'next/image';
import { ContentData } from '@/types/contentData.types';

interface ContentProps {
  content: ContentData;
}

const Content = ({ content }: ContentProps) => {
  const { user, images, alt_text, title } = content;
  const { downsized } = images;
  const { url, width, height } = downsized;

  return (
    <div className="w-[470px] phone:w-full">
      <div className="mb-3 flex flex-row items-center gap-2">
        {user && (
          <React.Fragment>
            <div className="w-[42px] h-[42px]">
              <Image
                src={user.avatar_url}
                alt="avatar"
                width="0"
                height="0"
                sizes="100vw"
                className="object-contain w-full h-full rounded-full"
                unoptimized
              />
            </div>
            <p className="font-semibold">{user.username}</p>
          </React.Fragment>
        )}

        {!user && (
          <React.Fragment>
            <div className="w-[42px] h-[42px] rounded-full bg-gray-500" />
            <p className="font-semibold">Unknown User</p>
          </React.Fragment>
        )}
      </div>

      <div
        style={{
          width: width,
          height: height,
        }}
      >
        <Image
          src={url}
          alt={alt_text}
          width="0"
          height="0"
          sizes="100vw"
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>

      <p className="my-2 font-semibold">{title}</p>
    </div>
  );
};

export default Content;
