
import React from 'react'
import {useState,useRef,useEffect} from 'react'
import {connect} from 'react-redux'


  function ImgComponent (props){
    const [imgSrc,setImgSrc] = useState('./kuvaLogo.png')
  
  
    const fetchUrl = ()=>{
        
        setImgSrc(props.option.url)}

  let imgRef = useRef(null)
  useEffect(()=>{
      
      if(!window.navigator.onLine){
      window.addEventListener('online',()=>topRef())
  }else{topRef()}
 
}  ,[])

  function topRef(){   
       
     let target = imgRef.current
     if(target.getBoundingClientRect().top>-800&&target.getBoundingClientRect().top<1000
     && imgSrc !== props.option.url){
         fetchUrl()
 }else if(imgSrc !== props.option.url){
     window.addEventListener('scroll',()=>{
             if(target.getBoundingClientRect().top>-800&&target
             .getBoundingClientRect().top<2000){
        fetchUrl()
    }})
}}

 const threeWeeks = 1000*60*60*24*21
 const now = Date.now()    
    

const callOderForm=()=>{
    props.dispatch({type:'CALL_ODER_FORM',imgName:props.name,imgPath:props.option.url})
}
 // console.log('props.option :',props.option)  
    return (<div className='imgBody' ref = {imgRef}>
        
            <div className='imgheader'>
        <h3 style={{color:'red'}}>
        {now - props.option.created<threeWeeks?' NEW ':''}   {props.option.top!=='0'?' TOP SALES ':''}</h3>
        </div>
        <div className='imgDiv'>
        <img src={imgSrc}  alt='взуття KUVA оптом обувь' className='img'/>
        </div>
        
        <ul className='imgFooter' onClick={callOderForm}>
            <p className='imgN'>{props.option.name.slice(0,-4)}</p>
           <p className='imgN'style={{color:'white'}}>В КОРЗИНУ</p>
       </ul>
       
       
        </div>
    )
}
export default connect()(ImgComponent)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//;
