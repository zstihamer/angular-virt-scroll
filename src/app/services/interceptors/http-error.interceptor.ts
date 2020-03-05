import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NotificationService} from '@progress/kendo-angular-notification';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export function getErrorMessage(method, code?) {
  if (code && code === 404) {
    return 'Nem található a kért adat!';
  }
  switch (method) {
    case 'fetch':
      return 'Hiba történt az adatok lekérésekor!';
      break;
    case 'GET':
      return 'Hiba történt az adatok lekérésekor!';
      break;
    case 'PUT':
      return 'Hiba történt mentés közben!';
      break;
    case 'DELETE':
      return 'Hiba történt törlés közben!';
      break;
    default:
      return 'Ismeretlen hiba történt!';
      break;
  }
}

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(protected notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request;
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          const message = getErrorMessage(req.method, error.status);
          this.notificationService.show({
            content: message,
            hideAfter: 3000,
            cssClass: 'notification-class',
            position: {horizontal: 'center', vertical: 'bottom'},
            animation: {type: 'fade', duration: 200},
            type: {style: 'error', icon: true}
          });
          return throwError(error);
        })
      );
  }


}
