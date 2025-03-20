import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconLink, IconCode } from '@tabler/icons-react';
import ErrorView from './ErrorView';
import { GetGIFByID } from '@/service/API/GIF/trending.query';

const ModalContent = () => {
  const [isCopyEmbedUrl, setIsCopyEmbedUrl] = useState(false);

  const router = useRouter();
  const contentID = router.query.content || router.query.id;

  const { data, isError, error, refetch } = GetGIFByID({
    params: {
      gif_id: contentID,
    },
    options: {
      enabled: contentID !== undefined,
      queryKey: [contentID],
    },
  });

  const contentDetail = data?.data;

  const embedLink = `<div style="width:100%;height:0;padding-bottom:54%;position:relative;"><iframe src=${contentDetail?.embed_url} width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href=${contentDetail?.url}>via GIPHY</a></p>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(embedLink);
    setIsCopyEmbedUrl(true);

    setTimeout(() => {
      setIsCopyEmbedUrl(false);
    }, 1500);
  };

  if (isError) {
    return (
      <div className="w-full h-[74vh] flex justify-center">
        <ErrorView
          errorMessage={(error as any)?.response.data.meta.msg}
          refetch={() => {
            refetch();
          }}
        />
      </div>
    );
  }

  if (!contentDetail) {
    return null;
  }

  return (
    <div className="w-full h-[74vh] flex flex-row phone:flex-col">
      <div className="w-[800px] h-full phone:w-full">
        <Image
          src={contentDetail?.images.downsized.url}
          alt={contentDetail?.alt_text}
          width="0"
          height="0"
          sizes="100vw"
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>

      <div className="w-[800px] p-5 phone:w-full">
        <div className="mb-3 flex flex-row items-center gap-2">
          {contentDetail?.user && (
            <>
              <div className="w-[42px] h-[42px]">
                <Image
                  src={contentDetail?.user.avatar_url}
                  alt="avatar"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="object-contain w-full h-full rounded-full"
                  unoptimized
                />
              </div>
              <p className="font-semibold">{contentDetail?.user.username}</p>
            </>
          )}

          {!contentDetail?.user && (
            <>
              <div className="w-[42px] h-[42px] rounded-full bg-gray-500" />
              <p className="font-semibold">Unknown User</p>
            </>
          )}
        </div>

        <p className="my-3">{contentDetail?.title}</p>
        <p>{contentDetail?.alt_text}</p>

        <div className="flex flex-row mt-5 gap-5">
          <Link
            href={contentDetail?.url ?? ''}
            target="_blank"
            className="btn w-full"
          >
            <IconLink /> Ghipy Link
          </Link>
        </div>

        <div className="mt-5">
          <p className="font-semibold">Embed GIFs</p>

          <p className="my-3">
            Want to embed this GIF on your website or blog? Just drop in the
            embed code below and you&apos;re done!
          </p>

          <input
            type="text"
            defaultValue={embedLink}
            className="input focus:hidden phone:w-full"
            readOnly
          />

          <button
            className="btn phone:w-full tablet:w-full"
            onClick={() => {
              handleCopyLink();
            }}
          >
            <IconCode /> {isCopyEmbedUrl ? 'Link Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
