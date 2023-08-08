<?php

namespace application\core;

use application\core\View;

class Controller {

    /**
     * @var array $route ['controller' => string,'action' => string],
     */
	public array $route;
	public View $view;
	public array $allAccessPages;

	public function __construct(array $currentControllerAction) {
		$this->route = $currentControllerAction;
		if (!$this->accessPage()) {
			View::errorCode(403);
		}
		$this->view = new View($currentControllerAction);
		$this->model = $this->loadModel($currentControllerAction['controller']);
	}

    /**
     * @param $name
     * @return mixed|void
     */
	public function loadModel($name)
    {
		$path = 'application\models\\'.ucfirst($name);
		if (class_exists($path)) {
			return new $path;
		}
	}

    /**
     * @return bool
     */
    private function accessPage(): bool
    {
		$this->allAccessPages = require "application/acl/{$this->route['controller']}.php";
		if ($this->isAccessPage('all')) {
			return true;
		}
		return false;
	}

    /**
     * @param string $key
     * @return bool
     */
    private function isAccessPage(string $key): bool
    {
		return in_array($this->route['action'], $this->allAccessPages[$key]);
	}

}