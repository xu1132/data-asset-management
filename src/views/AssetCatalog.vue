<template>
  <div class="asset-catalog">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">数据目录</span>
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="搜索目录名称" style="width: 240px;" clearable />
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </div>
      
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="code" label="目录编码" width="180" />
        <el-table-column prop="name" label="目录名称" />
        <el-table-column prop="category" label="数据分类" width="120">
          <template #default="{ row }">
            <el-tag :type="getCategoryType(row.category)">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="provider" label="数据提供方" width="150" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewDetail(row)">查看</el-button>
            <el-button type="primary" link @click="applyShare(row)">申请共享</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="table-footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(6)

const tableData = ref([
  { code: 'D001', name: '人口基础数据', category: '基础数据', provider: '县公安局', updateTime: '2026-05-08', status: '已发布' },
  { code: 'D002', name: '教育统计年报', category: '统计数据', provider: '县教育局', updateTime: '2026-05-07', status: '已发布' },
  { code: 'D003', name: '医疗机构信息', category: '业务数据', provider: '县卫健委', updateTime: '2026-05-06', status: '已发布' },
  { code: 'D004', name: '环境监测数据', category: '监测数据', provider: '县生态环境局', updateTime: '2026-05-05', status: '草稿' },
  { code: 'D005', name: '企业登记信息', category: '基础数据', provider: '县市场监管局', updateTime: '2026-05-04', status: '已发布' },
  { code: 'D006', name: '财政收支数据', category: '统计数据', provider: '县财政局', updateTime: '2026-05-03', status: '已发布' }
])

const getCategoryType = (category) => {
  const types = { '基础数据': '', '统计数据': 'success', '业务数据': 'warning', '监测数据': 'danger' }
  return types[category] || 'info'
}

const viewDetail = (row) => {
  console.log('查看', row)
}

const applyShare = (row) => {
  console.log('申请共享', row)
}
</script>
