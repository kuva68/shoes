;


//let obj = db.get().then((snapshot)=>{
  //console.log(snapshot)
  //if(!snapshot.size){console.log('No match')
  //return}else{
  //snapshot.forEach((doc)=>{ dataArr.push(doc.data())  
  //})
//}}).catch((error)=>console.log('error getting list of docs',error))
//console.log(dataArr)

export default function* RootSaga(store){
  //yield call(()=>firebase.auth().signInAnonymously().catch((error)=>console.log('error',error.message))
  //)
   
  //  yield takeEvery('OPEN_ALERT',openAlert,store)
    //yield takeEvery('CHANGE_NAME',changeName)
    //yield takeEvery('CHANGE_PHONE_NUMBER',changePhoneNumber)
    //yield takeEvery('DEL_MODEL',delModel,store)
   // yield takeLatest('SEND_MESSAGE',sendMessage,store)
    
    //yield spawn(getImgObj)
   yield spawn(checkMessaging)
}



    
     //console.log( storageRef.child('19 spring/171м9 ч напл 24.3$.png').getDownloadURL())
    



