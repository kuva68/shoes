
let tmpCollectionsList = JSON.parse(localStorage.getItem('collectionsNames'))
let phone
let img_list = {}
let userName
let tmpList = JSON.parse(localStorage.getItem('img_obj'))
if (tmpList &&
    Object.keys(tmpList) && Object.keys(tmpList).length > 0) {
    for (let key in tmpList) {
        img_list[key] = tmpList[key]
    }
}
if (localStorage.getItem('user_name')) {
    userName = localStorage.getItem('user_name')
} else { userName = '' }
if (localStorage.getItem('user_phone')) {
    phone = localStorage.getItem('user_phone')
} else {
    phone = ''
}

let _oder = { name: userName, phoneNumber: phone }
export const Reducer = (state = {
    oder: _oder, imgList: img_list, bucket: {}, alert: 'confirmClose',
    collectionsList: tmpCollectionsList || null, popOpen: false, anchorEl: null, popImgUrl: null
},
    action) => {
    switch (action.type) {
        case 'SET_POP_OPEN':
            return { ...state, popOpen: true, anchorEl: action.anchorEl, popImgUrl: action.popImgUrl, popImgName: action.popImgName }
        case 'SET_POP_CLOSE':
            return { ...state, popOpen: false, anchorEl: null, popImgUrl: '', popImgName: '' }
        case 'change_alert':
            return { ...state, alert: action.alert }
        case 'CALL_ODER_FORM':
            let x = state.bucket
            let x1 = {
                ...x, [action.imgName]:
                    { imgPath: action.imgPath, sizes: { 36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0 } }
            }
            return { ...state, bucket: x1 }
        case 'clear_bucket':
            return { ...state, bucket: {} }
        case 'del_model':
            return { ...state, bucket: action.newBucket }
        case 'change_phone_number':
            let oderTmp1 = state.oder

            let tmpOder = { ...oderTmp1, phoneNumber: action.phoneNumber }
            return { ...state, oder: tmpOder }
        case 'CHANGE_SIZE':

            let bucketObj = state.bucket[action.name]
            let sizes = bucketObj.sizes
            let newSizes = { ...sizes, [action.size]: action.i }
            let bucketObj1 = { ...bucketObj, sizes: newSizes }
            let oldBucket = state.bucket
            let newBucket = { ...oldBucket, [action.name]: bucketObj1 }
            return { ...state, bucket: newBucket }
        case 'change_name':
            let oderTmp2 = state.oder
            let tmp3 = { ...oderTmp2, name: action.name }
            return { ...state, oder: tmp3 }


        case 'img_obj':
            console.log(action.obj)
            return { ...state, imgList: action.obj, collectionsList: action.arr }

        default:
            return state
    }
}