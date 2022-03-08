import { useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { User } from 'screens/project-list/search-planel'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUser = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
  }, [param])
  return result
}
