<template>
  <div class="share-approve">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">共享审批</span>
        <el-tag type="warning">待审批：3</el-tag>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="申请编号" width="150" />
        <el-table-column prop="assetName" label="资产名称" />
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="purpose" label="使用目的" />
        <el-table-column prop="scope" label="使用范围" width="100" />
        <el-table-column prop="applyTime" label="申请时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <template v-if="row.status === '待审批'">
              <el-button type="success" link @click="approve(row)">通过</el-button>
              <el-button type="danger" link @click="reject(row)">驳回</el-button>
            </template>
            <el-button v-else type="primary" link>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([
  { code: 'S001', assetName: '人口基础数据', applicant: '张三', department: '县统计局', purpose: '人口统计分析', scope: '本县', applyTime: '2026-05-09 10:00', status: '待审批' },
  { code: 'S002', assetName: '教育统计年报', applicant: '李四', department: '县教育局', purpose: '年度报告', scope: '本系统', applyTime: '2026-05-09 09:00', status: '待审批' },
  { code: 'S003', assetName: '医疗机构信息', applicant: '王五', department: '县卫健委', purpose: '资源规划', scope: '本县', applyTime: '2026-05-08 16:00', status: '已通过' }
])

const getStatusType = (status) => {
  const types = { '待审批': 'warning', '已通过': 'success', '已驳回': 'danger' }
  return types[status] || 'info'
}

const approve = async (row) => {
  await ElMessageBox.confirm(`确认通过「${row.assetName}」的共享申请？`)
  row.status = '已通过'
  ElMessage.success('已通过')
}

const reject = async (row) => {
  await ElMessageBox.confirm(`确认驳回「${row.assetName}」的共享申请？`)
  row.status = '已驳回'
  ElMessage.success('已驳回')
}
</script>
