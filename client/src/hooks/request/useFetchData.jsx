import { useEffect, useState } from 'react';

/**
 * ### Fetch Data
 * 
 * Can provide 
 * 
 * @param {function(): Promise<APIResponse>} api 
 * @returns 
 */
function useFetchData(api, args=[]) {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const resp = await api(...args);

        setData(resp.data);
        setMessage(resp.message);
        setError(resp.error);
        setCode(resp.code);

        setIsLoading(false);
      } catch (error) {
        setError('');
        setMessage('');
        setIsLoading(false);

        throw (error);
      }
    }

    fetchData();
  }, [])

  return {data, message, error, code, isLoading, setData};
}

export default useFetchData;