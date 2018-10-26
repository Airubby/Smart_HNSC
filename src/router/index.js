import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () => import('@/pages/' + file + '.vue')

Vue.use(Router)
/* Layout */
import Layout from '../pages/layout/layout'

export const constantRouters = [
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index')
  },
  {
    path: '/404',
    name: 'Page404',
    component: _import('404')
  },
  {
    path: '/tpl',
    name: 'tpl',
    component: _import('tpl')
  },
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: _import('dashboard/index')
      }
    ]
  }
]

// 预算申报管理路由
export const applyManageRouters = [
  {
    path: '/apply',
    component: Layout,
    name: '预算申报',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/apply/costApply'
  },
  {
    path: '/apply',
    component: Layout,
    name: '预算申报',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/apply/costApply',
    children: [
      {
        path: 'costApply',
        name: 'costApply',
        component: _import('dashboard/index'),
        meta: { title: '年初申报预算' }
      },
      {
        path: 'adjustApply',
        name: 'adjustApply',
        component: _import('apply/adjustApply/index'),
        meta: { title: '调整申报预算' }
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    name: '预算审核',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/apply/auditing',
    children: [
      // 二级单位
      {
        path: 'auditingCheck',
        name: 'auditingCheck',
        component: _import('apply/auditing/auditingCheck'),
        meta: { title: '年初预算申报审核' }
      },
      {
        path: 'adjustAuditingCheck',
        name: 'adjustAuditingCheck',
        component: _import('apply/auditing/adjustAuditingCheck'),
        meta: { title: '调整预算申报审核'}
      },
      // 规财处
      {
        path: 'auditing',
        name: 'auditing',
        component: _import('apply/auditing/auditing'),
        meta: { title: '年初预算汇总审核'}
      },
      {
        path: 'adjustAuditing',
        name: 'adjustAuditing',
        component: _import('apply/auditing/adjustAuditing'),
        meta: { title: '调整预算汇总审核'}
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    name: '预算批复',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/apply/replyConfirmj',
    children: [
      {
        path: 'replyConfirmj',
        name: 'replyConfirmj',
        component: _import('apply/reply/replyConfirmj'),
        meta: { title: '预算批复确认' }
      },
      {
        path: 'replyCheckj',
        name: 'replyCheckj',
        component: _import('apply/reply/replyCheckj'),
        meta: { title: '预算批复查看' }
      },
      {
        path: 'replyUpload',
        name: 'replyUpload',
        component: _import('apply/reply/replyUpload'),
        meta: { title: '预算批复上传'}
      },
      {
        path: 'replySummary',
        name: 'replySummary',
        component: _import('apply/reply/replySummary'),
        meta: { title: '预算汇总管理' }
      }
    ]
  }
]

// 预算执行管理路由
export const excuteManageRouters = [

]

// 采购管理路由
export const purchaseManageRouters = [

]

// 合同管理模块路由
export const contractManageRouters = [
  {
    path: '/contract',
    component: Layout,
    name: '政府合同管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/contract/govermentManage'
  },
  {
    path: '/contract',
    component: Layout,
    name: '政府合同管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/contract/govermentManage',
    children: [
      {
        path: 'govermentManage',
        name: 'govermentManage',
        component: _import('dashboard/index'),
        meta: { title: '政府合同管理' }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    name: '其他合同管理',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'otherManage',
        name: 'otherManage',
        component: _import('dashboard/index'),
        meta: { title: '其他合同管理' }
      }
    ]
  },
]

// 一项一档管理模块路由
export const profileManageRouters = [
  {
    path: '/profile',
    component: Layout,
    name: '档案管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/profile/profileManage'
  },
  {
    path: '/profile',
    component: Layout,
    name: '档案管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/profile/profileManage',
    children: [
      {
        path: 'profileManage',
        name: 'profileManage',
        component: _import('dashboard/index'),
        meta: { title: '档案管理' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    name: '台账汇总',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'profileCheck',
        name: 'profileCheck',
        component: _import('dashboard/index'),
        meta: { title: '台账汇总' }
      }
    ]
  }
]

// 教育培训模块路由
export const eduManageRouters = [
  {
    path: '/edu',
    component: Layout,
    name: '题库管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/edu/answer'
  },
  {
    path: '/edu',
    component: Layout,
    name: '登录答题',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/edu/answer',
    children: [
      {
        path: 'answer',
        name: 'answer',
        component: _import('dashboard/index'),
        meta: { title: '登录答题' }
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    name: '题库管理',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: _import('dashboard/index'),
        meta: { title: '题库管理' }
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    name: '题库学习',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'learning',
        name: 'learning',
        component: _import('dashboard/index'),
        meta: { title: '题库学习' }
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    name: '我的答题',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'myEdu',
        name: 'myEdu',
        component: _import('dashboard/index'),
        meta: { title: '我的答题' }
      }
    ]
  }
]

// 统计分模块路由
export const analysisManageRouters = [
  {
    path: '/analysis',
    component: Layout,
    name: '统计分析',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/analysis/index'
  },
  {
    path: '/analysis',
    component: Layout,
    name: '统计分析',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/analysis/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: _import('dashboard/index'),
        meta: { title: '统计分析' }
      }
    ]
  }
]

// 系统管模块路由
export const systemManageRouters = [
  {
    path: '/system',
    component: Layout,
    name: '用户管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/system/roles'
  },
  {
    path: '/system',
    component: Layout,
    name: '用户管理',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/system/roles',
    children: [
      {
        path: 'roles',
        name: 'roles',
        component: _import('dashboard/index'),
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '权限管理',
    meta: { icon: 'caidanxiaobiao1' },
    children: [
      {
        path: 'rights',
        name: 'rights',
        component: _import('dashboard/index'),
        meta: { title: '权限管理' }
      }
    ]
  }
]

// 通知公模块路由
export const noticeManageRouters = [
  {
    path: '/notice',
    component: Layout,
    name: '通知公告',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/notice/notices'
  },
  {
    path: '/notice',
    component: Layout,
    name: '通知公告',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/notice/notices',
    children: [
      {
        path: 'notices',
        name: 'notices',
        component: _import('dashboard/index'),
        meta: { title: '通知公告' }
      }
    ]
  }
]


// 政策法规模块路由
export const rulesManageRouters = [
  {
    path: '/rules',
    component: Layout,
    name: '政策法规',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/rules/index'
  },
  {
    path: '/rules',
    component: Layout,
    name: '政策法规',
    meta: { icon: 'caidanxiaobiao1' },
    redirect: '/rules/index',
    children: [
      {
        path: 'index',
        name: 'dashboard',
        component: _import('dashboard/index'),
        meta: { title: '政策法规' }
      }
    ]
  }
]
// 菜单路由
export const menuRouters = [
  ...applyManageRouters,
  ...excuteManageRouters,
  ...purchaseManageRouters,
  ...contractManageRouters,
  ...profileManageRouters,
  ...eduManageRouters,
  ...analysisManageRouters,
  ...systemManageRouters,
  ...noticeManageRouters,
  ...rulesManageRouters
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...constantRouters,
    ...menuRouters,
    { path: '*', redirect: '/404', hidden: true }
  ]
})

