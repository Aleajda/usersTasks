import {SubmitHandler, useForm} from "react-hook-form";
import s from "./Login.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {UsersApi} from "../../api";
import {useAppDispatch} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";


interface Props {

}

interface UserData {
    login: string;
    password: string;
}

const Login:React.FC<Props> = () => {

    let navigate = useNavigate();

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm<UserData>()

    const dispatch = useAppDispatch();
    const setUser = userSlice.actions.setUser;

    const onSubmit:SubmitHandler<UserData> = async (data) =>{
        const usersRoles = await UsersApi.getRoles()
        const user = await UsersApi.login(data.login, data.password)
        const role = usersRoles[user.type_id - 1].name
        delete user.type_id
        user.role = role
        dispatch(setUser(user))
        reset()
        return navigate('/profile')
    }

    return(
        <div className={s.lForm}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={s.formTitle}>Вход</h1>
                <div>
                    {errors?.login && <p style={{color: "red"}}>Поле обязательно к заполнению</p> }
                </div>
                <div className={s.formDiv}>
                    <input  type="text" className={s.formInput}
                           {...register("login", {required: true})}/>
                    <label  className={s.formLabel}>Логин</label>
                </div>
                <div>
                    {errors?.password && <p style={{color: "red"}}>Поле обязательно к заполнению</p>}
                </div>
                <div className={s.formDiv + ' ' + s.formDivPas}>
                    <input type="password" className={s.formInput}
                           {...register("password", {required: true})}/>
                    <label className={s.formLabel}>Пароль</label>
                </div>
                <button className={s.formButton}>Войти</button>
                <div className={s.signUpLink}>
                    <NavLink to={"/reg"}>Еще нет аккаунта? Регистрация</NavLink>
                </div>
            </form>
        </div>
    )
}


export default Login;