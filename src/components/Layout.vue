<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <div class="topbar">
      <div class="topbar-left">
        <div class="logo">
          <el-icon :size="28"><Grid /></el-icon>
          <h1>数据资产管理平台</h1>
        </div>
        <el-menu
          mode="horizontal"
          :default-active="currentRoute"
          class="top-menu"
          :router="true"
          background-color="#1a56db"
          text-color="rgba(255,255,255,0.85)"
          active-text-color="#ffffff"
          :ellipsis="false"
        >
          <el-menu-item index="/dashboard">首页</el-menu-item>
          <el-menu-item index="/application">应用管理</el-menu-item>
          <el-menu-item index="/institution">机构管理</el-menu-item>
          <el-menu-item index="/user">用户管理</el-menu-item>
        </el-menu>
      </div>
      <div class="topbar-right">
        <el-dropdown @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32" :icon="UserFilled" />
            <span class="user-name">{{ userStore.userInfo.name || '管理员' }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              <el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    
    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      width="500px"
      @close="closePasswordDialog"
    >
      <el-form 
        :model="passwordForm" 
        :rules="passwordRules" 
        ref="passwordFormRef"
        label-width="80px"
        size="large"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input 
            v-model="passwordForm.oldPassword" 
            type="password"
            show-password
            placeholder="请输入原密码"
          />
        </el-form-item>
        
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password"
            show-password
            placeholder="请输入新密码"
          />
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password"
            show-password
            placeholder="请再次输入新密码"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closePasswordDialog">取消</el-button>
          <el-button type="primary" @click="submitPasswordChange" :loading="passwordSubmitting">
            确认修改
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 内容区域 -->
    <div class="content-area">
      <router-view />
    </div>
    
    <!-- 页脚 -->
    <div class="footer">
      <p>Data Asset Management All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Grid, UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentRoute = computed(() => route.path)

// 修改密码相关状态
const passwordDialogVisible = ref(false)
const passwordFormRef = ref(null)
const passwordSubmitting = ref(false)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  } else if (command === 'changePassword') {
    passwordDialogVisible.value = true
  }
}

const closePasswordDialog = () => {
  passwordDialogVisible.value = false
  // 重置表单
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
  }
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

const submitPasswordChange = async () => {
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      passwordSubmitting.value = true
      try {
        // TODO: 调用API修改密码
        // 这里暂时模拟API调用成功
        console.log('修改密码请求:', passwordForm)
        
        ElMessage.success('密码修改成功！')
        closePasswordDialog()
      } catch (error) {
        ElMessage.error('密码修改失败，请重试')
      } finally {
        passwordSubmitting.value = false
      }
    }
  })
}
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 顶部导航栏 */
.topbar {
  background: #1a56db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.logo h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
}

.top-menu {
  border-bottom: none;
  background: transparent;
}

.top-menu :deep(.el-menu-item) {
  border: none;
  font-size: 15px;
}

.top-menu :deep(.el-menu-item:hover),
.top-menu :deep(.el-menu-item.is-active) {
  background: transparent;
  border-bottom: 2px solid white;
}

/* 右侧用户区 */
.topbar-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-name {
  font-size: 14px;
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 76px 24px 60px;
  overflow-y: auto;
}

/* 页脚 */
.footer {
  background: #1a56db;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 12px;
  font-size: 13px;
position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.footer p {
  margin: 0;
}
</style>