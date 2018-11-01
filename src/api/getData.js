import axios from 'axios'
import {getCookie} from 'src/config/mUtils'



/**
 *  微信用户登录
 */
export const wxlogin = (code,superior) => {
	return axios({
		 method:'post',
		 url:'/uthink-app-manage/api/member/getMmgRegisterOrUpdateByWXcode',
		 params:{
			 code,
			 superior,
		 }
	 })
}
