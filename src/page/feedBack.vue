<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="名称" prop="name">
					<el-input clearable v-model="filters.name" auto-complete="off" placeholder="请输入名称"></el-input>
				</el-form-item>
        <el-form-item>
          <el-button :loading="filtersing" @click="submit('filtersForm')" type="primary">查询</el-button>
        </el-form-item>
			</el-form>
		</el-col>

    <el-table
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="客户呢称"
        align='center'
        min-width="160"
        prop="id">
      </el-table-column>
      <el-table-column
        label="消息"
        align='center'
        min-width="160"
        prop="name">
      </el-table-column>
      <el-table-column
        label="发布状态"
        align='center'
        min-width="160"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="回馈"
        align='center'
        min-width="160"
        prop="shopId">
      </el-table-column>
      <el-table-column
        label="创建时间"
        align='center'
        min-width='160'
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        label="回馈时间"
        align='center'
        min-width='160'
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width='180'
        fixed="right"
        >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
          >删除</el-button>
        </template>
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
        :total="400">
      </el-pagination>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item label="姓名" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户ID" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
    export default {
      data(){
        return {
          filtersing:false, // 防止重复请求
          filters: {
          	name: '',
          }, // 筛选条件
          labelWidth:'80px',
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16937',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16936',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:54',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16935',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:52',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16937',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:50',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16937',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:58',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16937',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            }
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

        // 编辑
        handleEdit(index, row) {
          this.selectTable = row;
          this.dialogFormVisible = true;
        },

        // 当前页数发生改变时触发
        handleCurrentChange(val) {
          console.log(val)
          console.log(this.currentPage)
          this.submit('filtersForm');
          // this.currentPage = val;
        },

        // 每页显示数量改变时触发
        handleSizeChange(val) {
          this.showCount = val;
          this.submit('filtersForm');
          console.log(this.showCount)
        },
      },
    }
</script>
