import {
  mount,
  createLocalVue,
  enableAutoDestroy,
  resetAutoDestroyState
} from '@vue/test-utils'
import AutoComplete from '@/components/common/AutoComplete'
import { listMaker } from '@/utils/helpers'

const localVue = createLocalVue()
const list = listMaker(5)
const id = 'autocomplete-id'

enableAutoDestroy(afterEach)
afterAll(resetAutoDestroyState)

describe('AutoComplete Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AutoComplete, {
      localVue,
      attachTo: document.body,
      data () {
        return {
          isVisible: false,
          cursor: 0
        }
      },
      propsData: { id, selected: { id: '', name: '' } },
      stubs: ['TextField']
    })
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders input correctly', () => {
    expect(wrapper.find(`#${id}`).exists()).toBeTruthy()
  })

  it('should not renders list initially', () => {
    expect(wrapper.find('ul').exists()).toBeFalsy()
  })

  it('renders list after data updated', async () => {
    await wrapper.setProps({ data: list })
    await wrapper.setData({ isVisible: true })
    expect(wrapper.find('ul').exists()).toBeTruthy()
  })

  it('should not renders list when user select an item', async () => {
    await wrapper.setProps({ data: list })
    await wrapper.setData({ isVisible: true })
    const item = wrapper.find(`#list-item-${list[1].id}`)
    item.trigger('click')
    expect(wrapper.vm.isVisible).toBe(false)
  })

  it('should not renders list when user click an input', async () => {
    const onSelect = jest.fn()
    await wrapper.setProps({ data: list, onSelect })
    await wrapper.setData({ isVisible: true })
    wrapper.vm.$emit('onSelect', list[0].name)
    expect(wrapper.emitted().onSelect).toBeTruthy()
    expect(wrapper.emitted().onSelect).toBeTruthy()
  })
})
