import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ability } from '../cards';

@Component({
  selector: 'app-choosing',
  templateUrl: './choosing.component.html',
  styleUrls: ['./choosing.component.scss']
})
export class ChoosingComponent implements OnInit {

  ability: Ability;
  playerNumber: number;
  showAbilities: boolean = true;
  showPlayerNumber: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChoosingComponent>) { }

  ngOnInit(): void {
  }

  chooseAbility(ability: number): void {
    this.ability = ability;
    this.showAbilities = false;
    this.showPlayerNumber = true;
  }

  chooseNumber(count: number): void {
    this.playerNumber = count;
    this.dialogRef.close({
      ability: this.ability,
      playerNumber: this.playerNumber
    });
  }

}
