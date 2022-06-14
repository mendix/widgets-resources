/** This file is for side effects. Use it carefully. */

import sh from "shelljs";
import { isDebug } from "./vars";

sh.config.silent = !isDebug();
