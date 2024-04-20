import requset from "@/utils/request"

// 登录获取用户token
export const loginApi=(data:any)=>{
  return requset({
    url:"/login",
    method:"POST",
    data
  })
}

// export const getTableDataApi=(params:any)=>{
//   return requset({
//     url:"/api/public/v1/goods/search",
//     method:"GET",
//     params
//   })
// }

export const getTableDataApi=(data:any)=>{
  return requset({
    url:"/tableInfo",
    method:"POST",
    timeout: 10000,
    data
  })
}

