//package crud.board.web.controller;
//
//import crud.board.service.PostsService;
//import crud.board.web.dto.PostsDto;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping(value = "/api")
//@RequiredArgsConstructor //@Bean주입 > @autowired대신 생성자로
//public class RestApiPostsController {
//    private PostsService postsService;
//
//    /* CREATE */
//    @PostMapping("/post")
//    public ResponseEntity savePost(@RequestBody PostsDto postsDto) {
//        return ResponseEntity.ok(postsService.savePost(postsDto));
//    }
//
//    /* READ */
//    @GetMapping("/post/{no}")
//    public ResponseEntity read(@PathVariable("no") Long id) {
//        return ResponseEntity.ok(postsService.findById(id));
//    }
//
//    @GetMapping("/post/{no}")
//    public String detail(@PathVariable("no") Long id, Model model) {
//        PostsDto postsDto = postsService.getPost(id);
//        postsService.updateView(id); //view ++);
//        model.addAttribute("postsDto", postsDto);
//
//        return "posts/detail.html";
//    }
//
//    /* UPDATE */
//    @PutMapping("/post/{id}")
//    public ResponseEntity update(@PathVariable Long id, @RequestBody PostsDto.Request dto) {
//        postsService.update(id, dto);
//        return ResponseEntity.ok(id);
//    }
//
//    /* DELETE */
//    @DeleteMapping("/post/{id}")
//    public ResponseEntity delete(@PathVariable Long id) {
//        postsService.delete(id);
//        return ResponseEntity.ok(id);
//    }
//
//}
