<template>
  <div class="asset-review">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">资产审核</span>
        <div class="search-box">
          <el-select v-model="statusFilter" placeholder="审核状态" clearable style="width: 120px;">
            <el-option label="待审核" value="待审核" />
            <el-option label="已通过" value="已通过" />
            <el-option label="已驳回" value="已驳回" />
          </el-select>
          <el-button type="primary" :icon="Search">筛选</el-button>
        </div>
      </div>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="资产编码" width="150" />
        <el-table-column prop="name" label="资产名称" />
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="department" label="申请部门" width="120" />
        <el-table-column prop="applyTime" label="申请时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <template v-if="row.status === '待审核'">
              <el-button type="success" link @click="approve(row)">通过</el-button>
              <el-button type="danger" link @click="reject(row)">驳回</el-button>
            </template>
            <el-button v-else type="primary" link @click="viewDetail(row)">查看</el-button>
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
    
    <!-- 驳回对话框 -->
    <el-dialog v-model="rejectDialogVisible" title="驳回申请" width="400px">
      <el-form>
        <el-form-item label="驳回原因">
          <el-input v-model="rejectReason" type="textarea" :rows="3" placeholder="请输入驳回原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rejectDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmReject">确认驳回</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)
const rejectDialogVisible = ref(false)
const rejectReason = ref('')
const currentRow = ref(null)

const tableData = ref([
  { code: 'A001', name: '人口基础数据', applicant: '张三', department: '县公安局', applyTime: '2026-05-09 09:00', status: '待审核' },
  { code: 'A002', name: '教育统计年报', applicant: '李四', department: '县教育局', applyTime: '2026-05-09 08:30', status: '待审核' },
  { code: 'A003', name: '医疗机构信息', applicant: '王五', department: '县卫健委', applyTime: '2026-05-08 16:00', status: '已通过' },
  { code: 'A004', name: '环境监测数据', applicant: '赵六', department: '县生态环境局', applyTime: '2026-05-08 14:00', status: '已驳回' }
])

const getStatusType = (status) => {
  const types = { '待审核': 'warning', '已通过': 'success', '已驳回': 'danger' }
  return types[status] || 'info'
}

const approve = async (row) => {
  await ElMessageBox.confirm(`确认通过资产「${row.name}」的登记申请？`, '审核确认')
  row.status = '已通过'
  ElMessage.success('已通过审核')
}

const reject = (row) => {
  currentRow.value = row
  rejectReason.value = ''
  rejectDialogVisible.value = true
}

const confirmReject = () => {
  if (!rejectReason.value) {
    ElMessage.warning('请输入驳回原因')
    return
  }
  currentRow.value.status = '已驳回'
  rejectDialogVisible.value = false
  ElMessage.success('已驳回申请')
}

const viewDetail = (row) => {
  console.log('查看', row)
}
</script>
