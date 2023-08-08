<?php

namespace application\core;

use application\lib\Db;

class Model {
    protected array $paramsToUpdate = [];
    protected string $query = '';

	public $db;
	
	public function __construct() {
		$this->db = new Db;
	}
}