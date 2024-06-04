import requset from "@/utils/request"


// 获取下拉数据
export const getSelectApi=(params:any)=>{
  return requset({
    url: params.url,
    method:"GET",
    // params
  })
}
