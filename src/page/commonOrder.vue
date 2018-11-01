<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form ref="filtersForm" :inline="true" :model="filters">
				<el-form-item label="订单编号" prop="name">
					<el-input clearable v-model="filters.name" auto-complete="off" placeholder="请输入订单编号"></el-input>
				</el-form-item>
        <el-form-item label="收货人电话" prop="phone">
					<el-input clearable v-model="filters.phone" auto-complete="off" placeholder="请输入收货人电话"></el-input>
				</el-form-item>
        <el-form-item label="时间段" prop="phone">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束时间" style="width: 100%;"></el-date-picker>
          </el-col>
				</el-form-item>
        <el-form-item label="收货人" prop="phone">
					<el-input clearable  auto-complete="off" placeholder="请输入收货人"></el-input>
				</el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" :loading="filtersing" @click="submit('filtersForm')" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button icon="el-icon-download" type="primary">导出</el-button>
        </el-form-item>
			</el-form>
		</el-col>

    <el-table
      :data="tableData"
      border
      id="tabel"
      v-loading="filtersing">
      <el-table-column
        label="订单编号"
        align='center'
        min-width="240"
        prop="orderNum">
      </el-table-column>
      <el-table-column
        label="订单状态"
        min-width="100"
        prop="orderType"
        :filters="orderFilter"
        :filter-method="orderFilterHandler"
        align='center'>
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.orderType}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="支付方式"
        align='center'
        min-width="100"
        :filters="payFilter"
        :filter-method="payFilterHandler"
        prop="payType">
      </el-table-column>
      <el-table-column
        label="购买人"
        align='center'
        min-width="200"
        prop="payUser">
      </el-table-column>
      <el-table-column
        label="金额"
        align='center'
        min-width="100"
        prop="money">
      </el-table-column>
      <el-table-column
        label="运费"
        align='center'
        min-width="100"
        prop="freight">
      </el-table-column>
      <el-table-column
        label="收货信息"
        align='center'
        min-width="300"
        prop="address">
      </el-table-column>
      <el-table-column
        label="购买时间"
        align='center'
        min-width='160'
        sortable
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

    <el-dialog title="店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" >
        <el-form-item label="店铺名称" :label-width="labelWidth">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="经纬度" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺电话" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="labelWidth">
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
              <el-option label="待认证" value="shanghai"></el-option>
              <el-option label="同意" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
              <el-option label="待认证" value="shanghai"></el-option>
              <el-option label="同意" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠内容" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="信用评级" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌" :label-width="labelWidth">
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
              <el-option label="待认证" value="shanghai"></el-option>
              <el-option label="同意" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-select v-model="selectTable.name" style="width:100%" placeholder="请选择活动区域">
              <el-option label="待认证" value="shanghai"></el-option>
              <el-option label="同意" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="标签" :label-width="labelWidth">
          <el-checkbox-group v-model="categoryList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="绑定店主" :label-width="labelWidth">
          <el-input  auto-complete="off"></el-input>
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
        <el-form-item label="店铺轮播图" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="店铺详情图" :label-width="labelWidth">
					<el-upload
						 class="avatar-uploader"
             list-type="picture-card"
						 action='https://elm.cangdu.org/v1/addimg/shop'
						 :show-file-list="false">
						 <i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
        <el-form-item label="服务内容" :label-width="labelWidth">
          <el-input type="textarea" auto-complete="off"></el-input>
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
          orderFilter:[
            {text: '待付款', value: '待付款'},
            {text: '已付款', value: '已付款'},
            {text: '已发货', value: '已发货'},
            {text: '已收货', value: '已收货'},
            {text: '已取消', value: '已取消'},
            {text: '退款中', value: '退款中'},
            {text: '退款成功', value: '退款成功'},
            {text: '退款失败', value: '退款失败'},
          ], // 订单状态筛选
          payFilter:[
            {text: '余额', value: '余额'},
            {text: '微信', value: '微信'},
            {text: '线下支付', value: '线下支付'},
          ], // 支付方式筛选
          currentPage: 1, // 当前页数
          showCount:10, // 每页显示数量
          labelWidth:'100px',
          categoryList:[],
          dialogFormVisible: false,
          selectTable: {},
          tableData:[
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '待付款',
              payType:'余额',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '已付款',
              payType:'微信',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '已发货',
              payType:'线下支付',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '已收货',
              payType:'支付宝',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '已取消',
              payType:'支付宝',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '退款中',
              payType:'支付宝',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '退款成功',
              payType:'支付宝',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
            },
            {
              orderNum: '20180608112431280MZZ0YWST',
              orderType: '退款失败',
              payType:'支付宝',
              payUser:'ams_1528445505538',
              money: '2200',
              freight:'0',
              address:'喻一帆*13482391137*上海@浦东新区@城区@长岛路1203弄30号303室',
              time:'2018-06-08 15:54:12'
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

        // 订单状态筛选
        orderFilterHandler(value, row) {
          return row.orderType === value;
        },

        // 支付方式筛选
        payFilterHandler(value, row) {
          return row.payType === value;
        },
      },
    }
</script>
