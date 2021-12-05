import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-voluntario',
  templateUrl: './inicio-voluntario.component.html',
  styleUrls: ['./inicio-voluntario.component.css']
})
export class InicioVoluntarioComponent implements OnInit {
  
  images = [
    {path: 'https://www.echosis.com.br/site/wp-content/uploads/2019/12/psicologia-e-marketing2.png'},
    {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/03/gosto-da-mente-das-pessoas.-devo-fazer-psicologia-.jpg'},
    {path: 'https://www.crprs.org.br/entrelinhas/assets/artigos/31e81-ed86-reportagem-principal1.jpg'},
    {path: 'https://www.sinesp.org.br/images/2020/Junho-2020/Covid-BemEstar.jpg'},
    {path: 'https://crp04.org.br/wp-content/uploads/2020/03/atendimentoonline_categoria.jpg'},

];   

imagesForSlider = [
  {path: 'https://www.echosis.com.br/site/wp-content/uploads/2019/12/psicologia-e-marketing2.png'},
  {path: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/03/gosto-da-mente-das-pessoas.-devo-fazer-psicologia-.jpg'},
  {path: 'https://www.crprs.org.br/entrelinhas/assets/artigos/31e81-ed86-reportagem-principal1.jpg'},
  {path: 'https://www.sinesp.org.br/images/2020/Junho-2020/Covid-BemEstar.jpg'},
  {path: 'https://crp04.org.br/wp-content/uploads/2020/03/atendimentoonline_categoria.jpg'}
];

  constructor() { }

  ngOnInit(): void {
  }

  handleCarouselEvents(event:any) {
    console.log(event);
}
}
