<?php
declare(strict_types=1);

namespace App\Service\Cache;

use Psr\SimpleCache\CacheInterface;

class Cache
{
    private $store;

    public function __construct(CacheInterface $cache)
    {
        $this->store = $cache;
    }

    /**
     * Get the cache item value and set the value if possible.
     *
     * @param string $key
     *
     * @param $default
     *
     * @return mixed
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function get(string $key, $default = null)
    {
        $value = $this->store->get($key);

        if ($value === null) {
            if ($default) {
                $this->store->set($key, $default);
            }

            return $default;
        }

        return $value;
    }

    /**
     * Increase int value.
     *
     * @param string $key
     * @param int $value
     *
     * @return int
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function increment(string $key, int $value = 1): int
    {
        $int = (int)$this->store->get($key) + $value;
        $this->store->set($key, $int);

        return $int;
    }
}
