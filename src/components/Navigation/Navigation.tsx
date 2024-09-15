import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {NavLink, useLocation} from "react-router-dom";
import UserSlice, {userSlice} from "../../store/reducers/UserSlice";
import {useAppSelector} from "../../hooks/redux";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <NavLink to={"/"}>Главная</NavLink>,
        key: '',
    },
    {
        label: <NavLink to={"/login"}>Вход</NavLink>,
        key: 'login',
    },
    {
        label: <NavLink to={"/reg"}>Регистрация</NavLink>,
        key: 'reg',

    },
    {
        label: <NavLink to={"/profile"}>Профиль</NavLink>,
        key: 'profile',

    },

];

const Navigation: React.FC = () => {

    const currentUser = useAppSelector(state => state.userReduser.name)

    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname.slice(1));
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };


    useEffect(() => {
        // Обновляем состояние 'current' при изменении 'location.pathname'
        setCurrent(location.pathname.slice(1));
    }, [location.pathname]);

    return(
        <div style={{position: "relative"}}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
            <span style={{position: "absolute", right: "25px", top: "50%", transform: "translateY(-50%)"}}>
                {currentUser?currentUser:"не авторизован"}
            </span>
        </div>
    )
};

export default Navigation;