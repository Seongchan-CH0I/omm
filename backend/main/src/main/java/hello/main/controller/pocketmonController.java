package hello.main.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/pokemon")
@CrossOrigin(origins = "http://localhost:3000")
public class pocketmonController {

    @GetMapping("/{id}")
    public Object getPokemon(@PathVariable String id) {
        String url = "https://pokeapi.co/api/v2/pokemon/" + id;
        RestTemplate restTemplate = new RestTemplate();

        // 외부 API 데이터를 그대로 받아와서 프론트엔드에 넘겨줍니다.
        return restTemplate.getForObject(url, Object.class);
    }
}