import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index'
import Home from '../views/home/index'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Settings from '@/views/settings'
import Project from '../views/project/project'


Vue.use(VueRouter)

const routes = [
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    //命名路由 layout 有一个默认子路由，这个名字没有意义，所以警告
    //正确的做法：如果有默认子路由，就不要得父路由命名了
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', //path 为空，会作为默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article', 
        name: 'article',
        component: Article
      },
      {
        path: '/publish', 
        name: 'publish',
        component: Publish
      },
      {
        path: '/image', 
        name: 'image',
        component: Image
      },
      
      {
        path: '/comment', 
        name: 'comment',
        component: Comment
      },
      {
        path: '/fans', 
        name: 'fans',
        component: Fans
      },
      {
        path: '/settings', 
        name: 'settings',
        component: Settings
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

//路由导航守卫（拦截器），的作用就是控制页面的访问状态
//beforeEach 是全局前置守卫，任何页面的访问都要经过这里
//路由导航守卫，说白了所有页面的导航都会经过这里
//守卫页面的导航
//to: 要去的路由页面信息
//from: 来自那里的路由信息
//next: 放行方法
router.beforeEach((to, from, next) => {
  //如果要访问的页面不是 /login， 校验登录状态
  //如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  //允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  //校验非登录页面的登录状态
  if(to.path !== '/login') {
    if(user) {
      //已登录，允许通过
      next()
    }else{
      //没有登录，跳转到登录页面
      next('/login')
    }
  }else{
    //登录页面，正常允许通过
    next()
  }
})

export default router
