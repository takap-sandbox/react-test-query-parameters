import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useQueryParameter } from './useQueryParameter';

const Wrapper = ({
  children,
  params,
}: {
  children: ReactNode;
  params?: string;
}) => (
  <MemoryRouter initialEntries={params ? [`/?${params}`] : undefined}>
    {children}
  </MemoryRouter>
);

describe('useQueryParameterのテスト', () => {
  test('testのクエリパラメータが存在しない場合は空文字', () => {
    const { result } = renderHook(() => useQueryParameter(), {
      wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
    });
    expect(result.current.testValue).toBe('');
  });
  test('testのクエリパラメータが存在する場合、testValueが同値となっている', () => {
    const { result } = renderHook(() => useQueryParameter(), {
      wrapper: ({ children }) => (
        <Wrapper params='test=value'>{children}</Wrapper>
      ),
    });
    expect(result.current.testValue).toBe('value');
  });
  test('inputの値を変更した際、クエリパラメータに反映されている', () => {
    const { result } = renderHook(() => useQueryParameter(), {
      wrapper: ({ children }) => (
        <Wrapper params='test=value'>{children}</Wrapper>
      ),
    });
    expect(result.current.testValue).toBe('value');
    act(() => {
      result.current.handleOnChange('お酒飲みたい');
    });
    expect(result.current.testValue).toBe('お酒飲みたい');
  });
});
