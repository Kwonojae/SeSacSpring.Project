package crud.board.web.dto;

import crud.board.domain.posts.Posts;
import lombok.*;

import java.time.LocalDateTime;

//Todo @Data로 변경
//Todo content를 안넣으면 등록이 안되고 경고창이 뜨겠끔
@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostsDto {
    private Long id;
    private String writer;
    private String title;
    private String content;
    private int view;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    public Posts toEntity(){
        Posts posts = Posts.builder()
                .id(id)
                .writer(writer)
                .title(title)
                .view(view)
                .content(content)
                .build();
        return posts;
    }
    @Builder
    public PostsDto(Long id, String writer, String content, String title, LocalDateTime createdDate, LocalDateTime modifiedDate, int view) {
        this.id = id;
        this.writer = writer;
        this.content = content;
        this.title = title;
        this.view = view;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}
