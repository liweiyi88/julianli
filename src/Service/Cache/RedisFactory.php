<?php
declare(strict_types=1);

namespace App\Service\Cache;

use Symfony\Component\Cache\Simple\RedisCache;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class RedisFactory
{
    /**
     * @var string
     */
    private $dsn;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->dsn = $parameterBag->get('redis_host');
    }

    public function create(): RedisCache
    {
        return new RedisCache(RedisCache::createConnection($this->dsn));
    }
}