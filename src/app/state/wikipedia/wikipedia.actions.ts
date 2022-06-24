import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/models/article';

export const listArticles = createAction(
    '[Wikipedia] Listen Articles'
);

export const insertArticle = createAction(
    '[Wikipedia] Insert Article',
    props<{ article: Article }>()
);

export const removeFirstArticle = createAction(
    '[Wikipedia] Remove First Article'
);
