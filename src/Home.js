import React from 'react'
import {useSelector} from 'react-redux'
import ImgComponent from './imgComponemt'

export default function  Home(){
    let tmp
    const collectionsName = useSelector((state)=>{
        return state.collectionsList
    })
    const imgList = useSelector((state)=>{
        if(state.imgList){
        return state.imgList}
    })
    if(collectionsName&&collectionsName.length>0){
        tmp = collectionsName[0]}
   let arr = []
   let newArr = []
   
   if(tmp&& imgList&& imgList[tmp]){
    newArr = imgList[tmp].filter((el)=>{
        let n = Date.now()
        let threeWeekes = 1000*60*60*24*21
    return n - el.created < threeWeekes
}).sort((a,b)=>{
    return b.created - a.created
})}
   if(tmp && tmp.length>0&& imgList&& imgList[tmp]){
       arr = imgList[tmp].sort((a,b)=>{
           return parseInt(a)-parseInt(b)
       })}else arr =[{name:'Обувь KUVA взуття',path:'./kuvaLogo.png',top:'0',created:0}]

    
      
    if(newArr&&newArr.length>0){arr = [...newArr,...arr]}
    return(<div className='contentBody'titel='Обувь Украина оптом тм. KUVA'> 
         
         {     
        arr.map((el,i)=>{
    return  <ImgComponent key={el.name + i} name={el.name} option={el}
    />
      })}</div>)
            }
//const mapStateToProps = (state)=>{
  //  let collectionsName = Object.keys(state.imgList)
    //return {collectionsName:collectionsName,imgList:state.imgList}

//}
//export default connect(mapStateToProps)(Home)