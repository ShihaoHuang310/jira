import { useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'
// import { Project } from "types/project";
export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))

    // setIsLoading(true)
    // client('projects', { data: cleanObject(debounceParam) }).then(setList)
    //   .catch(() => {
    //     setList([])
    //     setError(error)
    //   })
    //   .finally(() => { setIsLoading(false) })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}
