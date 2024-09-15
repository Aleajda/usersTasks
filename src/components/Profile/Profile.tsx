import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {Button, type FormProps} from "antd";
import EditForm from "./EditForm.js";

export interface UserData {
    login: string;
    password: string;
    name: string;
}

const Profile = () => {

    const [editMode, setEditMode] = React.useState(false);

    const currentUser = useAppSelector(state => state.userReduser)

    return (
        <div style={{width:"50vw", height: "50vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            {currentUser.id
                ?
                editMode ?
                    <div>
                        <EditForm setEditMode={setEditMode} />
                    </div>
                    :
                    <div>
                        <h1>Profile</h1>
                        <p>Логин: {currentUser.login}</p>
                        <p>Роль: {currentUser.password}</p>
                        <p>Имя: {currentUser.name}</p>
                        <p>Роль: {currentUser.role}</p>
                        <Button type="primary" onClick={() => setEditMode(true)}>
                            Edit
                        </Button>
                    </div>
                :
                <div>
                    <h1>Profile</h1>
                    <p>Пользователь не авторизован</p>
                </div>
            }

        </div>
    );
};


export default Profile;