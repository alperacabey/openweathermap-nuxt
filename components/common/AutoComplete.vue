<template>
  <div class="position-relative">
    <TextField
      v-model="value"
      v-bind="$attrs"
      :show-tooltip="value && data.length === 0"
      :loading="loading"
      @change="change"
      @click="()=>isVisible = !isVisible"
    />

    <ul
      v-if="filteredList.length > 0 && isVisible"
      id="autocomplete-list"
      class="autocomplete-list bg-color-white mt-2"
    >
      <template v-for="(item,i) in filteredList">
        <li
          :id="'list-item-'+i"
          :key="item.id"
          class="autocomplete-list-item"
        >
          <button
            :id="'list-item-'+item.id"
            :key="item.id"
            :class="['w-100 text-left bg-color-white p-2 border-none',{'color-blue' : cursor === i}]"
            @click="selectItem(item)"
          >
            <span>{{ item.name }}</span>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>

import TextField from './TextField'

export default {
  name: 'AutoComplete',
  components: {
    TextField
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isVisible: false,
      cursor: 0,
      value: ''
    }
  },
  computed: {

    filteredList () {
      return this.data.filter(item => item.name.toLowerCase().includes(this.value.toLowerCase()))
    }
  },

  mounted () {
    window.addEventListener('click', this.close)
  },

  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  methods: {
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.isVisible = false
      }
    },
    change (value) {
      if (value === 'Enter') {
        this.selectItem()
      } else if (value === 'ArrowUp') {
        if (this.cursor > 0) {
          this.cursor -= 1
          this.$scrollTo(document.getElementById(`list-item-${this.cursor}`), 0, {
            container: '#autocomplete-list',
            cancelable: false
          })
        }
      } else if (value === 'ArrowDown') {
        if (this.cursor < this.filteredList.length - 1) {
          this.cursor += 1
          this.$scrollTo(document.getElementById(`list-item-${this.cursor}`), 0, {
            container: '#autocomplete-list',
            cancelable: false
          })
        }
      } else if (value === 'Backspace') {
        this.value = ''
        this.$emit('onSelect', { id: '', name: '' })
        this.cursor = 0
      } else {
        this.value = value
        this.isVisible = true
      }
    },
    selectItem (obj) {
      const item = obj || this.filteredList[this.cursor]
      if (item) {
        this.$emit('onSelect', item)
        this.value = item.name
        this.isVisible = false
        this.cursor = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';

.autocomplete-list{
    padding: 0px;
    list-style: none;
    max-height: 320px;
    position: absolute;
    top: auto;
    left: 0px;
    margin: 0px;
    z-index: 9;
    overflow-y: auto;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    width: 240px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>
