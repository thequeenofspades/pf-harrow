import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card, getUrl } from '../cards';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                card: Card,
                position: number
              },
              public dialogRef: MatDialogRef<CardPreviewComponent>) { }

  ngOnInit(): void {
  }

  getCardUrl(card: Card): string {
    return getUrl(card);
  }

}
