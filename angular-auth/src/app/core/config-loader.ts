import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../models/config";
import {environment} from "../../environments/environment";

const ConfigFile = './config/config.json';

@Injectable()
export class ConfigLoader {
  private appConfig: Config = {};

  constructor(
    private httpClient: HttpClient
  ) { }

  public getConfig(): Config {
    return this.appConfig;
  }

  public apiPrefix(): string | undefined {
    return this.appConfig.apiPrefix;
  }

  load() {
    return new Promise(( resolve, reject ) => {
      this.httpClient.get<Config>(ConfigFile).subscribe(
          ( response) => {
            console.log(`Config from ${ConfigFile}`, response);
            this.applyConfig(response);
            resolve(true);
          },
          (error) => {
            console.log(`Config from ${ConfigFile} not found`);
            this.applyConfig({});
            resolve(true);
          }
        );
    });
  }

  private applyConfig(response: Config): void {
    this.appConfig = response;
    for (const prop in environment) {
      // @ts-ignore
      if (!this.appConfig[prop]) {
        // @ts-ignore
        this.appConfig[prop] = environment[prop];
      }
    }
  }
}
