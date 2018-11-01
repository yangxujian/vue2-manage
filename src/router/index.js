
const login = r => require.ensure([], () => r(require('src/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('src/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('src/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('src/page/userList')), 'userList');
const userGrade = r => require.ensure([], () => r(require('src/page/userGrade')), 'userGrade');
const shopNum = r => require.ensure([], () => r(require('src/page/shopNum')), 'shopNum');
const userJoin = r => require.ensure([], () => r(require('src/page/userJoin')), 'userJoin');
const commentList = r => require.ensure([], () => r(require('src/page/commentList')), 'commentList');
const feedBack = r => require.ensure([], () => r(require('src/page/feedBack')), 'feedBack');
const goodsList = r => require.ensure([], () => r(require('src/page/goodsList')), 'goodsList');
const goodsCategory = r => require.ensure([], () => r(require('src/page/goodsCategory')), 'goodsCategory');
const brandManage = r => require.ensure([], () => r(require('src/page/brandManage')), 'brandManage');
const labelManage = r => require.ensure([], () => r(require('src/page/labelManage')), 'labelManage');
const goodsType = r => require.ensure([], () => r(require('src/page/goodsType')), 'goodsType');
const goodsSpec = r => require.ensure([], () => r(require('src/page/goodsSpec')), 'goodsSpec');
const goodsAttr = r => require.ensure([], () => r(require('src/page/goodsAttr')), 'goodsAttr');
const goodsParm = r => require.ensure([], () => r(require('src/page/goodsParm')), 'goodsParm');
const shopList = r => require.ensure([], () => r(require('src/page/shopList')), 'shopList');
const activityList = r => require.ensure([], () => r(require('src/page/activityList')), 'activityList');
const prizeList = r => require.ensure([], () => r(require('src/page/prizeList')), 'prizeList');
const winTreasureList = r => require.ensure([], () => r(require('src/page/winTreasureList')), 'winTreasureList');
const advertList = r => require.ensure([], () => r(require('src/page/advertList')), 'advertList');
const commonOrder = r => require.ensure([], () => r(require('src/page/commonOrder')), 'commonOrder');
const error = r => require.ensure([], () => r(require('src/page/error')), 'error');

export default [
  {
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userList',
			component: userList,
			meta: {
        title:['用户管理', '会员列表'],
      }
		},{
			path: '/userGrade',
			component: userGrade,
      meta: {
        title:['用户管理', '会员等级'],
      }
		},{
			path: '/shopNum',
			component: shopNum,
      meta: {
        title:['用户管理', '保留店铺号码'],
      }
		},{
			path: '/userJoin',
			component: userJoin,
      meta: {
        title:['用户管理', '加盟会员'],
      }
		},{
			path: '/commentList',
			component: commentList,
      meta: {
        title:['用户管理', '评论列表'],
      }
		},{
			path: '/feedBack',
			component: feedBack,
      meta: {
        title:['用户管理', '投诉和意见反馈'],
      }
		},{
			path: '/goodsList',
			component: goodsList,
      meta: {
        title:['用户管理', '商品列表'],
      }
		},{
			path: '/goodsCategory',
			component: goodsCategory,
      meta: {
        title:['用户管理', '商品品类'],
      }
		},{
			path: '/brandManage',
			component: brandManage,
      meta: {
        title:['用户管理', '品类管理'],
      }
		},{
			path: '/labelManage',
			component: labelManage,
      meta: {
        title:['用户管理', '标签管理'],
      }
		},{
			path: '/goodsType',
			component: goodsType,
      meta: {
        title:['用户管理', '商品类型'],
      }
		},{
			path: '/goodsSpec',
			component: goodsSpec,
      meta: {
        title:['用户管理', '商品规格'],
      }
		},{
			path: '/goodsAttr',
			component: goodsAttr,
      meta: {
        title:['用户管理', '商品属性'],
      }
		},{
			path: '/goodsParm',
			component: goodsParm,
      meta: {
        title:['用户管理', '商品参数'],
      }
		},{
			path: '/shopList',
			component: shopList,
      meta: {
        title:['用户管理', '店铺列表'],
      }
		},{
			path: '/activityList',
			component: activityList,
      meta: {
        title:['用户管理', '活动列表'],
      }
		},{
			path: '/prizeList',
			component: prizeList,
      meta: {
        title:['用户管理', '中奖列表'],
      }
		},{
			path: '/winTreasureList',
			component: winTreasureList,
      meta: {
        title:['用户管理', '夺宝列表'],
      }
		},{
			path: '/advertList',
			component: advertList,
      meta: {
        title:['用户管理', '广告列表'],
      }
		},{
			path: '/commonOrder',
			component: commonOrder,
      meta: {
        title:['用户管理', '普通订单'],
      }
		},]
	},
  {
		path: '*',
		component: error
	},
]
