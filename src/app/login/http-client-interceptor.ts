import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private $localStorage: LocalStorageService) {

  } 

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.$localStorage.retrieve("authenticationToken");
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });

      return next.handle(cloned);
    }
    else {
      if ( document.getElementById("err") !== null ) {
        console.log("erreur déja affiché");
      } else {
        let passdiv = document.getElementById('passdiv')
        let erreur = document.createElement('p')
        let erreurText = document.createTextNode("Username ou Mot de passe incorrect. Veuillez vérifier vos données!")
        erreur.appendChild(erreurText)
        passdiv.appendChild(erreur)
        erreur.setAttribute("id","err")
        erreur.setAttribute("style",`background: #c51244 !important; padding: 10px !important; border-radius: 0 !important; position: relative; display: inline-block !important; box-shadow: 1px 1px 1px #aaaaaa; margin-top: 10px; color: white`)
      }
      return next.handle(req);
    }
  }
}