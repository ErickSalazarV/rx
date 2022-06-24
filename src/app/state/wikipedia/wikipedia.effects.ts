import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, filter, map, switchMap } from "rxjs";
import { WikipediaService } from "src/app/services/wikipedia.service";
import * as WikipediaActions from "src/app/state/wikipedia/wikipedia.actions";

@Injectable()
export class WikipediaEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(WikipediaActions.listArticles),
    switchMap(() => this.wikipediaService.getWikipediaMessages()
      .pipe(
        filter(article => !!article),
        map(article => WikipediaActions.insertArticle({ article: article })),
        catchError(() => EMPTY)
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private wikipediaService: WikipediaService
  ) { }
}
