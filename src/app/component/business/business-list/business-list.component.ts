import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/model/artist';
import { ArtistService } from 'src/app/service/artist.service';
import { MatDialog } from '@angular/material/dialog';
import { BusinessDialogoComponent } from './business-dialogo/business-dialogo.component';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  dataSource:MatTableDataSource<Artist>= new MatTableDataSource<Artist>();
  idMayor: number = 0;
  displayedColumns: string[] = ['id', 'name', 'photo', 'favoritesport', 'point', 'actions'];
  @ViewChild(MatPaginator,{ static:true }) paginator!: MatPaginator;

  constructor(private aS:ArtistService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.aS.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })
    this.aS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
    })
  }

  confirm(id: number) {
    this.idMayor = id;
    this.dialog.open(BusinessDialogoComponent);
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      })
    })
  }
  filter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
