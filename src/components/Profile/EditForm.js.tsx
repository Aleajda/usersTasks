import React from 'react';
import type {FormProps} from 'antd';
import {Button, Checkbox, Form, Input} from 'antd';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {UsersApi} from "../../api";
import {userSlice} from "../../store/reducers/UserSlice";

type FieldType = {
    login: string;
    password: string;
    name: string;
}



const EditForm: React.FC<any> = (props) => {

    const dispatch = useAppDispatch();
    const setUser = userSlice.actions.setUser;
    const currentUserID = useAppSelector(state => state.userReduser.id)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        await UsersApi.editUser(currentUserID, values);
        const usersRoles = await UsersApi.getRoles()
        const user = await UsersApi.login(values.login, values.password)
        const role = usersRoles[user.type_id - 1].name
        delete user.type_id
        user.role = role
        dispatch(setUser(user))
        props.setEditMode(false);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Login"
                name="login"
                rules={[{required: true, message: 'Обязательно к заполнению'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{required: true, message: 'Обязательно к заполнению'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{required: true, message: 'Обязательно к заполнению'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default EditForm;