import { User } from './screens/project-list/search-planel'
const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () =>
  window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}
//登录
export const login = (data: {
  username: string
  password: string
}) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}

//注册
export const register = (data: {
  username: string
  password: string
}) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}
//退出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
