<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="名称" prop="name">
					<el-input clearable v-model="filters.name" auto-complete="off" placeholder="请输入名称"></el-input>
				</el-form-item>
        <el-form-item label="手机号" prop="phone">
					<el-input clearable type="number" v-model="filters.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="认证状态" prop="state">
          <el-select v-model="filters.state" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item>
          <el-button :loading="filtersing" @click="submit('filtersForm')" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
					<el-button @click="resetForm('filtersForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

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
        label="头像"
        min-width="160"
        align='center'>
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        align='center'
        min-width="160"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="注册时间"
        align='center'
        min-width='160'
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        label="审核状态"
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
        :total="10">
      </el-pagination>
    </div>

    <el-dialog title="审核信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item label="会员姓名" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" :label-width="labelWidth">
          <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" :label-width="labelWidth">
          <img :src="selectTable.img" alt="">
        </el-form-item>
        <el-form-item label="身份证反面" :label-width="labelWidth">
          <img :src="selectTable.img" alt="">
        </el-form-item>
        <el-form-item label="缴费凭证" :label-width="labelWidth">
          <img :src="selectTable.img" alt="">
        </el-form-item>
        <el-form-item label="审核意见" :label-width="labelWidth">
          <el-select v-model="selectTable.name" placeholder="请选择活动区域">
            <el-option label="待认证" value="shanghai"></el-option>
            <el-option label="同意" value="beijing"></el-option>
            <el-option label="拒绝" value="beijing"></el-option>
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
            state:'',
          }, // 筛选条件
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          labelWidth:'100px',
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16661',
              name: '13916255844',
              phone: '13916255844',
              img:'http://oy9r4heum.bkt.clouddn.com/21d987625dc573c49946c23c03c4c8f0.png',
              time: '2018/06/01 15:01:55',
              type:'待审核'
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

        // 重置
        resetForm(formName) {
          this.$refs[formName].resetFields();
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

        // 编辑
        handleEdit(index, row) {
          this.selectTable = row;
          this.dialogFormVisible = true;
        },
      },
    }
</script>
