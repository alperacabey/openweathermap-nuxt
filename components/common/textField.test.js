import { mount, createLocalVue } from '@vue/test-utils'
import TextField from '@/components/common/TextField'

const localVue = createLocalVue()
const id = 'textfield-id'

describe('TextField Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TextField, {
      localVue,
      attachTo: document.body,
      data () {
        return {
          model: '',
          timeout: null
        }
      },
      propsData: { id },
      stubs: ['BFormInput']
    })
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should not renders label if does not exists', () => {
    expect(wrapper.find('label').exists()).toBeFalsy()
  })

  it('renders label correctly', async () => {
    const text = 'label-text'
    await wrapper.setProps({ label: text })
    expect(wrapper.find('label').exists()).toBeTruthy()
  })

  it('renders loader spinner correctly', async () => {
    expect(wrapper.find('.loader').exists()).toBeFalsy()
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.loader').exists()).toBeTruthy()
  })

  it('type a text correctly', async () => {
    const change = jest.fn()
    const text = 'test-text'
    await wrapper.setProps({ change })
    const textInput = wrapper.find(`#${id}`)
    textInput.element.value = text
    textInput.trigger('input')

    expect(textInput.exists()).toBeTruthy()
    expect(textInput.element.value).toBe(text)
  })
})

createGtm({
  id: 'GTM-xxxxxx',
  queryParams: {
    gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    gtm_preview: 'env-4',
    gtm_cookies_win: 'x'
  },
  defer: false,
  compatibility: false,
  nonce: '2726c7f26c',
  enabled: true,
  debug: true,
  loadScript: true,
  vueRouter: router,
  ignoredViews: ['homepage'],
  trackOnNextTick: false
})
