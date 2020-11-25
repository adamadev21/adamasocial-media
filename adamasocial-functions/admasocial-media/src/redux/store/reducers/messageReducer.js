import { SEND_MESSAGE } from "../../utils/types"

const initialState = {
messages
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SEND_MESSAGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
