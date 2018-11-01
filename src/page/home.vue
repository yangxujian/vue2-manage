<template>
  <div>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
			</el-row>
      <el-row :gutter="20">
          <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
          <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
      </el-row>
		</section>
  </div>
</template>

<script>
	import headTop from 'src/components/headTop'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
          adminCount: null,
          allUserCount: null,
          allOrderCount: null,
          allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){

    	},
      computed: {

      },
    	methods: {
    	}
    }
</script>

<style lang="scss">
	@import '../style/mixin';

</style>
