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
//class Pet extends Model
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
                $pet['birthday'] = date('Y.m.d', $pet['birthday']);
            }
        }
        return $pets;
    }

    /**
     * @return Pet[]
     */
    public function queryGetPets(): array
    {
        return $this->db->query('SELECT id, name, otype, oid, home, user_id, birthday  FROM pet')
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @throws Exception
     */
    public function findOne(int $id)
    {
        $params = [
            'id' => $id,
        ];
        $result = $this->db->column('SELECT * FROM pet WHERE id = :id', $params);

        if (!$result) {
            throw new Exception('Запись не найдена');
        }

        return $result;
    }

    /**
     * @param array $post
     * @param int $id
     * @return void
     */
    public function update($post, $id)
    {
        $params = [
            'id' => $id,
            'name' => $post['name'],
            'home' => $post['home'],
            'birthday' => $post['birthday'],
            'user_id' => $post['user_id'],
        ];
        $this->query = 'UPDATE pet SET ';
        foreach ($params as $key => $value) {
            if (!is_null($value)) {
                if (!empty($this->paramsToUpdate)) {
                    $this->query .= ', ';
                }

                $this->query .= "$key = :$key";
                $this->paramsToUpdate[$key] = $value;
            }
        }
        if (empty($this->paramsToUpdate)) {
            return;
        }
//        $this->db->query(
//            'UPDATE pet SET name = :name, home = :home, birthday = :birthday, user_id = :user_id WHERE id = :id',
//            $params
//        );
        $this->db->query(
            "$this->query WHERE id = :id",
            array_merge($this->paramsToUpdate, ['id' => $id])
        );
    }

    /**
     * @param array $post
     * @return false|string
     * @throws Exception
     */
    public function insert($post): bool|string
    {
        $params = [
            'name' => $post['name'],
            'home' => $post['home'],
            'birthday' => $post['birthday'],
            'user_id' => $post['user_id'],
        ];
        foreach ($params as $key => $value) {
            if (!is_null($value)) {
                throw new Exception("Поле: $key должно быть заполнено");
            };
        }
        $this->db->query(
            'INSERT INTO posts VALUES (:name, :home, :birthday, :user_id)',
            $params);
        return $this->db->lastInsertId();
    }
}