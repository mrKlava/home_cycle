import { useEffect, useState } from 'react'

/**
 * ### Fetch Data
 * 
 * Can provide 
 * 
 * @param {function(): Promise<APIResponse>} api 
 * @returns 
 */
function useFetchData(api) {
  const [data, setData] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [code, setCode] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        const {respData, status} = await api()

        setData(respData.data)
        setMessage(respData.message)
        setError(respData.error)
        setCode(status)

        setIsLoading(false)
      } catch (error) {
        setIsLoading('')
        setIsLoading('')
        setIsLoading(false)

        throw (error)
      }
    }

    fetchData()
  }, [])

  return {data, message, error, code, isLoading}
}

export default useFetchData