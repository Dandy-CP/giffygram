import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [offset, setOffset] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [isError, setIsError] = useState(false);

  const debounce = (func: (...args: any) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return function (...args: any) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleScroll = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;

    if (!isFetched && !isError && scrollHeight - 300 < scrollY + innerHeight) {
      setOffset((prev) => prev + 15);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 1000), {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { offset, setOffset, setIsFetched, setIsError };
};

export default useScrollPosition;
