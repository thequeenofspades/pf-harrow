import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card, CARDS, misaligned, MatchType, getMatchType } from '../cards';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { count } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-harrow-reading',
  templateUrl: './harrow-reading.component.html',
  styleUrls: ['./harrow-reading.component.scss']
})
export class HarrowReadingComponent implements OnInit, OnDestroy {
  private imgLoadCounter: Subject<number> = new Subject();
  private imgLoadCounterSubscription: Subscription;
  private numImgsLoaded: number;
  private params: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  private paramMapSubscription: Subscription;
  private queryParamsSubscription: Subscription;

  allImgsLoaded: boolean;
  loadingMsg: string;
  showDescriptions: boolean;
  spread: Card[] = [];

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.spread = [];
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get(this.params[0])) {
        this.initSpread(paramMap);
      }
    });
    this.queryParamsSubscription = this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      if (queryParamMap.get("showDesc")) {
        this.showDescriptions = true;
      } else {
        this.showDescriptions = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.imgLoadCounterSubscription?.unsubscribe();
    this.paramMapSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
  }
  
  initSpread(paramMap: ParamMap): void {
    this.allImgsLoaded = false;
    this.numImgsLoaded = 0;
    this.imgLoadCounter.next(0);
    this.loadingMsg = "Loading..."
    this.spread = [];
    this.params.forEach(param => {
      this.spread.push(this.getCardById(Number(paramMap.get(param))));
    });
    this.imgLoadCounterSubscription = this.imgLoadCounter.asObservable().subscribe(value => {
      if (value == 9) {
        this.allImgsLoaded = true;
      }
    });
  }

  generateReading(): void {
    let cardIds: string[] = this.shuffle(CARDS).slice(0, 9).map((card: Card) => String(card.id));
    this.router.navigate(['/reading'].concat(cardIds), {
      queryParams: {
        'showDesc': true
      }
    });
  }

  getTrueMatch(card: Card, position: number): boolean {
    return getMatchType(card, position) == MatchType.TrueMatch;
  }

  getPartialMatch(card: Card, position: number): boolean {
    return getMatchType(card, position) == MatchType.PartialMatch;
  }

  getOppositeMatch(card: Card, position: number): boolean {
    return getMatchType(card, position) == MatchType.OppositeMatch;
  }

  getShareUrl(): string {
    let url: string = "pathfinder-harrow.web.app/reading/";
    this.spread.forEach((card: Card) => {
      url = url + String(card.id) + "/";
    });
    return url;
  }

  misaligned(card: Card, position: number): boolean {
    return misaligned(card, position);
  }

  onImageLoad(index: number): void {
    this.numImgsLoaded++;
    this.imgLoadCounter.next(this.numImgsLoaded);
  }

  openHelpDialog(): void {
    this.dialog.open(HelpDialogComponent);
  }

  showCopiedSnackbar(): void {
    this.snackbar.open("Copied URL for sharing", undefined, {
      duration: 1000
    });
  }

  private getCardById(id: number): Card {
    return {...CARDS.find(card => card.id == id)};
  }

  private shuffle(cards: Card[]): Card[] {
    let currentIndex = cards.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  
    return cards;
  }

}
