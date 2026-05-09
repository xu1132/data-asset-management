<template>
  <div class="page-card">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-form :inline="true">
        <el-form-item label="机构名称">
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
      <h3 class="table-title">机构管理</h3>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" min-width="200" />
        <el-table-column prop="parent" label="上级机构" min-width="200" />
        <el-table-column prop="leader" label="负责人" min-width="150" />
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
const total = ref(6)

const tableData = ref([
  { name: 'test111', parent: '武邑县大数据局', leader: '' },
  { name: '武邑县大数据局', parent: '', leader: '' },
  { name: '数据分析部', parent: '武邑县大数据局', leader: '' },
  { name: '数据分析中心', parent: '数据分析部', leader: '' },
  { name: '数据分析中队', parent: '数据分析中心', leader: '' },
  { name: '数据分析小组', parent: '数据分析中队', leader: '' }
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
