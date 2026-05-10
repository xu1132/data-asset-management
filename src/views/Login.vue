<template>
  <div class="login-container">
    <!-- 左侧品牌区 -->
    <div class="login-left">
      <div class="login-overlay"></div>

      <div class="brand-content">
        <div class="platform-tag">
          DATA ASSET PLATFORM
        </div>

        <h1 class="platform-title">
          数据资产管理平台
        </h1>

        <p class="platform-desc">
          构建统一、安全、高效的数据资产治理与共享体系
        </p>

        <div class="platform-feature">
          <div class="feature-item">
            <span class="dot"></span>
            数据资产统一管理
          </div>

          <div class="feature-item">
            <span class="dot"></span>
            数据共享交换服务
          </div>

          <div class="feature-item">
            <span class="dot"></span>
            数据安全审计监管
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录区 -->
    <div class="login-right">
      <div class="login-card">
        <div class="login-header">
          <h2 class="login-title">欢迎登录</h2>
          <p class="login-subtitle">
            请输入您的账号和密码进行登录
          </p>
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
              :prefix-icon="User"
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

          <!-- 验证码 -->
          <el-form-item prop="captcha">
            <div class="captcha-wrapper">
              <el-input
                v-model="loginForm.captcha"
                placeholder="请输入验证码"
                size="large"
                :prefix-icon="CircleCheck"
                class="captcha-input"
              />

              <div
                class="captcha-code"
                @click="refreshCaptcha"
              >
                {{ captchaText }}
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="login-options">
              <el-checkbox v-model="rememberMe">
                记住账号
              </el-checkbox>

              <span class="forgot-link">
                忘记密码？
              </span>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, CircleCheck } from '@element-plus/icons-vue'
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
  overflow: hidden;
  background: #f5f7fb;
}

/* 左侧 */
.login-left {
  flex: 1.3;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8%;
  background:
    linear-gradient(
      135deg,
      #0f172a 0%,
      #1e3a8a 45%,
      #2563eb 100%
    );
  overflow: hidden;
}

.login-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at top right,
      rgba(255,255,255,0.15),
      transparent 40%
    );
}

.brand-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 560px;
}

.platform-tag {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 30px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 28px;
}

.platform-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.platform-desc {
  font-size: 18px;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 48px;
}

.platform-feature {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  opacity: 0.95;
}

.dot {
  width: 8px;
  height: 8px;
  background: #60a5fa;
  border-radius: 50%;
  margin-right: 12px;
}

/* 右侧 */
.login-right {
  width: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #f8fafc;
}

.login-card {
  width: 100%;
  padding: 48px 42px;
  border-radius: 20px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  box-shadow:
    0 10px 40px rgba(15, 23, 42, 0.08);
}

.login-header {
  margin-bottom: 36px;
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.login-subtitle {
  font-size: 15px;
  color: #6b7280;
}

/* 表单 */
.login-form {
  width: 100%;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
  height: 50px;
  padding: 0 16px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px #dbe2ea;
  transition: all 0.25s;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #3b82f6;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow:
    0 0 0 1px #2563eb,
    0 0 0 4px rgba(37,99,235,0.1);
}

/* 验证码 */
.captcha-wrapper {
  width: 100%;
  display: flex;
  gap: 14px;
}

.captcha-input {
  flex: 1;
}

.captcha-code {
  width: 130px;
  height: 50px;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #1e3a8a,
      #2563eb
    );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s;
  box-shadow:
    0 6px 18px rgba(37,99,235,0.25);
}

.captcha-code:hover {
  transform: translateY(-2px);
}

/* 选项 */
.login-options {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  color: #2563eb;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.forgot-link:hover {
  color: #1d4ed8;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
  background:
    linear-gradient(
      135deg,
      #1e3a8a,
      #2563eb
    );
  box-shadow:
    0 10px 24px rgba(37,99,235,0.25);
  transition: all 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #3b82f6
    );
}

/* 响应式 */
@media (max-width: 1100px) {
  .login-left {
    display: none;
  }

  .login-right {
    width: 100%;
  }
}
</style>