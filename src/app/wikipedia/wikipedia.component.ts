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
export class WikipediaComponent implements OnInit {

  public articles$: Observable<Article[]> = this.store.pipe(
    select(WikipediaSelectors.selectAllArticles),
    filter(state => !!state)
  );

  private isRemoveReadyToDispatch: boolean = false;

  userFilterFormControl = new FormControl('');
  itemFilterFormControl = new FormControl('');

  public filteredArticles$: Observable<Article[]> = combineLatest([
    this.articles$,
    this.userFilterFormControl.valueChanges.pipe(startWith('')),
    this.itemFilterFormControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(
      ([articles, userVal, itemVal]) => {
        this.isRemoveReadyToDispatch = articles.length > 100;
        if (userVal !== '' || itemVal !== '') {
          return articles.filter((article: Article) => {
            return article.user.toLocaleLowerCase().includes(userVal!.toLocaleLowerCase()) &&
              article.item.toLocaleLowerCase().includes(itemVal!.toLocaleLowerCase());
          }).reverse();
        }
        else {
          return [...articles].reverse();
        }
      }
    ),
    tap(() => {
      if (this.isRemoveReadyToDispatch) {
        this.store.dispatch(WikipediaActions.removeFirstArticle());
      }
    })
  );

  ngOnInit() {
    this.store.dispatch(WikipediaActions.listArticles());
  }

  constructor(
    private store: Store<WikipediaState>
  ) { }

}
