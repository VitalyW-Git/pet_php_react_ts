<?php

namespace application\lib;

use PDO;
use PDOException;
use PDOStatement;

class Db
{

    protected PDO $db;

    public function __construct()
    {
        $paramsConnect = require "/www/application/config/db.php";
        $option = [
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];
        try {
            $this->db = new PDO("mysql:host={$paramsConnect['host']};dbname={$paramsConnect['dbname']}", $paramsConnect['user'], $paramsConnect['password'], $option);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    /**
     * @param $sql
     * @param array $params
     * @return bool|PDOStatement
     */
    public function query($sql, array $params = []): bool|PDOStatement
    {
        $stmt = $this->db->prepare($sql);
        if (!empty($params)) {
            foreach ($params as $key => $val) {
                if (is_int($val)) {
                    $type = PDO::PARAM_INT;
                } else {
                    $type = PDO::PARAM_STR;
                }
                $stmt->bindValue(':' . $key, $val, $type);
            }
        }
        $stmt->execute();
        return $stmt;
    }

    /**
     * @param string $query
     * @param string $search
     * @return bool|PDOStatement
     */
    public function queryLike(string $query, string $search): bool|PDOStatement
    {
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':search', "%$search%");
        $stmt->execute();
        return $stmt;
    }
}