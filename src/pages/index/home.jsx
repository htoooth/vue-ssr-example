export default {
  name: 'Home',
  props: {
    level: {
      type: String,
      default: '1'
    }
  },
  render(h) {
    const Tag = `h${this.level}`
    return <Tag>我的家在东北，松花江上</Tag>
  }
}
