<template>
  <div class="share-record">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">共享记录</span>
        <el-button :icon="Download">导出</el-button>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="共享编号" width="150" />
        <el-table-column prop="assetName" label="资产名称" />
        <el-table-column prop="provider" label="提供方" width="120" />
        <el-table-column prop="consumer" label="使用方" width="120" />
        <el-table-column prop="scope" label="共享范围" width="100" />
        <el-table-column prop="approveTime" label="审批时间" width="180" />
        <el-table-column prop="expireTime" label="有效期至" width="120" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '有效' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download } from '@element-plus/icons-vue'

const tableData = ref([
  { code: 'S001', assetName: '人口基础数据', provider: '县公安局', consumer: '县统计局', scope: '本县', approveTime: '2026-05-01', expireTime: '2026-12-31', status: '有效' },
  { code: 'S002', assetName: '教育统计年报', provider: '县教育局', consumer: '县教育局', scope: '本系统', approveTime: '2026-04-15', expireTime: '2026-06-15', status: '有效' },
  { code: 'S003', assetName: '企业登记信息', provider: '县市场监管局', consumer: '县发改委', scope: '本单位', approveTime: '2026-03-20', expireTime: '2026-06-20', status: '已过期' }
])
</script>
