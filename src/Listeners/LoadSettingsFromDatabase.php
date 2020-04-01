<?php

namespace Zhujia18\Chevereto\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * LoadSettingsFromDatabase constructor.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param Serializing $event
     */
    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $src = 'jasper.chevereto.src';
            $url = 'jasper.chevereto.url';
            $autoinsert = 'jasper.chevereto.autoinsert';
            $lang = 'jasper.chevereto.lang';
            $event->attributes[$src] = $this->settings->get($src);
            $event->attributes[$url] = $this->settings->get($url);
            $event->attributes[$autoinsert] = $this->settings->get($autoinsert);
            $event->attributes[$lang] = $this->settings->get($lang);
        }
    }
}
