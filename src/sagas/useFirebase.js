import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import firebase from '../firebase/klient'
const db = firebase.firestore()
export default function useFirebase(){
    const dispatch = useDispatch()
    const [obj,setObj] = useState({collection:null,doc:null,objToFetch:null})
    useEffect(()=>{
     async function doFetch(){
       dispatch({type:'RUN_FETCHING'})
       try{
          // console.log(obj)
        await db.collection(obj.collection).doc(obj.doc)
        .set(obj.objToFetch).then(()=>{console.log('messages was sent====' )
                           dispatch({type:'STOP_FETCHING'})}).catch((error)=>{console.log(error)
                                                                  dispatch({type:'STOP_FETCHING'})})

      dispatch({
        type: 'clear_bucket'
      })
      dispatch({
        type: 'change_alert',
        alert: 'confirmClose'
      })
       }catch(error){console.log(error)
         dispatch({type:'STOP_FETCHING'})}
     }
     doFetch()
    },[obj])
    return setObj
}