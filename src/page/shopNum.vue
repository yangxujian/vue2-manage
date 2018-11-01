<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="编号" prop="name">
					<el-input clearable v-model="filters.number" auto-complete="off" placeholder="请输入编号"></el-input>
				</el-form-item>
        <el-form-item>
          <el-button :loading="filtersing" @click="submit('filtersForm')" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item class="fr">
					<el-button @click="handleAdd" type="primary">添加号码</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-table
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="ID"
        align='center'
        min-width="80"
        sortable
        prop="id">
      </el-table-column>
      <el-table-column
        label="编号"
        align='center'
        min-width="100"
        sortable
        prop="id">
      </el-table-column>
      <el-table-column
        label="添加时间"
        sortable
        min-width="600"
        align='center'
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

    <el-dialog title="添加保留号码" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item  label="请输入保留号码(多个以*分割)" label-width="200px">
          <el-input auto-complete="off"></el-input>
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
          	number: '',
          }, // 筛选条件
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16661',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '1',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16662',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '2',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16663',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '3',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16664',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '4',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16665',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '5',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 0,
              wx:'123456'
            },
            {
              id: '16666',
              name: '13916255844',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '7',
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

        // 添加
        handleAdd(index, row) {
          this.selectTable = {};
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
