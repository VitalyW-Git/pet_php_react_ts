<?php

namespace application\controllers;

use application\core\Controller;
use application\models\Pet;

class MainController extends Controller {

	public function indexAction() {
        $rf = $_POST;
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

    public function getPetAction() {
		$this->view->render('Главная страница');
	}

    public function updatePrtAction() {
		$this->view->render('Главная страница');
	}
}