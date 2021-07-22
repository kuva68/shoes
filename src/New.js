import React from 'react'
import {connect} from 'react-redux'
import ImgComponent from './imgComponemt'
const New = (props)=>{
    let D = Date.now()
    let threeWheek = 1000*60*60*24*21
    let tmp
   if(props.collectionsName && props.collectionsName.length > 0){
        tmp = props.collectionsName[0]
   }
   let arr
   if(tmp&& props.imgList&& props.imgList[tmp]){
       arr = props.imgList[tmp].filter((el)=>{
       return D - el.created < threeWheek
          })}else arr = [{name:'Обувь KUVA взуття',url:'./kuvaLogo.png',top:false,created:0}]
   arr.sort((a,b)=>{
       return b.created -a.created
   })
    return(<div className='contentBody'> { arr.map((key,i)=>{
        return  <ImgComponent key={key.name+i} name={key.name} option={key}
         dispatch={props.dispatch}/>
            })}</div>)
 }
const mapStateToProps = (state)=>{
  let collectionsName = state.collectionsList  
    return {collectionsName:collectionsName,imgList:state.imgList}

}
export default connect(mapStateToProps)(New)