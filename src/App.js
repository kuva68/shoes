import React from 'react'
import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import Confirm from './components/Confirm'
import firebase from './firebase/klient'
import FormComponent from './components/FormComponent'
import Header from './components/Header'
import NavBar from './components/NavBar'
import HowToOrder from './components/HowToOrder'
import ChooseCollections from './components/ChooseCollections'
import Home from './Home'
import New from './New'
import ModelBucket from './components/ModelBucket'
import NavBarButton from './components/NavBarButton'
import Modal from '@material-ui/core/Modal';
import ImgPopover from './components/img_popover'
import { makeStyles } from '@material-ui/styles';
const db = firebase.firestore()
//const messaging = firebase.messaging()

//messaging.usePublicVapidKey('BJc_FqFXOGR_dfvDXglS98-Ya9X5ZBzhaUH7GD7tdXTZdGVNsPxcwdulNFW_TjMju4l3hCRSy4an_vUOkSQTsnc')
const styles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function Kuva(props) {
  const classes = styles()
  //console.log(firebase)
  const dispatch = useDispatch()
  const [namberOfClass, setClass] = useState(0)
  let { name, phoneNumber } = props.order
  let bucket = props.bucket
  const [send, setSend] = useState(false)
  useEffect(() => {
    firebase.auth().signInAnonymously().catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    async function sendMessage() {

      try {
        let messageToken =
          localStorage.getItem('messageToken')
        if (!messageToken) {
          messageToken = ''
        }
        let nregEx = /[^a-z,A-Z,А-Я,а-я,\s]/gi
        let regexName = name.replace(nregEx, 0)
        let phone = phoneNumber
        let d = new Date().toLocaleString()
        let nowD = Date.now()

        await db.collection('messages').doc(d)
          .set({
            name: regexName,
            bucket: bucket,
            phone: phone,
            token: messageToken,
            date: nowD,
            status: 0
          })

        dispatch({
          type: 'clear_bucket'
        })
        dispatch({
          type: 'change_alert',
          alert: 'confirmClose'
        })
        document.body.style.overflow = 'auto'
        window.history.go(-1)
        setSend(false)
      } catch (error) {
        console.log(error)
      }
    }
    send && sendMessage()
  }, [send, name, phoneNumber, bucket]
  )
  //console.log(props)

  const toggleClass = () => {

    namberOfClass === 2 ? setClass(1) : setClass(2)

  }

  useEffect(() => {
    function getImgObj() {
      console.log('getImgObj start')
      if (!window.navigator.onLine) {
        // console.log('offline')
        window.addEventListener('online', makeImgObj)
      } else {
        //console.log('online')
        makeImgObj()
      }
    }
    async function makeImgObj() {
      try {
        //console.log('fetchList start')
        const imgObject = await fetchList()

        imgObject && implementFetching(imgObject)
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchList() {
      try {

        const tmpImgList = await db.collection('imgList').doc('imgList').get()
        const imgList = tmpImgList.data()
        // console.log('imgList :',imgList)       
        return imgList
      } catch (error) {
        console.log(error)
      }
    }
    async function implementFetching(imgO) {
      try {
        // console.log('implementFetching start', imgO)

        if (imgO && Object.keys(imgO)) {
          let collectionsList = Object.keys(imgO).sort((a, b) => {
            return imgO[b][0].created - imgO[a][0].created
          })

          //console.log('imgObject',Object.keys(imgO))
          dispatch({
            type: 'img_obj',
            obj: imgO,
            arr: collectionsList
          })

          let imgObjJson = JSON.stringify(imgO)
          let collections = JSON.stringify(collectionsList)
          localStorage.setItem('img_obj', imgObjJson)
          localStorage.setItem('collectionsNames', collections)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getImgObj()
    return () => window.removeEventListener('online', makeImgObj)
  }, [])
  useEffect(() => {
    // async function checkMessaging() {

    // let messageToken =
    // localStorage.getItem('messageToken')
    //if (messageToken) {
    //let d = new Date()
    //await db.collection('tokens').doc('Token').update({
    //[messageToken]: d
    //})
    //}
    //if (!messageToken) {
    //await startMessaging()
    // }


    //messaging.onTokenRefresh(() =>
    // messaging.getToken().then((refreshedToken) => {

    //localStorage.setItem('messageToken', refreshedToken)

    // let d = new Date();
    //db.collection('tokens').doc('Token').update({
    // [refreshedToken]: d
    // })
    //console.log('token in db')
    // })
    // .catch((err) => {
    // console.log('Unable to retrieve refreshed token ', err);
    //})
    //);
    //}
    // async function startMessaging() {

    // try {

    //let permission = await Notification.requestPermission()
    //if (permission === 'granted') {

    //let token = await messaging.getToken()
    //if (!token || token === null) console.log('no token')
    //if (token) {
    // await localStorage.setItem('messageToken', token)
    //console.log('token in l.storage')
    //let d = new Date()
    //await db.collection('tokens').doc('Token').update({
    // [token]: d
    //})

    // } else {
    // console.log('Unable to get permission to notify.')
    //}
    //}
    //} catch (error) {
    // console.log(error)
    //}
    //}
    // checkMessaging()
  }, [])
  const sendComplit = () => {
    setSend(true)
  }

  const classTo1 = () => {
    setClass(0)
  }
  useEffect(() => {
    namberOfClass === 2 ? document.body.style.overflow = 'hidden' :
      document.body.style.overflow = ''
  }, [namberOfClass])
  const { popOpen, anchorEl } = props
  return <div className='main' title='Кува взуття оптом Kuva' >
    <NavBarButton toggleClass={toggleClass} namberOfClass={namberOfClass} />
    < ModelBucket bucket={props.bucket} />
    <Modal className={classes.modal}
      open={popOpen}

    >
      <ImgPopover />
    </Modal>
    < Header toggleClass={toggleClass} namberOfClass={namberOfClass}
      bucket={props.bucket} />

    <div className='siteBody' >

      < Route exact path='/' component={Home} />
      < Route path='/home' component={Home} />
      < Route path='/new' component={New} />
      < Route path='/FormComponent' component={FormComponent} />
      < Route path='/ChooseCollections' component={ChooseCollections} />
      < Route path='/howToOrder' component={HowToOrder} />

    </div>
    < NavBar classNumber={namberOfClass} classTo1={classTo1} />
    < Confirm sendMessage={sendComplit} />
    <div className='footer' >

    </div>
  </div>
}
const mapStateToProps = (state) => {
  let bucket = state.bucket
  let order = state.oder
  let popOpen = state.popOpen
  let anchorEl = state.anchorEl

  return {
    bucket: bucket,
    order: order,
    anchorEl: anchorEl,
    popOpen: popOpen,

  }
}

export default connect(mapStateToProps)(Kuva)