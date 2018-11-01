<template>
  <section>
    <el-table
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="编号"
        align='center'
        min-width="80"
        sortable
        prop="id">
      </el-table-column>
      <el-table-column
        label="呢称"
        align='center'
        min-width="160"
        prop="name">
      </el-table-column>
      <el-table-column
        label="手机号"
        align='center'
        min-width="160"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="中奖时间"
        align='center'
        sortable
        min-width="160"
        prop="time">
      </el-table-column>
      <el-table-column
        label="活动名称"
        align='center'
        min-width="160"
        prop="activityName">
      </el-table-column>
      <el-table-column
        label="奖品类型"
        align='center'
        min-width="160"
        prop="prizeType">
      </el-table-column>
      <el-table-column
        label="奖品"
        align='center'
        min-width="160"
        prop="prize">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        :disabled="filtersing"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 25, 50]"
        :page-size="showCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10">
      </el-pagination>
    </div>

  </section>
</template>

<script>
    export default {
      data(){
        return {
          filtersing:false, // 防止重复请求
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          tableData:[
            {
              id: '16661',
              name: 'dsadasdas',
              phone: '13916255844',
              time: '2018/06/01 15:01:55',
              activityName: 'dsadasddsadasd',
              prizeType:'积分',
              prize:'攀高智能眼保仪',
            },
          ]
        }
      },
    	components: {
    	},
      mounted() {
      },
      methods: {

        // 查询
        submit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.filters)
              this.filtersing = true;
              setTimeout(() =>{
                this.filtersing = false;
              },1000)
            }
          });
        },

        // 当前页数发生改变时触发
        handleCurrentChange(val) {
          console.log(val)
          this.filtersing = true;
          setTimeout(() =>{
            this.filtersing = false;
          },1000)
        },

        // 每页显示数量改变时触发
        handleSizeChange(val) {
          this.showCount = val;
          this.filtersing = true;
          setTimeout(() =>{
            this.filtersing = false;
          },1000)
        },

      },
    }
</script>
