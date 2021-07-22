import React from 'react'
import {NavLink} from 'react-router-dom'
export default function ModelBucket(props){
    let count = 0
    if(props.bucket&&Object.keys(props.bucket)&&Object.keys(props.bucket).length>0){
      count = Object.keys(props.bucket).length
    }
  return  <NavLink to='/FormComponent'activeStyle={
      {display:'none'}}>
   <div className='modelBucket'>
        <p style={{textAlign:'center',
    margin:'5px'}}>{count}</p>
               <p>_🛒</p>
    </div>
</NavLink>

}
