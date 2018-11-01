<template>
  <section>
    <!--工具条-->
		<el-col style="margin-bottom:22px;" :span="24" class="toolbar" >
			<el-button @click="handleAdd" type="primary">添加品牌</el-button>
		</el-col>

    <el-table
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
        label="品牌名称"
        align='center'
        min-width="150"
        prop="name">
      </el-table-column>
      <el-table-column
        label="名牌别名"
        align='center'
        min-width="150"
        prop="name2">
      </el-table-column>
      <el-table-column
        label="品牌LOGO"
        min-width="150"
        align='center'>
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="品牌网址"
        align='center'
        min-width="200"
        prop="website">
      </el-table-column>
      <el-table-column
        label="是否可用"
        min-width="120"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.isUse}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="品牌类型"
        min-width="120"
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

    <el-dialog title="品牌信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="品牌名称" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌网址" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌别名" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌序号" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="品牌介绍" :label-width="labelWidth">
          <el-input  type="textarea" ></el-input>
        </el-form-item>
        <el-form-item label="品牌序号" :label-width="labelWidth">
          <el-radio label="1">备选项</el-radio>
          <el-radio label="2">备选项</el-radio>
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
          labelWidth:'80px',
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/614baca0cca225dab5f522fa676deaa0.jpg',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
            },
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/086bca11de9db05d2e38ad20bfed38da.png',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
            },
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/3861a759005fe5fb09f06b3bfc761f71.jpg',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
            },
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/614baca0cca225dab5f522fa676deaa0.jpg',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
            },
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/614baca0cca225dab5f522fa676deaa0.jpg',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
            },
            {
              id: '16937',
              name: '兰博基尼',
              name2: 'Lamborghini',
              img: 'http://oy9r4heum.bkt.clouddn.com/614baca0cca225dab5f522fa676deaa0.jpg',
              website: 'www.uj345.com',
              isUse: '有效',
              type: '热门品牌',
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

        // 编辑
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
