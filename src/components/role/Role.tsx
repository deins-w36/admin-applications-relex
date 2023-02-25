import { FC } from 'react'
import { Link } from 'react-router-dom'

import './role.scss'

const Role: FC = () => {
    return (
        <main>
            <section className='role'>
                <div className='role__title text'>Выберите вашу роль:</div>
                <Link to='/create-application' className='role__patient text'>
                    Пациент
                </Link>
                <Link to='/auth-admin' className='role__admin text'>
                    Администратор
                </Link>
            </section>
        </main>
    )
}

export default Role
