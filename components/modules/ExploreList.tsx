import React, { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { ContentBox, ErrorView, ContentBoxSkeleton } from '../partials';
import { useScrollPosition, useDebounce } from '@/hooks';
import { GetListTrendingGIF } from '@/service/API/GIF/trending.query';
import { GetListSearch } from '@/service/API/GIF/search.query';
import { ContentData } from '@/types/contentData.types';

const ExploreList = () => {
  const [querySearch, setQuerySearch] = useState('');
  const [trendingTimeline, setTrendingTimeline] = useState<ContentData[]>([]);
  const [searchTimeline, setSearchTimeline] = useState<ContentData[]>([]);

  const queryValue = useDebounce(querySearch, 1000);
  const { offset, setOffset, setIsFetched, setIsError } = useScrollPosition();

  const { data, isFetching, isFetched, isError, error, refetch } =
    GetListTrendingGIF({
      params: {
        limit: 15,
        offset: offset,
      },
      options: {
        enabled: queryValue.length === 0,
        queryKey: [offset],
      },
    });

  const {
    data: searchValue,
    isError: isSearchError,
    error: searchError,
    isFetching: isSearchFetching,
    isFetched: isSearchFetched,
    refetch: refetchSearch,
  } = GetListSearch({
    params: {
      limit: 15,
      q: queryValue,
      offset: offset,
    },
    options: {
      enabled: queryValue.length !== 0 && offset === 0,
      queryKey: [queryValue, offset],
    },
  });

  const exploreList = data?.data ?? [];
  const searchList = searchValue?.data ?? [];

  useEffect(() => {
    if (queryValue.length !== 0) {
      setOffset(0);
      setTrendingTimeline([]);
    }

    if (queryValue.length === 0) {
      setOffset(0);
      setSearchTimeline([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue]);

  useEffect(() => {
    if (isFetched) {
      setIsFetched(isFetched);
      setTrendingTimeline((prev) => [...prev, ...exploreList]);
    }

    if (isSearchFetched) {
      setIsFetched(isSearchFetched);
      setSearchTimeline((prev) => [...prev, ...searchList]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, isSearchFetched]);

  if (isError || isSearchError) {
    return (
      <ErrorView
        isError={isError || isSearchError}
        setIsError={setIsError}
        errorMessage={
          error?.response.data.meta.msg || searchError?.response.data.meta.msg
        }
        refetch={() => {
          if (isError) {
            refetch();
          } else {
            refetchSearch();
          }
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <label className="input w-1/2 mt-5 rounded-xl phone:w-[80%]">
          <IconSearch />
          <input
            type="search"
            placeholder="Search GIF"
            onChange={(event) => {
              setQuerySearch(event.target.value);
            }}
          />
        </label>
      </div>

      <div className="w-full h-full my-5 flex flex-row flex-wrap gap-5 justify-center">
        {(isFetching || isSearchFetching) && (
          <React.Fragment>
            {Array(6)
              .fill(6)
              .map((_, index) => (
                <ContentBoxSkeleton key={index} />
              ))}
          </React.Fragment>
        )}

        {queryValue.length === 0 && (
          <React.Fragment>
            {trendingTimeline.map((value) => (
              <ContentBox key={value.id} content={value} />
            ))}
          </React.Fragment>
        )}

        {queryValue.length !== 0 && (
          <React.Fragment>
            {searchTimeline.map((value) => (
              <ContentBox key={value.id} content={value} />
            ))}
          </React.Fragment>
        )}

        {!isError && (
          <React.Fragment>
            {Array(6)
              .fill(6)
              .map((_, index) => (
                <ContentBoxSkeleton key={index} />
              ))}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExploreList;
