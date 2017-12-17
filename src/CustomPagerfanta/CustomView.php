<?php

namespace App\CustomPagerfanta;

use Pagerfanta\View\DefaultView;

class CustomView extends DefaultView
{
    protected function createDefaultTemplate()
    {
        return new CustomTemplate();
    }

    public function getName() {
        return 'my_template';
    }
}