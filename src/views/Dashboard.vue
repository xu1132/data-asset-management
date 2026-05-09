<template>
  <div class="dashboard">
    <!-- 公告栏 -->
    <div class="notice-banner">
      <el-icon><Bell /></el-icon>
      <span>基础数据平台系统更新啦~</span>
    </div>

    <!-- 应用卡片区域 -->
    <div class="page-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="我的常用" name="favorite">
          <div class="app-grid">
            <div class="app-card" v-for="app in favoriteApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.desc }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
              <el-icon class="star-icon"><StarFilled /></el-icon>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基础应用" name="basic">
          <div class="app-grid">
            <div class="app-card" v-for="app in basicApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.desc }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="主题应用" name="theme">
          <div class="app-grid">
            <div class="app-card" v-for="app in themeApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.desc }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他应用" name="other">
          <div class="app-grid">
            <div class="app-card" v-for="app in otherApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.desc }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 文档和资讯区域 -->
    <div class="content-grid">
      <!-- 文档列表 -->
      <div class="page-card document-section">
        <div class="section-header">
          <div class="section-title">
            <el-icon :size="20"><Document /></el-icon>
            <span>最新文档</span>
            <el-button type="primary" link>查看全部 &gt;</el-button>
          </div>
        </div>
        <div class="document-list">
          <div class="document-item" v-for="doc in documents" :key="doc.id">
            <el-tag size="small" type="info">文档类型</el-tag>
            <span class="doc-title">{{ doc.title }}</span>
            <span class="doc-author">发布人：{{ doc.author }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧资讯 -->
      <div class="page-card news-section">
        <div class="section-header">
          <el-icon :size="18"><InfoFilled /></el-icon>
          <span class="section-title-text">最新资讯</span>
        </div>
        <div class="news-list">
          <div class="news-item" v-for="news in newsList" :key="news.id">
            <el-tag v-if="news.hot" size="small" type="danger">最新</el-tag>
            <span class="news-title">{{ news.title }}</span>
            <span class="news-date">{{ news.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 消息工作台 -->
    <div class="page-card">
      <div class="section-header">
        <el-icon :size="18"><Message /></el-icon>
        <span class="section-title-text">消息工作台</span>
      </div>
      <div class="empty-message">
        <el-empty description="暂无最新消息" :image-size="80" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, Monitor, StarFilled, Document, InfoFilled, Message } from '@element-plus/icons-vue'

const activeTab = ref('favorite')

const favoriteApps = ref([
  { id: 1, name: 'data-platform', desc: '数据编目系统' },
  { id: 2, name: 'data-report', desc: '数据上报系统' },
  { id: 3, name: 'data-asset', desc: '数据查询系统' }
])

const basicApps = ref([
  { id: 4, name: 'data-base', desc: '基础数据库' },
  { id: 5, name: 'data-exchange', desc: '数据交换平台' }
])

const themeApps = ref([
  { id: 6, name: 'finance-db', desc: '金融主题库' },
  { id: 7, name: 'health-db', desc: '医疗主题库' }
])

const otherApps = ref([
  { id: 8, name: 'other-system', desc: '其他系统' }
])

const documents = ref([
  { id: 1, title: '武邑县数据和政务服务局 2025 年部门预算信息公开', author: 'admin' },
  { id: 2, title: '2025.08.13 号新增个体和企业信息公示.xls', author: 'admin' },
  { id: 3, title: '武邑县消防救援大队 2025 年 8 月份双随机抽查单位名单', author: 'admin' },
  { id: 4, title: '武邑县民政局 2025 年 8 月全县分散供养城市特困人员资金发放台账', author: 'admin' },
  { id: 5, title: '武邑县民政局 2025 年 8 月全县分散供养农村特困人员资金发放台账', author: 'admin' },
  { id: 6, title: '武邑县民政局 2025 年 8 月全县农村低保金发放台账', author: 'admin' }
])

const newsList = ref([
  { id: 1, title: '数据资产管理平台试运行上线公告', date: '2025-12-01', hot: true },
  { id: 2, title: '数据安全管理规范更新通知', date: '2025-11-28' },
  { id: 3, title: '2023 年度数据质量报告发布', date: '2025-11-25' },
  { id: 4, title: '数据分析师培训课程安排', date: '2025-11-20' },
  { id: 5, title: '数据可视化工具使用指南', date: '2025-11-15' },
  { id: 6, title: '数据资产目录更新说明', date: '2025-11-10' },
  { id: 7, title: '数据治理项目阶段性成果展示', date: '2025-11-05' }
])
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

/* 公告栏 */
.notice-banner {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 8px;
  padding: 12px 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1565c0;
  font-size: 14px;
}

/* 应用卡片 */
.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;
}

.app-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: box-shadow 0.2s;
}

.app-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.app-icon {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #1a56db;
}

.app-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.app-info p {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.app-actions {
  display: flex;
  gap: 8px;
}

.star-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #fbbf24;
  font-size: 18px;
  cursor: pointer;
}

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.section-title-text {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

/* 文档列表 */
.document-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.document-item:last-child {
  border-bottom: none;
}

.doc-title {
  flex: 1;
  font-size: 14px;
  color: #1a56db;
  cursor: pointer;
}

.doc-title:hover {
  text-decoration: underline;
}

.doc-author {
  font-size: 13px;
  color: #6b7280;
}

/* 资讯列表 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.news-item:last-child {
  border-bottom: none;
}

.news-title {
  flex: 1;
  font-size: 14px;
  color: #1f2937;
  cursor: pointer;
}

.news-title:hover {
  color: #1a56db;
}

.news-date {
  font-size: 12px;
  color: #9ca3af;
}

.empty-message {
  padding: 20px 0;
}

@media (max-width: 1200px) {
  .app-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
