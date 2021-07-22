import React from 'react'
import {NavLink} from 'react-router-dom'
export default function NavBar(props) {
  
    const wrapperClass = ['navBarCloseWrapper','navBarOpenWrapper']
    return  <div className='navBarCloseWrapper' 
        style={{left:props.classNumber===1?'0vw':'-150vw'}}
    onClick={props.classTo1}>
             <div className='navBarOpen'>
             <NavLink className='navlink'activeClassName='active'
                to='../Home'>
                <div className='navBarLi'>Home</div>
             </NavLink>
             <NavLink className='navlink'activeClassName='active' to='../New'>
                 <div className='navBarLi'>New</div>
             </NavLink>
             <NavLink className='navlink'activeClassName='active' to='./ChooseCollections'>
                 <div className='navBarLi'>Коллекции</div>
               </NavLink>
             <NavLink className='navlink'activeClassName='active' to='./HowToOrder'>
                 <div className='navBarLi'>Как заказать</div>

             </NavLink>
             <NavLink className='navlink'activeClassName='active'
                to='../FormComponent'>
                  <div className='navBarLi'>Корзина</div>
                </NavLink>
             </div>   
             
    </div>
    
}