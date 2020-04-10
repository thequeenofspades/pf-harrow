import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card, CARDS, misaligned, MatchType, getMatchType, getUrl, Ability } from '../cards';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ChoosingComponent } from '../choosing/choosing.component';
import { CardPreviewComponent } from '../card-preview/card-preview.component';

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

  ability: Ability;
  allImgsLoaded: boolean = true;
  choosing: Card[] = [];
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
      this.choosing = [];
      for (let i = 0; i < 9; i++) {
        if (queryParamMap.get('r' + String(i))) {
          this.choosing.push(this.getCardById(Number(queryParamMap.get('r' + String(i)))));
        }
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

  choose(): void {
    this.dialog.open(ChoosingComponent).afterClosed().subscribe(
      (data: {ability: Ability, playerNumber: number}) => {
        this.ability = data.ability;
        this.choosing = this.shuffle(CARDS.filter(card => 
          card.ability == data.ability)).slice(0, data.playerNumber);
        let queryParams = {'showDesc': true};
        for (let i = 0; i < this.choosing.length; i++) {
          queryParams['r' + String(i)] = this.choosing[i].id;
        }
        this.router.navigate(['/reading'].concat(this.spread.map(card => String(card.id))), {
          queryParams: queryParams
        });
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

  getAbilityCard(card: Card): boolean {
    return card.ability == this.ability;
  }

  getRoleCard(card: Card): boolean {
    return this.choosing.findIndex((roleCard: Card) => roleCard.id == card.id) > -1;
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
    let url: string = "pathfinder-harrow.web.app/reading";
    this.spread.forEach((card: Card) => {
      url = url + "/" + String(card.id);
    });
    if (this.choosing.length) {
      url = url + "?";
    }
    for (let i = 0; i < this.choosing.length; i++) {
      if (i > 0) {
        url = url + "&";
      }
      url = url + "r" + String(i) + "=" + String(this.choosing[i].id);
    }
    return url;
  }

  getCardUrl(card: Card): string {
    return getUrl(card);
  }

  getDescription(card: Card, position: number): string {
    let desc = card.description;
    if (this.misaligned(card, position)) {
      desc = desc + ' MISALIGNED: ' + card.misalignedDescription;
    }
    return desc;
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

  previewCard(card: Card, position: number): void {
    this.dialog.open(CardPreviewComponent, {
      data: {
        card: card,
        position: position
      }
    });
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
