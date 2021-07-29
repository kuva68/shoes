import React from 'react'
import { connect } from 'react-redux'
import ImgComponent from './imgComponemt'

const Top = (props) => {
  let tmp
  if (props.collectionsName && props.collectionsName.length > 0) {
    tmp = props.collectionsName[props.collectionsName.length - 1]
  }
  let arr = []
  if (tmp && props.imgList
    && props.imgList[tmp]) {
    arr = props.imgList[tmp].filter((el) => {
      return el[1].top === true
    })
  }
  else arr = [['KUVA', { path: './kuvaLogo.png', top: true, new: false }]]
  return (<div className='contentBody'> {arr.map((key, i) => {

    return <ImgComponent key={key[0] + i} name={key[0]} option={key[1]}
      dispatch={props.dispatch} />

  })}</div>)
}
const mapStateToProps = (state) => {
  let collectionsName = Object.keys(state.imgList)
  return { collectionsName: collectionsName, imgList: state.imgList }
}
export default connect(mapStateToProps)(Top)
