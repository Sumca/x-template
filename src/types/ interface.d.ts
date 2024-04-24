interface columItem {
  type: string
  label: string
  prop: string
  attrs?: object
}

interface itemProp {
  type?: string
  label: string
  prop: string
  attrs?: object
  component?:object
  linstener?:object
  span?:number
}
interface columnProp {
  prop: string
  label?:string
  width?:string
  editable?:boolean
  type?:string
  attrs?:string
  component?:object
  linstener?:object
}
interface option {
  value: string|number|undefined|null
  label: string|number
}
interface SquareConfig {
  color?: string
  width?: number
}

interface tagsViewItemProp {
  name:string,
  title:string,
  path:string,
}