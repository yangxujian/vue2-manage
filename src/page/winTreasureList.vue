<template>
  <section>
    <!--工具条-->
		<el-col style="margin-bottom:22px;" :span="24" class="toolbar">
		  <el-button @click="handleAdd" type="primary">新增夺宝</el-button>
		</el-col>

    <el-table
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="商品名称"
        align='center'
        min-width="200"
        prop="name">
      </el-table-column>
      <el-table-column
        label="商品图片"
        min-width="120"
        align='center'>
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="参与人次"
        align='center'
        min-width="120"
        prop="userNum">
      </el-table-column>
      <el-table-column
        label="支付方式"
        align='center'
        min-width="120"
        prop="payType">
      </el-table-column>
      <el-table-column
        label="开始时间"
        align='center'
        min-width="160"
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        label="结束时间"
        align='center'
        min-width="160"
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="100"
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
        :total="10">
      </el-pagination>
    </div>

    <el-dialog title="活动信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item label="参与方式" :label-width="labelWidth">
          <el-radio v-model="selectTable.c" label="1">积分参与</el-radio>
          <el-radio v-model="selectTable.c" label="2">RMB参与</el-radio>
        </el-form-item>
        <el-form-item label="参与价格" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="需要人次" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="labelWidth">
          <el-radio v-model="selectTable.c" label="1">活动中</el-radio>
          <el-radio v-model="selectTable.c" label="2">活动中止</el-radio>
        </el-form-item>
        <el-form-item label="序值" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择货品" :label-width="labelWidth">
          <el-button type="primary">选择货品</el-button>
        </el-form-item>
        <el-form-item label="已选货品" :label-width="labelWidth">
          <el-table
            :data="tableData"
            border
            v-loading="filtersing">
            <el-table-column
              label="货品名称"
              align='center'
              prop="name">
            </el-table-column>
            <el-table-column
              label="商品图片"
              width="120"
              align='center'>
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="">
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label="操作"
              width='120'
              >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="labelWidth">
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
              name: '美国原装进口Nature',
              userNum:'10000',
              payType:'积分参与',
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

        // 添加
        handleAdd(index, row) {
          this.selectTable = {};
          this.dialogFormVisible = true;
        },
      },
    }
</script>
