package crud.board.web.controller;

import crud.board.service.PostsService;
import crud.board.web.dto.PostsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
//@RequiredArgsConstructor //@Bean주입 > @autowired대신 생성자로
public class PostsApiController {
    @Autowired
    private PostsService postsService;
    public PostsApiController(PostsService postsService) {
        this.postsService = postsService;
    }



    @GetMapping(value = "/posts")
    public List<PostsDto> lists(@RequestParam(value = "page", defaultValue = "1")
                                        Integer pageNum) {

        List<PostsDto> postsDtoList = postsService.getPostsList(pageNum);
        Integer[] pageList = postsService.getPageList(pageNum);

        return postsService.getPostsList(pageNum);
  }



}
