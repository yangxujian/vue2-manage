<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="商品名称" prop="name">
					<el-input clearable v-model="filters.name" auto-complete="off" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="商品编号" prop="phone">
					<el-input clearable v-model="filters.phone" auto-complete="off" placeholder="请输入商品编号"></el-input>
				</el-form-item>
        <el-form-item label="商品类型" prop="grade">
          <el-select v-model="filters.grade" placeholder="请选择商品类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="一级分类" prop="grade">
          <el-select v-model="filters.grade" placeholder="请选择一级分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="二级分类" prop="grade">
          <el-select v-model="filters.grade" placeholder="请选择二级分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="三级分类" prop="grade">
          <el-select v-model="filters.grade" placeholder="请选择三级分类">
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
					<el-button @click="handleAdd" type="primary">添加商品</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
        <el-form-item>
          <el-button type="primary">批量下架</el-button>
        </el-form-item>
      </el-form>
		</el-col>

    <el-table
      id="table"
      v-loading="filtersing"
      :data="tableData"
      border>
      <el-table-column
        type="selection"
        width="54"
        align='center'>
      </el-table-column>
      <el-table-column
        label="ID"
        align='center'
        min-width="90"
        sortable
        prop="id">
      </el-table-column>
      <el-table-column
        label="名称"
        align='center'
        min-width="300"
        prop="name">
      </el-table-column>
      <el-table-column
        label="缩略图"
        min-width="100"
        align='center'>
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="所属分类"
        min-width="100"
        align='center'
        prop="category">
      </el-table-column>
      <el-table-column
        label="排序"
        align='center'
        min-width="100"
        prop="sort">
      </el-table-column>
      <el-table-column
        label="商品编号"
        align='center'
        min-width="100"
        prop="goodsNum">
      </el-table-column>
      <el-table-column
        label="商品类型"
        min-width="100"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.goodsType}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="是否删除"
        min-width="100"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.isDel}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
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
              name: 'THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列JNL-351THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列',
              img:'http://oy9r4heum.bkt.clouddn.com/681743505a91c6d3b97f90544ac5f22f.jpg',
              category:'家具生活',
              sort:'11',
              goodsNum:'830987',
              goodsType:'京东商品',
              isDel:'有效',
              state:'出售中'
            },
            {
              id: '16937',
              name: 'THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列JNL-351THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列',
              img:'http://oy9r4heum.bkt.clouddn.com/681743505a91c6d3b97f90544ac5f22f.jpg',
              category:'家具生活',
              sort:'11',
              goodsNum:'830987',
              goodsType:'京东商品',
              isDel:'有效',
              state:'出售中'
            },
            {
              id: '16937',
              name: 'THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列JNL-351THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列',
              img:'http://oy9r4heum.bkt.clouddn.com/681743505a91c6d3b97f90544ac5f22f.jpg',
              category:'家具生活',
              sort:'11',
              goodsNum:'830987',
              goodsType:'京东商品',
              isDel:'有效',
              state:'出售中'
            },
            {
              id: '16937',
              name: 'THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列JNL-351THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列',
              img:'http://oy9r4heum.bkt.clouddn.com/681743505a91c6d3b97f90544ac5f22f.jpg',
              category:'家具生活',
              sort:'11',
              goodsNum:'830987',
              goodsType:'京东商品',
              isDel:'有效',
              state:'出售中'
            },
            {
              id: '16937',
              name: 'THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列JNL-351THERMOS膳魔师保温杯350ml高真空不锈钢超轻系列',
              img:'http://oy9r4heum.bkt.clouddn.com/681743505a91c6d3b97f90544ac5f22f.jpg',
              category:'家具生活',
              sort:'11',
              goodsNum:'830987',
              goodsType:'京东商品',
              isDel:'有效',
              state:'出售中'
            },
          ]
        }
      },
    	components: {
    	},
      mounted() {
      },
      methods: {

        // 导出Excel
        exportExcel () {
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
