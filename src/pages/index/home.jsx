export default {
  props: {
    level: {
      type: String,
      default: ''
    }
  },
  render(h) {
    const Tag = `h${this.level}`
    return <Tag>我的家</Tag>
  }
}
