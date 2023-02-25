import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'

import { IApplicationArchive } from '../../types'
import { db } from '../../firebase'
import ArchiveItem from './Archive-item'

import '../admin/admin.scss'
import './archive.scss'

const Archive: FC = () => {
    const navigate = useNavigate()
    const [archiveData, setArchiveData] = useState<IApplicationArchive[]>([])
    const [visibleArchiveData, setVisibleArchiveData] = useState<IApplicationArchive[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')

    //Получение заявок и сортировка по дате
    //В этом случае решил сделать по другому подходу, без использования redux
    useEffect(() => {
        setLoading(true)
        onValue(ref(db, '/applications-archive'), (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                let arrSort: IApplicationArchive[] = Object.values(data)
                arrSort.sort(function (a, b) {
                    return b.dateApplicationCreate - a.dateApplicationCreate
                })
                console.log('fetch')

                setArchiveData(arrSort)
                setLoading(false)
                setError(null)
            } else {
                setError('В архиве нет заявок')
                setLoading(false)
            }
        })
    }, [])

    //Поиск по архивным заявкам
    useEffect(() => {
        if (search.length === 0) {
            setVisibleArchiveData(archiveData)
            console.log('search')
            return
        }
        setVisibleArchiveData(archiveData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())))
        // eslint-disable-next-line
    }, [search, archiveData])

    return (
        <main>
            <section className='archive'>
                <div className='archive__title text'>Архив заявок</div>

                <div className='archive__search'>
                    <input
                        type='text'
                        className='input search'
                        placeholder='Поиск по имени и фамилии'
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                    <button className='button text-title search' onClick={() => setSearch('')}>
                        Стереть
                    </button>
                </div>

                <div className='admin__wrapper'>
                    {archiveData ? visibleArchiveData.map((item) => <ArchiveItem key={item.id} {...item} />) : null}
                    {error ? <div className='admin text'>{error}</div> : null}
                    {loading ? <div className='admin text'>Загрузка...</div> : null}
                </div>

                <button className='admin__back button text-title' onClick={() => navigate(-1)}>
                    Назад
                </button>
            </section>
        </main>
    )
}

export default Archive
