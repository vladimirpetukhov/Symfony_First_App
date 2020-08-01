<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\Definition\Exception\Exception;

/**
 * @Route("/api/categories", name="category")
 */
class CategoryController extends AbstractController
{


    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var TodoRepository
     */
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {

        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="read_categories")
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayTodos = array();
        foreach ($todos as $todo) {
            array_push($arrayTodos, $todo);
        }

        return $this->json($arrayTodos);
    }

    /**
     * @Route("/create", name="create_category",methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $category = new Todo();
        $category->setName($content->name);

        try {
            $this->entityManager->persist($category);
            $this->entityManager->flush();
            return $this->json([
                'todo' => $category->toArray()]);
        } catch (Exception $ex) {

        }
    }

    /**
     * @Route("/delete/{id}", name="delete_category", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();

        } catch (Exception $ex) {
            return $this->json([
                'todo' => "The  was NOT delete successful!"
            ]);
        }
        return $this->json([
            'messgge' => "The  was delete successful!"
        ]);
    }

    /**
     * @Route("/update/{id}", name="update_category",methods={"PUT"})
     * @param Request $request,
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content=json_decode($request->getContent());
        $todo->setName($content->name);

        try {
            $this->entityManager->flush();

        } catch (Exception $ex) {
            return $this->json([
                'todo' => "The  was NOT delete successful!"
            ]);
        }
        return $this->json([
            'messgge' => "The  was updated successful!"
        ]);
    }

}
