import { FC } from 'react'

import { IApplicationArchive } from '../../types'

import '../admin/admin.scss'

const ArchiveItem: FC<IApplicationArchive> = ({
    action,
    complaintsArray,
    date,
    email,
    id,
    time,
    levelSymptoms,
    name,
    phone,
    dateApplicationCreate
}) => {
    const color: string = action === 'Запись к врачу подтверждена' ? 'green' : 'red'

    return (
        <div className='admin__item text'>
            <div className='admin__item__small-wrapp'>
                <div className='admin__item__left'>
                    <div className='admin__item__id'>Номер заявки - {id}</div>
                    <div className='admin__item__hard'>Тяжесть симптомов - {levelSymptoms}</div>
                    <div className='admin__item__date'>Дата и время посещения - {date} / {time}</div>
                </div>
                <div className='admin__item__right'>
                    <div className='admin__item__name'>Имя фамилия - {name}</div>
                    <div className='admin__item__phone'>Номер телефона - {phone}</div>
                    <div className='admin__item__email'>Email - {email}</div>
                </div>
            </div>
            <div className='admin__item__complaints'>Жалобы - {complaintsArray.join(', ')}</div>

            <div className={`admin__item__arch`}>
                <span className={`${color}`}>{action}</span>
                {' Дата и время создания заявки ' + new Date(dateApplicationCreate).toLocaleString()}
            </div>
        </div>
    )
}

export default ArchiveItem
