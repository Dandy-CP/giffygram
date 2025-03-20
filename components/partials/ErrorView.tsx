import React, { useEffect } from 'react';
import { IconRefresh } from '@tabler/icons-react';

interface ErrorViewProps {
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage?: string;
  refetch: () => void;
}

const ErrorView = ({
  errorMessage,
  isError = false,
  setIsError,
  refetch,
}: ErrorViewProps) => {
  useEffect(() => {
    setIsError && setIsError(isError);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <div className="flex flex-col justify-center gap-5 h-screen w-full items-center phone:h-[80vh] tablet:h-[80vh]">
      <div className="text-center">
        <p className="font-bold text-xl">Opss Something Wrong</p>
        <p className="font-semibold my-2">{errorMessage}</p>
      </div>

      <button
        className="btn"
        onClick={() => {
          refetch();
        }}
      >
        <IconRefresh />
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
