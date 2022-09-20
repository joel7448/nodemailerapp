import { Add } from '@mui/icons-material'
import { Fab, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import "./compose.css"

function Compose() {
const navigate = useNavigate();
const newmail = ()=>{
navigate("/newmail");
}


  return (
   <Tooltip className='compose' title="Compose">
<IconButton>
        <Fab onClick={()=>{newmail()}} color="primary" aria-label="add">
  <Add />
</Fab>
</IconButton>
</Tooltip>
   
  )
}

export default Compose