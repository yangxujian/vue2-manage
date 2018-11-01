<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="分类名称" prop="name">
					<el-input clearable v-model="filters.name" auto-complete="off" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" prop="grade">
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
					<el-button @click="handleAdd" type="primary">添加分类</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-table
      :data="tableData"
      border
      v-loading="filtersing">
      <el-table-column
        label="小类"
        align='center'
        min-width="100"
        prop="smallType">
      </el-table-column>
      <el-table-column
        label="中类"
        align='center'
        min-width="100"
        prop="inType">
      </el-table-column>
      <el-table-column
        label="大类"
        align='center'
        min-width="100"
        prop="bigType">
      </el-table-column>
      <el-table-column
        label="更新时间"
        align='center'
        sortable
        min-width="160"
        prop="time">
      </el-table-column>
      <el-table-column
        label="排序"
        align='center'
        min-width="100"
        prop="sort">
      </el-table-column>
      <el-table-column
        label="是否有效"
        min-width="100"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.state}}
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

    <el-dialog title="商品分类信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="分类名称" :label-width="labelWidth">
          <el-input v-model="selectTable.state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="labelWidth">
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width: 100%;" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width: 100%;" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="排序值" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="首页分类图标" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="分类图标" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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
          labelWidth:'100px',
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              smallType: '小类',
              inType: '中类',
              bigType: '大类',
              time: '2018/06/01 15:01:55',
              sort:'11',
              state:'有效'
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
          this.selectTable = {...row};
          this.dialogFormVisible = true;
        },

        // 添加
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
