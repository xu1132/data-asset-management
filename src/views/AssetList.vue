<template>
  <div class="asset-list">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">资产管理</span>
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="搜索资产名称" style="width: 200px;" clearable />
          <el-select v-model="categoryFilter" placeholder="数据分类" clearable style="width: 120px;">
            <el-option label="基础数据" value="基础数据" />
            <el-option label="业务数据" value="业务数据" />
            <el-option label="统计数据" value="统计数据" />
            <el-option label="监测数据" value="监测数据" />
          </el-select>
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button type="success" :icon="Plus">新增资产</el-button>
        </div>
      </div>
      
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="code" label="资产编码" width="150" />
        <el-table-column prop="name" label="资产名称" />
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="provider" label="提供方" width="120" />
        <el-table-column prop="securityLevel" label="安全等级" width="80">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.securityLevel)" size="small">{{ row.securityLevel }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="120" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editAsset(row)">编辑</el-button>
            <el-button type="success" link @click="publishAsset(row)">{{ row.status === '已发布' ? '下架' : '发布' }}</el-button>
            <el-button type="danger" link @click="deleteAsset(row)">删除</el-button>
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
const categoryFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(20)
const selectedRows = ref([])

const tableData = ref([
  { code: 'D001', name: '人口基础数据', category: '基础数据', provider: '县公安局', securityLevel: '内部', status: '已发布', updateTime: '2026-05-08' },
  { code: 'D002', name: '教育统计年报', category: '统计数据', provider: '县教育局', securityLevel: '公开', status: '已发布', updateTime: '2026-05-07' },
  { code: 'D003', name: '医疗机构信息', category: '业务数据', provider: '县卫健委', securityLevel: '敏感', status: '已发布', updateTime: '2026-05-06' },
  { code: 'D004', name: '环境监测数据', category: '监测数据', provider: '县生态环境局', securityLevel: '内部', status: '草稿', updateTime: '2026-05-05' },
  { code: 'D005', name: '企业登记信息', category: '基础数据', provider: '县市场监管局', securityLevel: '内部', status: '已发布', updateTime: '2026-05-04' }
])

const getLevelType = (level) => {
  const types = { '公开': 'success', '内部': 'warning', '敏感': 'danger', '机密': 'danger' }
  return types[level] || 'info'
}

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

const editAsset = (row) => { console.log('编辑', row) }
const publishAsset = (row) => {
  row.status = row.status === '已发布' ? '草稿' : '已发布'
  ElMessage.success(row.status === '已发布' ? '已发布' : '已下架')
}
const deleteAsset = async (row) => {
  await ElMessageBox.confirm(`确认删除资产「${row.name}」？`, '删除确认')
  const idx = tableData.value.findIndex(r => r.code === row.code)
  if (idx > -1) tableData.value.splice(idx, 1)
  ElMessage.success('删除成功')
}
const batchDelete = async () => {
  await ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 项资产？`, '批量删除')
  ElMessage.success('批量删除成功')
  selectedRows.value = []
}
</script>
