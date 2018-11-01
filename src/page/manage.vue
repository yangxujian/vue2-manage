<template>
	<div class="manage_page fillcontain">
		<head-top></head-top>
		<div class="manage_container" :class="{on: isCollapse}">
	  	<div class="left_menu">
				<el-menu
				:default-active="defaultActive"
				unique-opened
				:collapse="isCollapse"
				text-color="#eee"
				background-color="#324057" router>
				<el-menu-item v-for="items,idx in menu" :key="idx" v-if="!items.children" :index="items.path"><i :class="items.icon"></i><span slot="title">{{items.name}}</span></el-menu-item>
				<el-submenu v-for="items,idx in menu" :key="idx" v-if="items.children" :index="String(idx+1)">
					<template slot="title"><i :class="items.icon"></i><span>{{items.name}}</span></template>
					<el-menu-item v-for="item,index in items.children" :key="index" :index="item.path"><span>{{item.name}}</span></el-menu-item>
				</el-submenu>
				</el-menu>
			</div>
			<div class="right_content">
				<div class="right_breadcrumb">
					<img class="menu" :class="{active: isCollapse}" @click="isCollapse = !isCollapse" src="../images/menu.png" alt="">
		  		<el-breadcrumb separator="/">
		  			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
		  			<el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">{{item}}</el-breadcrumb-item>
		  		</el-breadcrumb>
		    </div>
				<!--内容页-->
				<div class="right_main">
					<transition name="fade-transform" mode="out-in">
						<!-- <keep-alive> -->
						  <router-view></router-view>
						<!-- </keep-alive> -->
					</transition>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
		import headTop from 'src/components/headTop'
		export default {
      data(){
        return {
					isCollapse:false,
					menu:[
						{
							name:'首页',
							path:'manage',
							icon:'el-icon-menu',
						},
						{
							name:'用户管理',
							icon:'el-icon-star-on',
							children:[
								{
									name:'会员列表',
									path:'userList',
								},
								{
									name:'会员等级',
									path:'userGrade',
								},
								{
									name:'保留店铺号码',
									path:'shopNum',
								},
								{
									name:'加盟会员',
									path:'userJoin',
								},
								{
									name:'评论列表',
									path:'commentList',
								},
								{
									name:'投诉和意见反馈',
									path:'feedBack',
								},
							]
						},
						{
							name:'商品管理',
							icon:'el-icon-goods',
							children:[
								{
									name:'商品列表',
									path:'goodsList',
								},
								{
									name:'商品品类',
									path:'goodsCategory',
								},
								{
									name:'品牌管理',
									path:'brandManage',
								},
								{
									name:'标签管理',
									path:'labelManage',
								},
								{
									name:'商品类型',
									path:'goodsType',
								},
								{
									name:'商品规格',
									path:'goodsSpec',
								},
								{
									name:'商品属性',
									path:'goodsAttr',
								},
								{
									name:'商品参数',
									path:'goodsParm',
								},
								{
									name:'京东商品库',
									path:'addGoods',
								},
							]
						},
						{
							name:'店铺管理',
							icon:'el-icon-sold-out',
							children:[
								{
									name:'店铺列表',
									path:'shopList',
								},
							]
						},
						{
							name:'活动管理',
							icon:'el-icon-bell',
							children:[
								{
									name:'活动列表',
									path:'activityList',
								},
								{
									name:'中奖列表',
									path:'prizeList',
								},
								{
									name:'夺宝列表',
									path:'winTreasureList',
								},
							]
						},
						{
							name:'广告位管理',
							icon:'el-icon-printer',
							children:[
								{
									name:'广告列表',
									path:'advertList',
								},
							]
						},
						{
							name:'交易管理',
							icon:'el-icon-refresh',
							children:[
								{
									name:'用户表单列表',
									path:'addShop',
								},
								{
									name:'普通订单',
									path:'commonOrder',
								},
								{
									name:'积分订单',
									path:'addShop',
								},
								{
									name:'服务订单',
									path:'addShop',
								},
								{
									name:'爆款车订单',
									path:'addShop',
								},
							]
						},
						{
							name:'优惠券管理',
							icon:'el-icon-document',
							children:[
								{
									name:'满减优惠列表',
									path:'addShop',
								},
								{
									name:'满折优惠列表',
									path:'addShop',
								},
							]
						},
						{
							name:'分销管理',
							icon:'el-icon-share',
							children:[
								{
									name:'自购奖励列表',
									path:'addShop',
								},
								{
									name:'销售奖励列表',
									path:'addShop',
								},
								{
									name:'培训奖励列表',
									path:'addShop',
								},
								{
									name:'提现列表',
									path:'addShop',
								},
							]
						},
						{
							name:'营销管理',
							icon:'el-icon-news',
							children:[
								{
									name:'营销活动',
									path:'addShop',
								},
								{
									name:'套装列表',
									path:'addShop',
								},
								{
									name:'今日特卖',
									path:'addShop',
								},
							]
						},
						{
							name:'发现管理',
							icon:'el-icon-view',
							children:[
								{
									name:'发现分类管理',
									path:'addShop',
								},
								{
									name:'发现列表',
									path:'addShop',
								},
								{
									name:'发布文章',
									path:'addShop',
								},
							]
						},
						{
							name:'报表管理',
							icon:'el-icon-tickets',
							children:[
								{
									name:'销售统计',
									path:'addShop',
								},
								{
									name:'积分统计',
									path:'addShop',
								},
							]
						},
						{
							name:'系统管理',
							icon:'el-icon-setting',
							children:[
								{
									name:'彩票配置',
									path:'addShop',
								},
								{
									name:'自定义表单列表',
									path:'addShop',
								},
								{
									name:'积分规则设置',
									path:'addShop',
								},
								{
									name:'邮费设置（按省）',
									path:'addShop',
								},
								{
									name:'邮费设置（按件）',
									path:'addShop',
								},
								{
									name:'提现设置',
									path:'addShop',
								},
								{
									name:'第三方设置',
									path:'addShop',
								},
								{
									name:'数据字典',
									path:'addShop',
								},
								{
									name:'银行卡管理',
									path:'addShop',
								},
								{
									name:'系统参数配置',
									path:'addShop',
								},
								{
									name:'汽车品类',
									path:'addShop',
								},
							]
						},
					]
        }
      },
			computed: {
				defaultActive: function(){
					return this.$route.path.replace('/', '');
				},
			},
    	components: {
    		headTop,
    	},
			created() {
			},
			mounted() {
				this.scrollbarChange();
			},
      methods: {
				scrollbarChange() {
					const w = window.innerWidth;
					if(w < 960){
						this.isCollapse = true;
					}
				}
      },
    }
</script>


<style lang="scss">
	@import '../style/mixin';
	.manage_page{
		.manage_container{
			position: absolute;
			top:71px;
			left:0;
			bottom:0;
			width: 100%;
			// min-width: 960px;
			overflow: hidden;
			&.on{
				.right_content{
					left:64px;
				}
			}
			.el-menu{
				min-height: 100%;
				border:none;
				overflow-x:hidden;
				&:not(.el-menu--collapse){
					width: 200px;
				}
				.el-submenu__title:hover,.el-menu-item:hover{
					  background-color: #48576a !important;
				}
				.el-submenu .el-menu-item{
					background-color: rgb(31, 45, 61) !important;
					&:hover{
						background-color: #48576a !important;
					}
				}
				.el-menu-item i,.el-submenu__title i{
					color: #eee;
				}
				.el-menu-item.is-active i{
					color: inherit;
				}
			}
			.right_breadcrumb{
				background-color: #EFF2F7;
				height: 40px;
				display: flex;
				align-items: center;
				padding-left: 20px;
			  .menu{
					width:18px;
					margin-right: 10px;
					cursor: pointer;
					&.active{
						transform: rotate(90deg);
					}
				}
			}
			.left_menu{
				position: absolute;
				top:0;
				left:0;
				height: 100%;
				background-color: rgb(50, 64, 87);
				z-index: 9;
				overflow-y: auto;
				overflow-scrolling: touch;
				-moz-overflow-scrolling: touch;
				-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar{
				   width: 0px;
				   height: 0px;
				}
			}
			.right_content{
				position: absolute;
				left:200px;
				right:0;
				height: 100%;
				overflow-y: auto;
				overflow-scrolling: touch;
				-moz-overflow-scrolling: touch;
				-webkit-overflow-scrolling: touch;
				.right_main{
					padding: 20px;
				}
			}
		}
	}
</style>
