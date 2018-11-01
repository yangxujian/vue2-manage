<template>
  <section>
    <!--工具条-->
    <el-col :span="24" style="margin-bottom:22px;" class="toolbar" >
			<el-button @click="handleAdd" type="primary">发布广告</el-button>
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
        label="位置"
        align='center'
        min-width="200"
        prop="name">
      </el-table-column>
      <el-table-column
        label="缩略图"
        min-width="120"
        align='center'>
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        align='center'
        min-width="120"
        prop="phone">
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
        <el-form-item label="广告位" :label-width="labelWidth">
          <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
            <el-option label="待认证" value="shanghai"></el-option>
            <el-option label="同意" value="beijing"></el-option>
            <el-option label="拒绝" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投放时间" :label-width="labelWidth">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="缩略图" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="标题" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" :label-width="labelWidth">
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
              id: '16661',
              name: '13916255844',
              phone: '13916255844',
              img:'http://oy9r4heum.bkt.clouddn.com/21d987625dc573c49946c23c03c4c8f0.png',
              time: '2018/06/01 15:01:55',
              type:'审核通过'
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
