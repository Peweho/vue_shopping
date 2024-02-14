import { getCartList, changeCount, delSelect } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    saveCartList (state, list) {
      state.cartList = list
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    allChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartAct (context) {
      const { data } = await getCartList()
      //   data.list.forEach(item => {
      //     item.isChecked = true
      //   })
      context.commit('saveCartList', data.list)
    },
    async changeCountAct (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      context.commit('changeCount', {
        goodsId,
        goodsNum
      })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async deleteItemAct (context) {
      const selItem = context.getters.selCartList
      const cartIds = selItem.map(item => item.id)
      await delSelect(cartIds)
      context.dispatch('getCartAct')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCartTotal (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selCartTotalPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
