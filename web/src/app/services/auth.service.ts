import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	login(payload = {}) {
		return this.post("/auth/login", payload);
	}

	createUser(payload = {}) {
		return this.post("/users", payload);
	}
}