
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    CLEAR_CART: 'CLEAR_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    REMOVE_ONE_ITEM_FROM_CART: 'REMOVE_ONE_ITEM_FROM_CART',
}

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload} = action

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)

            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState 
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newState)
            return newState
        }
            
        case 'REMOVE_FROM_CART' : {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
        }

        case 'REMOVE_ONE_ITEM_FROM_CART' : {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)

        // aumentar la cantidad si el prodcuto ya esta en el carrito con structuredClone
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                if (newState[productInCartIndex].quantity < 2) {
                    const newState = state.filter(item => item.id !== id)
                    updateLocalStorage(newState)
                    return newState
                }
                newState[productInCartIndex].quantity -= 1
                updateLocalStorage(newState)
                return newState
            }
            break
        }

        case 'CLEAR_CART' : {
            const newState = []
            updateLocalStorage(newState)
            return newState
        }
    }
    return state
}
