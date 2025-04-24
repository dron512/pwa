import React, {useEffect, useState} from 'react';
import {Button, Table, Tag} from "antd";

function TodoListPage(props) {
    const [todos, setTodos] = useState([
        {"id": 1, "todo": "Do something nice for someone you care about", "completed": false, "userId": 152},
        {"id": 2, "todo": "Do someone you care about", "completed": true, "userId": 152}
    ]);

    useEffect(() => {
        // console.log(todos);
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 80,
            // render : (a,b)=>{
            //     console.log("a = "+a);
            //     console.log("b = "+JSON.stringify(b));
            //     return (<h1>{b.id}</h1>)
            // }
        },
        {
            title: "할일",
            dataIndex: "todo",
            key: "todo",
        },
        {
            title: "완료 여부",
            key: "completed",
            dataIndex: "completed",
            render: (completed, record) => (
                // <select>
                //     { completed ? (<option>완료</option>) : (<option>미완료</option>) }
                // </select>
                <Tag color={completed ? 'green' : 'volcano'}>
                    {completed ? "완료" : "미완료"}
                </Tag>
            )
        },
        {
            title: '사용자',
            dataIndex: "userId",
            key: "userId",
        }
    ];

    const loadData = async () => {
        fetch('https://dummyjson.com/todos')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTodos(data.todos);
            })
    }
    return (
        <div>
            <h1>목록</h1>
            {
                todos.map(todo => {
                    return (<h1 key={todo.id}>{todo.todo}</h1>)
                })
            }
            <Button type="primary" style={{margin:"1rem 0"}} onClick={loadData}>조회</Button>
            <Table dataSource={todos} rowKey="id" columns={columns}>
            </Table>
        </div>
    );
}

export default TodoListPage;