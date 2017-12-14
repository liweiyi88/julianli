<?php

namespace App\Controller;

use App\Contact\Contact;
use App\Api\ApiProblem;
use App\Api\ApiProblemException;
use App\Email\EmailManager;
use App\Entity\Freelancer;
use App\Form\ContactType;
use App\Repository\FreelancerRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

class ProfileController extends BaseController
{
    /**
     * @Route("/", name="home")
     */
    public function index(Request $request, FreelancerRepository $freelancerRepo)
    {
        $freelancer = $freelancerRepo->findFreeLancer();

        return $this->render('profile.html.twig', array(
            'freelancer' => $freelancer
        ));
    }

    /**
     * @Route("/contact", name="contact")
     */
    public function postContact(Request $request, EmailManager $emailManager)
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $this->processForm($request, $form);

        if (!$form->isValid()) {
            $this->throwApiProblemValidationException($form);
        }

        $contact = $form->getData();
        $message = $emailManager->createPlianMessageFromContact($contact);
        $emailManager->sendEmail($message);

        $response = $this->createApiResponse($contact, 200);
        return $response;
    }

    private function processForm(Request $request, FormInterface $form)
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            $apiProblem = new ApiProblem(400, ApiProblem::TYPE_INVALID_REQUEST_BODY_FORMAT);

            throw new ApiProblemException($apiProblem);
        }

        $clearMissing = $request->getMethod() != 'PATCH';
        $form->submit($data, $clearMissing);
    }

    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }

        return $errors;
    }

    private function throwApiProblemValidationException(FormInterface $form)
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
