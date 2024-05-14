import { createStore, applyMiddleware } from 'redux'
import * as api from '../configs/config'
import { composeWithDevTools } from '@redux-devtools/extension'
import { rootReducer } from './root-reducer'
import thunk from 'redux-thunk'
import { client } from 'middleware/api'

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        client,
        api,
      })
    )
  )
)
