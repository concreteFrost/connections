import { useEffect } from "react";
import useStore from "../../store/store";
import { setFlowStatusStorage } from "../../store/actions/storageActions";

function FlowServerStatus(){

    const {getFlowListStatus} = useStore((state)=>state.flowSlice);
    const {isLoggedIn} = useStore((state)=>state.userSlice);

    const fetchFlowListStatus = async()=>{
        try {
            const res:any = await getFlowListStatus();
            setFlowStatusStorage(res.data)

        } catch (error) {
            console.log("error getting flow list status");
        }
    }
    useEffect(()=>{
        fetchFlowListStatus();
    },[isLoggedIn])

    return null;
}

export default FlowServerStatus;