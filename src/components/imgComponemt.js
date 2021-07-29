

import React from 'react'
import {useState,useRef,useEffect} from 'react'
import {connect} from 'react-redux'


function ImgComponent(props) {
    const [imgSrc, setImgSrc] = useState('./kuvaLogo.png')
   
    let url = props.option.url
    let imgRef = useRef(null)
    useEffect(() => {
        let target = imgRef.current
        const fetchUrl = () => {
            setImgSrc(url)
        }
        function scrollObserver() {
            if (target.getBoundingClientRect().top > -800 && target
                .getBoundingClientRect().top < 2000) {
                fetchUrl()
            }
        }
        function topRef() {
            if (target.getBoundingClientRect().top > -800 && target.getBoundingClientRect().top < 1000
                && imgSrc !== url) {
                fetchUrl()
            } else if (imgSrc !== url) {
                window.addEventListener('scroll', scrollObserver)
            }
        }
        if (!window.navigator.onLine) {
            window.addEventListener('online', topRef)
        } else {
            topRef()
        }
        return () => {
            window.removeEventListener('scroll', scrollObserver)
            window.removeEventListener('online', topRef)
        }
    }, [imgSrc, url])
   


    const threeWeeks = 1000 * 60 * 60 * 24 * 21
    const now = Date.now()


   
    // console.log('props.option :',props.option)  
    return ( 
        
    <div className='imgBody' ref={imgRef}>
        
        <div className='imgheader'>
            <h3 style={{ color: 'red' }}>
                {now - props.option.created < threeWeeks ? ' NEW ' : ''}   {props.option.top !== '0' ? ' TOP SALES ' : ''}</h3>
                
        </div>
        <div className='imgDiv'>
            <img src={imgSrc} alt='взуття KUVA оптом обувь' className='img' />
        </div>
       
        <div className='imgFooter' onClick={
            ()=>props.dispatch({type:'SET_POP_OPEN',anchorEl:imgRef.current,popImgUrl:props.option.url,popImgName:props.name})}>
            <p className='imgN'>{props.option.name.slice(0, -4)}</p>
            <p classname='imgN' style={{color:'black'}}>Добавить в корзину</p> 
        </div>
     </div>
     
    )
}
export default connect()(ImgComponent)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//;
