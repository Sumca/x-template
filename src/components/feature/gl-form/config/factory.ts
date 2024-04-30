
const TYPES = {
  input: 'ElInput',
  select: 'ElSelect',
  date: 'ElDatePicker',
  time: 'ElTimePicker',
  checkbox: 'ElCheckbox',
  dateYMD: 'ElDatePicker',
  datetime: 'ElDatePicker'
}

const PROPS = {
  date: {
    type: 'date',
    valueFormat: 'timestamp'
  },
  datetime: {
    type: 'datetime',
    valueFormat: 'timestamp'
  },
  dateYMD: {
    type: 'date',
    valueFormat: 'yyyy-MM-dd'
  }
} 

export function getComponent(formItem:itemProp) {
  if(formItem.type) return TYPES[formItem.type]
  return formItem?.component
}
export function getComponentProp(type:string) {
  return PROPS[type]
}

