package info.mamay.video.manager.videoManager.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController
{
    @RequestMapping(value = "/")
    public String index()
    {
        return "index";
    }
}
