<?php

namespace App\Controller;

use App\Contact\Contact;
use App\Entity\Freelancer;
use App\Form\ContactType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ProfileController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $repo = $em->getRepository(Freelancer::class);
        $freelancer = $repo->findFreeLancer();

        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $contact = $form->getData();
            return $this->redirectToRoute('index', ['_fragment'=>'contact']);
        }

        return $this->render('profile.html.twig', array(
            'freelancer' => $freelancer,
            'form' => $form->createView()
        ));
    }
}
