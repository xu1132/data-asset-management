<template>
  <div class="page-card">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-form :inline="true">
        <el-form-item label="应用名称">
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
      <h3 class="table-title">应用管理</h3>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="id" label="应用 ID" min-width="200" />
        <el-table-column prop="shortName" label="应用简称" width="150" />
        <el-table-column prop="name" label="应用名称" width="150" />
        <el-table-column prop="url" label="访问地址" min-width="200" />
        <el-table-column prop="description" label="应用说明" min-width="150" />
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
const total = ref(4)

const tableData = ref([
  { id: 'eef49e0d3b284b93a2...', shortName: '数据编目系统', name: 'data-platform', url: 'http://150.158.90.208...', description: '数据编目系统' },
  { id: 'b719190813f94c07a1a...', shortName: '数据上报系统', name: 'data-report', url: 'http://150.158.90.208...', description: '数据上报系统' },
  { id: '68d20fff0cec4a3b854...', shortName: '数据查询系统', name: 'data-asset', url: 'http://150.158.90.208...', description: '数据查询系统' },
  { id: 'e1b129eea1d64036a7f...', shortName: '金融主题库', name: '金融主题库', url: 'http://150.158.90.208...', description: '金融主题库' }
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
