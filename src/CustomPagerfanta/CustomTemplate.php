<?php

namespace App\CustomPagerfanta;

use Pagerfanta\View\Template\DefaultTemplate;

class CustomTemplate extends DefaultTemplate
{
    static protected $defaultOptions = array(
        'previous_message'   => '<i class="rsicon rsicon-chevron_left"></i>',
        'next_message'       => '<i class="rsicon rsicon-chevron_right"></i>',
        'css_disabled_class' => 'disabled',
        'css_dots_class'     => 'dots',
        'css_current_class'  => 'page-numbers current',
        'dots_text'          => '...',
        'container_template' => '%pages%',
        'page_template'      => '<a class="%prevornext% page-numbers" href="%href%"%rel%>%text%</a>',
        'span_template'      => '<span class="%class%">%text%</span>',
        'rel_previous'        => 'prev',
        'rel_next'            => 'next'
    );

    public function previousDisabled()
    {
        return $this->generateSpan($this->option('css_disabled_class'), null);
    }

    public function previousEnabled($page)
    {
        return $this->pageWithText($page, $this->option('previous_message'), 'next', $this->option('rel_previous'));
    }

    public function nextDisabled()
    {
        return $this->generateSpan($this->option('css_disabled_class'), null);
    }

    public function nextEnabled($page)
    {
        return $this->pageWithText($page, $this->option('next_message'), 'next', $this->option('rel_next'));
    }

    public function pageWithText($page, $text, $prevornext = null, $rel = null)
    {
        $search = array('%href%', '%text%', '%rel%', '%prevornext%');

        $href = $this->generateRoute($page);
        $replace = $rel ? array($href, $text, ' rel="' . $rel . '"', $prevornext) : array($href, $text, '');

        return str_replace($search, $replace, $this->option('page_template'));
    }

    private function generateSpan($class, $page)
    {
        $search = array('%class%', '%text%');
        $replace = array($class, $page);

        return str_replace($search, $replace, $this->option('span_template'));
    }
}