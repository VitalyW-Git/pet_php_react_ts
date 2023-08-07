<?php

namespace application\core;

use application\core\View;

class Router {

    protected array $routes = [];
    protected array $currentControllerAction = [];
    
    public function __construct() {
        $dat = __DIR__;
        $arr = require 'application/config/routes.php';
        foreach ($arr as $route => $params) {
            $this->fillParams($route, $params);
        }
    }

    private function fillParams(string $route, array $params): void
    {
        $route = preg_replace('/{([a-z]+):([^\}]+)}/', '(?P<\1>\2)', $route);
        $route = '#^'.$route.'$#';
        $this->routes[$route] = $params;
    }

    private function matchCurrentUrl(): bool
    {
        $url = trim($_SERVER['REQUEST_URI'], '/');
        foreach ($this->routes as $route => $params) {
            if (preg_match($route, $url)) {
                $this->currentControllerAction = $params;
                return true;
            }
        }
        return false;
    }

    public function run(): void
    {
        if ($this->matchCurrentUrl()) {
            $path = 'application\controllers\\'.ucfirst($this->currentControllerAction['controller']).'Controller';
            if (class_exists($path)) {
                $action = $this->currentControllerAction['action'].'Action';
                if (method_exists($path, $action)) {
                    $controller = new $path($this->currentControllerAction);
                    $controller->$action();
                } else {
                    View::errorCode(404);
                }
            } else {
                View::errorCode(404);
            }
        } else {
            View::errorCode(404);
        }
    }

}