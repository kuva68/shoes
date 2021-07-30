import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch,useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/styles';
 
const styles = makeStyles({
   imgContainer:{
       height:'70%'
   },
    card:{
     height:'90%',
     minWidth:'30vw'
    },
    activeContainer:{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
        
    },
    typografy:{
      textAlign:'center'
    }
})
export default function ImgPopover() {
    const classes = styles()
    const [open,setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const popImgUrl = useSelector((state)=>{return state.popImgUrl})
    const imgName = useSelector((state)=>state.popImgName)
    const callOderForm = () => {
        setOpen(true)
        setTimeout(()=>{
            dispatch({ type: 'CALL_ODER_FORM', imgName: imgName, imgPath: popImgUrl })
            dispatch({type:'SET_POP_CLOSE'})
            setOpen(false)
        },1000)
        
        
    }
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.imgContainer}
        image={popImgUrl}
        title={imgName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"className={classes.typografy}>
         {imgName.replace('png','')}
        </Typography>
        
      </CardContent>
      <CardActions className={classes.activeContainer}>
        <Button size="small"onClick={()=>{dispatch({type:'SET_POP_CLOSE'})}}
        variant='outlined'color='secondary'>
            Back
        </Button>
        <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
               
                open={open}
                title="Товар добавлен в корзину"
              >
                <Button size="small"onClick = {callOderForm}variant='contained'color='primary'
                >
                    Добавить в корзину
                </Button>
              </Tooltip>
        
      </CardActions>
    </Card>
  );
}
