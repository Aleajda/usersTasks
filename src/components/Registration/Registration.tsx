import {SubmitHandler, useForm} from "react-hook-form";
import s from "./Registration.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {UsersApi} from "../../api";


interface Props {

}

interface UserData {
    id: string;
    login: string;
    password: string;
    name: string;
    type_id: number;
    last_visit_date: string;
}

const getDate = () =>{
    const date = new Date(); // текущая дата и время
    const pad = (num:number) => String(num).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // месяцы начинаются с 0
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

const Registration:React.FC<Props> = () => {

    let navigate = useNavigate();

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm<UserData>()

    const onSubmit:SubmitHandler<UserData> = async (data:UserData) =>{
        const usersData = await UsersApi.getUsers()
        const newUser = {...data}
        newUser.id = String(Number(usersData[usersData.length - 1].id) + 1)
        newUser.last_visit_date = getDate()
        newUser.type_id = 1
        UsersApi.createUser(newUser)
        reset()
        return navigate("/login")
    }

    return(
        <div className={s.lForm}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={s.formTitle}>Регистрация</h1>
                <div>{errors?.name && <p style={{color: "red"}}>Поле обязательно к заполнению</p>}
                </div>
                <div className={s.formDiv}>
                    <input type="text" className={s.formInput}
                           {...register("name", {required: true})}/>
                    <label className={s.formLabel}>Имя</label>
                </div>
                <div>
                    {errors?.login && <p style={{color: "red"}}>Поле обязательно к заполнению</p>}
                </div>
                <div className={s.formDiv}>
                    <input type="text" className={s.formInput}
                           {...register("login", {required: true})}/>
                    <label className={s.formLabel}>Логин</label>
                </div>
                <div>
                    {errors?.password && <p style={{color: "red"}}>Поле обязательно к заполнению</p>}
                </div>
                <div className={s.formDiv + ' ' + s.formDivPas}>
                    <input type="password" className={s.formInput}
                           {...register("password", {required: true})}/>
                    <label className={s.formLabel}>Пароль</label>
                </div>
                <button className={s.formButton}>Зарегистрировать</button>
                <div className={s.signUpLink}>
                    <NavLink to={"/login"}>Уже есть аккаунт? Войти</NavLink>
                </div>
            </form>
        </div>
    )
}


export default Registration;