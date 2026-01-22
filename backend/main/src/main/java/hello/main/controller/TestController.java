package hello.main.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // 프론트엔드(http://localhost:3000)에서의 요청을 허용합니다.
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/test")
    public String test() {
        return "백엔드 연결 성공!";
    }
}