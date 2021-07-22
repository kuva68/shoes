import React from 'react'
import {connect} from 'react-redux'
import ImgComponent from './imgComponemt'
const VueCollections = (props)=>{
let arr = []
    let col = props.match.params.id.slice(1)
   let tmpArr = [{name:'обувь KUVA взуття',path:'./kuvaLogo.png',top:'0',created:0}]
    if(props.imgList&&props.imgList[col]){
       arr =   props.imgList[col]}else{ arr = tmpArr}
    return (<div className='contentBody'>{
        arr.map((key,i)=>{
return <ImgComponent key={key.name + i}  option={key} name={key.name} dispatch={props.dispatch}/>
       })
    }
     </div>)
}

const mapStatetoProps = (state)=>{
return {imgList:state.imgList}
}
export default connect(mapStatetoProps)(VueCollections)

