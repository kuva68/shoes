import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Collections = (props) => {
  // let tmp
  //if(props.collectionsName && props.collectionsName.length>0){
  //  tmp = props.collectionsName
  //}else tmp = ['KUVA']
  //let obj = {}
  //if(tmp !== 'KUVA'&& props.imgList && Object.keys(props.imgList)){
  //  obj = props.imgList}else {
  //  obj = {KUVA:[['KUVA',{path:'./kuvaLogo.png',top:false,new:false}]]}
  // }
  let tmp = []
  if (props.collectionsName) {
    tmp = props.collectionsName
  } else { tmp = ['... грузимся'] }

  return <div style={{
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', flexWrap: 'nowrap', marginTop: '5vh'
  }}>{tmp.map((el, i) => {
    return <Link to={`/ChooseCollections/:${el}`} key={i + .6} style={{ textDecoration: 'none' }}>
      <div key={i + .6} className='collectionNameDiv'>

        <p className='collectionNameFooter'> {el}</p></div>
    </Link>
  })}</div>
}

const mapStateToProps = (state) => {

  return { collectionsName: state.collectionsList }
}
export default connect(mapStateToProps)(Collections)