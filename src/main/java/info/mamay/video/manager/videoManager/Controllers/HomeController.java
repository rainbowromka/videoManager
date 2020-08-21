package info.mamay.video.manager.videoManager.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Контроллер, заружающий файл index.html.
 */
@Controller
public class HomeController
{
    /**
     * Загружаем файл index.html по запросу клиента.
     *
     * @return возвращает имя ресурса.
     */
    @RequestMapping(value = "/")
    public String index()
    {
        return "index";
    }
}
