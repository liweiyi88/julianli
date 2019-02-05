<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HireController extends AbstractController
{
    /**
     * @Route("/hire", name="hire")
     */
    public function index()
    {
        return $this->render('hire/index.html.twig', [
            'controller_name' => 'HireController',
        ]);
    }
}
