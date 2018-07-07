<?php
declare(strict_types=1);

namespace App\Service\Cache;

use Symfony\Component\Cache\Simple\RedisCache;

class RedisFactory
{
    public static function create(string $dsn): RedisCache
    {
        return new RedisCache(RedisCache::createConnection($dsn));
    }
}
