<?php

interface ModelInterface
{
    public function findAll();

    public function findOne(int $id);

    public function update($post, $id);

    public function insert($post);
}