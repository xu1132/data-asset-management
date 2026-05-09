<template>
  <div class="share-apply">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">共享申请</span>
        <el-button type="primary" :icon="Plus">新建申请</el-button>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="申请编号" width="150" />
        <el-table-column prop="assetName" label="资产名称" />
        <el-table-column prop="purpose" label="使用目的" />
        <el-table-column prop="scope" label="使用范围" width="120" />
        <el-table-column prop="applyTime" label="申请时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewDetail(row)">详情</el-button>
            <el-button type="danger" link :disabled="row.status !== '待审核'" @click="cancelApply(row)">撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="table-footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(8)

const tableData = ref([
  { code: 'S001', assetName: '人口基础数据', purpose: '人口统计分析', scope: '本县', applyTime: '2026-05-09 10:00', status: '待审核' },
  { code: 'S002', assetName: '教育统计年报', purpose: '年度教育报告', scope: '本系统', applyTime: '2026-05-09 09:00', status: '已通过' },
  { code: 'S003', assetName: '医疗机构信息', purpose: '医疗资源规划', scope: '本县', applyTime: '2026-05-08 16:00', status: '已驳回' },
  { code: 'S004', assetName: '企业登记信息', purpose: '市场监管研究', scope: '本单位', applyTime: '2026-05-08 14:00', status: '已通过' }
])

const getStatusType = (status) => {
  const types = { '待审核': 'warning', '已通过': 'success', '已驳回': 'danger' }
  return types[status] || 'info'
}

const viewDetail = (row) => { console.log('查看', row) }
const cancelApply = async (row) => {
  row.status = '已撤回'
  ElMessage.success('已撤回申请')
}
</script>
