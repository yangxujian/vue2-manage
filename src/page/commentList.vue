<template>
  <section>
    <!--工具条-->
		<el-col style="margin-bottom:22px;" :span="24" class="toolbar">
		  <el-button @click="handleAdd" type="primary">添加素材</el-button>
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
        label="评论星级"
        align='center'
        min-width="100"
        prop="grade">
      </el-table-column>
      <el-table-column
        label="点评内容"
        prop="text"
        min-width="400"
        align='center'>
      </el-table-column>
      <el-table-column
        label="添加时间"
        align='center'
        min-width='160'
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        label="评价类型"
        align='center'
        min-width='120'
        prop="type">
      </el-table-column>
      <el-table-column
        label="状态"
        align='center'
        min-width='120'
        prop="state">
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

    <el-dialog title="评价信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" :inline="false">
        <el-form-item label="评价星级(0~5)" :label-width="labelWidth">
          <el-input v-model="selectTable.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务态度(0~5)" :label-width="labelWidth">
          <el-input v-model="selectTable.cc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品质量(0~5)" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发货速度(0~5)" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动参与度(0~5)" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="满意度(0~5)" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价类型" :label-width="labelWidth">
          <el-select v-model="selectTable.name" placeholder="请选择">
            <el-option label="商品" value="shanghai"></el-option>
            <el-option label="店铺" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传用户" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传店铺头像" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="评论内容" :label-width="labelWidth">
          <el-input  type="textarea" ></el-input>
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
          labelWidth:'120px',
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16661',
              grade: '1',
              text: 'dadadasdasdasdasddadadasdasdasdasddadadasdasdasdasd',
              time: '2018/06/01 15:01:55',
              type:'',
              state:'未删除'
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

        handleAdd() {
          this.selectTable = {};
          this.dialogFormVisible = true;
        }
      },
    }
</script>
