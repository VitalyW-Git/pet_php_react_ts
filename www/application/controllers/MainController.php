<?php

namespace application\controllers;

use application\core\Controller;

class MainController extends Controller {

	public function indexAction() {
		$this->view->render('Главная страница');
	}

    public function getAllPetsAction() {
		$this->view->render('Главная страница');
	}

    public function getPetAction() {
		$this->view->render('Главная страница');
	}

    public function updatePrtAction() {
		$this->view->render('Главная страница');
	}
}