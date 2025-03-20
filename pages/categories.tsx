import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IconArrowLeft } from '@tabler/icons-react';
import {
  ErrorView,
  ContentBox,
  CategoriesContent,
  ContentBoxSkeleton,
} from '@/components/partials';
import { GetListCategoryGIF } from '@/service/API/GIF/category.query';
import { GetListSearch } from '@/service/API/GIF/search.query';
import { useScrollPosition } from '@/hooks';
import { ContentData } from '@/types/contentData.types';

const Categories = () => {
  const [timeline, setTimeline] = useState<ContentData[]>([]);

  const router = useRouter();
  const selectedCategories = router.query.cat as string;

  const { offset, setIsFetched, setIsError } = useScrollPosition();

  const { data, isError, error, refetch } = GetListCategoryGIF({});

  const {
    data: searchValue,
    isError: isSearchError,
    error: searchError,
    isFetching,
    isFetched,
    refetch: refetchSearch,
  } = GetListSearch({
    params: {
      limit: 15,
      q: selectedCategories?.split('-').join(' '),
      offset: offset,
    },
    options: {
      enabled: selectedCategories !== undefined,
      queryKey: [selectedCategories, offset],
    },
  });

  const categories = data?.data ?? [];
  const searchList = searchValue?.data ?? [];
  const subCategories =
    categories.filter((value) => value.name_encoded === selectedCategories)[0]
      ?.subcategories ?? [];

  useEffect(() => {
    if (isFetched) {
      setIsFetched(isFetched);
      setTimeline((prev) => [...prev, ...searchList]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

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
    <div className="w-full h-full overflow-hidden">
      {!selectedCategories && (
        <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 py-5 phone:pb-20">
          {categories.map((value) => (
            <CategoriesContent key={value.name} content={value} />
          ))}
        </div>
      )}

      {selectedCategories && (
        <React.Fragment>
          <div className="flex flex-col gap-8 mt-10 w-full phone:gap-5">
            <div className="px-40 flex flex-row items-center gap-3 phone:px-5">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setTimeline([]);
                  router.back();
                }}
              >
                <IconArrowLeft />
              </button>

              <p className="font-bold uppercase text-xl">
                {selectedCategories?.split('-').join(' ')}
              </p>
            </div>

            <div className="flex flex-row gap-5 overflow-x-scroll w-[80%] mx-auto phone:w-[90%]">
              {subCategories.map((value) => (
                <button
                  key={value.name_encoded}
                  className="btn rounded-md"
                  onClick={() => {
                    setTimeline([]);
                    router.push({
                      query: {
                        cat: value.name_encoded,
                      },
                    });
                  }}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-full my-5 flex flex-row flex-wrap gap-5 justify-center">
            {isFetching && (
              <React.Fragment>
                {Array(6)
                  .fill(6)
                  .map((_, index) => (
                    <ContentBoxSkeleton key={index} />
                  ))}
              </React.Fragment>
            )}

            {timeline.map((value) => (
              <ContentBox key={value.id} content={value} path="categories" />
            ))}

            {!isSearchError &&
              Array(6)
                .fill(6)
                .map((_, index) => <ContentBoxSkeleton key={index} />)}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Categories;
