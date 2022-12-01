<?php

namespace App\Request;

use App\Validator\ValidZipcode;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\Constraints\NotBlank;

class SearchRequest extends BaseRequest
{
    #[Type('string')]
    #[NotBlank()]
    #[ValidZipcode()]
    protected string $zipcode;
}