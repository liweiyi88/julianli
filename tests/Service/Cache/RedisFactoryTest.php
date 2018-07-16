<?php
declare(strict_types=1);

namespace App\Tests\Service\Cache;

use App\Service\Cache\RedisFactory;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Cache\Exception\InvalidArgumentException;

/**
 * @covers \App\Service\Cache\RedisFactory
 */
class RedisFactoryTest extends TestCase
{
    public function testCreate(): void
    {
        $this->expectException(InvalidArgumentException::class);
        RedisFactory::create('redis://some_invalid_local');
    }
}
