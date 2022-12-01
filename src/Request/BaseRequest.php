<?php

namespace App\Request;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

abstract class BaseRequest
{
    public function __construct(
        protected ValidatorInterface $validator
    ) {
        $parameters = Request::createFromGlobals()->query;

        foreach ($parameters as $property => $value) {
            if (property_exists($this, $property)) {
                $this->{$property} = $value;
            }
        }
    }

    public function validate()
    {
        $errors = $this->validator->validate($this);

        $messages = [];

        foreach ($errors as $message) {
            $messages[$message->getPropertyPath()] = $message->getMessage();
        }

        return $messages;
    }
}