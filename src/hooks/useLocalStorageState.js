import { useState } from 'react';

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    // ローカルストレージから初期値を取得
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageState = (value) => {
    setState((prevState) => {
      // 新しい状態を計算
      const newState =
        typeof value === 'function' ? value(prevState) : value; // 関数の場合、現在の状態を引数にして呼び出し

      // ローカルストレージに新しい状態を保存
      localStorage.setItem(key, JSON.stringify(newState));

      // 新しい状態を返して状態を更新
      return newState;
    });
  };

  return [state, setLocalStorageState];
}
