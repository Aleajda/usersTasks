import axios from "axios";

interface User {
    id: string;
    login: string;
    password: string;
    name: string;
    type_id: number;
    last_visit_date: string;
}

export const UsersApi = {

    getUsers() {
        try {
            return axios.get('http://localhost:5000/users').then(res =>{
                const response:any = res.data;
                return response;
            });
        }catch (e){
            console.error(e);
        }
    },

    async getRoles(): Promise<any> {
        try {
            return axios.get('http://localhost:5000/roles').then(res =>{
                const response:any = res.data;
                return response;
            });
        }catch (e){
            console.error(e);
        }
    },

    async createUser(user: User): Promise<any> {
        try {
            return axios.post('http://localhost:5000/users', user).then((res)=>{
                alert("Пользователь успешно зарегистрирован!");
            });
        }catch (e){
            console.error(e);
        }
    },

    async login(login:string, password:string): Promise<any> {
        try {
            return axios.get(`http://localhost:5000/users?login=${login}&password=${password}`).then(res =>{
                const response:any = res.data;
                return response[0];
            });
        }catch (e){
            alert("Неверный логин или пароль")
        }
    },

    async deleteUser(id: string): Promise<any> {
        try {
            return axios.delete(`http://localhost:5000/users/${id}`).then(res =>{
                const response:any = res.data;
                return response;
            });
        }catch (e){
            alert("Неверный логин или пароль")
        }
    },
    async editUser(id: string | null, user: any): Promise<any> {
        try {
            return axios.patch(`http://localhost:5000/users/${id}`, user).then(res =>{
                const response:any = res.data;
                return response;
            });
        }catch (e){
            alert("Неверный логин или пароль")
        }
    },

}