<?php

namespace App\Events;

use App\Entity\Workouts;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class WorkoutUserSubscriber implements EventSubscriberInterface {

    private $security;

    public function __construct(Security $security) {
        $this->security = $security;
    }
    public static function getSubscribedEvents() {
        return [
            KernelEvents::VIEW => ['setUserForWorkout', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForWorkout(ViewEvent $event) {
        $workout = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($workout instanceof Workouts && $method === "POST") {
            $user = $this->security->getUser();
            $workout->setAuthor($user);
        }
    }
}