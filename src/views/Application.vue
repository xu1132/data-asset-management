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
          <el-button type="success" :icon="Plus" @click="showAddDialog">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-section">
      <h3 class="table-title">应用管理</h3>
      <el-table :data="filteredApps" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="应用名称" min-width="150" />
        <el-table-column prop="shortName" label="应用简称" width="150" />
        <el-table-column prop="url" label="访问地址" min-width="200" />
        <el-table-column prop="description" label="应用说明" min-width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <span>共 {{ mockStore.applications.length }} 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="mockStore.applications.length"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑应用' : '新增应用'" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="应用名称">
          <el-input v-model="formData.name" placeholder="请输入应用名称" />
        </el-form-item>
        <el-form-item label="应用简称">
          <el-input v-model="formData.shortName" placeholder="请输入应用简称" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="formData.url" placeholder="请输入访问地址" />
        </el-form-item>
        <el-form-item label="应用说明">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入应用说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { useMockStore } from '@/stores/mock'
import { ElMessage, ElMessageBox } from 'element-plus'

const mockStore = useMockStore()

const searchForm = reactive({ name: '' })
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)

const formData = reactive({
  name: '',
  shortName: '',
  url: '',
  description: ''
})

const filteredApps = computed(() => {
  if (!searchForm.name) return mockStore.applications
  return mockStore.applications.filter(a => 
    a.name.includes(searchForm.name) || a.shortName.includes(searchForm.name)
  )
})

const showAddDialog = () => {
  isEdit.value = false
  editId.value = null
  Object.assign(formData, { name: '', shortName: '', url: '', description: '' })
  dialogVisible.value = true
}

const showEditDialog = (row) => {
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, { name: row.name, shortName: row.shortName, url: row.url, description: row.description })
  dialogVisible.value = true
}

const handleSave = () => {
  if (isEdit.value) {
    mockStore.updateApplication(editId.value, { ...formData })
    ElMessage.success('更新成功')
  } else {
    mockStore.addApplication({ ...formData })
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm(`确认删除应用「${row.name}」？`, '删除确认')
  mockStore.deleteApplication(row.id)
  ElMessage.success('删除成功')
}
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
