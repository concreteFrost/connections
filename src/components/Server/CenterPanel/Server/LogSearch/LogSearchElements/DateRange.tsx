import { useEffect, useState } from "react";
import s from "./DateRange.module.scss";
import moment from "moment";

interface DataRangeProps {
    setTimeFrom: (value: string | number | readonly string[] | undefined) => void;
    setTimeTo: (value: string | number | readonly string[] | undefined) => void;
    timeFrom: string | number | readonly string[] | undefined;
    timeTo: string | number | readonly string[] | undefined;
}

interface ITimeType{
    any:boolean,
    selection:boolean
}

function DateRange(props: DataRangeProps) {

    const[timeType,setTimeType] = useState<ITimeType>({
        any:true,
        selection:false
    })

    function handleSetTimeType(value1 : keyof ITimeType, value2: keyof ITimeType){
        setTimeType((prevState)=>({
            ...prevState,
            [value1]: true,
            [value2]: false
        }))
    }

    useEffect(()=>{
        if(timeType.selection === true){
            props.setTimeFrom(moment().format("YYYY-MM-DD"))
            props.setTimeTo(moment().format("YYYY-MM-DD"))
        }
        else{
            props.setTimeFrom(undefined)
            props.setTimeTo(undefined)
        }

    },[timeType.selection])

    return (
        <section className={s.wrapper}>
            <header>Date Range</header>
            <div className={s.radio_btns}>
                <div>
                    <label htmlFor="all">ALL</label>
                    <input type="radio" name="all" id="all" checked={timeType.any} onChange={()=>handleSetTimeType('any','selection')} />
                </div>
                <div>
                    <label htmlFor="selection">SELECTION</label>
                    <input type="radio" name="selection" id="selection" checked={timeType.selection} onChange={()=>handleSetTimeType('selection','any')} />
                </div>
            </div>
            <div className={s.input_wrapper}>
                <input type="date" value={props.timeFrom} disabled={!timeType.selection} onChange={(e:any)=> props.setTimeFrom(e.target.value)} />
                <input type="date" value={props.timeTo} disabled={!timeType.selection} onChange={(e:any)=> props.setTimeTo(e.target.value)} />
            </div>
        </section>
    );
}

export default DateRange;