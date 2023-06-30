package pl.mk.recipot.auth.configs;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RestController; 	

@RestController 
public class HelloController {
   @GetMapping("/hello") 
   public String hello() { 
      return "hello"; 
   } 
}