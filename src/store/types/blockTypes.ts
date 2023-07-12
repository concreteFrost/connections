export interface BaseProps {
    value: string | number | object | boolean,
    format: string,
    inputType: string
}

const blockType: { [key: string]: BaseProps } = {
    string: { value: '', format: "String", inputType: 'text' },
    integer: { value: 0, format: "Integer", inputType: 'number' },
    float: { value: 0, format: 'Float', inputType: 'number' },
    dateTime: { value: new Date(), format: "DateTime", inputType: 'date' },
    boolean: { value: true, format: "Boolean", inputType: 'checkbox' },
    booleanYN: { value: "Y", format: "BooleanYN", inputType: 'checkbox' },
    default: { value: 'default', format: "String", inputType: 'text' },
};

export default blockType;
