import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Mock 数据状态管理
 * 所有页面的 mock 数据集中管理，方便修改和扩展
 */
export const useMockStore = defineStore('mock', () => {
  // ==================== 应用管理 ====================
  const applications = ref([
    { id: 'eef49e0d3b284b93a2...', shortName: '数据编目系统', name: 'data-platform', url: 'http://150.158.90.208:8080/platform', description: '数据编目系统', favorite: true },
    { id: 'b719190813f94c07a1a...', shortName: '数据上报系统', name: 'data-report', url: 'http://150.158.90.208:8081/report', description: '数据上报系统', favorite: true },
    { id: '68d20fff0cec4a3b854...', shortName: '数据查询系统', name: 'data-asset', url: 'http://150.158.90.208:8082/asset', description: '数据查询系统', favorite: true },
    { id: 'e1b129eea1d64036a7f...', shortName: '金融主题库', name: '金融主题库', url: 'http://150.158.90.208:8083/finance', description: '金融主题库', favorite: false }
  ])

  const favoriteApps = computed(() => applications.value.filter(a => a.favorite))
  const normalApps = computed(() => applications.value.filter(a => !a.favorite))

  function toggleFavorite(id) {
    const app = applications.value.find(a => a.id === id)
    if (app) app.favorite = !app.favorite
  }

  function addApplication(app) {
    app.id = 'app_' + Date.now()
    app.favorite = false
    applications.value.push(app)
  }

  function deleteApplication(id) {
    const idx = applications.value.findIndex(a => a.id === id)
    if (idx > -1) applications.value.splice(idx, 1)
  }

  function updateApplication(id, data) {
    const app = applications.value.find(a => a.id === id)
    if (app) Object.assign(app, data)
  }

  // ==================== 机构管理 ====================
  const institutions = ref([
    { id: 1, name: 'test111', parent: '武邑县大数据局', leader: '张主任', phone: '0318-1234567' },
    { id: 2, name: '武邑县大数据局', parent: '', leader: '李局长', phone: '0318-2345678' },
    { id: 3, name: '数据分析部', parent: '武邑县大数据局', leader: '王部长', phone: '0318-3456789' },
    { id: 4, name: '数据分析中心', parent: '数据分析部', leader: '刘主任', phone: '0318-4567890' },
    { id: 5, name: '数据分析中队', parent: '数据分析中心', leader: '陈队长', phone: '0318-5678901' },
    { id: 6, name: '数据分析小组', parent: '数据分析中队', leader: '赵组长', phone: '0318-6789012' }
  ])

  function addInstitution(inst) {
    inst.id = institutions.value.length + 1
    institutions.value.push(inst)
  }

  function deleteInstitution(id) {
    const idx = institutions.value.findIndex(i => i.id === id)
    if (idx > -1) institutions.value.splice(idx, 1)
  }

  function updateInstitution(id, data) {
    const inst = institutions.value.find(i => i.id === id)
    if (inst) Object.assign(inst, data)
  }

  // ==================== 用户管理 ====================
  const users = ref([
    { id: 1, username: 'admin@qq.com', employeeId: '222', name: '张明', institution: '武邑县大数据局', userType: '普通用户', gender: '男', startDate: '2025-01-01', endDate: '' },
    { id: 2, username: 'zhangsan@qq.com', employeeId: '3333333', name: '李华', institution: '数据分析中队', userType: '普通用户', gender: '男', startDate: '2025-02-15', endDate: '' },
    { id: 3, username: 'lisi@qq.com', employeeId: '55555555555', name: '王芳', institution: '数据分析中队', userType: '普通用户', gender: '女', startDate: '2025-03-10', endDate: '' },
    { id: 4, username: 'wangwu@qq.com', employeeId: '777777777777', name: '赵六', institution: 'test111', userType: '普通用户', gender: '男', startDate: '2025-04-01', endDate: '' },
    { id: 5, username: 'zhaoliu@qq.com', employeeId: '8888888888', name: '孙七', institution: '数据分析中队', userType: '普通用户', gender: '男', startDate: '2025-04-15', endDate: '' },
    { id: 6, username: 'admin', employeeId: 'admin', name: '管理员', institution: '武邑县大数据局', userType: '管理员', gender: '男', startDate: '2025-01-01', endDate: '' },
    { id: 7, username: 'fengj@zkcomt.com', employeeId: 'fengj', name: '冯江', institution: '数据分析部', userType: '管理员', gender: '男', startDate: '2025-01-01', endDate: '' }
  ])

  function addUser(user) {
    user.id = users.value.length + 1
    users.value.push(user)
  }

  function deleteUser(id) {
    const idx = users.value.findIndex(u => u.id === id)
    if (idx > -1) users.value.splice(idx, 1)
  }

  function updateUser(id, data) {
    const user = users.value.find(u => u.id === id)
    if (user) Object.assign(user, data)
  }

  // ==================== 文档管理 ====================
  const documents = ref([
    { id: 1, title: '武邑县数据和政务服务局 2025 年部门预算信息公开', author: 'admin', type: '预算公开', date: '2025-08-13' },
    { id: 2, title: '2025.08.13 号新增个体和企业信息公示.xls', author: 'admin', type: '企业信息', date: '2025-08-13' },
    { id: 3, title: '武邑县消防救援大队 2025 年 8 月份双随机抽查单位名单', author: 'admin', type: '抽查名单', date: '2025-08-10' },
    { id: 4, title: '武邑县民政局 2025 年 8 月全县分散供养城市特困人员资金发放台账', author: 'admin', type: '资金台账', date: '2025-08-08' },
    { id: 5, title: '武邑县民政局 2025 年 8 月全县分散供养农村特困人员资金发放台账', author: 'admin', type: '资金台账', date: '2025-08-08' },
    { id: 6, title: '武邑县民政局 2025 年 8 月全县农村低保金发放台账', author: 'admin', type: '低保台账', date: '2025-08-05' }
  ])

  function addDocument(doc) {
    doc.id = documents.value.length + 1
    documents.value.unshift(doc)
  }

  function deleteDocument(id) {
    const idx = documents.value.findIndex(d => d.id === id)
    if (idx > -1) documents.value.splice(idx, 1)
  }

  // ==================== 资讯管理 ====================
  const newsList = ref([
    { id: 1, title: '数据资产管理平台试运行上线公告', date: '2025-12-01', hot: true },
    { id: 2, title: '数据安全管理规范更新通知', date: '2025-11-28', hot: false },
    { id: 3, title: '2023 年度数据质量报告发布', date: '2025-11-25', hot: false },
    { id: 4, title: '数据分析师培训课程安排', date: '2025-11-20', hot: false },
    { id: 5, title: '数据可视化工具使用指南', date: '2025-11-15', hot: false },
    { id: 6, title: '数据资产目录更新说明', date: '2025-11-10', hot: false },
    { id: 7, title: '数据治理项目阶段性成果展示', date: '2025-11-05', hot: false }
  ])

  function addNews(news) {
    news.id = newsList.value.length + 1
    newsList.value.unshift(news)
  }

  function deleteNews(id) {
    const idx = newsList.value.findIndex(n => n.id === id)
    if (idx > -1) newsList.value.splice(idx, 1)
  }

  // ==================== 统计信息 ====================
  const stats = computed(() => ({
    totalApps: applications.value.length,
    totalInstitutions: institutions.value.length,
    totalUsers: users.value.length,
    totalDocuments: documents.value.length,
    totalNews: newsList.value.length
  }))

  return {
    // 应用管理
    applications, favoriteApps, normalApps,
    toggleFavorite, addApplication, deleteApplication, updateApplication,
    // 机构管理
    institutions, addInstitution, deleteInstitution, updateInstitution,
    // 用户管理
    users, addUser, deleteUser, updateUser,
    // 文档管理
    documents, addDocument, deleteDocument,
    // 资讯管理
    newsList, addNews, deleteNews,
    // 统计
    stats
  }
})
