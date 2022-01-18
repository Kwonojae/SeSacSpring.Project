package crud.board.web.controller;

import crud.board.service.PostsService;
import crud.board.web.dto.PostsDto;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller   //Todo
public class PostsController {
    private PostsService postsService;

    //todo
    public PostsController(PostsService postsService) {
        this.postsService = postsService;
    }

    // 루트 list.html
    @GetMapping("/")
    public String list(Model model,
                       @RequestParam(value = "page", defaultValue = "1")
                       //@PageableDefault(sort = "id", direction = Sort.Direction.DESC)
                               Integer pageNum) {

        List<PostsDto> postsDtoList = postsService.getPostsList(pageNum);
        Integer[] pageList = postsService.getPageList(pageNum);
        model.addAttribute("postsList", postsDtoList);
        model.addAttribute("pageList", pageList);

        return "posts/list.html";
    }

    //글쓰기 write.html
    @GetMapping("/post")
    public String write() {
        return "posts/write.html";
    }

    @PostMapping("/post")
    public String write(PostsDto postsDto) {
        postsService.savePost(postsDto);
        return "redirect:/";
    }

    @GetMapping("/post/{no}")
    public String detail(@PathVariable("no") Long id, Model model) {
        PostsDto postsDto = postsService.getPost(id);
        postsService.updateView(id); //view ++);
        model.addAttribute("postsDto", postsDto);

        return "posts/detail.html";
    }

    @GetMapping("/post/edit/{no}")
    public String edit(@PathVariable("no") Long id, Model model) {
        PostsDto postsDto = postsService.getPost(id);
        model.addAttribute("postsDto", postsDto);
        return "posts/update.html";
    }

    @PutMapping("/post/edit/{no}")
    public String update(PostsDto postsDto) {
        postsService.savePost(postsDto);
        return "redirect:/";
    }

    @DeleteMapping("/post/{no}")
    public String delete(@PathVariable("no") Long id) {
        postsService.deletePost(id);
        return "redirect:/";
    }
    //TODO 내용으로도 찾을 수 있게
    @GetMapping("/posts/search")
    public String search(@RequestParam(value = "keyword") @PageableDefault(sort = "id", direction = Sort.Direction.DESC) String keyword, Model model ) {
        List<PostsDto> postsDtoList = postsService.searchPosts(keyword);
        model.addAttribute("postsList", postsDtoList);
        return "posts/list.html";
    }
}
