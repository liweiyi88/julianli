<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\CloudStorage\Interfaces\CloudStorageInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class FileUploadController extends AbstractController
{
    private $fileStorage;

    public function __construct(CloudStorageInterface $fileStorage)
    {
        $this->fileStorage = $fileStorage;
    }

    /**
     * @param Request $request
     *
     * @Method("POST")
     *
     * @Route("/file/upload", name="file_upload")
     *
     * @return Response
     *
     * @throws AccessDeniedException
     * @throws FileException
     * @throws \OutOfBoundsException
     */
    public function upload(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER', null, 'unable to upload the file');

        if ($request->files->count() !== 1) {
            throw new \OutOfBoundsException('only process a single file at once');
        }

        /** @var UploadedFile $file */
        $file = $request->files->get('upload');
        $fileName = $file->getClientOriginalName().'.'.$file->guessClientExtension();
        $response = $this->fileStorage->upload(['Key' => 'posts/'.$fileName, 'SourceFile' => $file->getRealPath()]);

        //must return json and have { "uploaded":"true" } in the response to make ckeditor5 work (without showing pop up).
        return new JsonResponse([
            'uploaded' => 'true',
            'url' => $response->getDestination()
        ]);
    }
}