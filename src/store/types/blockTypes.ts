export interface BlockProps {
  value: any;
  format: string;
  inputType: string;
  placeholder? : any;
  name : string;
  constraints: number
}

const blockType: { [key: string]: BlockProps } = {
  string: {  name:"", value: "", format: "0", constraints:0, inputType: "text", placeholder:"string" },
  integer: { name:"", value: 0, format: "1", constraints:0, inputType: "number" },
  float: { name:"", value: 0, format: "2", constraints:0, inputType: "number" },
  dateTime: { name:"", value: new Date(), format: "3", constraints:0, inputType: "date", placeholder: new Date()},
  boolean: { name:"", value: true, format: "4", constraints:0, inputType: "checkbox" },
  booleanYN: { name:"", value: "N", format: "5", constraints:0, inputType: "checkbox" },
  execution: { name:"", value: "I", format: "6", constraints:0, inputType: "text" },
  bigInt: { name:"", value:0, format: "7", constraints:0, inputType: "number" },
  blockRef: { name:"", value: "", format: "8", constraints:0, inputType: "text", placeholder:"block reference" },
  default: { name:"", value: "", format: "String", constraints:0, inputType: "default" },
};

// const blockType: { [key: string]: BaseProps } = {
//     string: { value: '', format: "0", inputType: 'text' },
//     integer: { value: 0, format: "Integer", inputType: 'number' },
//     float: { value: 0, format: 'Float', inputType: 'number' },
//     dateTime: { value: new Date(), format: "DateTime", inputType: 'date' },
//     boolean: { value: true, format: "Boolean", inputType: 'checkbox' },
//     booleanYN: { value: "Y", format: "BooleanYN", inputType: 'checkbox' },
//     execution: {value: "I", format}
//     default: { value: 'default', format: "String", inputType: 'text' },
// };

export default blockType;
