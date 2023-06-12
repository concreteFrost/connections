
export interface NodeType {
  type: string,
  data: object
}

export type TextGetter = {
  text: string
}

export type TextSetter = {
  text: string,
  subType: string
}

export type ColorGetter = {
  color: string
}

export type ColorSetter = {
  color: string
}

export type MathOperation = {

  numbers: [],
  number: number | null,
  operationType: string

}

export type NumberSetter = {
  number: number
}


export const nodeType = {
  colorGetter: {
    type: "colorGetter",
    data: { color: "red", allowsMultipleConnection: false } as ColorGetter
  } as NodeType,
  colorSetter: {
    type: "colorSetter",
    data: { color: "red" } as ColorSetter
  } as NodeType,
  textGetter: {
    type: "textGetter",
    data: { text: "", allowsMultipleConnection: false } as TextGetter
  } as NodeType,
  textSetterUC: {
    type: "textSetter",
    data: { text: "", subType: "upperCase" } as TextSetter
  } as NodeType,
  textSetterLC: {
    type: "textSetter",
    data: { text: "", subType: "lowerCase" } as TextSetter
  } as NodeType,
  mathOperation: {
    type: "mathOperation",
    data: { numbers: [], number: 0, operationType: 'addition' }
  } as NodeType,
  numberSetter: {
    type: "numberSetter",
    data: { number: 0 } as NumberSetter
  } as NodeType,
  pointer: {
    type: "pointer",
    data: { title: "pointer", color: "#FFFFFF", description: " desc..." }
  } as NodeType


}

