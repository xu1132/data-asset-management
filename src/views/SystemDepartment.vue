<template>
  <div class="system-department">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">部门管理</span>
        <el-button type="success" :icon="Plus">新增部门</el-button>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="code" label="部门编码" width="150" />
        <el-table-column prop="leader" label="负责人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="140" />
        <el-table-column prop="userCount" label="人员数量" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editDept(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteDept(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const tableData = ref([
  { name: '信息中心', code: 'DEPT001', leader: '张主任', phone: '0318-1234567', userCount: 5, status: true },
  { name: '县公安局', code: 'DEPT002', leader: '李局长', phone: '0318-2345678', userCount: 20, status: true },
  { name: '县教育局', code: 'DEPT003', leader: '王局长', phone: '0318-3456789', userCount: 15, status: true },
  { name: '县卫健委', code: 'DEPT004', leader: '刘主任', phone: '0318-4567890', userCount: 10, status: true },
  { name: '县统计局', code: 'DEPT005', leader: '陈主任', phone: '0318-5678901', userCount: 8, status: true }
])

const editDept = (row) => { console.log('编辑', row) }
const deleteDept = async (row) => {
  await ElMessageBox.confirm(`确认删除部门「${row.name}」？`)
  const idx = tableData.value.findIndex(r => r.code === row.code)
  if (idx > -1) tableData.value.splice(idx, 1)
  ElMessage.success('删除成功')
}
</script>
