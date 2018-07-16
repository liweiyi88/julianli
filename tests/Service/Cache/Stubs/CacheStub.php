<?php
declare(strict_types=1);

namespace App\Tests\Service\Cache\Stubs;

use Psr\SimpleCache\CacheInterface;

class CacheStub implements CacheInterface
{
    private $items = [];

    public function get($key, $default = null)
    {
       return $this->items[$key] ?? null;
    }

    public function set($key, $value, $ttl = null)
    {
        $this->items[$key] = $value;
    }

    public function delete($key)
    {
        unset($this->items[$key]);
    }

    public function clear()
    {
        $this->items = [];
    }

    public function getMultiple($keys, $default = null)
    {
    }

    public function setMultiple($values, $ttl = null)
    {
    }

    public function deleteMultiple($keys)
    {
    }

    public function has($key): bool
    {
        return (bool)$this->items[$key];
    }
}
