import { cancelable, CancelablePromise } from 'cancelable-promise'
import { useEffect, useRef, useState } from 'react'

export type UseFetchOptions = {
  dependencies?: Array<any>
  condition?: boolean
}

export type UsePaginatedFetchOptions = UseFetchOptions & {
  limit?: number
}

const useFetch = (
  promiseFunction?: () => Promise<any>,
  options?: UseFetchOptions,
) => {
  const [res, setRes] = useState<any>(null)
  const [requesting, setRequesting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const promiseRef = useRef<CancelablePromise<any> | null>(null)
  const condition = options?.condition ?? true

  useEffect(() => {
    if (typeof promiseFunction === 'function' && !requesting && condition) {
      setRequesting(true)

      promiseRef.current = cancelable(
        promiseFunction()
          ?.then((data) => setRes(data))
          ?.catch((error) => setError(error))
          ?.finally(() => {
            setRequesting(false)
          }),
      )
    }

    return () => {
      if (promiseRef.current) {
        promiseRef.current.cancel()
      }
    }
  }, [condition, ...(options?.dependencies ?? [])])

  return {
    res,
    requesting,
    error,
  }
}


export default useFetch
