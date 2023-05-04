import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/service/artist.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-business-dialogo',
  templateUrl: './business-dialogo.component.html',
  styleUrls: ['./business-dialogo.component.css']
})
export class BusinessDialogoComponent implements OnInit {
  constructor(private aS: ArtistService,
  private dialogRef: MatDialogRef<BusinessDialogoComponent>) { }
  ngOnInit(): void {

    setTimeout(() => {
      this.aS.setConfirmDelete(true);
      this.dialogRef.close();
      window.location.reload();
    }, 1850);
  }
}
