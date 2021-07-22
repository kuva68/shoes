import React from 'react'
import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
const AlertOderedModelComponent = (props)=>{
    
    return <div className='AlertoderedModelComponent'>
        <img src={props.path}
                       className='confirmImg'alt='KUVA'/>
        <div className='oderedModelTitel'>{props.el}</div>
        <div className='oderedModelSizesTable'>
            {Object.keys(props.sizes).map((elm)=>{
             return <div className='oderedModelsizeControl'key={elm}
             style={{color:props.sizes[elm]===0?'pink':''}}>
                 <p className='oderedModelSize'
                 style={{textDecoration:props.sizes[elm]!==0?
                    'none':''}}>{elm}</p>
                 <p className='oderedModelSize'
                 style={{textDecoration:props.sizes[elm]!==0?
                    'none':''}} >
                        {props.sizes[elm]}</p>
                 </div>       
            } )}</div> 
    </div>
}

 function Confirm(props){
    const[message,setMessage] = useState(0)
    let sendMessage = props.sendMessage
    useEffect(()=>{
        async function userNameToLocalStorage(){
            let name = props.order.name
            if(name.length > 2){
              await  localStorage.setItem('user_name',name)
                console.log(`${name} whas added to localStorage`)
            }  
            let phone = props.order.phoneNumber
            if(phone&&phone.length > 6){
               await localStorage.setItem('user_phone',phone)
               console.log(`${phone} whas added`)
            }
        }
       
     message===1&&sendMessage()
     message===1&&userNameToLocalStorage()
     setMessage(0)
    },[message]
         )  
   
    let bucketArr = []
    if(props.bucket&&Object.keys(props.bucket)&&Object.keys(props.bucket).length&&
    Object.keys(props.bucket).length>0){
        bucketArr=Object.keys(props.bucket)}
    return <div className={props.alert}>
        <div className='confirmBody'>
        <h3 style={{margin:'0px',textAlign:'center'}}>
            Проверьте Ваш заказ и если все верно нажмите 'ЗАКАЗАТЬ'
        </h3>
       
      { bucketArr&&bucketArr.length&&bucketArr.length>0&&
     bucketArr.map((el)=>{
     return <AlertOderedModelComponent path={props.bucket[el].imgPath}
             sendMessage={props.sendMessage}
             sizes={props.bucket[el].sizes}key={el}el={el} key={el}/>
    })
 }
 <div className='confirmFooter'>
     <div className='confirmButton'onClick={()=>{
         document.body.style.overflow = 'auto'
         props.dispatch({type:'change_alert',alert:'confirmClose'})
     }}>Назад</div>
     <div className='confirmButton'onClick={
         ()=>{setMessage(1)}
     }>ЗАКАЗАТЬ</div>
 </div>
    </div>
    </div>
  }
  const mapStateToProps = (state)=>{
      return {bucket:state.bucket,alert:state.alert,order:state.oder}
  }
  export default connect(mapStateToProps)(Confirm)