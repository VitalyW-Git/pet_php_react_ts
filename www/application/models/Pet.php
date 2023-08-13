<?php

namespace application\models;

use application\core\Model;
use Exception;
use PDO;

/**
 * @property string $name
 * @property string $otype
 * @property string $oid
 * @property bool $home
 * @property int $user_id
 * @property int $birthday
 * @property string $create_at
 * @property string $update_at
 */
class Pet extends Model
{
    /**
     * @return array
     */
    public function findAll(): array
    {
        $pets = $this->queryGetPets();
        if (!$pets) {
            return [];
        }
        foreach ($pets as &$pet) {
            if (array_key_exists('birthday', $pet)) {
                $pet['birthday'] = date('Y-m-d', $pet['birthday']);
            }
            if (array_key_exists('home', $pet)) {
                $pet['home'] = (bool)$pet['home'];
            }
        }
        return $pets;
    }

    /**
     * @return Pet[]
     */
    public function queryGetPets(): array
    {
        return $this->db->query('
SELECT p.id as id, 
        p.name as name, 
        p.otype as otype, 
        p.oid as oid, 
        p.home as home, 
        p.user_id as user_id, 
        p.birthday as birthday,
        u.name as user_name
FROM pet p
    INNER JOIN user u on (u.id = p.user_id)')
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @param array $post
     * @return bool
     */
    public function update(array $post): bool
    {
        $params = [
            'name' => $post['name'],
            'home' => (int)$post['home'],
            'birthday' => strtotime(str_replace(".", "-", $post['birthday'])),
            'user_id' => (int)$post['user_id'],
        ];
        $this->query = 'UPDATE pet SET ';
        $updates = [];
        foreach ($params as $key => $value) {
            if (!is_null($value)) {
                $updates[] = "$key = :$key";
                $this->paramsToUpdate[$key] = $value;
            }
        }
        if (empty($this->paramsToUpdate)) {
            return false;
        }
        $updateQuery = implode(", ", $updates);
        $stmt = $this->db->query(
            "$this->query $updateQuery WHERE id = :id",
            array_merge($this->paramsToUpdate, ['id' => (int)$post['id']])
        );
        $rowsAffected = $stmt->rowCount();
        if ($rowsAffected > 0) {
            return true;
        } else {
            return false;
        }
    }
}