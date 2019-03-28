import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import Index from "@/components/index/Index"
import Table from "@/components/table/table"
import Editor from "@/components/editor/editor"
import Form from "@/components/form/form"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:Main
    },
    {
      path: '/main',
      component: Main,
      children:[
        {
          path: '/index',
          name: "index",
          component: Index
        },
        {
          path: '/table',
          name: "table",
          component: Table
        },
        {
          path: '/editor',
          name: "editor",
          component: Editor
        },
        {
          path: '/form',
          name: "form",
          component: Form
        },
      ]
    },
    
  ]
})
