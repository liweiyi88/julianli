<?php

namespace App\Controller;

use App\Api\ApiProblem;
use App\Api\ApiProblemException;
use App\Requests\Contact;
use App\Requests\Form\ContactType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends BaseController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        $latestPosts = $this->postRepository->findLatestPublishedPublicPosts();

        $this->attachPageViews($latestPosts);

        return $this->render(
            'profile.html.twig',
            [
                'freelancer' => $this->freelancerRepository->findFreeLancer(),
                'posts' => $latestPosts
            ]
        );
    }

    /**
     * @Route("/api/contact", name="contact")
     */
    public function postContact(Request $request, MessageBusInterface $bus): Response
    {
        $form = $this->createForm(ContactType::class, new Contact());
        $this->processForm($request, $form);

        if (!$form->isValid()) {
            $this->throwApiProblemValidationException($form);
        }

        $contact = $form->getData();

        $bus->dispatch($contact);

        return $this->createApiResponse($contact, 200);
    }

    private function processForm(Request $request, FormInterface $form): void
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            $apiProblem = new ApiProblem(400, ApiProblem::TYPE_INVALID_REQUEST_BODY_FORMAT);

            throw new ApiProblemException($apiProblem);
        }

        $clearMissing = $request->getMethod() !== 'PATCH';
        $form->submit($data, $clearMissing);
    }

    private function getErrorsFromForm(FormInterface $form): array
    {
        $errors = [];
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface && $childErrors = $this->getErrorsFromForm($childForm)) {
                $errors[$childForm->getName()] = $childErrors;
            }
        }

        return $errors;
    }

    private function throwApiProblemValidationException(FormInterface $form): void
    {
        $errors = $this->getErrorsFromForm($form);

        $apiProblem = new ApiProblem(
            400,
            ApiProblem::TYPE_VALIDATION_ERROR
        );
        $apiProblem->set('errors', $errors);

        throw new ApiProblemException($apiProblem);
    }
}
