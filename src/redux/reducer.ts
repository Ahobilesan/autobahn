import * as actions from './actions'

const initialState = {
    openModal: false,
    openAckModal: false,
    openDrawer: false,
    primeloader: true,
    notification: [],
    modalData: {}
}

const reducer = (baseState = initialState, action: any) => {
    console.log('reducer', action)
    switch (action.type) {
        case actions.SET_PRIME_LOADER: {
            return {
                ...baseState,
                primeloader: action.data
            }
        }
        case actions.SET_DRAWER: {
            return {
                ...baseState,
                openDrawer: action.data
            }
        }
        case actions.SET_POST: {
            return {
                ...baseState,
                post: action.data,
                primeloader: false
            }
        }
        case actions.SET_MODAL: {
            return {
                ...baseState,
                modalData: action.data.post,
                openModal: action.data.open
            }
        }
        case actions.SET_ACK_MODAL: {
            return {
                ...baseState,
                modalData: action.data.post,
                openAckModal: action.data.open
            }
        }
        default: {
            return {
                ...baseState
            }
        }
    }
}


export default reducer