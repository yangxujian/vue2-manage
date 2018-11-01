import FileSaver from 'file-saver'
import XLSX from 'xlsx'

//JS操作cookies方法!

//写cookies
export const setCookie = (c_name,value,expiredays) =>
{
    const exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
}

//读取cookies
export const getCookie = (name) =>
{
    let arr;
    const reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg)){
        return (arr[2]);
    }else{
        return null;
    }
}

//删除cookies
export const removeCookie = (name) =>
{
    const exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    const cval=getCookie(name);
    if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
    }
}

// 使用示例
//setCookie('username','Darren',30)
//alert(getCookie("username"));
export const getQueryString = (name) =>
{
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
}

// 深拷贝
export const clone = (obj) =>
{
  var copy;

   // Handle the 3 simple types, and null or undefined
   if (null == obj || "object" != typeof obj) return obj;

   // Handle Date
   if (obj instanceof Date) {
       copy = new Date();
       copy.setTime(obj.getTime());
       return copy;
   }

   // Handle Array
   if (obj instanceof Array) {
       copy = [];
       for (var i = 0, len = obj.length; i < len; i++) {
           copy[i] = clone(obj[i]);
       }
       return copy;
   }

   // Handle Object
   if (obj instanceof Object) {
       copy = {};
       for (var attr in obj) {
           if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
       }
       return copy;
   }

   throw new Error("Unable to copy obj! Its type isn't supported.");
}
