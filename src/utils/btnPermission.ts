interface Node {
  name: string;
  title: string;
  id: string;
  children?: Node[];
  button?: string[];
}
// 设置本地按钮权限 buttonsPersimmon（对象）buttonListPersimmon（数组）
export function extractButtons(data: Node[]): { [key: string]: string[] } {
  const result: { [key: string]: string[] } = {};
  let buttonList:string[] = []
  function traverse(node: Node) {
    if (node.button) {
      result[node.name] = node.button;
      buttonList = buttonList.concat(node.button)
    }
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  data.forEach(node => traverse(node));
  localStorage.setItem('buttonsPersimmon', JSON.stringify(result));
  localStorage.setItem('buttonListPersimmon', JSON.stringify(buttonList));
  return result;
}
// 判断本地是否有该按钮权限
export function buttonsFromCache(key: string): boolean {
  const cachedData = localStorage.getItem('buttonListPersimmon');
  if(!cachedData) return false
  const buttons = JSON.parse(cachedData);
  if(!buttons.includes(key)) return false
  return true
}
