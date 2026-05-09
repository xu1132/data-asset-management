<template>
  <div class="security-log">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">安全日志</span>
        <div class="search-box">
          <el-select v-model="typeFilter" placeholder="操作类型" clearable style="width: 120px;">
            <el-option label="登录" value="登录" />
            <el-option label="数据操作" value="数据操作" />
            <el-option label="权限变更" value="权限变更" />
            <el-option label="系统操作" value="系统操作" />
          </el-select>
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 260px;" />
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button :icon="Download">导出</el-button>
        </div>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="time" label="操作时间" width="180" />
        <el-table-column prop="user" label="操作用户" width="120" />
        <el-table-column prop="ip" label="IP地址" width="140" />
        <el-table-column prop="type" label="操作类型" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作内容" />
        <el-table-column prop="result" label="结果" width="80">
          <template #default="{ row }">
            <el-tag :type="row.result === '成功' ? 'success' : 'danger'" size="small">{{ row.result }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="table-footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Download } from '@element-plus/icons-vue'

const typeFilter = ref('')
const dateRange = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(5)

const tableData = ref([
  { time: '2026-05-09 10:30:15', user: 'admin', ip: '192.168.1.100', type: '登录', action: '用户登录系统', result: '成功' },
  { time: '2026-05-09 10:25:00', user: '张三', ip: '192.168.1.101', type: '数据操作', action: '查询人口基础数据', result: '成功' },
  { time: '2026-05-09 09:00:00', user: 'admin', ip: '192.168.1.100', type: '权限变更', action: '修改用户角色', result: '成功' },
  { time: '2026-05-08 18:00:00', user: '李四', ip: '192.168.1.102', type: '登录', action: '用户登出系统', result: '成功' },
  { time: '2026-05-08 17:30:00', user: '李四', ip: '192.168.1.102', type: '系统操作', action: '导出数据报表', result: '成功' }
])
</script>
