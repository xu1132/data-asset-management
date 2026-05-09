<template>
  <div class="system-user">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">用户管理</span>
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="搜索用户" style="width: 200px;" clearable />
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button type="success" :icon="Plus">新增用户</el-button>
        </div>
      </div>
      
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" active-text="" inactive-text="" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editUser(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteUser(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="table-footer" style="display: flex; justify-content: space-between;">
        <el-button type="danger" :disabled="selectedRows.length === 0" @click="batchDelete">批量删除</el-button>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(15)
const selectedRows = ref([])

const tableData = ref([
  { username: 'admin', name: '管理员', email: 'admin@gov.cn', department: '信息中心', role: '超级管理员', status: true, createTime: '2026-01-01' },
  { username: 'zhangsan', name: '张三', email: 'zhangsan@gov.cn', department: '县公安局', role: '普通用户', status: true, createTime: '2026-02-15' },
  { username: 'lisi', name: '李四', email: 'lisi@gov.cn', department: '县教育局', role: '审核员', status: true, createTime: '2026-02-20' },
  { username: 'wangwu', name: '王五', email: 'wangwu@gov.cn', department: '县卫健委', role: '普通用户', status: true, createTime: '2026-03-10' },
  { username: 'zhaoliu', name: '赵六', email: 'zhaoliu@gov.cn', department: '县统计局', role: '普通用户', status: false, createTime: '2026-04-01' }
])

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

const editUser = (row) => { console.log('编辑', row) }
const deleteUser = async (row) => {
  await ElMessageBox.confirm(`确认删除用户「${row.name}」？`)
  const idx = tableData.value.findIndex(r => r.username === row.username)
  if (idx > -1) tableData.value.splice(idx, 1)
  ElMessage.success('删除成功')
}
const batchDelete = async () => {
  await ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 个用户？`)
  ElMessage.success('批量删除成功')
  selectedRows.value = []
}
</script>
