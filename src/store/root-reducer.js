import {combineReducers} from 'redux';
import { tournamentsReducer } from './tournaments/tournaments-reducer';
import { mapsReducer } from './maps/maps-reducer';
import { newsReducer } from './news/news-reducer';
import { shopReducer } from './shop/shop-reducer';
import { crewReducer } from './crew/crew-reducer';

export const rootReducer = combineReducers({
  shop: shopReducer,
  news: newsReducer,
  maps: mapsReducer,
  tournaments: tournamentsReducer,
  crew: crewReducer,
});
