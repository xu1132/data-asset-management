<template>
  <div class="system-role">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">角色管理</span>
        <el-button type="success" :icon="Plus">新增角色</el-button>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="name" label="角色名称" width="150" />
        <el-table-column prop="code" label="角色编码" width="120" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editRole(row)">编辑</el-button>
            <el-button type="primary" link @click="assignPermissions(row)">权限配置</el-button>
            <el-button type="danger" link @click="deleteRole(row)">删除</el-button>
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
  { name: '超级管理员', code: 'super_admin', description: '拥有系统所有权限', userCount: 1, status: true },
  { name: '审核员', code: 'reviewer', description: '负责数据资产审核', userCount: 3, status: true },
  { name: '普通用户', code: 'user', description: '普通数据使用人员', userCount: 10, status: true },
  { name: '访客', code: 'guest', description: '只读权限', userCount: 2, status: false }
])

const editRole = (row) => { console.log('编辑', row) }
const assignPermissions = (row) => { console.log('权限配置', row) }
const deleteRole = async (row) => {
  await ElMessageBox.confirm(`确认删除角色「${row.name}」？`)
  const idx = tableData.value.findIndex(r => r.code === row.code)
  if (idx > -1) tableData.value.splice(idx, 1)
  ElMessage.success('删除成功')
}
</script>
