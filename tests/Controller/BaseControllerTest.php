<?php
declare(strict_types=1);

namespace App\Tests\Controller;

use App\Controller\BaseController;
use App\Entity\Freelancer;
use App\Entity\Post;
use App\Service\Cache\Cache;
use Psr\SimpleCache\CacheInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Response;

class BaseControllerTest extends KernelTestCase
{
    private $controller;

    protected function setUp()
    {
        parent::setUp();

        self::bootKernel();

        $container = self::$container;
        $store = $this->createMock(CacheInterface::class);

        /** @var CacheInterface $store */
        $cache = new Cache($store);

        $this->controller = new BaseController(
            $cache,
            $container->get('doctrine')->getRepository(Freelancer::class),
            $container->get('doctrine')->getRepository(Post::class),
            $container->get('serializer'));
    }

    public function testCreateApiResponse(): void
    {
        $reflection = new \ReflectionClass(\get_class($this->controller));
        $method = $reflection->getMethod('createApiResponse');
        $method->setAccessible(true);

        /** @var Response $response */
        $response = $method->invokeArgs($this->controller, [['test_key' => 'test']]);

        self::assertSame(200, $response->getStatusCode());
        self::assertSame('{"test_key":"test"}', $response->getContent());
    }
}
