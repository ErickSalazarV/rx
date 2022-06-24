import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as WikipediaReducer from "./wikipedia.reducer";

export const selectWikipediaState = createFeatureSelector<WikipediaReducer.WikipediaState>(WikipediaReducer.featureKey);
export const selectAllArticles = createSelector(
  selectWikipediaState,
  (state: WikipediaReducer.WikipediaState) => state.articles
);