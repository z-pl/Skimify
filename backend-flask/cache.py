import redis
import os
REDIS_HOST = os.environ['REDIS_HOST']
REDIS_PORT = os.environ['REDIS_PORT']
cache = redis.Redis(
        host=REDIS_HOST, port=REDIS_PORT, db=0,decode_responses=True
)
