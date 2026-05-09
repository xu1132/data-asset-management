<template>
  <div class="dashboard">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <div class="welcome-text">
        <h2>欢迎回来，{{ userStore.userInfo.name || '管理员' }}</h2>
        <p>今天是 {{ currentDate }}，祝您工作顺利！</p>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <el-icon><Document /></el-icon>
        </div>
        <div class="stat-info">
          <h3>{{ stats.totalAssets }}</h3>
          <p>数据资产总量</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <el-icon><Share /></el-icon>
        </div>
        <div class="stat-info">
          <h3>{{ stats.shareRequests }}</h3>
          <p>本月共享申请</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-info">
          <h3>{{ stats.pendingReviews }}</h3>
          <p>待审核资产</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-info">
          <h3>{{ stats.totalUsers }}</h3>
          <p>注册用户数</p>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-grid">
      <div class="page-card chart-card">
        <div class="page-header">
          <span class="page-title">数据资产增长趋势</span>
        </div>
        <div ref="lineChartRef" style="width: 100%; height: 280px;"></div>
      </div>
      <div class="page-card chart-card">
        <div class="page-header">
          <span class="page-title">资产类型分布</span>
        </div>
        <div ref="pieChartRef" style="width: 100%; height: 280px;"></div>
      </div>
    </div>

    <!-- 最新动态 -->
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">最新动态</span>
        <el-button type="primary" link @click="$router.push('/security/log')">查看更多</el-button>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          :timestamp="item.timestamp"
          placement="top"
          :color="item.color"
        >
          <el-card shadow="hover">
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { Document, Share, Clock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const lineChartRef = ref(null)
const pieChartRef = ref(null)
let lineChart = null
let pieChart = null

const currentDate = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

const stats = reactive({
  totalAssets: 1256,
  shareRequests: 89,
  pendingReviews: 12,
  totalUsers: 356
})

const activities = ref([
  { timestamp: '2026-05-09 10:30', title: '资产审核通过', content: '「人口数据-2026年」已审核通过', color: '#1a56db' },
  { timestamp: '2026-05-09 09:15', title: '共享申请', content: '「教育数据」发起共享申请，等待审批', color: '#52c41a' },
  { timestamp: '2026-05-09 08:45', title: '资产登记', content: '「医疗数据」已提交登记申请', color: '#fa8c16' },
  { timestamp: '2026-05-08 17:30', title: '数据更新', content: '「经济数据-Q1」已完成更新', color: '#6b7280' },
  { timestamp: '2026-05-08 16:00', title: '安全扫描', content: '完成全系统安全漏洞扫描，未发现风险', color: '#1a56db' }
])

const initLineChart = () => {
  if (!lineChartRef.value) return
  lineChart = echarts.init(lineChartRef.value)
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['数据总量', '新增资产'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f2f4f7' } },
      axisLabel: { color: '#6b7280' }
    },
    series: [
      {
        name: '数据总量',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 1034, 1130, 1256],
        areaStyle: { color: 'rgba(26, 86, 219, 0.08)' },
        itemStyle: { color: '#1a56db', borderRadius: [4, 4, 0, 0] },
        lineStyle: { color: '#1a56db' }
      },
      {
        name: '新增资产',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 190, 230],
        areaStyle: { color: 'rgba(82, 196, 26, 0.08)' },
        itemStyle: { color: '#52c41a', borderRadius: [4, 4, 0, 0] },
        lineStyle: { color: '#52c41a' }
      }
    ]
  }
  lineChart.setOption(option)
}

const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  const option = {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, itemWidth: 12, itemHeight: 12 },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{c}项', fontSize: 12 },
        data: [
          { value: 450, name: '基础数据', itemStyle: { color: '#1a56db' } },
          { value: 280, name: '业务数据', itemStyle: { color: '#3b82f6' } },
          { value: 200, name: '统计数据', itemStyle: { color: '#52c41a' } },
          { value: 180, name: '监测数据', itemStyle: { color: '#fa8c16' } },
          { value: 146, name: '其他数据', itemStyle: { color: '#6b7280' } }
        ]
      }
    ]
  }
  pieChart.setOption(option)
}

onMounted(() => {
  initLineChart()
  initPieChart()
  window.addEventListener('resize', () => {
    lineChart?.resize()
    pieChart?.resize()
  })
})

onUnmounted(() => {
  lineChart?.dispose()
  pieChart?.dispose()
})
</script>

<style scoped>
.welcome-banner {
  background: linear-gradient(135deg, #1a3a8f, #1a56db);
  border-radius: 8px;
  padding: 24px 28px;
  margin-bottom: 16px;
  color: white;
}

.welcome-text h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}

.welcome-text p {
  font-size: 14px;
  opacity: 0.9;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.chart-card {
  min-height: 360px;
}

@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
