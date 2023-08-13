<?php

namespace application\models;

use application\core\Model;
use PDO;

/**
 * @property string $name
 * @property string $otype
 * @property string $oid
 * @property string $create_at
 * @property string $update_at
 */

class User extends Model
{
    /**
     * @param string $search
     * @return array|false
     */
    public function querySearch(string $search): array|bool
    {
        $query = 'SELECT id, name FROM user WHERE name LIKE :search';
        $stmt = $this->db->queryLike($query, $search);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}