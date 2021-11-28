import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-voluntario',
  templateUrl: './inicio-voluntario.component.html',
  styleUrls: ['./inicio-voluntario.component.css']
})
export class InicioVoluntarioComponent implements OnInit {
  
  images = [
    {path: 'https://www.nucleode-stress.com.br/wp-content/uploads/2021/07/como-incentivar-alguem-a-procurar-um-psicologo.png'},
    {path: 'https://www.psicologosberrini.com.br/wp-content/uploads/psicologo-e-trabalho-em-equipe-2-1024x683.jpg'},
    {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2019/05/orientaccca7acc83o-psicologia-ecc81-parado-demais.png'},
    {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/08/Dia-do-Psic%C3%B3logo.jpg'},
    {path: 'https://juliahelmer.com.br/images/terapia-online.jpg'},

];   

imagesForSlider = [
  {path: 'https://www.nucleode-stress.com.br/wp-content/uploads/2021/07/como-incentivar-alguem-a-procurar-um-psicologo.png'},
  {path: 'https://www.psicologosberrini.com.br/wp-content/uploads/psicologo-e-trabalho-em-equipe-2-1024x683.jpg'},
  {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2019/05/orientaccca7acc83o-psicologia-ecc81-parado-demais.png'},
  {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/08/Dia-do-Psic%C3%B3logo.jpg'},
  {path: 'https://juliahelmer.com.br/images/terapia-online.jpg'}
];

  constructor() { }

  ngOnInit(): void {
  }

  handleCarouselEvents(event:any) {
    console.log(event);
}
}
