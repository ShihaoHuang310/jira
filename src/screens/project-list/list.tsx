import { Table } from 'antd'
import React from 'react'
import { User } from './search-planel'
import dayjs from 'dayjs'
import { TableProps } from "antd/es/table";
import { Link } from 'react-router-dom';
export interface Project{
  id: string,
  name: string,
  personId: string,
  pin: string,
  organization: string
  created:number
}

interface ListProps extends TableProps<Project>{
  // list: Project[],
  users:User[]
}

export const List = ({  users,...props }: ListProps) => {
  return (
    <Table pagination={false} columns={[{
      title: "名称",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value,project) {
        return  <Link to={String(project.id)}>{ project.name}</Link>
      }
    }, {
      title: "部门",
      dataIndex: 'organization',
    }, {
      title: '负责人',
      render(value, project) {
        return <span>
          {users.find(user => user.id === project.personId)?.name || '未知'}
        </span>
      }
    }, {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    }
    ]}
      {...props}
    />
  )
  // return (
  //   <table>
  //   <thead>
  //     <tr>
  //       <th>名称</th>
  //       <th>负责人</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {
  //       list.map(project => <tr key={project.id}>
  //         <td>{ project.name}</td>
  //         <td>{ users.find(user=>user.id === project.personId)?.name || '未知'}</td>
  //       </tr>)
  //     }
  //   </tbody>
  // </table>
  // )
}