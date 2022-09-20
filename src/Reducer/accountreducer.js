import axios from "axios"
import instance from "../api/api"

const accreducer = (state=[],action)=>{
switch(action.type){
    case "Inbox":
       return state=action.payload;

       case "sent":
        return state=action.payload;

        case "view":
            return state=action.payload;
}

return state;
}

export default accreducer