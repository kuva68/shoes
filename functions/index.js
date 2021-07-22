'use strict'
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const path = require('path')
const db = admin.firestore()
async function checkCollection(object){
  try{
  const collection = path.dirname(object.name)  
     
    const options = {prefix:`${collection}/`}
    const bucket = admin.storage().bucket(object.bucket)
  
    
  const [files] = await  bucket.getFiles(options)
        // console.log('files',files)
          const tmpArr = []
          for(let i =1;i<=files.length-1;i++){
                // console.log(i,f)
              let name = path.basename(files[i].name) 
            
              let created = Date.parse(files[i].metadata.timeCreated)
         
              let top = '0'
               if(files[i].metadata.metadata&&files[i].metadata.metadata.top){
               //  console.log('metadata.metadata :',files[i].metadata.metadata)
               top = files[i].metadata.metadata.top}
               let tmpUrl = files[i].metadata.selfLink.replace('www.googleapis.com/storage/v1','firebasestorage.googleapis.com/v0')
               let bUrl = tmpUrl.replace('$.png','%24.png')

              let url = `${bUrl}?alt=media&token=${files[i].metadata.metadata.firebaseStorageDownloadTokens}`
              tmpArr.push({name:name,top:top||'0',created:created||0,url:url||'0'})
               }
               
      await db.doc('imgList/imgList').update({[collection]:tmpArr})
  
            }catch(error){console.log(' error getFiles',error)}
    return null
}
exports.generateList = functions.region('europe-west2').storage.object().onFinalize((object) => {
  try{
                
      checkCollection(object)
      //console.log(tmpArr)
    
  }catch(error){console.log('error during getFiles',error)}
  return null
  });
 exports.remooveImg = functions.region('europe-west2').storage.object().onDelete((object)=>{
   try{
   checkCollection(object)
   }catch(error){console.log(error)}
 }) 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Listen for changes in all documents in the 'users' collection and all subcollections
exports.sendNotificationToAdmin = functions.region('europe-west2').firestore
    .document('messages/{id}')
    .onWrite((change, context) => {
      let data = change.after.data()
      let name = data.name
      const registrationTokens = []
      // These registration tokens come from the client FCM SDKs.
  async function getTokens(){
   
      const aTokens = await db.collection('adminTokens').doc('Token').get()
      let adminTokens 
      if(aTokens)adminTokens = aTokens.data()
        if(adminTokens){
           registrationTokens.concat(Object.keys(adminTokens))
        }
         return null 
  }
  getTokens()
const message = {
  data: {},
  tokens: registrationTokens,
  notification:{
    titel:'New order',
    body:`From ${name}`
  }
}
const failedTokens = []; 
registrationTokens&&registrationTokens.length&&admin.messaging().sendMulticast(message)
  .then((response) => {
    response.failureCount > 0&&response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
    });
      console.log('List of tokens that caused failures: ' + failedTokens);
    return null
  });
failedTokens&&failedTokens.length&&failedTokens.forEach((el)=>{
  db.collection('AdminTokens').doc('Token').update({
    [el]:db.FieldValue.delete()
  })
})
return null
    })