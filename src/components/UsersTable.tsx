import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, InputRef, Space, Table, TableColumnType} from "antd";
import {UsersApi} from "../api";
import {FilterDropdownProps} from "antd/es/table/interface";
import {DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import {DatePicker, DatePickerProps} from "antd/lib";

interface Props {

}

const UsersTable: React.FC<Props> = props => {


    // @ts-ignore
    const {RangePicker} = DatePicker;

    // ФИЛЬТРАЦИЯ
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: any,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    // @ts-ignore
    const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        }
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {

                            clearFilters && handleReset(clearFilters)
                            // @ts-ignore
                            searchInput.current.value = "";
                            selectedKeys[0] = ''
                            setSearchText('');

                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        }
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕЙ И РЕНДЕР
    const [users, setUsers] = useState()
    const [initialUsers, setInitialUsers] = useState()

    const getUsers = async () => {
        const usersData = await UsersApi.getUsers()
        const rolesData = await UsersApi.getRoles()
        usersData.map((user: any) => {
            user.type_id = rolesData[user.type_id - 1].name
        })
        setUsers(usersData)
        setInitialUsers(usersData)
    }

    const deleteUser = async (id: string) => {
        await UsersApi.deleteUser(id)
        await getUsers()
    }

    useEffect(() => {
        if (!users) {
            getUsers()
        }
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: { id: string; }, b: { id: string; }) => Number(a.id) - Number(b.id),
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),

        },
        {
            title: 'Role',
            dataIndex: 'type_id',
            filters: [
                {
                    text: 'Администратор',
                    value: 'Администратор',
                },
                {
                    text: 'Пользователь',
                    value: 'Пользователь',
                },
                {
                    text: 'Гость',
                    value: 'Гость',
                },
                {
                    text: 'Модератор',
                    value: 'Модератор',
                },
                {
                    text: 'Тестировщик',
                    value: 'Тестировщик',
                }
            ],
            //@ts-ignore
            onFilter: (value, record) => record.type_id.startsWith(value as string),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'VisitDate',
            dataIndex: 'last_visit_date',
            key: 'last_visit_date',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text: any, record: any) => {

                return (<DeleteOutlined onClick={() => deleteUser(record.id)}/>)
            }
        }

    ];


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        let firstDate = new Date(dateString[0] + "T00:00:00")
        let secondDate = new Date(dateString[1] + "T00:00:00")

        // @ts-ignore
        const dateFilteredUsers = initialUsers.filter((user: any) => new Date(user.last_visit_date) >= firstDate && new Date(user.last_visit_date <= secondDate))
        if (!date){
            setUsers(initialUsers)
        }
        else {
            setUsers(dateFilteredUsers)
        }
    };

    // @ts-ignore
    return (
        <div style={{width: '80vw', margin: 'auto', position: 'relative'}}>
            <div style={{position: "absolute", right: 0, top: "18px", zIndex: "100np"}}>
                <span style={{paddingRight: "10px"}}>Отсортировать по дате:</span>
                {// @ts-ignore
                <RangePicker onChange={onChange}/>
                }
            </div>
            <Table dataSource={users} columns={columns} pagination={{position: ["topLeft"]}}/>
        </div>
    );
};


export default UsersTable;