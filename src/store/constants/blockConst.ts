import { BlockParameters } from "../interfaces/IBlock";

const blockParametersType: { [key: string]: BlockParameters } = {
    string: {  name:"", value: "", format: "0", constraints:0, placeholder:"string" },
    integer: { name:"", value: 0, format: "1", constraints:0,  },
    float: { name:"", value: 0, format: "2", constraints:0,  },
    dateTime: { name:"", value: new Date(), format: "3", constraints:0, placeholder: new Date()},
    boolean: { name:"", value: true, format: "4", constraints:0, },
    booleanYN: { name:"", value: "Y", format: "5", constraints:0, },
    execution: { name:"", value: "N", format: "6", constraints:0, },
    bigInt: { name:"", value:0, format: "7", constraints:0,  },
    blockRef: { name:"", value: "", format: "8", constraints:0, placeholder:"block reference" },
    default: { name:"", value: "", format: "String", constraints:0 },
  };
  
  
  export default blockParametersType;