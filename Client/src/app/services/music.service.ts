import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MusicService extends BaseService {

  constructor(
      private httpClient: HttpClient
  ) {
    super();
  }

  public getFolder(folder: String) {

  }

}
