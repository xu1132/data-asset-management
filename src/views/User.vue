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
          <el-button type="success" :icon="Plus" @click="showAddDialog">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-section">
      <h3 class="table-title">用户管理</h3>
      <el-table :data="filteredUsers" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" min-width="180" />
        <el-table-column prop="employeeId" label="工号" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="institution" label="机构" min-width="150" />
        <el-table-column prop="userType" label="用户类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.userType === '管理员' ? 'danger' : 'info'" size="small">{{ row.userType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <span>共 {{ mockStore.users.length }} 条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="mockStore.users.length"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formData.employeeId" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="机构">
          <el-select v-model="formData.institution" placeholder="请选择机构" clearable style="width: 100%">
            <el-option v-for="inst in mockStore.institutions" :key="inst.id" :label="inst.name" :value="inst.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="formData.userType" placeholder="请选择" style="width: 100%">
            <el-option label="管理员" value="管理员" />
            <el-option label="普通用户" value="普通用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
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
  username: '',
  employeeId: '',
  name: '',
  institution: '',
  userType: '普通用户',
  gender: '男'
})

const filteredUsers = computed(() => {
  if (!searchForm.name) return mockStore.users
  return mockStore.users.filter(u => 
    u.username.includes(searchForm.name) || u.name.includes(searchForm.name)
  )
})

const showAddDialog = () => {
  isEdit.value = false
  editId.value = null
  Object.assign(formData, { username: '', employeeId: '', name: '', institution: '', userType: '普通用户', gender: '男' })
  dialogVisible.value = true
}

const showEditDialog = (row) => {
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, { username: row.username, employeeId: row.employeeId, name: row.name, institution: row.institution, userType: row.userType, gender: row.gender })
  dialogVisible.value = true
}

const handleSave = () => {
  if (isEdit.value) {
    mockStore.updateUser(editId.value, { ...formData })
    ElMessage.success('更新成功')
  } else {
    mockStore.addUser({ ...formData })
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm(`确认删除用户「${row.name}」？`, '删除确认')
  mockStore.deleteUser(row.id)
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
