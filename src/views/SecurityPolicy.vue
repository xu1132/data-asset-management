<template>
  <div class="security-policy">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">安全策略配置</span>
        <el-button type="primary" :icon="Plus">新增策略</el-button>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="name" label="策略名称" />
        <el-table-column prop="type" label="策略类型" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="安全等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" size="small">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" active-text="开" inactive-text="关" />
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editPolicy(row)">编辑</el-button>
            <el-button type="danger" link @click="deletePolicy(row)">删除</el-button>
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
  { name: '数据访问控制', type: '访问控制', level: '高', status: true, updateTime: '2026-05-01' },
  { name: '敏感数据脱敏', type: '数据脱敏', level: '高', status: true, updateTime: '2026-05-01' },
  { name: '操作审计日志', type: '审计', level: '中', status: true, updateTime: '2026-04-15' },
  { name: '数据传输加密', type: '加密', level: '高', status: true, updateTime: '2026-04-10' },
  { name: '定期安全扫描', type: '扫描', level: '中', status: false, updateTime: '2026-03-20' }
])

const getLevelType = (level) => {
  const types = { '高': 'danger', '中': 'warning', '低': 'success' }
  return types[level] || 'info'
}

const editPolicy = (row) => { console.log('编辑', row) }
const deletePolicy = async (row) => {
  await ElMessageBox.confirm('确认删除该策略？')
  const idx = tableData.value.findIndex(r => r.name === row.name)
  if (idx > -1) tableData.value.splice(idx, 1)
  ElMessage.success('删除成功')
}
</script>
