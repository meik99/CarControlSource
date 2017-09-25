import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export abstract class BaseService {

  BASE_URL: String = "http://localhost:8080/";

  constructor() { }

}
