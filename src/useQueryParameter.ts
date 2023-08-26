import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryParameter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const testValue = searchParams.get('test') ?? '';
  const handleOnChange = useCallback(
    (value: string) => {
      // 本来はここで値変換等を行った際のテストをしたかった。
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        test: value,
      }));
    },
    [setSearchParams]
  );
  return { testValue, handleOnChange };
};
