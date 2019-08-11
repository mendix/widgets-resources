declare module "*.scss";
import * as WebdriverIO from "webdriverio";

declare function require(name: string): string;
declare var browser: WebdriverIO.Client<void>;
