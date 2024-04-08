import React, { ReactNode, createContext, useEffect, useReducer, useState } from 'react'
import { IProduct } from '../interfaces/Product'
import { produce } from 'immer'

type State = {
    value: IProduct[]
}
type Action =
    | { type: "SET_PRODUCT", payload: IProduct[] }
    | { type: "ADD_PRODUCT", payload: IProduct }
    | { type: "DELETE_PRODUCT", payload: number }
    | { type: "UPDATE_PRODUCT", payload: IProduct }
const initialState = {
    value : []
}
export const ProductContext = createContext([] as any)

type Props = {
    children: ReactNode
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_PRODUCT":
            state.value = action.payload
            break;
        case "ADD_PRODUCT":
            state.value.push(action.payload)
            break;
            case "UPDATE_PRODUCT":
                const newProduct = action.payload;
                const productToUpdate = state.value.find((item) => item.id == newProduct.id);
                if (productToUpdate) {
                    Object.assign(productToUpdate, newProduct);
                }
                break;
        default:
            break;
    }
}

const ProductContextProvider = ({ children }: Props) => {
    const [products, dispatch] = useReducer(produce(reducer), initialState)
    return (
        <div>
            <ProductContext.Provider value={[ products, dispatch ]}>{children}</ProductContext.Provider>
        </div>
    )
}

export default ProductContextProvider