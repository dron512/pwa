import {useState} from 'react';
import './App.css';
import {a, Users} from './Users.js';
import UserComponent from "./components/UserComponent.jsx";

function App() {
    const mUsers = new Users();
    const [count, setCount] = useState(0)
    const [users, setUsers] = useState(mUsers.users);

    const addCount = () => {
        setCount(count + 1);
    }
    return (
        <>
            <h1>count = {count}</h1>
            <button onClick={addCount}>카운트증가</button>
            {
                users.map(user => (
                    <UserComponent
                        id={user.id}
                        name={user.name}
                        email={user.email}
                    ></UserComponent>
                ))
            }
        </>
    )
}

export default App
