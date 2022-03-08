import React from 'react'
import { useState, useEffect } from "react"
import { useDebounce, useDocumentTitle, useMount } from '../../utils'
import { List } from "./list"
import { SearchPanel } from "./search-planel"
import styled from '@emotion/styled'
import { Typography } from 'antd'

import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 500)
const {isLoading,error,data:list}=useProjects(debounceParam)
  const { data:users}=useUser()
  useDocumentTitle('项目列表',true)
  return (
    <Container>
     
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {
        error ? <Typography.Text type={'danger'}>{ error.message}</Typography.Text> : null
      }

    <List loading={isLoading} users={ users || []} dataSource={ list || []}/>
  </Container>
  )
}

const Container = styled.div`
padding: 3.2rem;
`