import { shallow, mount } from 'vue-test-utils'
import Checklist from '@/components/checklist'

describe('checklist', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Checklist, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-checklist')
    expect(wrapper.contains('.weui-cells_checkbox')).toBeTruthy()

    // create with 'title'
    wrapper = shallow(Checklist, {
      propsData: {
        title: 'test title'
      }
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test title')
  })

  it('options', () => {
    const options = [
      'value1',
      'value2',
      'value3'
    ]
    wrapper = mount(Checklist, {
      propsData: {
        value: 'value2',
        options: options
      }
    })

    expect(wrapper.findAll('.weui-check__label').length).toBe(3)

    expect(wrapper.findAll('.weui-cell__bd p').at(0).text()).toBe('value1')
    expect(wrapper.findAll('.weui-cell__bd p').at(1).text()).toBe('value2')
    expect(wrapper.findAll('.weui-cell__bd p').at(2).text()).toBe('value3')

    expect(wrapper.findAll('input').at(0).hasAttribute('value', 'value1'))
    expect(wrapper.findAll('input').at(1).hasAttribute('value', 'value2'))
    expect(wrapper.findAll('input').at(2).hasAttribute('value', 'value3'))
  })

  it('max selection', () => {
    const options = [
      'value1',
      'value2',
      'value3'
    ]

    wrapper = shallow(Checklist, {
      propsData: {
        max: 2,
        options: options
      }
    })

    wrapper.setData({
      currentValue: options
    })

    expect(wrapper.vm.currentValue.length).toBe(2)
  })

  it('watch currentValue', () => {
    wrapper = shallow(Checklist, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  it('watch value', () => {
    wrapper = shallow(Checklist, {
      propsData: {}
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })
})
