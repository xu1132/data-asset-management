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
          <el-button type="success" :icon="Plus" @click="showAddDialog">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-section">
      <h3 class="table-title">机构管理</h3>
      <el-table :data="filteredInstitutions" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" min-width="200" />
        <el-table-column prop="parent" label="上级机构" min-width="200" />
        <el-table-column prop="leader" label="负责人" min-width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="mockStore.institutions.length"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, ->, prev, pager, next, jumper"
        />
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑机构' : '新增机构'" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="机构名称">
          <el-input v-model="formData.name" placeholder="请输入机构名称" />
        </el-form-item>
        <el-form-item label="上级机构">
          <el-select v-model="formData.parent" placeholder="请选择上级机构" clearable style="width: 100%">
            <el-option label="无" value="" />
            <el-option v-for="inst in mockStore.institutions" :key="inst.id" :label="inst.name" :value="inst.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="formData.leader" placeholder="请输入负责人" />
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
  parent: '',
  leader: ''
})

const filteredInstitutions = computed(() => {
  if (!searchForm.name) return mockStore.institutions
  return mockStore.institutions.filter(i => i.name.includes(searchForm.name))
})

const showAddDialog = () => {
  isEdit.value = false
  editId.value = null
  Object.assign(formData, { name: '', parent: '', leader: '' })
  dialogVisible.value = true
}

const showEditDialog = (row) => {
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, { name: row.name, parent: row.parent, leader: row.leader })
  dialogVisible.value = true
}

const handleSave = () => {
  if (isEdit.value) {
    mockStore.updateInstitution(editId.value, { ...formData })
    ElMessage.success('更新成功')
  } else {
    mockStore.addInstitution({ ...formData })
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm(`确认删除机构「${row.name}」？`, '删除确认')
  mockStore.deleteInstitution(row.id)
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
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 14px;
}
</style>
