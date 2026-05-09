<template>
  <div class="asset-register">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">数据资产登记</span>
      </div>
      
      <el-steps :active="activeStep" finish-status="success" style="margin-bottom: 40px;">
        <el-step title="基本信息" />
        <el-step title="数据信息" />
        <el-step title="安全信息" />
        <el-step title="完成提交" />
      </el-steps>
      
      <el-form ref="formRef" :model="form" label-width="120px" style="max-width: 800px;">
        <!-- 基本信息 -->
        <div v-show="activeStep === 0">
          <el-form-item label="资产名称" required>
            <el-input v-model="form.name" placeholder="请输入数据资产名称" />
          </el-form-item>
          <el-form-item label="资产编码" required>
            <el-input v-model="form.code" placeholder="系统自动生成" disabled />
          </el-form-item>
          <el-form-item label="数据分类" required>
            <el-select v-model="form.category" placeholder="请选择">
              <el-option label="基础数据" value="基础数据" />
              <el-option label="业务数据" value="业务数据" />
              <el-option label="统计数据" value="统计数据" />
              <el-option label="监测数据" value="监测数据" />
            </el-select>
          </el-form-item>
          <el-form-item label="提供部门" required>
            <el-input v-model="form.department" placeholder="请输入提供部门" />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contact" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </div>
        
        <!-- 数据信息 -->
        <div v-show="activeStep === 1">
          <el-form-item label="数据来源">
            <el-input v-model="form.source" placeholder="请输入数据来源" />
          </el-form-item>
          <el-form-item label="更新周期">
            <el-select v-model="form.updateCycle" placeholder="请选择">
              <el-option label="实时" value="实时" />
              <el-option label="每日" value="每日" />
              <el-option label="每周" value="每周" />
              <el-option label="每月" value="每月" />
              <el-option label="每年" value="每年" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据量级">
            <el-input v-model="form.dataSize" placeholder="如：100万条" />
          </el-form-item>
          <el-form-item label="数据格式">
            <el-checkbox-group v-model="form.formats">
              <el-checkbox label="Excel" />
              <el-checkbox label="CSV" />
              <el-checkbox label="JSON" />
              <el-checkbox label="XML" />
              <el-checkbox label="数据库" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="数据描述">
            <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入数据描述" />
          </el-form-item>
        </div>
        
        <!-- 安全信息 -->
        <div v-show="activeStep === 2">
          <el-form-item label="安全等级" required>
            <el-radio-group v-model="form.securityLevel">
              <el-radio label="公开">公开</el-radio>
              <el-radio label="内部">内部</el-radio>
              <el-radio label="敏感">敏感</el-radio>
              <el-radio label="机密">机密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="共享范围">
            <el-select v-model="form.shareScope" multiple placeholder="请选择">
              <el-option label="本单位" value="本单位" />
              <el-option label="本系统" value="本系统" />
              <el-option label="本县" value="本县" />
              <el-option label="全市" value="全市" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据质量">
            <el-slider v-model="form.quality" show-input />
          </el-form-item>
          <el-form-item label="质量说明">
            <el-input v-model="form.qualityDesc" type="textarea" :rows="3" placeholder="请输入质量说明" />
          </el-form-item>
        </div>
        
        <!-- 完成 -->
        <div v-show="activeStep === 3">
          <el-result icon="success" title="信息填写完成" sub-title="请确认信息无误后提交">
            <template #extra>
              <el-button type="primary" @click="submitForm">确认提交</el-button>
              <el-button @click="activeStep = 0">返回修改</el-button>
            </template>
          </el-result>
        </div>
        
        <el-form-item v-show="activeStep < 3">
          <el-button @click="activeStep--" :disabled="activeStep === 0">上一步</el-button>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeStep = ref(0)
const formRef = ref(null)

const form = reactive({
  name: '',
  code: 'A' + Date.now(),
  category: '',
  department: '',
  contact: '',
  phone: '',
  source: '',
  updateCycle: '',
  dataSize: '',
  formats: [],
  description: '',
  securityLevel: '内部',
  shareScope: [],
  quality: 80,
  qualityDesc: ''
})

const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}

const submitForm = () => {
  ElMessage.success('提交成功！资产登记申请已提交，等待审核。')
  Object.keys(form).forEach(key => {
    if (key !== 'quality') form[key] = ''
  })
  form.formats = []
  form.securityLevel = '内部'
  form.quality = 80
  activeStep.value = 0
}
</script>
