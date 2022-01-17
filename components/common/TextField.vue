<template>
  <div class="position-relative">
    <label v-if="label" class="mb-1">
      {label}
    </label>
    <b-form-input
      v-model="model"
      type="text"
      autocomplete="off"
      class="p-3"
      style="width: 240px;border-radius:25px;"
      v-bind="$attrs"
      @input="input"
      @keyup="focusChanged"
      @keyEnter="focusChanged"
      @click.self="$emit('click')"
    />

    <div v-if="loading || timeout" class="position-absolute" :style="{ right: '40px', top:'8px' }">
      <div class="loader" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: this.value,
      timeout: null
    }
  },
  computed: {
    state () {
      return !!this.model
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) { this.model = newVal }
    }
  },
  methods: {
    input () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('input', this.model)
        this.$emit('change', this.model)
        this.timeout = null
      }, 500)
    },
    focusChanged (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Backspace') {
        this.$emit('change', e.key)
      }
    }
  }
}
</script>
