<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Messenger\MessageBusInterface;

final class ContactSubscriber implements EventSubscriberInterface
{
    /**
     * @var \Symfony\Component\Messenger\MessageBusInterface
     */
    private $bus;

    public function __construct(MessageBusInterface $bus)
    {
        $this->bus = $bus;
    }

    public function onContact(ViewEvent $event): void
    {
        $request = $event->getRequest();

        if ('api_contacts_post_collection' !== $request->attributes->get('_route')) {
            return;
        }

        $this->bus->dispatch($event->getControllerResult());

        $event->setResponse(new JsonResponse(null, 204));
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onContact', EventPriorities::POST_VALIDATE]
        ];
    }
}
