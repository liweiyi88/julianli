<?php
declare(strict_types=1);

namespace App\Tests\Controller;

use App\Controller\BaseController;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Response;

class BaseControllerTest extends KernelTestCase
{
    private $controller;

    protected function setUp()
    {
        parent::setUp();

        $kernel = self::bootKernel();

        $this->controller = new BaseController($kernel->getContainer()->get('serializer'));
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
