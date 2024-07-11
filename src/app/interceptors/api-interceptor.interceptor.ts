import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiInterceptor<T> implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKey}`,
      'Content-Type': 'application/json'
    });
    const updatedReq = req.clone({ headers });
    return next.handle(updatedReq);
  }
}