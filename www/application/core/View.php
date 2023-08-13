<?php

namespace application\core;

class View {

	public string $pathView;
	public array $route;
	public string $layout = 'default';

	public function __construct(array $currentControllerAction) {
		$this->route = $currentControllerAction;
		$this->pathView = "{$currentControllerAction['controller']}/{$currentControllerAction['action']}";
	}

    /**
     * @param string $title
     * @param array $vars
     * @return void
     */
	public function render(string $title, array $vars = []): void
    {
		extract($vars);
		$pathView = "application/views/$this->pathView.php";
		if (file_exists($pathView)) {
			ob_start();
			require $pathView;
			$content = ob_get_clean();
			require "application/views/layouts/$this->layout.php";
		}
	}

    /**
     * @param int $code
     * @return void
     */
	public static function errorCode(int $code) {
		http_response_code($code);
		$pathView = "application/views/errors/$code.php";
		if (file_exists($pathView)) {
			require $pathView;
		}
	}
}	