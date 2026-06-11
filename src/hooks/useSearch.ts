

import  {searchUsers} from '../actions/user'




import { useState, useEffect } from 'react'

// import {useQueryData} from "./userQueryData"

import {useQueryData} from './useQueryData'

export const useSearch = (key: string, type: 'USERS') => {
  const [query, setQuery] = useState('')
  const [debounce, setDebounce] = useState('')
  const [onUsers, setOnUsers] = useState<
    | {
        id: string
        subscription: {
          plan: 'PRO' | 'FREE'
        } | null
        firstname: string | null
        lastname: string | null
        image: string | null
        email: string | null
      }[]
    | undefined
  >([])

  // Input field ke change event ko handle karne ka function
  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // 1. Debouncing Effect: Har keystroke par API call rokne ke liye 1 second ka delay
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query)
    }, 1000)

    return () => clearTimeout(delayInputTimeoutId)
  } ,[query])

  // 2. React Query Data Fetcher: Jo database action ko trigger karta hai
  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }: { queryKey: any }) => {
      if (type === 'USERS') {
        const users = await searchUsers(queryKey[1] as string)
        if (users.status === 200 && users.data) {
          setOnUsers(users.data)
        }
        return users
      }
      return null
    },
    false
  )

  // 3. Auto Trigger: Jab bhi user typing rokay (debounce update ho), tab fetch call ho
  useEffect(() => {
    if (debounce) refetch()
    if (!debounce) setOnUsers(undefined)
  }, [debounce])

  // UI components mein use karne ke liye functions aur states return karna
  return { onSearchQuery, query, isFetching, onUsers }
}