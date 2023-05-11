export  const getIconType=(type)=>{
    switch(type){
        case "餐饮":
            return "icon-canyin"
        case "服饰":
            return "icon-fushi"
        case "交通":
            return "icon-gongjiao"
        case "日用":
            return "icon-ziyuan"
        case "购物":
            return "icon-gouwuchexuanzhong"
        case "学习":
            return "icon-xuexi"
        case "医疗":
            return "icon-yaopin"
        case "旅游":
            return "icon-feiji"
        case "人情":
            return "icon-cc-user"
        case "其他":
            return "icon-renminbi"
        case "工资":
            return "icon-gongzi"
        case "奖金":
             return "icon-wodegongzi"
        case "转账":
            return "icon-zhuanzhang"
        case "理财":
            return "icon-licai"
        case "退款":
            return "icon-refund"
        
    }
}
// 刷新状态
export const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
  };
  // 加载状态
  export const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
  };