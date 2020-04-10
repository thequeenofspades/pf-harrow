import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { getUrl, CARDS } from '../cards';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  exampleUrl: string = getUrl(CARDS[0]);

  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) { }

  ngOnInit(): void {
  }

}
