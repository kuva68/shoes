import React from 'react'
export default function NavBarButton(props){
    const navBarBtnDirection = ['headerLinkStart','headerLinkRight','headerLinkLeft']
   return <div className='headerLink'
    onClick={props.toggleClass}> 
    <p className={navBarBtnDirection[props.namberOfClass]}>></p>
    </div>
   
}
