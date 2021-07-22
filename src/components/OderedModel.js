import React from 'react'
export const OderedModel = (props)=>{
    const sizeMessages =(e)=>{
      let i = Number(e.target.getAttribute('i'))
      if(i){
        return props.sizeMessage(props.imgName,i,Number(e.target.value))
    }}
    const del = ()=>{
      return props.delModel(props.imgName)
    }
      const options = ()=>{ 
        let tmp = Array(6).fill(0)
       return tmp.map((el,i)=>{
        return   <option key={i}value={i}>{i}</option>
      })
    }
    
  
    return   <div className='formModelDiv'>
     <div className='formFildSet1'>
           <h4 style={{textAlign:'center'}}>Выберите размеры</h4> 
      <div className='formOderedImgAndSizeSelects'>     
       <div className='formOderTopContainer'>
        <img className='oderedmodelImg'alt='KUVA' src = {props.imgPath} /> 
        <div className='formDiv1'>
          <div className='sizeSelect'>
            <p>36</p>
            <select className='select' onChange={sizeMessages}i={36}
            value={props.sizes['36']}>{options()}</select> 
          </div>
          <div className='sizeSelect'>
            <p>37</p>
            <select className='select'value={props.sizes['37']} onChange={sizeMessages}i={37}>{options()}</select> 
          </div>
        <div className='sizeSelect'>
            <p>38</p>
            <select className='select'value={props.sizes['38']} onChange={sizeMessages}i={38}>{options()}</select> 
        </div>
        <div className='sizeSelect'>
            <p>39</p>
            <select className='select'value={props.sizes['39']} onChange={sizeMessages}i={39}>{options()}</select> 
        </div>
        <div className='sizeSelect'>
            <p>40</p>
            <select className='select' onChange={sizeMessages}value={props.sizes['40']} i={40}>{options()}</select> 
        </div>
        <div className='sizeSelect'>
            <p>41</p>
            <select className='select'value={props.sizes['41']} onChange={sizeMessages}i={41}>{options()}</select> 
        </div>
    </div>
    </div>    
              
               <div className='oderedModelFooter'>
                       <li className='oderedModelTitle'>
                      <p>{props.imgName.replace('png','')}</p></li>
                      <li className='oderedModelDel'onClick={del}>
                        <p>УДАЛИТЬ</p></li> 
     </div>
    </div>
     </div>
     </div>
          }