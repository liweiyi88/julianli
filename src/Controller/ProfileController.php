<?php

namespace App\Controller;

use App\Entity\Freelancer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfileController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();

        $repo = $em->getRepository(Freelancer::class);
        $freelancer = $repo->findFreeLancer();

        return $this->render('profile.html.twig', array('freelancer' => $freelancer));
    }
}
