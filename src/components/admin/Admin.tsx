import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ApplicationsFetching, ApplicationsFetchingSuccess, ApplicationsFetchingErorr } from '../../store/actions'
import { db } from '../../firebase'
import { IApplication } from '../../types'

import ApplicationItem from './Application-item'
import './admin.scss'

const Admin: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { applications, loading, error } = useTypedSelector((store) => store)

    //Получение заявок и сортировка по дате
    useEffect(() => {
        dispatch(ApplicationsFetching())
        onValue(ref(db, '/applications-queue'), (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                let arrSort: IApplication[] = Object.values(data)
                arrSort.sort(function (a, b) {
                    return b.dateApplicationCreate - a.dateApplicationCreate
                })
                dispatch(ApplicationsFetchingSuccess(Object.values(arrSort)))
            } else {
                dispatch(ApplicationsFetchingErorr('Заявок нет'))
            }
        })
        // eslint-disable-next-line
    }, [])
    return (
        <main>
            <section className='admin'>
                <div className='admin__title text'>Заявки ожидающие подтверждения</div>
                <div className='admin__wrapper'>
                    {applications
                        ? applications.map((item: IApplication) => <ApplicationItem key={item.id} {...item} />)
                        : null}

                    {error ? <div className='admin text'>{error}</div> : null}
                    {loading ? <div className='admin text'>Загрузка...</div> : null}
                </div>

                <button className='admin__back button text-title' onClick={() => navigate('/')}>
                    На главную
                </button>
                <button className='admin__arch button text-title' onClick={() => navigate('/archive-applications')}>
                    Архив заявок
                </button>
            </section>
        </main>
    )
}

export default Admin
