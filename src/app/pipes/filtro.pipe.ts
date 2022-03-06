import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[],
    texto: string = '',
    columna: string = 'name'
  ): any[] {

    if (columna == '') {
      columna = 'name'
    }
    if (texto === '') {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }
    if( columna !== 'grade') {
      texto = texto.toLocaleLowerCase();
    }

    return arreglo.filter(
      item => item[columna].toLowerCase().includes(texto)
    );
  }

}
