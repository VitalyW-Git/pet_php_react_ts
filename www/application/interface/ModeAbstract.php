<?php

abstract class ModeAbstract
{
    abstract public function findAll();

    abstract public function findOne(int $id);

    abstract public function update($post, $id);

    abstract public function insert($post);
}