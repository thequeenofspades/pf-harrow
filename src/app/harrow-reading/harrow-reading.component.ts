import { Component, OnInit } from '@angular/core';
import { Card, CARDS, misaligned, MatchType, getMatchType } from '../cards';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-harrow-reading',
  templateUrl: './harrow-reading.component.html',
  styleUrls: ['./harrow-reading.component.scss']
})
export class HarrowReadingComponent implements OnInit {
  private params: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  spread: Card[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.spread = [];
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get(this.params[0])) {
        this.initSpread(paramMap);
      }
    });
  }
  
  initSpread(paramMap: ParamMap): void {
    this.spread = [];
    this.params.forEach(param => {
      this.spread.push(this.getCardById(Number(paramMap.get(param))));
    });
  }

  generateReading(): void {
    let cardIds: string[] = this.shuffle(CARDS).slice(0, 9).map((card: Card) => String(card.id));
    this.router.navigate(['/reading'].concat(cardIds));
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

  misaligned(card: Card, position: number): boolean {
    return misaligned(card, position);
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
