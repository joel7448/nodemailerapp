export * as actionCreators from './account-action'

export const Inbox =(items) =>{

 
    return (dispatch)=>{
       dispatch({
        type:'Inbox',
        payload : items
       })
       
    }
   }

   export const sent=(items) =>{

 
    return (dispatch)=>{
       dispatch({
        type:'sent',
        payload : items
       })
       
    }
   }

   export const view=(items) =>{

 
    return (dispatch)=>{
       dispatch({
        type:'view',
        payload : items
       })
       
    }
   }
