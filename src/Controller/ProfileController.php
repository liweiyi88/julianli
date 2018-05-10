<?php

namespace App\Controller;

use App\Api\ApiProblem;
use App\Api\ApiProblemException;
use App\Form\ContactType;
use App\Repository\FreelancerRepository;
use App\Service\Email\Contact;
use App\Service\Email\EmailManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends BaseController
{
    /**
     * @param FreelancerRepository $freelancerRepo
     *
     * @Route("/", name="home")
     *
     * @return Response
     */
    public function index(FreelancerRepository $freelancerRepo): Response
    {
        $freelancer = $freelancerRepo->findFreeLancer();

        return $this->render(
            'profile.html.twig',
            array(
            'freelancer' => $freelancer
            )
        );
    }

    /**
     * @param Request      $request
     * @param EmailManager $emailManager
     *
     * @Route("/api/contact", name="contact")
     *
     * @return Response
     *
     * @throws \InvalidArgumentException
     * @throws \App\Api\ApiProblemException
     * @throws \LogicException
     * @throws \Symfony\Component\Form\Exception\AlreadySubmittedException;
     * @throws \Symfony\Component\Form\Exception\LogicException
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

    /**
     * @param Request       $request
     * @param FormInterface $form
     *
     * @return void
     *
     * @throws \App\Api\ApiProblemException
     * @throws \InvalidArgumentException
     * @throws \Symfony\Component\Form\Exception\AlreadySubmittedException;
     * @throws \LogicException;
     */
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

    /**
     * @param FormInterface $form
     *
     * @return array
     */
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

    /**
     * @param FormInterface $form
     *
     * @throws \App\Api\ApiProblemException
     * @throws \InvalidArgumentException
     */
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
