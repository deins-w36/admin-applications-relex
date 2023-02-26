import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authChange } from '../../store/actions'
import { ref, get } from 'firebase/database'

import { db } from '../../firebase'

import './auth.scss'

interface IAuth {
    login: string
    pass: string
}

const Auth: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [auth, setAuth] = useState<IAuth>({ login: '', pass: '' })
    const [info, setInfo] = useState<string | null>(null)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [clazzLogin, setClazzLogin] = useState<string>('input')
    const [clazzPass, setClazzPass] = useState<string>('input')

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/admin-panel')
            return
        }

        //Получени логина и паролья с базы данных
        get(ref(db, '/auth'))
            .then((snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    setAuth(data)
                } else {
                    setInfo('Проблемы с подключением к базе данных')
                }
            })
            .catch((err) => setInfo('Что то пошло не так, повторите попытку позже('))
        // eslint-disable-next-line
    }, [])

    const handleClick = (e: React.FormEvent) => {
        //Проверка формы на введенные даныне
        e.preventDefault()

        if (login.length < 4) {
            setClazzLogin((login) => login + ' misstake')
            setInfo('Длинна логина > 4 символов')
            return
        }
        if (password.length < 3) {
            setClazzPass((pass) => pass + ' misstake')
            setInfo('Длинна пароля > 3 символов!')
            return
        }

        if (login === auth.login && password === auth.pass) {
            //Если пароль и логин сошлись, то переход на страницу админ панели и сохранение состояния
            dispatch(authChange(true))
            localStorage.setItem('auth', 'true')
            navigate('/admin-panel')
            return
        }
        setInfo('Неверные данные для входа!')
    }

    return (
        <main>
            <section className='auth'>
                <div className='auth__title text'>Введите данные для входа Администратора</div>

                <form onSubmit={handleClick}>
                    <div className='auth__item'>
                        <label className='label text' htmlFor='login'>
                            Логин<span className='red'>*</span>
                        </label>
                        <input
                            required
                            className={clazzLogin}
                            type='text'
                            id='login'
                            value={login}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setLogin(e.target.value)
                                setClazzLogin('input')
                                setInfo(null)
                            }}
                        />
                    </div>
                    <div className='auth__item'>
                        <label className='label text' htmlFor='pass'>
                            Пароль<span className='red'>*</span>
                        </label>
                        <input
                            required
                            className={clazzPass}
                            type='password'
                            id='pass'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value)
                                setClazzPass('input')
                                setInfo(null)
                            }}
                        />
                    </div>
                    <div className='auth__info text red'>{info}</div>
                    <button className='auth__submit button button-main text-title'>Войти</button>
                </form>
                <button className='auth__back button text-title' onClick={() => navigate('/')}>
                    Назад
                </button>
            </section>
        </main>
    )
}

export default Auth
