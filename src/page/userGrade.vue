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
        <el-form-item class="fr">
					<el-button @click="handleAdd" type="primary">添加等级</el-button>
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
        label="达人名称"
        align='center'
        min-width="300"
        prop="name">
      </el-table-column>
      <el-table-column
        label="达人等级"
        sortable
        min-width="160"
        align='center'
        prop="grade">
      </el-table-column>
      <el-table-column
        label="下级上限"
        min-width="160"
        align='center'
        prop="subordinate">
      </el-table-column>
      <el-table-column
        label="类型"
        min-width="160"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.type}}
          </el-tag>
        </template>
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

    <el-dialog title="达人等级信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item  label="等级名称" :label-width="labelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所需粉丝数(直属)" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认佣金比例(%)" :label-width="labelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" :label-width="labelWidth">
          <el-select v-model="selectTable.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="佣金是否允许提现" :label-width="labelWidth">
          <el-select v-model="selectTable.name" placeholder="请选择活动区域">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
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
            phone:'',
            grade:'',
          }, // 筛选条件
          labelWidth:'130px',
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16661',
              name: '13916255844',
              grade: '1',
              subordinate:'111',
              type:'代理代理'
            },
            {
              id: '16661',
              name: '13916255844',
              grade: '1',
              subordinate:'111',
              type:'代理'
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

        // 编辑
        handleEdit(index, row) {
          this.selectTable = row;
          this.dialogFormVisible = true;
        },

        // 编辑
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
