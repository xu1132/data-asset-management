<template>
  <div class="main-layout">
    <!-- 侧边栏 - 深蓝色 -->
    <div class="sidebar">
      <div class="sidebar-logo">
        <h1>数据资产管理平台</h1>
      </div>
      
      <el-menu
        :default-active="currentRoute"
        class="sidebar-menu"
        background-color="#1a3a8f"
        text-color="rgba(255,255,255,0.85)"
        active-text-color="#ffffff"
        :router="true"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <span>首页</span>
        </el-menu-item>
        
        <div class="menu-group-title">数据资产</div>
        <el-menu-item index="/asset/catalog">
          <el-icon><Document /></el-icon>
          <span>数据目录</span>
        </el-menu-item>
        <el-menu-item index="/asset/register">
          <el-icon><EditPen /></el-icon>
          <span>资产登记</span>
        </el-menu-item>
        <el-menu-item index="/asset/review">
          <el-icon><Checked /></el-icon>
          <span>资产审核</span>
        </el-menu-item>
        <el-menu-item index="/asset/list">
          <el-icon><FolderOpened /></el-icon>
          <span>资产管理</span>
        </el-menu-item>
        
        <div class="menu-group-title">数据共享</div>
        <el-menu-item index="/share/apply">
          <el-icon><Share /></el-icon>
          <span>共享申请</span>
        </el-menu-item>
        <el-menu-item index="/share/approve">
          <el-icon><Guide /></el-icon>
          <span>共享审批</span>
        </el-menu-item>
        <el-menu-item index="/share/record">
          <el-icon><Clock /></el-icon>
          <span>共享记录</span>
        </el-menu-item>
        
        <div class="menu-group-title">数据安全</div>
        <el-menu-item index="/security/policy">
          <el-icon><Shield /></el-icon>
          <span>安全策略</span>
        </el-menu-item>
        <el-menu-item index="/security/log">
          <el-icon><Tickets /></el-icon>
          <span>安全日志</span>
        </el-menu-item>
        
        <div class="menu-group-title">系统管理</div>
        <el-menu-item index="/system/user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <el-icon><UserFilled /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/system/department">
          <el-icon><OfficeBuilding /></el-icon>
          <span>部门管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!-- 主内容区 -->
    <div class="main-content">
      <div class="topbar">
        <div class="topbar-left">
          <h2 style="font-size: 16px; font-weight: 500;">{{ pageTitle }}</h2>
        </div>
        <div class="topbar-right">
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <div class="user-avatar">
                {{ userStore.userInfo.name?.charAt(0) || 'A' }}
              </div>
              <span class="user-name">{{ userStore.userInfo.name || '管理员' }}</span>
              <el-icon style="color: #666;"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentRoute = computed(() => route.path)

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': '首页',
    '/asset/catalog': '数据目录',
    '/asset/register': '资产登记',
    '/asset/review': '资产审核',
    '/asset/list': '资产管理',
    '/share/apply': '共享申请',
    '/share/approve': '共享审批',
    '/share/record': '共享记录',
    '/security/policy': '安全策略',
    '/security/log': '安全日志',
    '/system/user': '用户管理',
    '/system/role': '角色管理',
    '/system/department': '部门管理'
  }
  return titles[route.path] || '数据资产管理平台'
})

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  } else if (command === 'profile' || command === 'settings') {
    router.push('/system/user')
  }
}
</script>

<style scoped>
/* 使用全局样式中定义的深蓝侧边栏样式 */
</style>
