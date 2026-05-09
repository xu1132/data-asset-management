<template>
  <div class="login-container">
    <!-- 左侧区域 -->
    <div class="login-left">
      <div class="login-logo">
        <h1>数据资产管理平台</h1>
      </div>
      <div class="login-subtitle">Data Asset Management Platform</div>
      <div class="login-desc">武邑县政务数据资产管理平台</div>
    </div>
    
    <!-- 右侧登录表单 -->
    <div class="login-right">
      <div class="login-header">
        <h2 class="login-title">欢迎登录</h2>
        <p class="login-subtitle">请输入您的账号信息</p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            size="large"
            :prefix-icon="CircleCheck"
            style="width: 60%"
          />
          <div class="captcha-code" @click="refreshCaptcha">
            <span>{{ captchaText }}</span>
          </div>
        </el-form-item>
        
        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="rememberMe">记住账号</el-checkbox>
            <span class="forgot-link">忘记密码？</span>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Lock, CircleCheck } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref(null)
const loading = ref(false)
const rememberMe = ref(false)

// 生成随机验证码
const captchaText = ref('')
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = code
}
generateCaptcha()

const refreshCaptcha = () => {
  generateCaptcha()
}

const loginForm = reactive({
  email: '',
  password: '',
  captcha: ''
})

const validateCaptcha = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (value.toUpperCase() !== captchaText.value.toUpperCase()) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

const loginRules = {
  email: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  captcha: [
    { validator: validateCaptcha, trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.login(loginForm.email, loginForm.password)
        ElMessage.success('登录成功')
        router.push('/dashboard')
      } catch (error) {
        ElMessage.error(error.message || '登录失败')
        refreshCaptcha()
        loginForm.captcha = ''
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.login-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a3a8f 0%, #1a56db 50%, #3b82f6 100%);
  color: white;
  padding: 40px;
}

.login-logo h1 {
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.login-desc {
  font-size: 14px;
  opacity: 0.7;
}

.login-right {
  width: 440px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 50px;
}

.login-header {
  margin-bottom: 36px;
}

.login-title {
  font-size: 26px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #6b7280;
  font-size: 14px;
}

.login-form {
  width: 100%;
}

.login-form :deep(.el-input__wrapper) {
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 0 0 1px #e5e7eb;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #1a56db;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #1a56db;
}

.login-options {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  color: #1a56db;
  cursor: pointer;
  font-size: 14px;
}

.forgot-link:hover {
  color: #1e4db7;
}

.captcha-code {
  width: 38%;
  height: 40px;
  margin-left: 12px;
  background: linear-gradient(135deg, #1a3a8f, #1a56db);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 4px;
  cursor: pointer;
  user-select: none;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 15px;
  border-radius: 6px;
  background: linear-gradient(135deg, #1a3a8f, #1a56db);
  border: none;
  letter-spacing: 2px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #1a56db, #3b82f6);
}
</style>
