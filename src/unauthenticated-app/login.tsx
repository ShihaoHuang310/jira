import { useAuth } from 'context/auth-context';
import React, { FormEvent} from 'react';
import {Form,Input,Button} from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {

  const {login,user}=useAuth()
  const { run, isLoading } = useAsync(undefined, {throwOnError:true})
  const handleSubmit = async (values: {username:string,password:string}) => {
    try {
    // await login(values)
     await run(login(values))
    } catch (e:any) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
      {/* <label htmlFor="username">用户名</label> */}
      <Input placeholder={'用户名'} type="text"  id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
      {/* <label htmlFor="password">密码</label> */}
      <Input placeholder={'密码'} type="text"  id={'password'} />
    </Form.Item>
    <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
  </Form>
  )
}