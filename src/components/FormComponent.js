import React from 'react'

import { connect } from 'react-redux'
import {OderedModel} from './OderedModel'


function FormComponent(props){
     
 const sizeMessage=(name,size,i)=>{
       props.dispatch({type:'CHANGE_SIZE',name:name,size:size,i:i})
      
     }  
    
  const   sendMessage = ()=>{
    let name = props.oder.name
    let phone = props.oder.phoneNumber
       if(!name||name.length<=2){alert('Укажите пожалуйста правильно Ваше имя и фамилию')}
      else if(!phone||isNaN(phone)||phone.toString().length!==10){alert('Укажите пожалуста правильно номер телефона')}
      else 
      //if(name&&name.length>2&&phone&&phone.toString.length===10){
        props.dispatch({type:'change_alert',alert:'confirmOpen'})
      if(name.length>2&&phone.toString().length===10){
        document.body.style.overflow = 'hidden'
      }
  }
const changeName = (e)=>{
  let name = e.target.value.split(' ')  
  let tmp = name.map(el => {
    return el.slice(0,1).toUpperCase() + el.slice(1)
  })
  let capitalyzeName = tmp.join(' ')
 props.dispatch({type:'change_name',name:capitalyzeName})

}
const delModel = (m)=>{
 
  let bucket = props.bucket
  let newBucket = {}
  let bucketKeys = Object.keys(bucket).filter((el)=>{
    return el !== m
  })
  bucketKeys.forEach((el)=>{
    newBucket[el] = bucket[el]
  })
      
  props.dispatch({type:'del_model',newBucket:newBucket})

}
const changePhoneNumber = (e)=>{
  
  props.dispatch({type:'change_phone_number',phoneNumber:e.target.value})
}
const back=()=>{
  props.history.goBack() 
  
}
let ModelsObj
let bucketKeys
if(props.bucket&&Object.keys(props.bucket)){
  bucketKeys = Object.keys(props.bucket)
 ModelsObj = bucketKeys.map((el)=>{
    return <OderedModel imgName={el}imgPath={props.bucket[el].imgPath}
    sizes={props.bucket[el].sizes}
           sizeMessage={sizeMessage}key={el}delModel={delModel}/>
  })
}


   return   ( <div className='formDiv'>
      
   
        <fieldset className='formBody'>
             <legend>Ваше имя и номер телефона</legend>
             <label> Имя и Фамилия.
             <input type='text' className='input'
                 value={props.oder.name}onChange={changeName}
             placeholder='NAME'/></label>
             <label>Номер телефона
             <input type='number' className='input'
                  value={props.oder.phoneNumber} 
             onChange={changePhoneNumber} placeholder='Phone number'/>
             </label>
             </fieldset>   
             
        {bucketKeys.length?ModelsObj:<h1 style={{color:'pink',justifySelf:'center',textAlign:'center'}}>
          ВАША КОРЗИНА ПУСТА</h1>}
            
      <div className='formFooter'>
           <div onClick={sendMessage} className='formButton'><p>Оформить заказ</p></div>
           <div onClick={back} className='formButton'><p>НАЗАД</p></div>
      </div>
      
  </div>)
}
const mapStateToProps = (state)=>{
  return {
    oder:state.oder,bucket:state.bucket
  }
}
export default connect(mapStateToProps)(FormComponent)
