import React, { useEffect, useState } from 'react';
import { Content, ContentSkeleton, ErrorView } from '../partials';
import { useScrollPosition } from '@/hooks';
import { GetListTrendingGIF } from '@/service/API/GIF/trending.query';
import { ContentData } from '@/types/contentData.types';

const ContentList = () => {
  const [timeline, setTimeline] = useState<ContentData[]>([]);
  const { offset, setIsError, setIsFetched } = useScrollPosition();

  const { data, isFetching, isFetched, isError, error, refetch } =
    GetListTrendingGIF({
      params: {
        limit: 15,
        offset: offset,
      },
      options: {
        queryKey: [offset],
      },
    });

  const timelineList = data?.data ?? [];

  useEffect(() => {
    if (isFetched) {
      setIsFetched(isFetched);
      setTimeline((prev) => [...prev, ...timelineList]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  if (isError) {
    return (
      <ErrorView
        isError={isError}
        setIsError={setIsError}
        errorMessage={error?.response.data.meta.msg}
        refetch={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full h-full mt-5">
      {isFetching && (
        <React.Fragment>
          {Array(3)
            .fill(3)
            .map((_, index) => (
              <ContentSkeleton key={index} />
            ))}
        </React.Fragment>
      )}

      {timeline.map((value) => (
        <Content key={value.id} content={value} />
      ))}

      {!isError && (
        <div className="mb-10 phone:w-full phone:mb-24">
          <ContentSkeleton />
        </div>
      )}
    </div>
  );
};

export default ContentList;
