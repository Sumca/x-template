import requset from "@/utils/request"

// 登录获取用户token和用户ID
export const loginApi=(data:any)=>{
  return requset({
    url:"/mock/login",
    method:"POST",
    data
  })
}
// 根据用户ID获取用户权限
export const getUserPermission=(params:any)=>{
  return requset({
    url:"/mock/getPermission",
    method:"GET",
    params
  })
}
//
export const getTableDataApi2=(params:any)=>{
  return requset({
    url:"/api/public/v1/goods/search",
    method:"GET",
    params
  })
}

export const getTableDataApi=(data:any)=>{
  return requset({
    url:"/mock/tableInfo",
    method:"POST",
    data
  })
}

