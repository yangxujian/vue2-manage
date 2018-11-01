import axios from 'axios'


/**
 *  接口请求示例
 */
export const wxlogin = (code) => {
	return axios({
		 method:'post',
		 url:'',
		 params:{
			code,
		 }
	 })
}
