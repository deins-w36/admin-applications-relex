import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { authChange } from '../../store/actions'

import './header.scss'

const Header: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { auth } = useTypedSelector((store) => store)

    useEffect(() => {
        //Проверкa что бы нельзя было войти в панель админа без введенного пароля
        if (window.location.href === 'http://localhost:3000/admin-panel' && auth === false) {
            navigate('/auth-admin')
            return
        }
        if (window.location.href === 'http://localhost:3000/archive-applications' && auth === false) {
            navigate('/auth-admin')
            return
        }
        // eslint-disable-next-line
    }, [window.location.href])

    return (
        <header className='header'>
            <div className='header__title text text-title'>Web - приложение записи на осмотр терапевта</div>
            <div
                className='header__exit text text-title'
                onClick={() => {
                    localStorage.removeItem('auth')
                    dispatch(authChange(false))
                    navigate('/')
                }}
            >
                {auth ? 'Выход' : ''}
            </div>
        </header>
    )
}

export default Header
