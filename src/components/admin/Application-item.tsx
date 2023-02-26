import { FC, useState } from 'react'
import { ref, set, remove } from 'firebase/database'
import { useDispatch } from 'react-redux'

import { DeleteApplication } from '../../store/actions'
import { db } from '../../firebase'
import { IApplication } from '../../types'

import './admin.scss'

const ApplicationItem: FC<IApplication> = ({
    name,
    date,
    email,
    id,
    time,
    levelSymptoms,
    phone,
    complaintsArray,
    dateApplicationCreate
}) => {
    const dispatch = useDispatch()
    const [actionSelect, setActionSelect] = useState<string>('Выбор действия')

    //Добавление в бд архивных заявок и удаление из бд заяков ожидающих подтверждения
    const handleClick = () => {
        const action: string = actionSelect

        set(ref(db, `/applications-archive/${id}`), {
            id,
            complaintsArray,
            date,
            email,
            levelSymptoms,
            time,
            name,
            phone,
            action,
            dateApplicationCreate
        })
            .then(() => remove(ref(db, `/applications-queue/${id}`)))
            .catch((err) => console.error(err))
        dispatch(DeleteApplication(id))
    }

    return (
        <div className='admin__item text'>
            <div className='admin__item__small-wrapp'>
                <div className='admin__item__left'>
                    <div className='admin__item__id'>id заявки - {id}</div>
                    <div className='admin__item__hard'>Тяжесть симптомов - {levelSymptoms}</div>
                    <div className='admin__item__date'>
                        Дата и время посещения - {date} / {time}
                    </div>
                </div>
                <div className='admin__item__right'>
                    <div className='admin__item__name'>Имя фамилия - {name}</div>
                    <div className='admin__item__phone'>Номер телефона - {phone}</div>
                    <div className='admin__item__email'>Email - {email}</div>
                </div>
            </div>
            <div className='admin__item__complaints'>Жалобы - {complaintsArray.join(', ')}</div>
            <div className='admin__item__date-create'>
                Дата и время создания заявки - {new Date(dateApplicationCreate).toLocaleString()}
            </div>

            <select
                required
                className='input'
                id='req'
                value={actionSelect}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setActionSelect(e.target.value)}
            >
                <option>Выбор действия</option>
                <option value='Запись к врачу подтверждена' className='green'>
                    Запись к врачу подтверждена
                </option>
                <option value='Запись отменена' className='red'>
                    Запись отменена
                </option>
            </select>

            {actionSelect !== 'Выбор действия' ? (
                <button className='button text-title' onClick={() => handleClick()}>
                    Подтвердить
                </button>
            ) : null}
        </div>
    )
}
export default ApplicationItem
