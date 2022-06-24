import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, pipe, startWith, Subject, takeUntil, tap } from 'rxjs';
import { WikipediaState } from '../state/wikipedia/wikipedia.reducer';
import { Article } from 'src/app/models/article';
import { FormControl } from '@angular/forms';
import * as WikipediaActions from 'src/app/state/wikipedia/wikipedia.actions';
import * as WikipediaSelectors from 'src/app/state/wikipedia/wikipedia.selector';


@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html',
  styleUrls: ['./wikipedia.component.scss']
})
export class WikipediaComponent implements OnInit, OnDestroy {

  private componentDestroy$: Subject<boolean> = new Subject();

  public articles$: Observable<Article[]> = this.store.pipe(
    select(WikipediaSelectors.selectAllArticles),
    filter(state => !!state)
  );

  userFilterFormControl = new FormControl('');
  itemFilterFormControl = new FormControl('');

  public filteredArticles$: Observable<Article[]> = combineLatest([
    this.articles$,
    this.userFilterFormControl.valueChanges.pipe(startWith('')),
    this.itemFilterFormControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    tap(console.log),
    map(
      ([articles, userVal, itemVal]) => {
        if (userVal !== '' || itemVal !== '') {
          return articles.filter((article: Article) => {
            return article.user.toLocaleLowerCase().includes(userVal!.toLocaleLowerCase()) &&
              article.item.toLocaleLowerCase().includes(itemVal!.toLocaleLowerCase());
          });
        }
        else {
          return articles;
        }
      }
    ),
    tap(x => {
      if (x.length > 15) {
        this.store.dispatch(WikipediaActions.removeFirstArticle());
      }
    }),
    takeUntil(this.componentDestroy$)
  );

  ngOnInit() {
    this.store.dispatch(WikipediaActions.listArticles());
  }

  ngOnDestroy() {
    this.componentDestroy$.next(true);
    this.componentDestroy$.unsubscribe();
  }

  constructor(
    private store: Store<WikipediaState>
  ) { }

}
