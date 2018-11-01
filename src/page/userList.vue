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
				<el-form-item label="会员等级" prop="grade">
          <el-select v-model="filters.grade" placeholder="请选择">
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
        <el-form-item class="fr">
					<el-button @click="exportExcel" type="primary">导出Excel</el-button>
				</el-form-item>
        <el-form-item class="fr">
					<el-button @click="handleAdd" type="primary">添加用户</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-table
      id="table"
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="编号"
        align='center'
        min-width="90"
        sortable
        prop="id">
      </el-table-column>
      <el-table-column
        label="呢称"
        align='center'
        min-width="120"
        prop="name">
      </el-table-column>
      <el-table-column
        label="手机号"
        align='center'
        min-width="120"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="店铺号码"
        align='center'
        min-width="120"
        prop="shopId">
      </el-table-column>
      <el-table-column
        label="注册时间"
        align='center'
        sortable
        min-width="160"
        prop="time">
      </el-table-column>
      <el-table-column
        label="会员等级"
        min-width="120"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.grade}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="上级会员"
        align='center'
        min-width="120"
        prop="superior">
      </el-table-column>
      <el-table-column
        label="微信号"
        align='center'
        min-width="120"
        prop="wx">
      </el-table-column>
      <el-table-column
        label="余额"
        align='center'
        min-width='120'
        prop="balance">
      </el-table-column>
      <el-table-column
        label="冻结金额"
        align='center'
        min-width='120'
        prop="frozenPrice">
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        fixed="right"
        width='180'
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

    <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="代理姓名" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理ID" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前等级" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级编号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级呢称" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" :label-width="labelWidth">
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
    import {export_json_to_excel} from 'src/config/Export2Excel'
    export default {
      data(){
        return {
          filtersing:false, // 防止重复请求
          filters: {
          	name: '',
            phone:'',
            grade:'',
          }, // 筛选条件
          labelWidth:'80px',
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16937',
              name: '宇宙无敌大帅哥',
              phone: '13916255844',
              shopId: '000101',
              time: '2018/06/01 15:01:55',
              grade: '正式店主',
              superior: 'fjsdlkfsd',
              balance: 0,
              frozenPrice: 1000000,
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
        console.log(export_json_to_excel)
      },
      methods: {

        // 导出Excel
        exportExcel () {
          const tHeader = ['编号', '呢称', '手机号', '店铺号码', '注册时间', '会员等级', '上级会员', '微信号', '余额', '冻结金额']
          const filterVal = ['id', 'name', 'phone', 'shopId', 'time', 'grade', 'superior', 'balance', 'frozenPrice', 'wx']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel({
            header: tHeader,
            data,
            filename: '用户列表',
            autoWidth: true
          })
        },

        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },

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

        // 添加用户
        handleAdd(index, row) {
          this.selectTable = {};
          this.dialogFormVisible = true;
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
      },
    }
</script>
