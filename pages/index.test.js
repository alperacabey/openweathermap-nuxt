import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createStore } from '../.nuxt/store'
import Home from './index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home Page', () => {
  let wrapper
  let store

  beforeEach(async () => {
    store = await createStore()
    wrapper = mount(Home, {
      localVue,
      store,
      attachTo: document.body
    })
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.vm).toBeTruthy()
  })
})
