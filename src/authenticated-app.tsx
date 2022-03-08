import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Routes } from 'react-router'
import {HashRouter as Router} from 'react-router-dom';
import { ProjectScreen } from 'screens/project'
export const AuthenticatedApp = () => {
  return (
    <div>
     <PageHeader/>
      <Main>
        <Router >
          <Routes>
            <Route   path={"/projects"}  element={<ProjectListScreen />}  />
            <Route path={"/projects/:projectId/*"} element={ <ProjectScreen/>}/>
          </Routes>
       </Router>
      </Main>
  </div>
  )
}

const PageHeader = () => {
  const {logout ,user}=useAuth()
  return (
    <Header between={true}>
    <HeaderLeft gap={true}>
      <SoftwareLogo width={'18rem'} color={ 'rgb(38,132,255)'}/>
      <h3>项目</h3>
      <h3>用户</h3>
    </HeaderLeft>
    <HeaderRight>
      {/* <button onClick={logout}>登出</button> */}
      <Dropdown overlay={<Menu>
        <Menu.Item key={'logout'}>
          <Button type={'link'} onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
        <Button type={'link'} onClick={(e)=>e.preventDefault()}>Hi,{ user?.name}</Button>
      </Dropdown>
    </HeaderRight>
  </Header>
  )
}


const Container =styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 0 5px 0 rgba(0, 0,0,0.1);
z-index: 1;
  /* grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
`
const HeaderLeft = styled(Row)`
  /* display: flex;
  align-items: center; */
`

const HeaderRight = styled.div`
  
`

// const PageHeader = styled.header`
// background-color: gray;
//   height: 6rem;
// `

const Main = styled.main`
grid-area: main;
`