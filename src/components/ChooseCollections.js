import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Collections from '../collections'
import VueCollections from '../VueCollections'
export default function ChooseCollections (){
    return  (<div className='body'titel='Обувь оптом Украина т.м. KUVA'>
    <Switch>
        
      <Route exact path='/ChooseCollections' component={Collections}/>
      <Route path='/ChooseCollections/:id' component={VueCollections}/>
        </Switch></div>
    )
  }