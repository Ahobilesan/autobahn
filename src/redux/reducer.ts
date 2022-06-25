import * as actions from './actions'

const initialState = {
    openDrawer: false,
    primeloader: true,
    notification: []
}

const reducer = (baseState = initialState, action: any) => {
    console.log('reducer', actions)
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
        default:
            break;
    }
}


export default reducer