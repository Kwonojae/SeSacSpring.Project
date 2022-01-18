package crud.board.service;

import crud.board.domain.posts.Posts;
import crud.board.domain.repository.PostsRepository;
import crud.board.web.dto.PostsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//실제 비지니스 로직 :
//글쓰기form 내용 입력 -> 등록 버튼 -> post ->Service savePost
//제목,작성자,내용 -> DB
// Controll <-DTO이용 ->Service

@Service
public class PostsService {

    private PostsRepository postsRepository;
    private static final int BLOCK_PAGE_NUM_COUNT = 5; // 블럭에 존재하는 페이지 수
    private static final int PAGE_POST_COUNT = 12; //한 페이지에 존재하는 게시글 수

    public PostsService(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }

    // repository에 저장 (JpaRepository -> PagingAndSortingRepository -> CrudRepository의 Interface)
    @Transactional
    public Long savePost(PostsDto postsDto) {
        return postsRepository.save(postsDto.toEntity()).getId();
    }

    @Transactional
    public List<PostsDto> getPostsList(Integer pageNum) {
        Page<Posts> page = postsRepository
                .findAll(PageRequest
                        .of(pageNum - 1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "createdDate")));
//        List<posts> posts = postsRepository.findAll();
        List<Posts> posts_d = page.getContent();
        List<PostsDto> postsDtoList = new ArrayList<>();

        //TODO 이쪽에서 나중에 db값 바꿔줘야함함
        for (Posts posts : posts_d) {
            PostsDto postsDto = PostsDto.builder()
                    .id(posts.getId())
                    .writer(posts.getWriter())
                    .content(posts.getContent())
                    .createdDate(posts.getCreatedDate())
                    .title(posts.getTitle())
                    .view(posts.getView())
                    .build();
            postsDtoList.add(postsDto);
        }
        return postsDtoList;
    }

    @Transactional
    public PostsDto getPost(Long id) {
        Optional<Posts> postsWrapper = postsRepository.findById(id);
        Posts posts = postsWrapper.get();

        PostsDto postsDto = PostsDto.builder()
                .id(posts.getId())
                .writer(posts.getWriter())
                .content(posts.getContent())
                .createdDate(posts.getCreatedDate())
                .title(posts.getTitle())
                .view(posts.getView())
                .build();
        return postsDto;
    }

    @Transactional
    public void deletePost(Long id) {
        postsRepository.deleteById(id);

    }

    @Transactional
    public List<PostsDto> searchPosts(String keyword) {
        List<Posts> posts_d = postsRepository.findByTitleContaining(keyword);
        List<PostsDto> postsDtoList = new ArrayList<>();

        if (posts_d.isEmpty()) {

            return postsDtoList;
        }
        for (Posts posts : posts_d) {
            postsDtoList.add(this.convertEntityToDto(posts));
        }
        return postsDtoList;
    }

    private PostsDto convertEntityToDto(Posts posts) {
        return PostsDto.builder()
                .id(posts.getId())
                .writer(posts.getWriter())
                .content(posts.getContent())
                .createdDate(posts.getCreatedDate())
                .title(posts.getTitle())
                .view(posts.getView())
                .build();
    }

    public Integer[] getPageList(Integer curPageNum) {
        Integer[] pageList = new Integer[BLOCK_PAGE_NUM_COUNT];
        //총 개시글 수
        Double postsTotalCount = Double.valueOf(this.getPostsCount());
        // 총 게시글 수를 기준으로 마지막 페이지 번호 계산
        Integer totalLastPageNum = (int) (Math.ceil((postsTotalCount / PAGE_POST_COUNT)));
        // 현재 페이지를 기준으로 블럭의 마지막 페이지 번호 계산
        Integer blockLastPageNum = (totalLastPageNum > curPageNum + BLOCK_PAGE_NUM_COUNT) ? curPageNum + BLOCK_PAGE_NUM_COUNT : totalLastPageNum;

        //페이지 시작 번호 조정
        curPageNum = (curPageNum <= 3) ? 1 : curPageNum - 2;

        // 페이지 번호 할당
        for (int val = curPageNum, i = 0; val <= blockLastPageNum; val++, i++) {
            pageList[i] = val;
        }
        return pageList;

    }
    @Transactional
    public Long getPostsCount() {
        return postsRepository.count();
    }

    // Views Counting
    @Transactional
    public int updateView(Long id) {
        return postsRepository.updateView(id);
    }

}
