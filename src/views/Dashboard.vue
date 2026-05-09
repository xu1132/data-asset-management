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
            <div class="app-card" v-for="app in mockStore.favoriteApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.description }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
              <el-icon class="star-icon" @click="mockStore.toggleFavorite(app.id)"><StarFilled /></el-icon>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基础应用" name="basic">
          <div class="app-grid">
            <div class="app-card" v-for="app in mockStore.normalApps" :key="app.id">
              <div class="app-icon">
                <el-icon :size="40"><Monitor /></el-icon>
              </div>
              <div class="app-info">
                <h3>{{ app.name }}</h3>
                <p>{{ app.description }}</p>
              </div>
              <div class="app-actions">
                <el-button type="primary" size="small">进入系统</el-button>
                <el-button size="small">资源管理</el-button>
              </div>
              <el-icon class="star-icon" @click="mockStore.toggleFavorite(app.id)"><Star /></el-icon>
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
          <el-icon :size="20"><Document /></el-icon>
          <span class="section-title-text">最新文档</span>
          <el-button type="primary" link>查看全部 &gt;</el-button>
        </div>
        <div class="document-list">
          <div class="document-item" v-for="doc in mockStore.documents" :key="doc.id">
            <el-tag size="small" type="info">{{ doc.type }}</el-tag>
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
          <div class="news-item" v-for="news in mockStore.newsList" :key="news.id">
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
import { Bell, Monitor, Star, StarFilled, Document, InfoFilled, Message } from '@element-plus/icons-vue'
import { useMockStore } from '@/stores/mock'

const mockStore = useMockStore()
const activeTab = ref('favorite')
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
