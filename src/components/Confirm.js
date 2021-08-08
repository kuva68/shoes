import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import useFirebase from '../sagas/useFirebase'
const AlertOderedModelComponent = (props) => {

    return <div className='AlertoderedModelComponent'>
        <img src={props.path}
            className='confirmImg' alt='KUVA' />
        <div className='oderedModelTitel'>{props.el.replace('png','')}</div>
        <div className='oderedModelSizesTable'>
            {Object.keys(props.sizes).map((elm) => {
                return <div className='oderedModelsizeControl' key={elm}
                    style={{ color: props.sizes[elm] === 0 ? 'pink' : '' }}>
                    <p className='oderedModelSize'
                        style={{
                            textDecoration: props.sizes[elm] !== 0 ?
                                'none' : ''
                        }}>{elm}</p>
                    <p className='oderedModelSize'
                        style={{
                            textDecoration: props.sizes[elm] !== 0 ?
                                'none' : ''
                        }} >
                        {props.sizes[elm]}</p>
                </div>
            })}</div>
    </div>
}

function Confirm(props) {
    const history = useHistory()
    const firebaseApi = useFirebase()
    const [message, setMessage] = useState(0)
    let { name, phoneNumber } = props.order
    let sendMessage = props.sendMessage
    useEffect(() => {
        async function userNameToLocalStorage() {

            if (name.length > 2) {
                await localStorage.setItem('user_name', name)
                // console.log(`${name} whas added to localStorage`)
            }
            let phone = phoneNumber
            if (phone && phone.length > 6) {
                await localStorage.setItem('user_phone', phone)
                //console.log(`${phone} whas added`)
            }
        }

        message === 1 && sendMessage()
        message === 1 && userNameToLocalStorage()
        setMessage(0)
    }, [message, phoneNumber, name]
    )

    let bucketArr = []
    if (props.bucket && Object.keys(props.bucket) && Object.keys(props.bucket).length &&
        Object.keys(props.bucket).length > 0) {
        bucketArr = Object.keys(props.bucket)
    }
    const runFetch = ()=>{
        let messageToken
        try{
            messageToken =
            localStorage.getItem('messageToken')
          if (!messageToken) {
            messageToken = ''  
        }
        }catch(error){console.log(error)}
        let nregEx = /[^a-z,A-Z,А-Я,а-я,\s]/gi
        let regexName = name.replace(nregEx, 0)
        let phone = phoneNumber
        let d = new Date().toLocaleString()
        let nowD = Date.now()
        let obj = {name: regexName,
        bucket: props.bucket,
        phone: phone,
        token: messageToken,
        date: nowD,
        status: 0}

        document.body.style.overflow = 'auto'
        history.go(-1)

        return firebaseApi({collection:'messages',doc:d,objToFetch:obj})
    }
    return <div className={props.alert}>
        <div className='confirmBody'>
            <h3 style={{ margin: '0px', textAlign: 'center' }}>
                Проверьте Ваш заказ и если все верно нажмите 'ЗАКАЗАТЬ'
            </h3>

            {bucketArr && bucketArr.length && bucketArr.length > 0 &&
                bucketArr.map((el) => {
                    return <AlertOderedModelComponent path={props.bucket[el].imgPath}
                        sendMessage={sendMessage}
                        sizes={props.bucket[el].sizes} key={el} el={el} />
                })
            }
            <div className='confirmFooter'>
                <div className='confirmButton' onClick={() => {
                    document.body.style.overflow = 'auto'
                    props.dispatch({ type: 'change_alert', alert: 'confirmClose' })
                }}>Назад</div>
                <div className='confirmButton' onClick={runFetch}                  
                >ЗАКАЗАТЬ</div>
            </div>
        </div>
    </div>
}
const mapStateToProps = (state) => {
    return { bucket: state.bucket, alert: state.alert, order: state.oder }
}
export default connect(mapStateToProps)(Confirm)