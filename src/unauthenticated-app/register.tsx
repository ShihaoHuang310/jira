import { useAuth } from 'context/auth-context';
import React, { FormEvent} from 'react';
import {Form,Input,Button} from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';


export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {

  const {register,user}=useAuth()
  const { run, isLoading } = useAsync(undefined, {throwOnError:true})
  const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"))
      return
    }
    try {
    await run(register(values))
    } catch (e:any) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
  
    <Form.Item name={'username'} rules={[{required:true,message:"请输入注册用户名"}]}>
      {/* <label htmlFor="username">用户名</label> */}
      <Input placeholder={'请输入用户名'} type="text"  id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required:true,message:"请输入注册密码"}]}>
      {/* <label htmlFor="password">密码</label> */}
      <Input placeholder={'请输入密码'} type="text"  id={'password'} />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{required:true,message:"确认密码"}]}>
      {/* <label htmlFor="password">密码</label> */}
      <Input placeholder={'请确认密码'} type="text"  id={'cpassword'} />
    </Form.Item>
    <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
  </Form>
  )
}