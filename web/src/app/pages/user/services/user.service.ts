import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ApiService } from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	login(payload = {}) {
		return this.post("/auth/login", payload);
	}

	list(payload = {}) {
		return this.get("/users", payload);
	}
}