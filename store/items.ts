export const state = () => ({
  listItem: []
})

export const mutations = {
  add (state: ItemStore, item : ItemType) {
    state.listItem.push(item)
  },
  edit (state: ItemStore, item : ItemType) {
    state.listItem.splice(state.listItem.indexOf(item), 1, item)
  },
  remove (state: ItemStore, item : ItemType) {
    state.listItem.splice(state.listItem.indexOf(item), 1)
  }
}
