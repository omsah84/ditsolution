'use client';

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

interface DataContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

export const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
  fetchData: () => {}
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname(); // only changes on route change

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/data'); // Replace with your API
      setData(res.data);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      fetchData();
    }
  }, [pathname, fetchData]); // will only run when path actually changes

  return (
    <DataContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
