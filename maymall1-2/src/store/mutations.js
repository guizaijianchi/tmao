import * as types from './mutation-types.js'
export default {
    [types.ADDGOODS](state, value) {
        state.goodsList = value
    },
    //单个
    [types.PRODUCTINFO](state, value) {
        state.productInfo = value
    }
}
