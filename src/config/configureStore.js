import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../common/reducers";
import thunk from "redux-thunk";
const compostEnhancers = composeWithDevTools(applyMiddleware(thunk));
export default function configureStore() {
    return createStore(
        combineReducers({
            ...reducers,
        }),
        compostEnhancers
    );
}
