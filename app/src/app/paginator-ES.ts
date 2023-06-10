
import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
// import { MatPaginatorIntl } from "@angular/material";

@Injectable()


export class CustomMatPaginatorIntl extends MatPaginatorIntl {

    constructor(){
        super();
    }

    override itemsPerPageLabel = 'Numero por pagina'; 
    override nextPageLabel     = 'Página Siguiente';
    override previousPageLabel = 'Página Anterior';
  
    override getRangeLabel = function (page:any, pageSize:any, length:any) {
      if (length === 0 || pageSize === 0) {
        return '0 od ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' / ' + length;
    };
  }

