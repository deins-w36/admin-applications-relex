import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, set } from 'firebase/database'
import { uid } from 'uid'

import { db } from '../../firebase'

import './patient.scss'

interface IInfo {
    text: string
    color: string
}

const Patient: FC = () => {
    const navigate = useNavigate()
    const [levelSymptoms, setLevelSymptoms] = useState<string>('')
    const [dateInWrongFormat, setDateInWrongFormat] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [complaints, setComplaints] = useState<string>('')
    const [check1, setCheck1] = useState<boolean>(false)
    const [check2, setCheck2] = useState<boolean>(false)
    const [check3, setCheck3] = useState<boolean>(false)
    const [check4, setCheck4] = useState<boolean>(false)

    const [info, setInfo] = useState<IInfo>({ text: '', color: 'patient__info text' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        //Проверка на введенные данные
        if (new Date(dateInWrongFormat).valueOf() < new Date().valueOf()) {
            setInfo({ ...info, text: 'Вы не можете выбрать сегодняшюю дату' })
            return
        }
        if (name.split(' ').length <= 1) {
            setInfo({ ...info, text: 'Введите имя И фамилию' })
            return
        }
        if (+time.split(':')[0] <= 7 || +time.split(':')[0] >= 18) {
            setInfo({ ...info, text: 'Выберите диапазон времени с 8 до 17' })
            return
        }
        if (phone.length <= 10) {
            setInfo({ ...info, text: 'Телефон должен быть не менее 11 символов' })
            return
        }
        if (!complaints && !check1 && !check2 && !check3 && !check4) {
            setInfo({ ...info, text: 'Введите жалобы или выберите из списка' })
            return
        }

        //Изменяем формат даты с yyyy-mm-dd на dd.mm.yyyy
        let date = dateInWrongFormat.split('-').reverse().join('.')

        //Если не указан email
        let email: string = mail ? mail : 'Не указан'

        //Провека чекбоксов на активирование
        let complaintsArray: string[] = []
        if (complaints) {
            complaintsArray.push(complaints)
        }
        if (check1) {
            complaintsArray.push('Повышение температуры более 37 градусов')
        }
        if (check2) {
            complaintsArray.push('Болезненные ощущения и дискомфорт в любой области тела')
        }
        if (check3) {
            complaintsArray.push('Кашель, насморк, боль в горле')
        }
        if (check4) {
            complaintsArray.push('Головные боли в течение длительного времени')
        }

        //Добавление в бд
        const id = uid()
        set(ref(db, `/applications-queue/${id}`), {
            id,
            complaintsArray,
            date,
            email,
            levelSymptoms,
            time,
            name,
            phone,
            dateApplicationCreate: new Date().valueOf()
        })

        //Отчистка формы
        setLevelSymptoms('')
        setDateInWrongFormat('')
        setName('')
        setPhone('')
        setMail('')
        setTime('')
        setComplaints('')
        setCheck1(false)
        setCheck2(false)
        setCheck3(false)
        setCheck4(false)
        setInfo({ color: 'green', text: 'Ваша зявка успешно отправлена!' })
    }
    return (
        <main>
            <section className='patient'>
                <div className='patient__title text'>Форма записи на прием</div>
                <form onSubmit={handleSubmit}>
                    <div className='patient__wrapper'>
                        <div className='patient__item'>
                            <label className='label text' htmlFor='hard'>
                                Тяжесть симптомов (1-10)<span className='red'>*</span>
                            </label>
                            <input
                                required
                                className='input'
                                type='number'
                                id='hard'
                                min='1'
                                max='10'
                                value={levelSymptoms}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setLevelSymptoms(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                        <div className='patient__item'>
                            <label className='label text' htmlFor='date'>
                                Желаемая дата посещения<span className='red'>*</span>
                            </label>
                            <input
                                required
                                className='input'
                                type='date'
                                id='date'
                                //Получение сегодняшней даты в формте yyyy-mm-dd
                                min={new Date().toLocaleString().split(',')[0].split('.').reverse().join('-')}
                                value={dateInWrongFormat}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDateInWrongFormat(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                        <div className='patient__item'>
                            <label className='label text' htmlFor='name'>
                                Имя и Фамилия<span className='red'>*</span>
                            </label>
                            <input
                                required
                                className='input'
                                type='text'
                                id='name'
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                        <div className='patient__item'>
                            <label className='label text' htmlFor='time'>
                                Желаемое время с 8 до 17 часов<span className='red'>*</span>
                            </label>
                            <input
                                className='input'
                                type='time'
                                id='time'
                                // min='08:00'
                                // max='18:00'
                                required
                                value={time}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTime(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>

                        <div className='patient__item'>
                            <label className='label text' htmlFor='phone'>
                                Номер телефона<span className='red'>*</span>
                            </label>
                            <input
                                required
                                className='input'
                                type='tel'
                                id='phone'
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhone(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                        <div className='patient__item'>
                            <label className='label text' htmlFor='email'>
                                Электронная почта
                            </label>
                            <input
                                className='input'
                                type='email'
                                id='email'
                                value={mail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMail(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                        <div className='patient__item'>
                            <label htmlFor='complaints' className='label text'>
                                Ваши жалобы<span className='red'>*</span>
                            </label>
                            <input
                                type='text'
                                className='input'
                                id='complaints'
                                placeholder='Выберите ниже или впишите свое'
                                maxLength={50}
                                value={complaints}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setComplaints(e.target.value)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                        </div>
                    </div>
                    <div className='patient__check'>
                        <div className='patient__item__check'>
                            <input
                                type='checkbox'
                                id='check1'
                                className='check'
                                checked={check1}
                                onChange={() => {
                                    setCheck1((check) => !check)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                            <label htmlFor='check1' className='label text'>
                                Повышение температуры более 37 градусов
                            </label>
                        </div>

                        <div className='patient__item__check'>
                            <input
                                type='checkbox'
                                id='check2'
                                className='check'
                                checked={check2}
                                onChange={() => {
                                    setCheck2((check) => !check)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                            <label htmlFor='check2' className='label text'>
                                Болезненные ощущения и дискомфорт в любой области тела
                            </label>
                        </div>
                        <div className='patient__item__check'>
                            <input
                                type='checkbox'
                                id='check3'
                                className='check'
                                checked={check3}
                                onChange={() => {
                                    setCheck3((check) => !check)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                            <label htmlFor='check3' className='label text'>
                                Кашель, насморк, боль в горле
                            </label>
                        </div>
                        <div className='patient__item__check'>
                            <input
                                type='checkbox'
                                id='check4'
                                className='check'
                                checked={check4}
                                onChange={() => {
                                    setCheck4((check) => !check)
                                    setInfo({ color: 'red', text: '' })
                                }}
                            />
                            <label htmlFor='check4' className='label text'>
                                Головные боли в течение длительного времени
                            </label>
                        </div>
                    </div>
                    <div className={`patient__info text ${info.color}`}>{info.text}</div>
                    <button className='patient__submit button button-main text-title'>Записаться</button>
                </form>
                <button className='patient__back button text-title' onClick={() => navigate('/')}>
                    Назад
                </button>
            </section>
        </main>
    )
}

export default Patient
