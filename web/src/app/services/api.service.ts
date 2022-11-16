import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "environments/environment";


export class ApiService {
	baseUrl: string;

	/**
	 * @param http
	 */
	constructor(protected http: HttpClient) {
		this.baseUrl = environment.api_url.trim();
        if(this.baseUrl.endsWith("/")){
            this.baseUrl.slice(0, this.baseUrl.length-1)
			// this.baseUrl = this.baseUrl + "/"
        }
        console.log(`API URL -> ${this.baseUrl}`)
	}

	/**
	 * Default GET operation
	 * @param urlSuffix Last part of the url (url path)
	 * @param params Extra information we are sending
	 */
	protected get(urlSuffix: string, params = {}, header = {}): Observable<any> {
		// try{
		// 	let userParams = JSON.parse(localStorage.getItem('userParams'))
		// 	if (params) Object.assign(params, userParams)
		// 	else params = userParams
		// }catch(e){}
		header["Authorization"] = "Bearer " + localStorage.getItem('token')
		return this.http.get(this.baseUrl + urlSuffix, { headers: header, params });
	}

	/**
	 * Default POST operation
	 * @param urlSuffix Last part of the url (url path)
	 * @param body Information we are sending in post/body
	 */
	protected post(urlSuffix: string, body = {}): Observable<Object> {
		// try{
		// 	let userParams = JSON.parse(localStorage.getItem('userParams'))
		// 	if (body) Object.assign(body, userParams)
		// 	else body = userParams
		// }catch(e){}
		let headersDict = {}
		let authToken = localStorage.getItem('token')
		// if (authToken){
		// 	headersDict = { "Authorization": "Bearer " + authToken}
		// }
		return this.http.post(this.baseUrl + urlSuffix, body, { headers: headersDict});
	}

	protected put(urlSuffix: string, body = {}): Observable<Object> {
		// try{
		// 	let userParams = JSON.parse(localStorage.getItem('userParams'))
		// 	if (body) Object.assign(body, userParams)
		// 	else body = userParams
		// }catch(e){}
		return this.http.put(this.baseUrl + urlSuffix, body, { headers: {} });
	}

	protected delete(urlSuffix: string): Observable<Object> {
		return this.http.delete(this.baseUrl + urlSuffix, { headers: {} });
	}

	/**
	 * Default ERROR handler
	 * @param error error information
	 */
	protected handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}


