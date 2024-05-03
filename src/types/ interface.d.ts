interface ColumItem {
  type: string
  label: string
  prop: string
  attrs?: object
}

interface ItemProp {
  type?: string
  label: string
  prop: string
  attrs?: object
  component?:object
  linstener?:object
  span?:number
}
interface ColumnProp {
  prop: string
  label?:string
  width?:string
  editable?:boolean
  type?:string
  attrs?:object
  component?:object
  linstener?:object|Function|null
  listeners?: object|Function|null
  labelRender?:object|Function|null
}
interface Option {
  value: string|number|undefined|null
  label: string|number
}
interface SquareConfig {
  color?: string
  width?: number
}

interface TagsViewItemProp {
  name:string,
  title:string,
  path:string,
}