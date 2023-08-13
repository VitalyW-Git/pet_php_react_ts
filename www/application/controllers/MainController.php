<?php

namespace application\controllers;

use application\core\Controller;
use application\models\Pet;
use application\models\User;

class MainController extends Controller {

	public function indexAction() {
		$this->view->render('Главная страница');
	}

    /**
     * @return void
     */
    public function getAllPetsAction(): void
    {
        $pets = (new Pet())->findAll();
        if (!$pets) {
            echo json_encode([
                "status" => 400,
                "error" => 'Записей нет.'
            ]);
            die();
        }
        echo json_encode([
                "status" => 200,
                "pets" => $pets
            ]);
        die();
    }

    public function searchUserAction()
    {
        if (array_key_exists('search', $_GET)) {
            $users = (new User())->querySearch($_GET['search']);
            echo json_encode([
                "status" => 200,
                "users" => $users
            ]);
            die();
        }
	}


    public function updatePetAction()
    {
        $success = (new Pet())->update($_POST);
        echo json_encode([
            "status" => 200,
            "success" => $success
        ]);
        die();
	}
}