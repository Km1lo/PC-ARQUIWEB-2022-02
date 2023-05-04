import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Artist } from 'src/app/model/artist';
import * as moment from 'moment';
import { ArtistService } from 'src/app/service/artist.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit{
  forms: FormGroup = new FormGroup({});
  artistss: Artist = new Artist();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;

  //PRUEBA PARA VALIDAR EL CAMPO POINT SEA NUMERICO
  pointValue: number=0;


  constructor(
    private ArtistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute)
  {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;
      console.log('valor edicion', this.edicion, 'valor id', this.id = data['id']);
      this.init();
    });

    this.forms = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      photo: new FormControl(),
      favoritesport: new FormControl(),
      point: new FormControl()

    })
  }

  init() {
    if (this.edicion) {
      this.ArtistService.listId(this.id).subscribe((data) => {
        this.forms = new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          photo: new FormControl(data.photo),
          favoritesport: new FormControl(data.favoritesport),
          point: new FormControl(data.point)
        });
      });
    }
  }

  aceptar(): void {
    this.artistss.id = this.forms.value['id'];
    this.artistss.name = this.forms.value['name'];
    this.artistss.photo = this.forms.value['photo'];
    this.artistss.favoritesport = this.forms.value['favoritesport'];
    this.artistss.point = this.forms.value['point'];

    this.pointValue = parseFloat(this.forms.value['point']);
    if (this.pointValue >= 0 && this.pointValue <= 100) {
      if (this.forms.value['name'].length <= 60) {
        if(this.forms.value['name'].length > 0 && this.forms.value['point'].length > 0){
          if(this.edicion){
            this.ArtistService.update(this.artistss).subscribe((data) =>
              this.router.navigate(['business/artists']).then(() => {
                window.location.reload();
              })
            );
          } else {
            this.ArtistService.insert(this.artistss).subscribe((data) =>
              this.router.navigate(['business/artists']).then(() => {
                window.location.reload();
              })
            );
          }
        }
        else {
          this.mensaje = "Llene el campo Name y Point, Gracias :D";
        }
      }
      else{
        this.mensaje = "El campo Name no debe tener más de 60 caracteres";
      }
    }
    else{
      this.mensaje = "El campo Point debe ser un número entre 0 y 100";
    }

  }

}
