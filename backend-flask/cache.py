import redis
import os
REDIS_HOST = os.getenv('REDIS_HOST') or 'localhost'
REDIS_PORT = os.getenv('REDIS_PORT') or 6379
cache = redis.Redis(
        host=REDIS_HOST, port=REDIS_PORT, db=0,decode_responses=True
)
