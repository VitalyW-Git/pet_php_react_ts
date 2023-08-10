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
        $this->setPostParams();
	}

    private function setPostParams(): void
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);
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
        if ($this->isAccessPage('main')) {
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