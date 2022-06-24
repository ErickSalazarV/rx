import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/models/article";
import * as WikipediaActions from "./wikipedia.actions";

export const featureKey = "wikipedia";

export interface WikipediaState {
    articles: Article[]
}

export const initialState: WikipediaState = {
    articles: []
}

export const reducer = createReducer(
    initialState,
    on(
        WikipediaActions.insertArticle, (state, { article }) => ({
            ...state,
            articles: [...state.articles, article]
        })
    ),
    on(
        WikipediaActions.removeFirstArticle, (state) => ({
            ...state,
            articles: state.articles.slice(1)
        })
    )
);
