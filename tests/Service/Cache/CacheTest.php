<?php
declare(strict_types=1);

namespace App\Tests\Service\Cache;

use App\Service\Cache\Cache;
use App\Tests\Service\Cache\Stubs\CacheStub;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Service\Cache\Cache
 */
class CacheTest extends TestCase
{
    /**
     * @var Cache
     */
    private $cache;

    public function setUp(): void
    {
        parent::setUp();

        $this->cache = new Cache(new CacheStub());
    }

    public function testGet(): void
    {
        self::assertNull($this->cache->get('test'));
        self::assertSame(2, $this->cache->get('test', 2));
        self::assertSame(2, $this->cache->get('test'));
    }

    public function testClear(): void
    {
        self::assertSame(100, $this->cache->get('test', 100));
        $this->cache->clear();
        self::assertNull($this->cache->get('test'));
    }

    public function testIncrement(): void
    {
        $this->cache->get('test', 1);
        self::assertSame(2, $this->cache->increment('test'));
        self::assertSame(4, $this->cache->increment('test', 2));
    }
}
