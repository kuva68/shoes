import React from 'react'
import {NavLink} from 'react-router-dom'
export default function NavBar(props) {


    return <div className='navBarCloseWrapper'
        style={{ width: props.classNumber !== 2 ? '0px' : '' }}
        onClick={props.classTo1}>
        <div className='navBarOpen'>

            <div className='navBarLi'>
                <NavLink className='navlink' activeClassName='active' to='/Home'>
                    Home
                </NavLink>
            </div>


            <div className='navBarLi'>
                <NavLink className='navlink' activeClassName='active' to='/New'>
                    New
                </NavLink>
            </div>

            <div className='navBarLi'>
                <NavLink className='navlink' activeClassName='active' to='/ChooseCollections'>
                    Коллекции
                </NavLink>
            </div>


            <div className='navBarLi'>
                <NavLink className='navlink' activeClassName='active' to='/HowToOrder'>
                    Как заказать
                </NavLink>
            </div>


            <div className='navBarLi'>
                <NavLink className='navlink' activeClassName='active'
                    to='/FormComponent'>
                    Корзина
                </NavLink>
            </div>

        </div>

    </div>

}