<template>
  <div class="login-container">
    <!-- 左侧区域 -->
    <div class="login-left">
      <h1>数据资产管理平台</h1>
      <p>Data Asset Management Platform</p>
    </div>
    
    <!-- 右侧登录表单 -->
    <div class="login-right">
      <h2 class="login-title">欢迎登录</h2>
      <p class="login-subtitle">请输入您的账号信息</p>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="请输入邮箱"
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
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a56db 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  padding: 40px;
}

.login-left h1 {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-left p {
  font-size: 18px;
  opacity: 0.9;
}

.login-right {
  width: 480px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #6b7280;
  margin-bottom: 40px;
}

.login-form {
  width: 100%;
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
  color: #3b82f6;
}

.captcha-code {
  width: 38%;
  height: 40px;
  margin-left: 12px;
  background: linear-gradient(135deg, #1a56db, #3b82f6);
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
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1a56db, #3b82f6);
  border: none;
}

.login-btn:hover {
  background: linear-gradient(135deg, #1e40af, #1a56db);
}
</style>
