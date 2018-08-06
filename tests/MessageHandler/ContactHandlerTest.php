<?php
declare(strict_types=1);

namespace App\Tests\MessageHandler;

use App\MessageHandler\ContactHandler;
use App\Requests\Contact;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

/**
 * @covers \App\MessageHandler\ContactHandler
 */
class ContactHandlerTest extends KernelTestCase
{
    public function testInvokeMethod(): void
    {
        self::bootKernel();
        $container = self::$container;

        $handler = new ContactHandler(
            'admin@test.com',
            'test@example.com',
            $container->get('mailer')
        );

        self::assertNull($handler(new Contact()));
    }
}