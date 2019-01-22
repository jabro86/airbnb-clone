import * as Redis from "ioredis";

import { REDIS_URL } from "./utils/config";

export const redis = new Redis(REDIS_URL);
