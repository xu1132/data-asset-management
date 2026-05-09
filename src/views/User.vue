<template>
  <div class="page-card">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-form :inline="true">
        <el-form-item label="用户名称">
          <el-input v-model="searchForm.name" placeholder="请输入" style="width: 200px;" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-section">
      <h3 class="table-title">用户管理</h3>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" min-width="180" />
        <el-table-column prop="employeeId" label="工号" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="institution" label="机构" min-width="150" />
        <el-table-column prop="userType" label="用户类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.userType === '管理员' ? 'danger' : 'info'" size="small">{{ row.userType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60">
          <template #default="{ row }">
            <span>{{ row.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="起始时间" width="120" />
        <el-table-column prop="endDate" label="结束时间" width="120" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small">编辑</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <span>共 {{ total }} 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

const searchForm = reactive({
  name: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(8)

const tableData = ref([
  { username: 'admin@qq.com', employeeId: '222', name: '3333', institution: '武邑县大数据局', userType: '普通用户', gender: '男', startDate: '', endDate: '' },
  { username: 'adminieee@qq....', employeeId: '3333333', name: '3333333', institution: '数据分析中队', userType: '普通用户', gender: '男', startDate: '', endDate: '' },
  { username: 'admin11111@qq....', employeeId: '55555555555', name: '55555555555', institution: '数据分析中队', userType: '普通用户', gender: '男', startDate: '', endDate: '' },
  { username: '777777777777...', employeeId: '777777777777...', name: '777777777777...', institution: 'test111', userType: '普通用户', gender: '男', startDate: '', endDate: '' },
  { username: '8888888888@q...', employeeId: '8888888888', name: '8888888888', institution: '数据分析中队', userType: '普通用户', gender: '男', startDate: '', endDate: '' },
  { username: 'admin', employeeId: 'admin', name: '管理员', institution: '', userType: '管理员', gender: '男', startDate: '', endDate: '' },
  { username: 'fengj@zkcomt.com', employeeId: 'fengj', name: '冯江', institution: '数据分析部', userType: '管理员', gender: '男', startDate: '', endDate: '' }
])
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.table-section {
  margin-top: 20px;
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  padding-left: 10px;
  border-left: 3px solid #1a56db;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 14px;
}
</style>
