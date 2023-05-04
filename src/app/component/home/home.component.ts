import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/service/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  artistCount: number=0;

  constructor(private aS: ArtistService, public route:Router) { }

  ngOnInit(): void {
    this.aS.getArtistCount().subscribe(count=>{
      this.artistCount = count;
    });

  }

}
