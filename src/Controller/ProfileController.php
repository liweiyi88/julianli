<?php

namespace App\Controller;

use App\Api\ApiProblem;
use App\Api\ApiProblemException;
use App\Requests\Contact;
use App\Repository\FreelancerRepository;
use App\Repository\PostRepository;
use App\Requests\Form\ContactType;
use App\Service\Email\EmailManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends BaseController
{
    /**
     * @Route("/", name="home")
     */
    public function index(FreelancerRepository $freelancerRepo, PostRepository $postRepo): Response
    {
        $freelancer = $freelancerRepo->findFreeLancer();
        $latestPosts = $postRepo->findLatestPublishedPublicPosts();

        return $this->render(
            'profile.html.twig',
            [
                'freelancer' => $freelancer,
                'posts' => $latestPosts
            ]
        );
    }

    /**
     * @Route("/api/contact", name="contact")
     */
    public function postContact(Request $request, EmailManager $emailManager): Response
    {
        $form = $this->createForm(ContactType::class, new Contact());
        $this->processForm($request, $form);

        if (!$form->isValid()) {
            $this->throwApiProblemValidationException($form);
        }

        $contact = $form->getData();
        $emailManager->sendEmail($contact);

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
